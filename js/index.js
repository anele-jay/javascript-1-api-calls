const elephantUrl = "https://elephant-api.herokuapp.com/elephants";
const corsEnabledUrl = "https://noroffcors.herokuapp.com/" + elephantUrl;

// the function must be marked as async
async function fetchElephants() {
    try {
        // use await when calling fetch
        const response = await fetch(corsEnabledUrl);
        // use await when resolving this promise
        const elephants = await response.json();
        // pass the array of elephants to the displayElephants function
        displayElephants(elephants);
    } catch (error) {
        console.log(error);
    }
}

// call the fetchElephants function
fetchElephants();

function displayElephants(elephants) {
    const elephantContainer = document.querySelector(".elephant-container");

    let html = "";

    for (let i = 0; i < elephants.length; i++) {
        //some of the result objects have only id properties, nothing else
        // check if the object has a name property,
        // if it doesn't, skip the result of the code in this iteration of the loop and go to the next object
        if (!elephants[i].name) {
            // continue will skip the remaining code
            continue;
        }

        // the elephants[i].dod is the date of death of the elephant, but some elephants don't have a proper value
        // for some the value is -
        // create a default value for dateOfBirth
        // this variable will be used when creating the html, not elephants[i].dod
        let dateOfDeath = "Unkown";

        // if the elephant has a proper date of death value (not -), assign it to the dateOfDeath variable
        if (elephants[i].dod !== "-") {
            dateOfDeath = elephants[i].dod;
        }

        html += `<div>
                    <div class="image" style="background-image: url(${elephants[i].image});"></div>
                    <h3>${elephants[i].name}</h3>
                    <p>Date of birth: ${elephants[i].name}</p>                    
                    <p>Date of death: ${dateOfDeath}</p>
                    <a href="detail.html?name=${elephants[i].name}">Details</a>
                </div>`;
    }

    elephantContainer.innerHTML = html;
}
