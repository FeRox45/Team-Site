const answersData = {
    // Your data here
    question1: "Answer1",
    question2: "Answer2",
    // ...
};

function post_answers(id) {
    fetch(`/end-test/${id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ answers: answersData }),
    });
}
