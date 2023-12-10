const answers_container = document.querySelector(".answers");
const quiz_title = document.querySelector("#title");
const count = document.querySelector("#count");
const question = document.querySelector(".question h2");
const url_get_quiz = "get-quiz";
const quizId = window.location.pathname.split("/")[2];
let question_num = 1;
let max_question = 0;
let answers = [];

async function setQuestion(number) {
    const test = await getQuiz();
    quiz_title.innerText = test.title;

    if (number == undefined) {
        question_num = 1;
    }
    count.innerHTML = `${question_num}/${max_question}`;
    question.innerHTML = test.question[`question${question_num}`];
    const answers = test.answers[`question${question_num}`];
    for (const key in answers) {
        const container_answer = document.createElement("div");
        const text_answer = document.createElement("h3");
        container_answer.classList.add("question");
        text_answer.innerText = answers[key];
        container_answer.append(text_answer);
        answers_container.append(container_answer);
        container_answer.addEventListener("click", () => {
            next_question(key);
        });
    }
}

const getQuiz = async () => {
    const response = await fetch(`/${url_get_quiz}/${quizId}`, {});
    const quiz = await response.json();
    max_question = Object.keys(quiz.question).length;
    return quiz;
};

function next_question(value) {
    if (question_num == max_question) {
        answers.push(value.replace(/\d/g, ""));
        answers_container.innerHTML = "";
        let corrects_ans = 0;
        let wrong_ans = 0;
        answers.forEach((value) => {
            value === "true" ? corrects_ans++ : wrong_ans++;
        });
        window.location.href = `/quiz-results/${corrects_ans}/${wrong_ans}`;
    } else {
        question_num++;
        answers.push(value.replace(/\d/g, ""));
        answers_container.innerHTML = "";
        setQuestion(question_num);
    }
}
setQuestion();
