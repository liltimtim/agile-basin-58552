var api_key = 'key-2ab74683afc2e01ab2814713eae4ffba';
var domain = 'sandbox42c1e3c129af4a5993f997970ef60e2c.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
Parse.Cloud.define('hello', function(req, res) {

});

Parse.Cloud.define('submitJobRequest', function(request, response){
  var params = request.params;
  if (params.requestId != null) {
    findRequestById(params.requestId).then(function(requestObject){
      console.log(requestObject);
      console.log(requestObject.get('email'));
      var data = {
        from: 'Test User <test@sample.mailgun.org>',
        to: "greg@kingstreetservices.com",
        subject: 'Hello Test Heroku',
        html: "<html>"+ requestObject.get('email') + " \n " + requestObject.get('fullName') + " \n" + requestObject.get('contactNumber') + " \n " + requestObject.get('address') + " " + requestObject.get('startDate') + " " + requestObject.get('projectName') + " " + requestObject.get('projectDescription') +"</html>"
    };
    mailgun.messages().send(data, function(error, body){
      console.log(body);
      if (error == null) {
        response.success("Sent Message");
      } else {
        response.error(error);
      }
    }); 
    });

    // findRequestById(params.requestId).then({
    //   response.success(requestObject);
    // }, function(error){
    //   response.error(error);
    // });
  } else {
    response.error("required parameters not sent");
  }

});

function findRequestById(id) {
  Parse.Cloud.useMasterKey();
  var promise = new Parse.Promise();
  var Request = Parse.Object.extend("Request");
  var request = new Request();
  var query = new Parse.Query(request);
  query.get(id, {
    success: function(requestObject) {
      promise.resolve(requestObject);
    },
    error: function(error) {
      promise.reject(error);
    }
  });
  return promise;
}