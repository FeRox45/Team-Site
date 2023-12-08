import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

URL = 'https://site-e8af0-default-rtdb.europe-west1.firebasedatabase.app/'

cred = credentials.Certificate("key.json")
firebase_admin.initialize_app(cred)

# Get a database reference to our posts
ref = db.reference("/", url=URL)

# Read the data at the posts reference (this is a blocking operation)

# ref.set({
#     '0': {
#         'title': 'Test1',
#         'question': {'question1': 'test1',
#                      'question2': 'test2',},
#         'answers': {'question1': {'wrong': 'Answer1', 'true1': 'Answer2', 'true2': 'Answer2'}, 'question2': {'wrong': 'Answer1', 'wrong': 'Answer2', 'true2': 'Answer2'}},
#     },
#     '1': {
#         'title': 'Test2',
#         'question': {'question1': 'test1',},
#         'answers': {'quetion1': {'wrong': 'Answer1', 'wrong2': 'Answer2', 'true': 'Answer2'}},
#     },
# })


# data = ref.get()

# with open('file.txt', 'w') as file:
#     # Iterate through the data
#     for item in data:
#         title = item.get('title', '')
#         file.write(f"Title: {title}\n")

#         questions = item.get('question', {})
#         for question_key, question_value in questions.items():
#             file.write(f"{question_key}: {question_value}\n")

#         answers = item.get('answers', {})
#         for answer_key, answer_value in answers.items():
#             for sub_key, sub_value in answer_value.items():
#                 answer_bool = re.sub('\d', '', sub_key)
#                 file.write(f"{answer_bool}: {sub_value}\n")
#         file.write('\n \n')
