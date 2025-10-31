from flask import Flask, request, jsonify
from flask_cors import CORS
from web3 import Web3
from datetime import datetime
import os

app = Flask(__name__)
CORS(app)

infura_key = os.getenv('INFURA_API_KEY', 'f00f456646ba47d681d17bb76b14d13d')
web3 = Web3(Web3.HTTPProvider(f"https://mainnet.infura.io/v3/{infura_key}"))

def format_timestamp(timestamp):
    return datetime.utcfromtimestamp(timestamp).strftime('%Y-%m-%d %H:%M:%S UTC')

def is_contract(address):
    try:
        code = web3.eth.get_code(address)
        return code != b''
    except:
        return False

def calculate_risk_score(tx, receipt, is_to_contract, is_from_contract):
    score = 0
    
    if is_to_contract:
        score += 15
    
    value_eth = web3.from_wei(tx['value'], 'ether')
    if value_eth > 100:
        score += 20
    elif value_eth > 10:
        score += 10
    
    if receipt['status'] == 0:
        score += 30
    
    return min(score, 100)

@app.route('/api/health', methods=['GET'])
def health():
    is_connected = web3.is_connected()
    return jsonify({
        'status': 'ok' if is_connected else 'error',
        'web3_connected': is_connected,
        'chain_id': web3.eth.chain_id if is_connected else None
    })

@app.route('/api/transaction/<tx_hash>', methods=['GET'])
def get_transaction(tx_hash):
    try:
        tx = web3.eth.get_transaction(tx_hash)
        receipt = web3.eth.get_transaction_receipt(tx_hash)
        block = web3.eth.get_block(tx['blockNumber'])
        
        is_to_contract = is_contract(tx['to']) if tx['to'] else False
        is_from_contract = is_contract(tx['from'])
        
        address_type = 'contract' if is_to_contract else 'wallet'
        
        value_eth = web3.from_wei(tx['value'], 'ether')
        
        risk_score = calculate_risk_score(tx, receipt, is_to_contract, is_from_contract)
        
        metadata = [
            {'key': 'Gas Limit', 'value': str(tx['gas'])},
            {'key': 'Gas Price', 'value': f"{web3.from_wei(tx['gasPrice'], 'gwei')} Gwei"},
            {'key': 'Nonce', 'value': str(tx['nonce'])},
            {'key': 'Block', 'value': str(tx['blockNumber'])},
            {'key': 'Gas Used', 'value': f"{receipt['gasUsed']:,}"}
        ]
        
        transaction_data = {
            'id': f'tx-{tx_hash[:10]}',
            'hash': tx_hash,
            'address': tx['to'] if tx['to'] else 'Contract Creation',
            'addressType': address_type,
            'status': 'confirmed' if receipt['status'] == 1 else 'failed',
            'amount': float(value_eth),
            'currency': 'ETH',
            'usdValue': 0,
            'timestamp': format_timestamp(block['timestamp']),
            'chain': 'ethereum',
            'from': tx['from'],
            'to': tx['to'] if tx['to'] else 'Contract Creation',
            'riskScore': risk_score,
            'metadata': metadata
        }
        
        transfer_events = []
        transfer_signature = web3.keccak(text="Transfer(address,address,uint256)").hex()
        for log in receipt.logs:
            if len(log['topics']) > 0 and log['topics'][0].hex() == transfer_signature:
                if len(log['topics']) >= 3:
                    from_address = '0x' + log['topics'][1].hex()[-40:]
                    to_address = '0x' + log['topics'][2].hex()[-40:]
                    transfer_events.append({
                        'from': from_address,
                        'to': to_address,
                        'token': log['address']
                    })
        
        transaction_data['transferEvents'] = transfer_events
        
        return jsonify(transaction_data)
        
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/api/trace/<address_or_tx>', methods=['GET'])
def trace_transaction(address_or_tx):
    try:
        if address_or_tx.startswith('0x') and len(address_or_tx) == 66:
            tx_hash = address_or_tx
            tx = web3.eth.get_transaction(tx_hash)
            input_address = tx['from']
        else:
            input_address = address_or_tx
            tx_hash = None
        
        transactions = []
        
        if tx_hash:
            tx = web3.eth.get_transaction(tx_hash)
            receipt = web3.eth.get_transaction_receipt(tx_hash)
            block = web3.eth.get_block(tx['blockNumber'])
            
            is_to_contract = is_contract(tx['to']) if tx['to'] else False
            value_eth = web3.from_wei(tx['value'], 'ether')
            risk_score = calculate_risk_score(tx, receipt, is_to_contract, False)
            
            metadata = [
                {'key': 'Gas Limit', 'value': str(tx['gas'])},
                {'key': 'Gas Price', 'value': f"{web3.from_wei(tx['gasPrice'], 'gwei')} Gwei"},
                {'key': 'Nonce', 'value': str(tx['nonce'])},
                {'key': 'Block', 'value': str(tx['blockNumber'])},
                {'key': 'Gas Used', 'value': f"{receipt['gasUsed']:,}"}
            ]
            
            transaction = {
                'id': 'tx-1',
                'hash': tx_hash,
                'address': tx['to'] if tx['to'] else 'Contract Creation',
                'addressType': 'contract' if is_to_contract else 'wallet',
                'status': 'confirmed' if receipt['status'] == 1 else 'failed',
                'amount': float(value_eth),
                'currency': 'ETH',
                'usdValue': 0,
                'timestamp': format_timestamp(block['timestamp']),
                'chain': 'ethereum',
                'from': tx['from'],
                'to': tx['to'] if tx['to'] else 'Contract Creation',
                'riskScore': risk_score,
                'metadata': metadata
            }
            
            transactions.append(transaction)
            final_recipient = tx['to'] if tx['to'] else tx['from']
            start_time = format_timestamp(block['timestamp'])
            end_time = start_time
        else:
            final_recipient = input_address
            start_time = format_timestamp(int(datetime.now().timestamp()))
            end_time = start_time
        
        chain_data = {
            'id': f'chain-{address_or_tx[:10]}',
            'inputAddress': input_address,
            'startTime': start_time,
            'endTime': end_time,
            'finalRecipient': final_recipient,
            'transactions': transactions
        }
        
        return jsonify(chain_data)
        
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/api/balance/<address>', methods=['GET'])
def get_balance(address):
    try:
        balance = web3.eth.get_balance(address)
        eth_balance = web3.from_wei(balance, 'ether')
        return jsonify({
            'address': address,
            'balance': float(eth_balance),
            'currency': 'ETH'
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    port = int(os.getenv('PORT', 3000))
    app.run(host='127.0.0.1', port=port, debug=True)
