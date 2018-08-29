'use strict';

require('dotenv').load();

const pg = require('pg');
const express = require('express');

const app = express();
const PORT = process.env.PORT;


const client = new pg.Client(process.env.DATABASE_URL);
client.connect()
  .then(() => console.log('connected to', process.env.DATABASE_URL));
// client.on('connect', () => console.log('connected to '));
client.on('error', err => console.error(err));

app.use(express.static('./public'));

app.set('view engine', 'ejs');

// API Routes
app.get('/', (request, response) => {
  response.send('home route');
});

app.get('/books', getBooks);

app.get('*', (request, response) => response.status(404).send('This route does not exist'));

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

// HELPER FUNCTIONS
function getBooks(request, response) {
  let SQL = 'SELECT * FROM books;';

  return client.query(SQL)
    .then(results => response.render('index', {results: results.rows}))
    .catch(error => response.render('pages/error', {error: error}));
}
