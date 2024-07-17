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
//   const projectName = req.body.projectName;
//   const file = req.file;

//   if (!projectName || !file) {
//     logger.error('Project name or file missing');
//     return res.status(400).json({ error: 'Project name or file missing' });
//   }

//   const fileName = file.originalname;

//   logger.info('Project Name:', projectName);
//   logger.info('File Name:', fileName);

//   const sql = 'INSERT INTO projects (project_name, files, file_name) VALUES (?, ?, ?)';
//   connection.query(sql, [projectName, file.buffer, fileName], (err, result) => {
//     if (err) {
//       logger.error('Error uploading file:', err);
//       return res.status(500).json({ error: 'Internal server error' });
//     }

//     logger.info('File uploaded successfully');
//     res.status(200).json({ message: 'File uploaded successfully' });
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

  const fileName = file.originalname;

  logger.info('Project Name:', projectName);
  logger.info('File Name:', fileName);

  const sql = 'INSERT INTO projects (project_name, files, file_name) VALUES (?, ?, ?)';
  connection.query(sql, [projectName, file.buffer, fileName], (err, result) => {
    if (err) {
      logger.error('Error uploading file:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    logger.info('File uploaded successfully');
    res.status(200).json({ message: 'File uploaded successfully' });
  });
};

// const getProjectFiles = (req, res, next) => {
//   const projectName = req.params.projectName;

//   const sql = 'SELECT file_name, files FROM projects WHERE project_name = ?';
//   connection.query(sql, [projectName], (err, results) => {
//     if (err) {
//       logger.error('Error fetching project files:', err);
//       return next(err);
//     }

//     const projectFiles = results.map(result => ({
//       file_name: result.file_name,
//       files: `data:application/octet-stream;base64,${result.files.toString('base64')}`
//     }));
//     res.status(200).json(projectFiles);
//   });
// };
const getProjectFiles = (req, res, next) => {
  const projectName = req.params.projectName;

  const sql = 'SELECT file_name, files FROM projects WHERE project_name = ?';
  connection.query(sql, [projectName], (err, results) => {
    if (err) {
      logger.error('Error fetching project files:', err);
      return next(err);
    }

    const projectFiles = results.map(result => ({
      file_name: result.file_name,
      file_url: `data:application/octet-stream;base64,${result.files.toString('base64')}`
    }));
    res.status(200).json(projectFiles);
  });
};


module.exports = { storeData, getProjects, uploadFile, upload, getProjectFiles };
