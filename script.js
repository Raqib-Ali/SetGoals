let checkbox = document.querySelectorAll(".checkbox");
let inputs = document.querySelectorAll("input");
let quote = document.querySelector(".quote-1");
let warning = document.querySelector(".error");
let progress = document.querySelector(".progress-value");
let progressText = document.querySelector('.progress-text')

warning.style.display = "none";
let progressValue = 0;

let taskdata = JSON.parse(localStorage.getItem('taskdata')) || {}

checkbox.forEach((element) => {

    element.addEventListener('click', () => {
        const isGoalsFilled = [...inputs].every((input) => {
            return input.value
        })

        if (isGoalsFilled) {
            element.addEventListener('click', () => {
                taskdata[element.nextElementSibling.id].completed = !(taskdata[element.nextElementSibling.id].completed)
                localStorage.setItem('taskdata', JSON.stringify(taskdata));
                element.classList.toggle("checked")
                element.nextElementSibling.classList.toggle("strike");

                if (taskdata[element.nextElementSibling.id].completed) {
                    progressValue++
                } else {
                    progressValue--
                }

                if (taskdata[element.nextElementSibling.id].completed) {
                    element.nextElementSibling.disabled = true
                } else {
                    element.nextElementSibling.disabled = false
                }

                updatingProgressBar();

            })
        } else {
            warning.style.display = 'block';
        }
    })



})


inputs.forEach((input) => {

    //initializing goals on start
    if (taskdata.first) {

        input.value = taskdata[input.id].name

        if (taskdata[input.id].completed) {
            input.classList.add("strike")
            input.previousElementSibling.classList.add("checked")
            progressValue++;
        }
    }

    updatingProgressBar();


    input.addEventListener("input", handleInput);

    input.addEventListener("focus", () => {
        warning.style.display = "none"
    });

    if (taskdata[input.id].completed) {
        input.disabled = true
    } else {
        input.disabled = false
    }

})

function handleInput(e) {

    taskdata[e.target.id] = {
        name: e.target.value,
        completed: false
    };

    localStorage.setItem('taskdata', JSON.stringify(taskdata));
}


function updatingProgressBar() {

    if (progressValue == 0) {
        progress.classList.add("progress-block");
        quote.innerText = 'Raise the bar by completing your goals!'
    } else if (progressValue == 2) {
        quote.innerText = 'Just a step away, keep going! 🏋️'
    } else if (progressValue == 3) {
        quote.innerText = 'Well done 🥳'
    } else {
        progress.classList.remove('progress-block');
    }

    progress.style.width = `${(progressValue / 3) * 100}%`
    progressText.innerHTML = `${progressValue}/3 completed`;

}

updatingProgressBar();





