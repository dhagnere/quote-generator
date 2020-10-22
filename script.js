const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

//creating an array to receive response from apiUrl 
let apiQuotes = [];

//Show Loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
function complete() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

//show individual quote from array apiQuotes
function newQuote() {
    //pick a random quote from array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
   //Check if author field is blank and replace  by "unknown"
    if (!quote.author) {
        authorText.textContent = "Inconnu";
    } else {
        authorText.textContent = quote.author;
    }
    if (quote.text.lenght > 50) {
        //if text is too long we add a css class 'long-quote' 
        quoteText.classList.add('long-quote');
    } else {
        //else remove the css class
        quoteText.classList.remove('long-quote');
    }
      quoteText.textContent = quote.text;  
}

// Get Quote From API
async function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
        complete();
    } catch (error) {
        getQuotes();
    }
}

//Tweet Quote functionality
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

//Event Listeners for quotes and tweet
newQuoteBtn.addEventListener('click', getQuotes);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuotes();

