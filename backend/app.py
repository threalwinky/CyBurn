from flask import *
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
app.config["CORS_HEADERS"] = 'Content-Type'

@app.get('/')
def index():
    return 'Hello, World!'

app.run('0.0.0.0', 80, debug=True)