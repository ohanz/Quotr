
// // Get elements
// const quoteElement = document.getElementById('quote');
// const imageElement = document.getElementById('image');
// const prevButton = document.getElementById('prev');
// const nextButton = document.getElementById('next');

// // Load quotes from JSON
// fetch('quotes.json')
//   .then(response => response.json())
//   .then(data => {
//     const quotes = data;
//     let currentQuoteIndex = 0;

//     // Display initial quote
//     displayQuote(quotes[currentQuoteIndex]);

//     // Navigation event listeners
//     prevButton.addEventListener('click', () => {
//       currentQuoteIndex = (currentQuoteIndex - 1 + quotes.length) % quotes.length;
//       displayQuote(quotes[currentQuoteIndex]);
//     });

//     nextButton.addEventListener('click', () => {
//       currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
//       displayQuote(quotes[currentQuoteIndex]);
//     });

//     // Display quote function
//     function displayQuote(quote) {
//       quoteElement.textContent = `"${quote.quote}" - ${quote.author}`;
//       imageElement.src = `images/${quote.image}`;
//     }

//     // Cache quotes for 24 hours
//     const cachedQuotes = localStorage.getItem('quotes');
//     if (!cachedQuotes) {
//       localStorage.setItem('quotes', JSON.stringify(quotes));
//       localStorage.setItem('expires', Date.now() + 86400000); // 24 hours
//     }

//     // Random quote notification
//     let notificationInterval;

//     function scheduleNotification() {
//       const expires = localStorage.getItem('expires');
//       if (Date.now() > expires) {
//         const randomQuoteIndex = Math.floor(Math.random() * quotes.length);
//         displayQuote(quotes[randomQuoteIndex]);
//         localStorage.setItem('expires', Date.now() + 86400000); // 24 hours
//       }
//     }

//     function startNotificationInterval() {
//       clearInterval(notificationInterval);
//       notificationInterval = setInterval(scheduleNotification, 86400000); // 24 hours
//     }

//     scheduleNotification();
//     startNotificationInterval();
//     // schNotification();
//     // NotificationInterval();
//   })
//   .catch(error => console.error('Error loading quotes:', error));
// Get elements
const quoteElement = document.getElementById('quote');
const imageElement = document.getElementById('image');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const addQuoteButton = document.getElementById('add-quote');
const deleteQuoteButton = document.getElementById('delete-quote');
const quoteInput = document.getElementById('quote-input');
const authorInput = document.getElementById('author-input');
const imageInput = document.getElementById('image-input')

// Load quotes from JSON
// fetch('quotes.json')
//   .then(response => response.json())
//   .then(data => {
//     const quotes = data;
//     let currentQuoteIndex = 0;

//     // Display initial quote
//     displayQuote(quotes[currentQuoteIndex]);

//     // Navigation event listeners
//     prevButton.addEventListener('click', () => {
//       currentQuoteIndex = (currentQuoteIndex - 1 + quotes.length) % quotes.length;
//       displayQuote(quotes[currentQuoteIndex]);
//     });

//     nextButton.addEventListener('click', () => {
//       currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
//       displayQuote(quotes[currentQuoteIndex]);
//     });

//     // Display quote function
//     function displayQuote(quote) {
//       quoteElement.textContent = `"${quote.quote}" - ${quote.author}`;
//       imageElement.src = `images/${quote.image}`;
//     }

//     // Random quote notification
//     let notificationInterval;

//     function scheduleNotification() {
//       const randomQuoteIndex = Math.floor(Math.random() * quotes.length);
//       displayQuote(quotes[randomQuoteIndex]);
//     }

//     function startNotificationInterval() {
//       clearInterval(notificationInterval);
//       notificationInterval = setInterval(scheduleNotification, 86400000); // 24 hours
//     }

//     scheduleNotification();
//     startNotificationInterval();
//   })
//   .catch(error => console.error('Error loading quotes:', error));


// Load quotes from JSON, bypassing cache
fetch('quotes.json', { cache: 'no-cache' })
  .then(response => response.json())
  .then(data => {
    const quotes = data;
    let currentQuoteIndex = 0;

    // Store quotes in LocalStorage
    localStorage.setItem('quotes', JSON.stringify(quotes));

    // Display initial quote
    displayQuote(quotes[currentQuoteIndex]);

    // Navigation event listeners
    prevButton.addEventListener('click', () => {
      currentQuoteIndex = (currentQuoteIndex - 1 + quotes.length) % quotes.length;
      displayQuote(quotes[currentQuoteIndex]);
    });

    nextButton.addEventListener('click', () => {
      currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
      displayQuote(quotes[currentQuoteIndex]);
    });


     // Add quote event listener
     addQuoteButton.addEventListener('click', () => {
      const newQuote = {
        quote: quoteInput.value,
        author: authorInput.value,
        image: imageInput.value,
      };

      quotes.push(newQuote);
      localStorage.setItem('quotes', JSON.stringify(quotes));
      displayQuote(quotes[currentQuoteIndex]);
      quoteInput.value = '';
      authorInput.value = '';
      imageInput.value = '';
    });

    // Delete quote event listener
    deleteQuoteButton.addEventListener('click', () => {
      if (quotes.length > 1) {
        quotes.splice(currentQuoteIndex, 1);
        localStorage.setItem('quotes', JSON.stringify(quotes));
        currentQuoteIndex = (currentQuoteIndex - 1 + quotes.length) % quotes.length;
        displayQuote(quotes[currentQuoteIndex]);
      } else {
        alert('Cannot delete last quote!');
      }
    });

    // Display quote function
    function displayQuote(quote) {
      quoteElement.textContent = `"${quote.quote}" - ${quote.author}`;
      imageElement.src = `images/${quote.image}`;
    }

    // Show random quote as alert after 10 minutes
    setTimeout(() => {
      const storedQuotes = JSON.parse(localStorage.getItem('quotes'));
      const randomQuoteIndex = Math.floor(Math.random() * storedQuotes.length);
      const randomQuote = storedQuotes[randomQuoteIndex];
      alert(`"${randomQuote.quote}" - ${randomQuote.author}`);
    }, 100000); // 10 minutes (600000 ms)
  })
  .catch(error => console.error('Error loading quotes:', error));