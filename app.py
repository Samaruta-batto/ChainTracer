from flask import Flask, request, render_template
from web3 import Web3

app = Flask(__name__)
web3 = Web3(Web3.HTTPProvider("https://mainnet.infura.io/v3/f00f456646ba47d681d17bb76b14d13d"))

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/balance', methods=['POST'])
def balance():
    address = request.form['address']
    try:
        balance = web3.eth.get_balance(address)
        eth_balance = web3.from_wei(balance, 'ether')
        return render_template('index.html', result=f"Balance of {address}: {eth_balance} ETH")
    except Exception as e:
        return render_template('index.html', result=f"Error: {e}")

@app.route('/block', methods=['POST'])
def block():
    block_number = request.form['block_number']
    try:
        if block_number == 'latest':
            block = web3.eth.get_block('latest')
        else:
            block = web3.eth.get_block(int(block_number))
        return render_template('index.html', result=block)
    except Exception as e:
        return render_template('index.html', result=f"Error: {e}")

@app.route('/transaction', methods=['POST'])
def transaction():
    tx_hash = request.form['tx_hash']
    try:
        tx = web3.eth.get_transaction(tx_hash)
        receipt = web3.eth.get_transaction_receipt(tx_hash)

        result = f"<b>🧾 Transaction:</b><br>{tx}<br><br><b>📄 Receipt:</b><br>{receipt}"

        # Smart contract check
        to_address = tx['to']
        code = web3.eth.get_code(to_address)
        if code != b'':
            result += f"<br><br>⚠️ The 'to' address ({to_address}) is a smart contract."

        # ERC-20 Transfer Events
        result += "<br><br><b>📤 Transfer Events (ERC-20):</b><br>"
        transfer_signature = web3.keccak(text="Transfer(address,address,uint256)").hex()
        found_transfer = False
        for log in receipt.logs:
            if log['topics'][0].hex() == transfer_signature:
                from_address = '0x' + log['topics'][1].hex()[-40:]
                to_address = '0x' + log['topics'][2].hex()[-40:]
                result += f"  - From: {from_address} ➡️ To: {to_address}<br>"
                found_transfer = True
        if not found_transfer:
            result += "  No ERC-20 transfers found."
        return render_template('index.html', result=result)
    except Exception as e:
        return render_template('index.html', result=f"Error: {e}")

if __name__ == '__main__':
    app.run(debug=True)
