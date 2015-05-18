var HttpClient  = require('go-fetch');
var contentType = require('go-fetch-content-type');
var parseBody   = require('go-fetch-parse-body');
var parse       = require('./parse');

/**
 * A client for the PayPal NVP API
 * @constructor
 * @param   {string}    [username]
 * @param   {string}    [password]
 * @param   {string}    [signature]
 * @param   {boolean}   [sandbox]
 */
function Client(username, password, signature, sandbox) {

  if (!(this instanceof Client)) {
    return new Client(username, password, signature, sandbox);
  }

  this.username   = username;
  this.password   = password;
  this.signature  = signature;
  this.sandbox    = sandbox == true;
  this.client     = HttpClient()
    .use(contentType)
    .use(parseBody.urlencoded({types: ['text/plain']}))
  ;

}

//https://developer.Client.com/docs/classic/release-notes/
Client.VERSION      = '122';
Client.URL_LIVE     = 'https://api-3t.paypal.com/nvp';
Client.URL_SANDBOX  = 'https://api.sandbox.paypal.com/nvp';

Client.Request      = require('./Request');

/**
 * Create a request URL
 * @param   {Request}   request
 * @returns {Url}
 */
Client.prototype.url = function(request) {
  var url;

  if (this.sandbox) {
    url = Client.URL_SANDBOX;
  } else {
    url = Client.URL_LIVE;
  }

  var uri = new HttpClient.Url(url);
  uri.setQuery(request.params());

  return uri;
};

/**
 * Send a request
 * @param   {Request}   request
 * @returns {Client}
 */
Client.prototype.send = function(request, callback) {
  this.client.get(this.url(request).toString(), function(err, res) {
    if (err) return callback(err);

    var parsed = parse(res.getBody());
    if (parsed.ACK === 'Failure' || parsed.ACK === 'Error') {
      var error = new Error(parsed.ACK+': '+parsed[0].LONGMESSAGE);
      error.response = parsed;
      callback(error);
    } else {
      callback(null, parsed);
    }

  });
  return this;
};

/**
 * Execute an operation
 * @param   {string}                  method
 * @param   {Object}                  [params]
 * @param   {function(Error, Object}  callback
 * @returns {Client}
 */
Client.prototype.exec = function(method, params, callback) {

  if (arguments.length === 2) {
    callback  = params;
    params    = {};
  }

  var request = new Client.Request();
  request
    .version(Client.VERSION)
    .method(method)
    .params(params)
    .auth(this.username, this.password, this.signature)
  ;

  return this.send(request, callback);
};

module.exports = Client;