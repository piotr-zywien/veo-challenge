require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const jsonFile = require('json-file-plus');
const path = require('path');
const fileName = path.join(process.cwd(), process.env.FILE_NAME);


const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get(
  '/veo/getIndex',
  (req, res) => {
    jsonFile(fileName, (err, file) => {
      if (err) return err;
      file.get('index').then(response => {
        res.json(response);
      });
    });
  }
);

app.get(
  '/veo/getNodes',
  (req, res) => {
    jsonFile(fileName, (err, file) => {
      if (err) return err;
      file.get('nodes').then(response => {
        res.json(response);
      });
    });
  }
);

app.get(
  '/veo/getTree',
  (req, res) => {
    jsonFile(fileName, (err, file) => {
      if (err) return err;
      file.get('tree').then(response => {
        res.json(response);
      });
    });
  }
);

app.post(
  '/veo/save',
  (req, res) => {
    const { body: {
      index,
      nodes,
      tree,
    } } = req;

    jsonFile(fileName, (err, file) => {
      if (err) return err;

      const setPromises = [];
      if (index) {
        setPromises.push(file.set({ index }));
      }
      if (nodes) {
        setPromises.push(file.set({ nodes }));
      }
      if (tree) {
        setPromises.push(file.set({ tree }));
      }

      Promise.all(setPromises).then(() => {
        file.save().then(() => {
           Promise.all([
             file.get('index'),
             file.get('nodes'),
             file.get('tree'),
           ]).then(([
             index,
             nodes,
             tree,
           ]) => {
             res.json({
               index,
               nodes,
               tree,
             });
           });
         });
        });
      });
  }
);

console.log(fileName);

app.listen(
  process.env.BACKEND_PORT,
  () => console.log(`Listening for CHALLENGE requests on port ${process.env.BACKEND_PORT}!`),
);
