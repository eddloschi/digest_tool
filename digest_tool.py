import hashlib
from flask import Flask, abort, request

# configuration
DEBUG = True
SECRET_KEY = '4bf5efc0-dc19-4128-b040-d74c77bc1b31'

app = Flask(__name__)
app.config.from_object(__name__)


@app.route('/hash/<algorithm>', methods=['POST'])
def hash_message(algorithm):
    try:
        h = hashlib.new(algorithm)
    except ValueError:
        abort(404)
    h.update(request.form['message'])
    return h.hexdigest()

if __name__ == '__main__':
    app.run()
