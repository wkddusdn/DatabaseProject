const express = require('express');
const app = express();
const boardRouter = require('./routes/board');

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', boardRouter);

const port = 3000;
app.listen(port, () => {
    console.log("Server running on http://localhost:" + port);
});
