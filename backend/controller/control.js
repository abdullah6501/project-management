// const connection = require('../dbconfig/db');

// const storeData = (req, res) => {
//     const dataToStore = req.body.data;

//     const sql = 'INSERT INTO projectlist (projectlist) VALUES (?)';
//     connection.query(sql, [dataToStore], (err, result) => {
//         if (err) {
//             console.error('Error storing data:', err);
//             res.status(500).json({ error: 'Error storing data' });
//             return;
//         }

//         console.log('Data stored successfully');
//         res.status(200).json({ message: 'Data stored successfully' });
//     });
// };

// module.exports = { storeData };

// const connection = require('../dbconfig/db');
// const log4js = require('log4js');
// const multer = require('multer');

// const logger = log4js.getLogger('control');

// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// const storeData = (req, res, next) => {
//   const dataToStore = req.body.data;

//   const sql = 'INSERT INTO projectlist (projectlist) VALUES (?)';
//   connection.query(sql, [dataToStore], (err, result) => {
//     if (err) {
//       logger.error('Error storing data:', err);
//       return next(err);
//     }

//     logger.info('Data stored successfully');
//     res.status(200).json({ message: 'Data stored successfully' });
//   });
// };

// const getProjects = (req, res, next) => {
//   const sql = 'SELECT projectlist FROM projectlist';
//   connection.query(sql, (err, results) => {
//     if (err) {
//       logger.error('Error fetching projects:', err);
//       return next(err);
//     }

//     const projects = results.map(result => ({ projectlist: result.projectlist }));
//     res.status(200).json(projects);
//   });
// };

// const uploadFile = (req, res, next) => {
//   const projectId = req.body.projectId;
//   const file = req.file;

//   if (!projectId || !file) {
//       return res.status(400).send('No project ID or file uploaded');
//   }

//   const sql = 'INSERT INTO projects (project_name, file_name, file_data) VALUES (?, ?, ?)';
//   connection.query(sql, [projectId, file.originalname, file.buffer], (err, result) => {
//       if (err) {
//           logger.error('Error storing file:', err);
//           return next(err);
//       }

//       logger.info('File stored successfully');
//       res.status(200).json({ message: 'File stored successfully' });
//   });
// };

// module.exports = { storeData, getProjects, uploadFile, upload };


const connection = require('../dbconfig/db');
const log4js = require('log4js');
const multer = require('multer');

const logger = log4js.getLogger('control');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const storeData = (req, res, next) => {
  const dataToStore = req.body.data;

  const sql = 'INSERT INTO projectlist (projectlist) VALUES (?)';
  connection.query(sql, [dataToStore], (err, result) => {
    if (err) {
      logger.error('Error storing data:', err);
      return next(err);
    }

    logger.info('Data stored successfully');
    res.status(200).json({ message: 'Data stored successfully' });
  });
};

const getProjects = (req, res, next) => {
  const sql = 'SELECT projectlist FROM projectlist';
  connection.query(sql, (err, results) => {
    if (err) {
      logger.error('Error fetching projects:', err);
      return next(err);
    }

    const projects = results.map(result => ({ projectlist: result.projectlist }));
    res.status(200).json(projects);
  });
};

const uploadFile = (req, res, next) => {
  const projectName = req.body.projectName;
  const file = req.file;

  if (!projectName || !file) {
    logger.error('Project name or file missing');
    return res.status(400).json({ error: 'Project name or file missing' });
  }

  const sql = 'INSERT INTO projects (project_name, files) VALUES (?, ?)';
  connection.query(sql, [projectName, file.buffer], (err, result) => {
    if (err) {
      logger.error('Error uploading file:', err);
      return next(err);
    }

    logger.info('File uploaded successfully');
    res.status(200).json({ message: 'File uploaded successfully' });
  });
};

module.exports = { storeData, getProjects, uploadFile, upload };
