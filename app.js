// const express = require('express');
// const app = express();
// const port = 3000;

// app.use(express.static('public')); // Serve static files from "public"
// app.use(express.json()); // Parse JSON requests
// // app.use(express.static(__dirname)); // Serve static files from root

// app.listen(port, () => {
//   console.log(`Ohanz Server listening on port ${port}`);
// });

// app.get('/', (req, res) => {
//     res.send('Welcome to Quotes App!');
//   });

//   app.get('/quotes', (req, res) => {
//     fs.readFile(quotesFilePath, (err, data) => {
//       if (err) {
//         res.status(500).send({ message: 'Error reading quotes.json' });
//       } else {
//         res.json(JSON.parse(data));
//       }
//     });
//   });

// const fs = require('fs');
// const quotesFilePath = '/quotes.json';

// app.put('/quotes', (req, res) => {
//   const newQuote = req.body;
//   fs.readFile(quotesFilePath, (err, data) => {
//     if (err) {
//       res.status(500).send({ message: 'Error reading quotes.json' });
//     } else {
//       const quotes = JSON.parse(data);
//       quotes.push(newQuote);
//       fs.writeFile(quotesFilePath, JSON.stringify(quotes, null, 2), (err) => {
//         if (err) {
//           res.status(500).send({ message: 'Error writing quotes.json' });
//         } else {
//           res.send({ message: 'Quotes updated successfully' });
//         }
//       });
//     }
//   });
// });


const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Serve static files from public directory
app.use(express.static('public'));

// Parse JSON requests
app.use(bodyParser.json());

// const filePath = __dirname + '/quotes.json';
const filePath = __dirname + '/public/quotes.json';

// GET quotes
app.get('/quotes', (req, res) => {
  fs.readFile(filePath, (err, data) => {
    if (err && err.code === 'ENOENT') {
      fs.writeFile(filePath, '[]', (err) => {
        if (err) console.error(err);
      });
      res.json([]);
    } else if (err) {
      console.error(err);
      res.status(500).send({ message: 'Error reading quotes.json' });
    } else {
      try {
        const quotes = JSON.parse(data);
        res.json(quotes);
      } catch (err) {
        console.error('JSON parse error:', err);
      }
    }
  });
});

// PUT (add) quote
app.put('/quotes', (req, res) => {
  const newQuote = req.body;

  fs.readFile(filePath, (err, data) => {
    if (err && err.code === 'ENOENT') {
      fs.writeFile(filePath, JSON.stringify([newQuote], null, 2), (err) => {
        if (err) {
          console.error(err);
        } else {
          res.send({ message: 'Quote added successfully' });
        }
      });
    } else if (err) {
      console.error(err);
      res.status(500).send({ message: 'Error reading quotes.json' });
    } else {
      try {
        const quotes = JSON.parse(data);
        quotes.push(newQuote);
        fs.writeFile(filePath, JSON.stringify(quotes, null, 2), (err) => {
          if (err) {
            console.error(err);
            res.status(500).send({ message: 'Error writing quotes.json' });
          } else {
            res.send({ message: 'Quote added successfully' });
          }
        });
      } catch (err) {
        console.error('JSON parse error:', err);
      }
    }
  });
});

// DELETE quote
app.delete('/quotes/:id', (req, res) => {
//   const id = (link unavailable);

  fs.readFile(filePath, (err, data) => {
    if (err && err.code === 'ENOENT') {
      res.status(404).send({ message: 'No quotes found' });
    } else if (err) {
      console.error(err);
      res.status(500).send({ message: 'Error reading quotes.json' });
    } else {
      try {
        const quotes = JSON.parse(data);
        const updatedQuotes = quotes.filter((quote, index) => index !== parseInt(id));
        fs.writeFile(filePath, JSON.stringify(updatedQuotes, null, 2), (err) => {
          if (err) {
            console.error(err);
            res.status(500).send({ message: 'Error writing quotes.json' });
          } else {
            res.send({ message: 'Quote deleted successfully' });
          }
        });
      } catch (err) {
        console.error('JSON parse error:', err);
      }
    }
  });
});

// Root route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.htm');
});

// Start server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
