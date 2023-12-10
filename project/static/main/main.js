const all_quiz = document.querySelector(".all_quiz");
const url_complete_quiz = "complete-quiz";

fetch("/all_test")
    .then((response) => response.json())
    .then((data) => {
        let numCallbackRuns = 0;
        // Тут ви можете вивести дані в консоль або використати їх інакше
        data.forEach((item) => {
            const quiz = document.createElement("div");
            const title = document.createElement("h1");
            // Ading classes
            quiz.classList.add("button_quiz");
            title.classList.add("button_text_quiz");
            // Adding elements
            title.innerText = `Quiz ${numCallbackRuns + 1}`;
            quiz.id = numCallbackRuns;
            quiz.addEventListener("click", () => test_func(quiz.id));
            quiz.append(title);
            all_quiz.append(quiz);
            numCallbackRuns++;
        });
    })
    .catch((error) => console.error("Error:", error));

function test_func(id) {
    window.location.href = `/${url_complete_quiz}/${id}`;
}
