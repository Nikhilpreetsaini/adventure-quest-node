# Adventure\u00a0Quest (Node.js edition)

This project is a Node.js version of the **Adventure\u00a0Quest** interactive story.  It uses a simple Express server to serve a
browser\u2011based choose\u2011your\u2011own\u2011adventure game.

## Quick start

1. Install dependencies:

   ```sh
   npm install
   ```

2. Start the server:

   ```sh
   npm start
   ```

   By default the server listens on port\u00a03000.  You can override the port by
   setting the `PORT` environment variable.

3. Open your browser and navigate to `http://localhost:3000` to play the game.

## Project structure

- `server.js` \u2013 Entry point that configures and starts the Express server.
- `package.json` \u2013 Defines the project metadata and dependencies.
- `public/` \u2013 Contains the front\u2011end of the interactive story:
  - `index.html` \u2013 HTML layout for the game
  - `style.css` \u2013 Stylesheet for the UI
  - `script.js` \u2013 Story engine in JavaScript

## About the game

The game presents a branching narrative in which your choices determine the
outcome.  It\u2019s easy to expand by adding new nodes to the story object in
`script.js`.  When a node doesn\u2019t define any choices, it is treated as an
ending and a **Restart** button is displayed.
