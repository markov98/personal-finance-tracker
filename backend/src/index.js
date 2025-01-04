const app = require('./config/express')();
const db = require('./config/db')()
const PORT = require('./constants').PORT

// Start the server on port 3000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
