const form = document.querySelector('form');
const resultsDisplay = document.querySelector('.results-display');

// const idea = document.querySelector('.idea');

let loadInterval;

function loadingDots(element) {
    element.textContent = '';

    loadInterval = setInterval(() => {
        if (element.textContent.length === 3) {
            element.textContent = '';
            return;
        }
        
        element.textContent += '.';
    }, 500)
}

//This function will be used to add each idea to the results div:
function resultStripe(idea) {
    return (
        `<div class="idea">${idea}</div>`
    )
}

async function handleSubmit(e) {
    e.preventDefault();

    const data = new FormData(form);

    const idea1 = data.get('idea-1');
    const idea2 = data.get('idea-2');

    form.reset();

    loadingDots(resultsDisplay);

    const response = await fetch('http://localhost:5035', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            idea1: idea1,
            idea2: idea2
             
        })
    })

    clearInterval(loadInterval);

    resultsDisplay.innerHTML = '';

    if (response.ok) {
        const data = await response.json();

        console.log(data);

        //Adding each response to the results display.
        data.data.forEach(idea => {
            resultsDisplay.innerHTML += resultStripe(idea);
        })
    }
}

form.addEventListener('submit', handleSubmit)