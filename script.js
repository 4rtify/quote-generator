// Get Chuck quote as
const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const quoteWrapper = document.getElementById("quote-content-wrapper");
const twitterBtn = document.getElementById("twitter");
const newQuotebtn = document.getElementById("new-quote");
const loader = document.getElementById("lds-default");
const loaderChildren = loader.children;

// Show Loading
const loading = () => {
  const length = loader.children.length;
  for( let e = 0; e < length; e++) {
    let element = loader.children[e];
    element.hidden = false;
  }
  quoteWrapper.hidden = true;
}

// Hide Loading 
const doneLoading = () => {
  for( let e = 0; e < loaderChildren.length; e++) {
    let element = loaderChildren[e];
    element.hidden = true;
  }
  quoteWrapper.hidden = false;
}

// Sets the updated quote
const setQuote = (quote) => {
  quoteText.textContent = quote;
  quote.length > 140
    ? quoteText.classList.add("long-quote")
    : quoteText.classList.remove("long-quote");
};

//get Quote
const getQuote = async () => {
  //Quote Api
  loading();
  const url = "https://api.chucknorris.io/jokes/random";
  try {
    const res = await fetch(url);
    const quote = await res.json();
    //Sets the quote with the text value
    setQuote(quote.value);
    doneLoading();
  } catch (error) {
    console.log(error.message);
  }
};

// Tweet a quote
const tweetQuote = () => {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - Chuck Norris`;
  window.open(twitterUrl, '_blank');
}

//Event Listener 
newQuotebtn.addEventListener('click', getQuote)
twitterBtn.addEventListener('click', tweetQuote)


// ON load
getQuote(setQuote);
