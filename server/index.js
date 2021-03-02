const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const templatesDir = path.join(__dirname, 'templates');
const emailsDir = path.join(__dirname, 'emails');

const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(cors());

app.get('/templates', (req, res) => {
  const templateNames = fs.readdirSync(templatesDir);
  const templatesData = templateNames.map(templateName => ({
    name: templateName.split('.')[0],
    ...JSON.parse(fs.readFileSync(path.join(templatesDir, templateName))),
  }))
  return res.json(templatesData);
});

app.get('/emails', (req, res) => {
  const emailNames = fs.readdirSync(emailsDir);
  const emailsData = emailNames.map(emailName => ({
    name: emailName.split('.')[0].split('_')[0],
    ...JSON.parse(fs.readFileSync(path.join(emailsDir, emailName))),
  }))
  return res.json(emailsData);
});

app.post('/emails', (req, res) => {
  const { name, thumbnail, data, images } = req.body;
  const fileData = { thumbnail, data, images };
  const file = fs.writeFileSync(
    `${emailsDir}/${name}_${Date.now()}.json`, JSON.stringify(fileData),
  );
  return res.status(200).send('ok');
});

app.listen(port);
console.log('App is listening on port ' + port);