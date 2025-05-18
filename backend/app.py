from flask import Flask, request, Response, jsonify
from functools import wraps
from flask_cors import CORS
import jwt
import pymongo
from flask_socketio import SocketIO
import os
import hashlib
import base64
import random
import subprocess
import json

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['CORS_RESOURCES'] = {r"/*": {"origins": "*"}}
app.config['SECRET_KEY'] = 'doyouloveme'
HOST = os.getenv('HOSTNAME', '0.0.0.0')
PORT = os.getenv('PORT', 5000)
socketio = SocketIO(app, cors_allowed_origins="*")


client = pymongo.MongoClient("mongodb://mongo:27017/")
db = client["client"]
users = db["users"]

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        try:
            token = request.cookies.get('jwt')
        except Exception as e:
            print(f"Error getting cookie: {e}")
            return {'error': 'Missing JWT'}, 401
        if not token:
            return jsonify({'message': 'Token is missing!'}), 401
        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
        except Exception as e:
            print(f"Error decoding JWT: {e}")
            return jsonify({'message': 'Invalid token!'}), 401
        return f(*args, **kwargs)
    return decorated

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/api')
def api():
    return {'message': 'Hello from the API!'}

@app.route('/register', methods=['POST'])
def register():
    username = None
    password = None
    try:
        data = request.get_json()
        username = data['username']
        password = data['password']
        name = 'guest' + str(random.randint(1, 1000000))
    except KeyError:
        return {'error': 'Missing username or password'}, 400
    encoded_jwt = jwt.encode({"username":username}, app.config['SECRET_KEY'], algorithm="HS256")
    print(f"Encoded JWT: {encoded_jwt}")
    if users.find_one({"username": username}):
        return {'error': 'User already exists'}, 201
    users.insert_one({"username": username, "password": password, "name": name})
    print(f"User {username} registered successfully.")
    resp = Response()
    resp.set_cookie('jwt', encoded_jwt, httponly=True)
    return resp

@app.route('/login', methods=['POST'])
def login():
    username = None
    password = None
    try:
        data = request.get_json()
        username = data['username']
        password = data['password']
    except KeyError:
        return {'error': 'Missing username or password'}, 400
    user = users.find_one({"username": username})
    if not user or user['password'] != password:
        return {'error': 'Invalid credentials'}, 201
    encoded_jwt = jwt.encode({"username": username}, app.config['SECRET_KEY'], algorithm="HS256")
    print(f"Encoded JWT: {encoded_jwt}")
    resp = Response()
    resp.set_cookie('jwt', encoded_jwt, httponly=True)
    return resp

@app.route('/logout', methods=['POST'])
def logout():
    resp = Response()
    resp.set_cookie('jwt', '', expires=0)
    return resp

@app.route('/check-credentials', methods=['POST'])
@token_required
def check_credentials():
    return "OK", 200

@app.route('/decoder', methods=['POST'])
def handle_ascii():
    data = None
    try:
        data = request.get_json()
        data = data['data']
    except KeyError:
        return {'error': 'Missing data'}, 400
    resp = {}
    resp['base64'] = base64.b64encode(data.encode()).decode()
    resp['base32'] = base64.b32encode(data.encode()).decode()
    resp['base16'] = base64.b16encode(data.encode()).decode()
    resp['md5'] = hashlib.md5(data.encode()).hexdigest()
    resp['sha1'] = hashlib.sha1(data.encode()).hexdigest()
    resp['sha256'] = hashlib.sha256(data.encode()).hexdigest()
    resp['sha512'] = hashlib.sha512(data.encode()).hexdigest()
    resp['sha3_256'] = hashlib.sha3_256(data.encode()).hexdigest()
    resp['hex'] = ' '.join(format(ord(i), '02x') for i in data)
    resp['ascii'] = data
    resp['bin'] = ''.join(format(ord(i), '08b') for i in data)
    resp['oct'] = ' '.join(format(ord(i), '03o') for i in data)
    resp['dec'] = ' '.join(str(ord(i)) for i in data)
    return resp

@socketio.on('connect')
def handle_connect():
    print('Client connected')
    socketio.emit('response', {'data': 'Connected'})

@socketio.on('message')
def handle_message(data):
    print(f"Received message: {data}")
    socketio.emit('message-response', {'data': {'message': data['message'], 'sender': data['sender']}})

@app.route('/scan', methods=['POST'])
def handle_scan():
    data = None
    url = None
    try:
        data = request.get_json()
        url = data['url']
    except KeyError:
        return {'error': 'Missing data'}, 400
    result = {
        '100': [],
        '200': [],
        '300': [],
        '400': [],
        '500': [],
    }
    with open('wordlists.txt', 'r') as f:
        lines = f.readlines()
        count = 0
        for line in lines:
            count += 1
            socketio.emit('scan-progress', {'data': {'progress': count / len(lines) * 100}})
            line = line.strip()
            if line:
                output = subprocess.run(['sh', 'scan.sh', url + '/' + line], capture_output=True, text=True)
                print(output.stdout)
                status_code = str(output.stdout).strip()
                status_code = int(status_code)//100*100
                status_code = str(status_code)
                # print(f"Status code: {status_code}")
                result[status_code].append(line)
    real_result = {}
    real_result['100-199'] = result['100']
    real_result['200-299'] = result['200']
    real_result['300-399'] = result['300']
    real_result['400-499'] = result['400']
    real_result['500-599'] = result['500']
    return real_result

received_requests = {}

@app.route('/webhook/<token>', methods=[
    'POST', 'GET', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD', 'TRACE', 'CONNECT',
    'COPY', 'LOCK', 'MKCOL', 'MOVE', 'PROPFIND', 'PROPPATCH', 'UNLOCK', 'REPORT',
    'VERSION-CONTROL', 'CHECKOUT', 'UNCHECKOUT', 'MERGE', 'SEARCH', 'NOTIFY',
    'SUBSCRIBE', 'UNSUBSCRIBE'
])
def webhook(token):
    data = {
        'full_url': request.url, 
        'headers': dict(request.headers),
        'method': request.method,
        'args': request.args.to_dict(),
        'form': request.form.to_dict(),
        'json': request.get_json(silent=True),
        'data': request.data.decode('utf-8'),
        'remote_addr': request.remote_addr
    }

    received_requests[token].append(data)  

    return "Nice try", 200


@app.route('/inspect/<token>', methods=['GET'])
def inspect(token):
    if token not in received_requests:
        received_requests[token] = []
    return jsonify(received_requests[token]), 200


@app.route('/getinfo', methods=['POST'])
@token_required
def getinfo():
    token = request.cookies.get('jwt')
    try:
        data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
        username = data['username']
        user = users.find_one({"username": username})
        if not user:
            return {'error': 'User not found'}, 404
        return jsonify({'username': user['username'], 'name': user['name']}), 200
    except Exception as e:
        print(f"Error getting user info: {e}")
        return {'error': 'Invalid token'}, 401

if __name__ == '__main__':
    socketio.run(app, debug=True, host=HOST, port=PORT, allow_unsafe_werkzeug=True)