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

const connection = require('../dbconfig/db');
const log4js = require('log4js');

const logger = log4js.getLogger('control');

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

module.exports = { storeData, getProjects };
