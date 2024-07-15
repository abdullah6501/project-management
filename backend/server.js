// const express = require('express');
// const bodyParser = require('body-parser');
// const { storeData } = require('./controller/control');
// const db = require('./dbconfig/db');
// const cors = require('cors');


// const app = express();
// const port = process.env.PORT || 3000;

// app.use(cors());

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// app.post('/text', storeData);

// app.listen(port, () => {
//     console.log(`Server running on http://localhost:${port}`);
// });





// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const log4js = require('log4js');
// const { storeData, getProjects, uploadFile, upload } = require('./controller/control');
// const db = require('./dbconfig/db');

// const app = express();
// const port = process.env.PORT || 3000;

// app.use(cors());

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// log4js.configure({
//     appenders: { file: { type: 'file', filename: 'logs/app.log' } },
//     categories: { default: { appenders: ['file'], level: 'info' } }
// });
// const logger = log4js.getLogger('server');
// app.use(log4js.connectLogger(logger, { level: 'auto' }));

// // Routes
// app.post('/text', storeData);

// app.get('/show', getProjects);

// app.post('/upload', upload.single('file'), uploadFile);

// app.use((err, req, res, next) => {
//     logger.error('Internal server error:', err);
//     res.status(500).json({ error: 'Internal server error' });
// });

// app.listen(port, () => {
//     logger.info(`Server running on http://localhost:${port}`);
//     console.log(`Server running on http://localhost:${port}`);
// });



const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const log4js = require('log4js');
const { storeData, getProjects, uploadFile, upload } = require('./controller/control');
const db = require('./dbconfig/db');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

log4js.configure({
    appenders: { file: { type: 'file', filename: 'logs/app.log' } },
    categories: { default: { appenders: ['file'], level: 'info' } }
});
const logger = log4js.getLogger('server');
app.use(log4js.connectLogger(logger, { level: 'auto' }));

// Routes
app.post('/text', storeData);
app.get('/show', getProjects);
app.post('/upload', upload.single('file'), uploadFile);

app.use((err, req, res, next) => {
    logger.error('Internal server error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

app.listen(port, () => {
    logger.info(`Server running on http://localhost:${port}`);
    console.log(`Server running on http://localhost:${port}`);
});
