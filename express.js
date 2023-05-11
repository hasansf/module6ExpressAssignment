
const express = require('express');
const app = express();

app.use(express.json());

// Static HTML file route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Book collection route
let books = [];

// Get all books
app.get('/books', (req, res) => {
  res.json(books);
});

// Add a book to the collection
app.post('/books', (req, res) => {
  const { title, author, publishedDate } = req.body;

  if (!title || !author) {
    return res.status(400).json({ error: 'Title and author are required' });
  }

  const id = generateUniqueId(); // Implement your own unique ID generation logic

  const newBook = {
    id,
    title,
    author,
    publishedDate
  };

  books.push(newBook);

  res.status(201).json(newBook);
});

// Delete a book from the collection
app.delete('/books/:id', (req, res) => {
  const { id } = req.params;

  const bookIndex = books.findIndex(book => book.id === id);

  if (bookIndex === -1) {
    return res.status(404).json({ error: 'Book not found' });
  }

  books.splice(bookIndex, 1);

  res.json({ message: 'Book deleted successfully' });
});

// Helper function to generate a unique ID
function generateUniqueId() {
  // Implement your own unique ID generation logic here
  // You can use libraries like uuid or shortid for this purpose
  // For simplicity, we'll use a basic timestamp-based ID in this example
  return Date.now().toString();
}

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

