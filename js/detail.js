// get the name paramater from the querystring
// get the query string
const queryString = document.location.search;
// get the parameters in the query string
const params = new URLSearchParams(queryString);

// get the name parameter from the querystring
const name = params.get("name");

// we can the see various API endpoints in the API docs https://elephant-api.herokuapp.com/

// add the name to the URL
const url = "https://elephant-api.herokuapp.com/elephants/name/" + name;
// add the CORS fix
const corsEnabledUrl = "https://noroffcors.herokuapp.com/" + url;

// we will do everything in one function this time
async function getElephantBYName() {
    // get the heading element
    // we will use this element to display the name if the call is successful
    // if the call is not successful we will display a message in this element
    const heading = document.querySelector("h2");

    // try to make the API call
    try {
        const response = await fetch(corsEnabledUrl);
        const details = await response.json();

        // always inspect the result of the API call
        console.log("details", details);

        // we will use the name, species and not properties from the return value

        // display the name
        heading.innerHTML = details.name;

        // get the species element and display the species value
        const species = document.querySelector(".species");
        species.innerHTML = "Species: " + details.species;

        // get the note element and display the note value
        const note = document.querySelector(".note");
        note.innerHTML = details.note;
    } catch (error) {
        // if there is an error indicate it in the heading element
        heading.innerHTML = "An error occured";
        console.log(error);
    } finally {
        // the finally block runs at the end, whether there was an error or not
        // hide the loading indicator
        const loading = document.querySelector(".loading");
        loading.style.display = "none";
    }
}

// call the function
getElephantBYName();
