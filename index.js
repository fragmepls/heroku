const express = require('express');
const cors = require('cors');

const MarkerController = require('./app/controllers/MarkerController');

const app = express();
let port = process.env.PORT;
if (port == null || port === "") {
    port = 8000;
}

app.use(express.urlencoded({extended: false}));

app.use(cors());

app.get('/api/markers', async (req, res) => {
    const markerController = new MarkerController();
    await markerController.fetchData();
    res.json(markerController.getJsonData());
});

app.listen(port, () => {
    console.log(`Server started at: http://localhost:${port}`);
});