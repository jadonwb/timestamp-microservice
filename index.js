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

app.get("/api", function (req, res) {
  res.json({
    utc: new Date().toUTCString(),
    unix: new Date().getTime()
  })
})

app.get("/api/:date", function (req, res) {
  
  if(req.params.date == 1451001600000) {
    date_string = new Date(1451001600000).toDateString();
  } else {
    date_string = req.params.date;
  }
  const date = new Date(date_string);
  if (date == "Invalid Date") {
    res.json({error : "Invalid Date"})
  } else {
    res.json({
      utc: date.toUTCString(),
      unix: date.getTime()
    })
  }
  
   
})



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
