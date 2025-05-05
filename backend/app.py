from flask import *
from flask_cors import CORS
import os
app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['CORS_RESOURCES'] = {r"/*": {"origins": "*"}}

HOST = os.getenv('HOSTNAME', '0.0.0.0')
PORT = os.getenv('PORT', '3000')

@app.route('/')
def index():
    return "Hello, World!"

app.run(HOST, PORT, debug=True)