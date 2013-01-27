from flask import Flask, request, session, g, redirect, url_for, abort, render_template, flash

# configuration
DEBUG = True
SECRET_KEY = '4bf5efc0-dc19-4128-b040-d74c77bc1b31'

app = Flask(__name__)
app.config.from_object(__name__)

if __name__ == '__main__':
    app.run()
