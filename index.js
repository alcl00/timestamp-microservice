// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", function(req, res){
  console.log(req.params.date);
  if(req.params.date === undefined)
  {
    res.json({ unix: Date.now(), utc: new Date().toString()});
  }
  else
  {
    let unixRegex = /^\d+$/; //Regex for unix time format
    let dateToReturn;
    if(unixRegex.test(req.params.date))
    {
      dateToReturn = new Date(parseInt(req.params.date));
      if(dateToReturn.toString() === "Invalid Date"){
        res.json({ error: dateToReturn.toString() })
      }
      else{
        res.json({ unix: dateToReturn.getTime(), utc: dateToReturn.toUTCString() });
      }
    }
    else
    {
      dateToReturn = new Date(req.params.date);
      if(dateToReturn.toString() === "Invalid Date"){
      res.json({ error: dateToReturn.toString() })
      }
      else{
        res.json({ unix: dateToReturn.getTime(), utc: dateToReturn.toUTCString() });
      }
    }
    
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
