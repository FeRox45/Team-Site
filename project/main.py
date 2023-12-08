from flask import Flask, render_template, Response
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

URL = 'https://site-e8af0-default-rtdb.europe-west1.firebasedatabase.app/'

cred = credentials.Certificate("key.json")
firebase_admin.initialize_app(cred)

# Get a database reference to our posts
ref = db.reference("/", url=URL)

app = Flask(__name__, static_folder='static',
            template_folder='templates')

@app.route("/", methods=['GET'])
def hello_world():
    return render_template('main/index.html', name='main')

# @app.route('/test/', methods=['GET'], endpoint='all_tax_get')
# def all_test():
#     datas = {'test1': 'Тест 1',
#              'test2': 'Тест 2'
#              }
#     response = render_template('test/test_index.html', name='test', data=datas)
#     return response

@app.route('/all_test', methods=['GET'])
def show_test():
    datas = ref.get()
    return datas

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)
