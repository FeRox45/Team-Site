// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
    getDatabase,
    ref,
    update,
    get,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyDk0CfC2THqgm7nFhdtNXL_YXepSlpBkeY",
    authDomain: "site-e8af0.firebaseapp.com",
    databaseURL:
        "https://site-e8af0-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "site-e8af0",
    storageBucket: "site-e8af0.appspot.com",
    messagingSenderId: "276359374008",
    appId: "1:276359374008:web:dae59ca9dc907297a1004d",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const quizRef = ref(database, "quiz");

//TODO app
const button_add_question = document.querySelector(".add-new-question");
const container_questions = document.querySelector(".container-questions");
const end_creating_quiz = document.querySelector(".end-create-quiz");

let div_id = 0;
let question_num = 1;

end_creating_quiz.addEventListener("click", addQuestionToDB);
button_add_question.addEventListener("click", add_question);

function add_question() {
    const question = document.createElement("div");
    const input_question = document.createElement("input");
    const button_add_ans = document.createElement("div");
    const button_ans_text = document.createElement("h3");
    const text_question = document.createElement("h2");
    const container_btns_question = document.createElement("div");
    const btn_remove_question = document.createElement("div");
    const text_btn_remove_question = document.createElement("h3");

    text_question.innerText = `Питання ${question_num}`;
    text_question.id = "question_title";
    button_ans_text.innerText = "Додати ще 1 відповідь";
    text_btn_remove_question.innerText = "Видалити питання";
    input_question.placeholder = "Введіть питання";
    input_question.id = "question_input";
    button_add_ans.append(button_ans_text);
    button_add_ans.classList.add("button-add-ans");
    btn_remove_question.classList.add("button-rem-question");
    btn_remove_question.addEventListener("click", () => {
        removeQustion(question);
    });
    question.id = `question_${div_id}`; // Use a string for the ID
    question.classList.add("question");
    container_btns_question.classList.add("container_btns_question");
    btn_remove_question.append(text_btn_remove_question);
    container_btns_question.append(btn_remove_question, button_add_ans);
    question.append(text_question, input_question, container_btns_question);
    button_add_ans.addEventListener("click", () => addNewAnswer(question));
    container_questions.append(question);
    div_id++;
    question_num++;
    addNewAnswer(question);
}

function addNewAnswer(el) {
    const input_ans = document.createElement("input");
    const answer_container = document.createElement("div");
    const button_remove_ans = document.createElement("div");
    const button_ans_rem_text = document.createElement("h3");
    const input_right_ans = document.createElement("input");

    input_right_ans.type = "checkbox";
    input_right_ans.classList.add("input-right-ans");
    button_ans_rem_text.innerText = "Видалити відповідь";
    button_ans_rem_text.classList.add("remove-ans");
    input_ans.placeholder = "Введіть відповідь";
    input_ans.id = "answer";
    answer_container.classList.add("container_ans");
    button_remove_ans.addEventListener("click", () =>
        removeAns(answer_container)
    );
    button_remove_ans.classList.add("button-remove-ans");
    button_remove_ans.append(button_ans_rem_text);
    answer_container.append(input_ans, button_remove_ans, input_right_ans);
    el.append(answer_container);
}

function removeAns(element_ans) {
    element_ans.remove();
}

function removeQustion(element_question) {
    question_num--;
    div_id--;
    element_question.remove();
    const question_titles = document.querySelectorAll("#question_title");
    for (let i = 0; i <= question_num - 2; i++) {
        question_titles[i].innerText = `Питання ${i + 1}`;
    }
}

async function addQuestionToDB() {
    const title_quiz = document.querySelector(".quiz-title").value;
    const num = await get_num();
    const quizData = {
        [num]: {
            title: title_quiz,
            question: {},
            answers: {},
        },
    };

    for (let i = 0; i < div_id; i++) {
        const current_question = document.querySelector(
            `#question_${i} #question_input`
        );
        const answerInputs = document.querySelectorAll(
            `#question_${i} #answer`
        );
        const boolAns = document.querySelectorAll(
            `#question_${i} .input-right-ans`
        );

        const question = current_question.value;
        const answers = {};

        answerInputs.forEach((item, index) => {
            answers[`${boolAns[index].checked}${index + 1}`] = item.value;
        });

        quizData[num].question[`question${i + 1}`] = question;
        quizData[num].answers[`question${i + 1}`] = answers;
    }
    update(quizRef, quizData)
        .then(() => {
            console.log("New user data saved successfully!");
            window.location.href = "/";
        })
        .catch((error) => {
            console.error("Error saving new user data: ", error);
        });
    console.log(JSON.stringify(quizData, null, 2));
}

function get_num() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            get(quizRef)
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        const userData = snapshot.val();
                        const num_quiz = Object.keys(userData).length;
                        resolve(num_quiz);
                    } else {
                        resolve(0);
                    }
                })
                .catch((error) => {
                    reject(error);
                });
        }, 1000);
    });
}

// const newUser = {
//     username: "JohnDoe",
//     email: "johndoe@example.com",
// };

// update(quizRef, newUser)
//     .then(() => {
//         console.log("New user data saved successfully!");
//     })
//     .catch((error) => {
//         console.error("Error saving new user data: ", error);
//     });
