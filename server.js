const express = require ('express');
const app = express();
const uaParser = require('ua-parser');
const port = process.env.PORT;

app.listen(port, () => console.log(`server running on port ${port}`));
app.use(express.static('public'))

const headerObj = {ipaddress: 1, language: "sometext", OSVersion: "winblows"};

app.get('/', (req, res) => {
  res.redirect('/api/whoami')
})

app.get('/api/whoami', (req, res) => {
  //set language
  let langString = req.headers['accept-language'];
  headerObj.language = langString.replace(/,.*/, '');
  //set OS version
  let uaStuff = uaParser.parseOS(req.headers['user-agent'])
  headerObj.OSVersion = uaStuff.toString();
  //set ip address
  headerObj.ipaddress = req.headers['x-forwarded-for'].replace(/,.*/, '')
  res.send(headerObj)
  }
  )