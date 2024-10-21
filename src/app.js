const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// Routes
const routes = require('./routes');
app.use('/', routes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});