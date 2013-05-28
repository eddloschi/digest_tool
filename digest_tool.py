# -*- coding: utf-8 -*-
import hashlib
from flask import Flask, Response, abort, request

app = Flask(__name__)
try:
    app.config.from_envvar('FLASK_SETTINGS')
except RuntimeError:
    DEBUG = True
    SECRET_KEY = 'development'
    app.config.from_object(__name__)


@app.route('/hash/<algorithm>', methods=['POST'])
def hash_message(algorithm):
    try:
        h = hashlib.new(algorithm)
    except ValueError:
        abort(404)
    h.update(request.form['message'].encode('utf-8'))
    return Response(response=h.hexdigest(), mimetype='text/plain')

if __name__ == '__main__':
    app.run()
