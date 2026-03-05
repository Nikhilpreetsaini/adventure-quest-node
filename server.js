/*
 * Simple Express server to host the Adventure Quest interactive story.
 *
 * The server serves static files from the `public` directory and
 * responds on port 3000 by default (or an environment-provided
 * `PORT`). To run the server, execute `npm install` and then
 * `npm start`. Once running, navigate to `http://localhost:3000` to
 * play the game.
 */

const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Fallback: send the index.html for any unknown route (useful for
// single-page applications)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Adventure Quest server listening on port ${PORT}`);
});
