from flask import Flask, render_template, request
import os
import subprocess
import urllib.parse
import html

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/run', methods=['GET'])
def run():
    url = request.args.get('url')
    if not url:
        return "No URL provided", 400
    # Here you would normally run your command
    content = subprocess.run(['curl', url], capture_output=True, text=True)
    print(type(content.stdout))
    # For demonstration, we will just return the output of the command
    # content = urllib.parse.unquote(content.stdout)
    return html.escape(content.stdout)

app.run(host="0.0.0.0", port=5000)