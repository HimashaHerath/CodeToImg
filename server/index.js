const express = require('express');
const generateImageRoute = require('./routes/generateImage');
const app = express();
const port = 3000;

app.use(express.json());
app.use('/', generateImageRoute);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
