var api_key = 'key-2ab74683afc2e01ab2814713eae4ffba';
var domain = 'sandbox42c1e3c129af4a5993f997970ef60e2c.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
Parse.Cloud.define('hello', function(req, res) {

});

Parse.Cloud.define('submitJobRequest', function(request, response){
  var params = request.params;
  if (params.email != null && params.firstName != null && params.lastName != null) {
      var data = {
      from: 'Test User <test@sample.mailgun.org>',
      to: request.params.email,
      subject: 'Hello Test Heroku',
      text: request
    };
    mailgun.messages().send(data, function(error, body){
      console.log(body);
      if (error == null) {
        response.success("Sent Message");
      } else {
        response.error(error);
      }
    });
  } else {
    response.error("required parameters not sent");
  }
});