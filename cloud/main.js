
Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
});


Parse.Cloud.define('submitJob', function(request, response){
  console.log(request);
  response.success("Success");
});
