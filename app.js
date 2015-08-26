/*
 * 
  Slatter - a simple Slacker to Chatter/Salesforce passthrough NodeJS server
    
  The MIT License (MIT)

  Copyright (c) 2015  - Dave Hong

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
 *
 */

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var nforce = require('nforce');
var chatter = require('nforce-chatter')(nforce);
var config = require('./config');

// setup Oauth2 credentials utilizing nforce
var org = nforce.createConnection({
  clientId: config.salesforce.client_id,
  clientSecret: config.salesforce.client_secret,
  redirectUri: config.salesforce.redirect_uri,
  mode: 'single',
  environment: 'production',
  plugins: ['chatter']
});

org.authenticate({ username: config.salesforce.username, password: config.salesforce.password}, function(err, resp){
  // the oauth object was stored in the connection object
  if(!err) console.log('Cached Token: ' + org.oauth.access_token);
});

app.use(urlencodedParser);

app.post('/listen', function(request, response){
  // set the recordId that you want to post to in salesforce
  var postToItemId;

  //should have a valid body
  if(!request.body) {
    response.sendStatus(400);
  }

  //validate token
  if(request.body.token !== config.slacker.incoming_token) {
    response.sendStatus(401);
  }

  //send to chatter
  if(postToItemId) {
    org.chatter.postFeedItem({id: postToItemId, text: request.body.text}, function(err, resp) {
      if (!err) console.log("response from chatter:", resp);
      if (err) console.log("error from chatter:", err);
    });
  }
  
  response.sendStatus(200);
});

app.get('/oauth_callback', function(request, response){
  console.log(request.headers);
});


console.log("Starting slatter server on configured port");
app.listen(config.post);