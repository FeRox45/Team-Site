const all_quiz = document.querySelector(".all_quiz");

fetch("/all_test")
    .then((response) => response.json())
    .then((data) => {
        let numCallbackRuns = 0;
        // Тут ви можете вивести дані в консоль або використати їх інакше
        data.forEach((item) => {
            const quiz = document.createElement("div");
            const title = document.createElement("h1");

            quiz.classList.add("button_quiz");
            title.classList.add("button_text_quiz");

            title.innerText = `Quiz ${numCallbackRuns + 1}`;
            quiz.append(title);
            all_quiz.append(quiz);
            numCallbackRuns++;

            // console.log(`Title: ${item.title}`);

            // for (const [questionKey, questionValue] of Object.entries(
            //     item.question
            // )) {
            //     console.log(`${questionKey}: ${questionValue}`);
            // }

            // for (const [answerKey, answerValue] of Object.entries(
            //     item.answers
            // )) {
            //     for (const [subKey, subValue] of Object.entries(answerValue)) {
            //         const answerBool = subKey.replace(/\d/g, "");
            //         console.log(`${answerBool}: ${subValue}`);
            //     }
            // }

            // console.log("\n");
        });
    })
    .catch((error) => console.error("Error:", error));
