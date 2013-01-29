# -*- coding: utf-8 -*-
import hashlib
from flask import Flask, abort, request

# configuration
DEBUG = True
SECRET_KEY = 'development'

app = Flask(__name__)
app.config.from_object(__name__)
app.config.from_envvar('DIGESTTOOL_SETTINGS')


@app.route('/hash/<algorithm>', methods=['POST'])
def hash_message(algorithm):
    try:
        h = hashlib.new(algorithm)
    except ValueError:
        abort(404)
    h.update(request.form['message'].encode('utf-8'))
    return h.hexdigest()

if __name__ == '__main__':
    app.run()
