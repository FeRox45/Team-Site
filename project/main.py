from flask import Flask, render_template, request, redirect
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

URL = 'https://site-e8af0-default-rtdb.europe-west1.firebasedatabase.app/'

cred = credentials.Certificate("key.json")
firebase_admin.initialize_app(cred)

# Get a database reference to our posts
ref = db.reference("/quiz", url=URL)

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
    ref = db.reference(f"/quiz/{test_id}", url=URL)
    datas = ref.get()
    return datas

@app.route('/profile', methods=['GET'])
def show_profile():
    return render_template('profile/profile.html')

@app.route('/profile/<string:profile_uid>', methods=['POST'])
def get_profile(profile_uid):
    ref = db.reference(f"/profiles/{profile_uid}", url=URL)
    datas = ref.get()
    return datas

@app.route('/add-quiz', methods=['GET'])
def add_quiz():
    return render_template('quiz/add-quiz.html')

@app.route('/auth', methods=['GET'])
def auth():
    return redirect('/auth/register')

@app.route('/auth/register', methods=['GET'])
def register():
    return render_template('auth/register.html')

@app.route('/auth/login', methods=['GET'])
def login():
    return render_template('auth/login.html')



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)
