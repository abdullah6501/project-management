const connection = require('../dbconfig/db');
const log4js = require('log4js');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const logger = log4js.getLogger('control');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = './uploads';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

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
  try {
    const projectName = req.body.projectName;
    const file = req.file;

    if (!projectName || !file) {
      logger.error('Project name or file missing');
      return res.status(400).json({ error: 'Project name or file missing' });
    }

    const fileName = file.filename;
    const filePath = path.join('uploads', fileName);

    logger.info('Project Name:', projectName);
    logger.info('File Name:', fileName);
    logger.info('File Path:', filePath);

    const fileType = path.extname(fileName).substring(1); // Determine the file type based on the extension
    const sql = 'INSERT INTO projects (project_name, file_path, file_name, file_type) VALUES (?, ?, ?, ?)';
    connection.query(sql, [projectName, filePath, fileName, fileType], (err, result) => {
      if (err) {
        logger.error('Error uploading file:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      logger.info('File uploaded successfully');
      res.status(200).json({ message: 'File uploaded successfully' });
    });
  } catch (error) {
    logger.error('Unexpected error during file upload:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getProjectFiles = (req, res, next) => {
  const projectName = req.params.projectName;

  const sql = 'SELECT file_name, file_path, file_type FROM projects WHERE project_name = ?';
  connection.query(sql, [projectName], (err, results) => {
    if (err) {
      logger.error('Error fetching project files:', err);
      return next(err);
    }

    const projectFiles = results.map(result => ({
      file_name: result.file_name,
      file_path: result.file_path,
      file_type: result.file_type
    }));
    res.status(200).json(projectFiles);
  });
};

module.exports = { storeData, getProjects, uploadFile, upload, getProjectFiles };
