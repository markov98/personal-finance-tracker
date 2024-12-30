const app = require('./config/express')();

const port = require('./constants').port

// Start the server on port 3000
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
