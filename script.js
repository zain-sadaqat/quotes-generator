const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
    if(!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}


// Get Quote from API
async function getQuoteFromApi() {
    showLoadingSpinner();
    // const proxyUrl = 'https://cors-anywhere.com/herokuapp.com/'
    const proxyUrl = 'https://secret-ocean-49799.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(proxyUrl + apiUrl);   // response won't be set until it finishes fetching apiUrl
        const data = await response.json();     // data won't be set until it finishes json
        // If Author is Blank, add 'Unknown'
        if(data.quoteAuthor === '') {
            authorText.innerText = '~ Unknown'
        }
        else {  
            authorText.innerText = '~' + data.quoteAuthor;
        } 
        // Reduce Font size for Quotes longer than 100 characters
        if(data.quoteText.length > 120) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText;
        removeLoadingSpinner();
        
    }
    catch (error) {
        getQuoteFromApi();
        console.log('whoops, No Quote : ', error);
    }
}

// Twitter Function
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} ${author}`;
    window.open(twitterUrl, '_blank');
}

// Event Listener
newQuoteBtn.addEventListener('click', getQuoteFromApi);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuoteFromApi();
// loading();