from flask import Flask, render_template, Response, request
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

import json

URL = 'https://site-e8af0-default-rtdb.europe-west1.firebasedatabase.app/'

cred = credentials.Certificate("key.json")
firebase_admin.initialize_app(cred)

# Get a database reference to our posts
ref = db.reference("/", url=URL)

app = Flask(__name__, static_folder='static',
            template_folder='templates')

@app.route("/", methods=['GET'])
def main():
    return render_template('main/index.html', name='main')

@app.route('/quiz-results/<int:corrects_ans>/<int:wrong_ans>', methods=['GET'])
def end_quiz(corrects_ans, wrong_ans):
    data = {
        'corrects_ans':corrects_ans,
        'wrongs_ans': wrong_ans
    }
    return render_template('quiz/quiz_result.html', data=data)

@app.route('/complete-quiz/<int:quiz_id>', methods=['GET'])
def start_quiz(quiz_id):
    return render_template('quiz/quiz.html', name='quiz')

@app.route('/all_test', methods=['GET'])
def show_test():
    datas = ref.get()
    return datas

@app.route('/get-quiz/<int:test_id>', methods=['GET'])
def get_test(test_id):
    ref = db.reference(f"/{test_id}", url=URL)
    datas = ref.get()
    return datas

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)
