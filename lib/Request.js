
/**
 * A NVP request
 * @constructor
 * @param   {string}  [version]
 * @param   {string}  [method]
 */
function Request(version, method) {
  this._params = {};
  this
    .version(version)
    .method(method)
  ;
}

/**
 * Get or set the request version
 * @param   {string}  [version]
 * @returns {string|Request}
 */
Request.prototype.version = function(version) {
  if (arguments.length) {
    return this.param('VERSION', version);
  } else {
    return this.param('VERSION');
  }
};

/**
 * Get or set the request method
 * @param   {string}  [method]
 * @returns {string|Request}
 */
Request.prototype.method = function(method) {
  if (arguments.length) {
    return this.param('METHOD', method);
  } else {
    return this.param('METHOD');
  }
};

/**
 * Set the auth credentials
 * @param   {string}  username
 * @param   {string}  password
 * @param   {string}  signature
 * @returns {Request}
 */
Request.prototype.auth = function(username, password, signature) {
  return this
    .param('USER',      username)
    .param('PWD',       password)
    .param('SIGNATURE', signature)
  ;
};

/**
 * Get/set params
 * @param   {Object}  params
 * @returns {Object|Request}
 */
Request.prototype.params = function(params) {
  if (arguments.length) {

    for (var name in params) {
      if (params.hasOwnProperty(name)) {
        this.param(name, params[name]);
      }
    }
    return this;

  } else {
    return this._params;
  }
};

/**
 * Set a request value
 * @param   {string}  name
 * @param   {string}  value
 * @returns {string|Request}
 */
Request.prototype.param = function(name, value) {
  if (arguments.length > 1) {
    this._params[name] = value;
    return this;
  } else {
    return this._params[name] || null;
  }
};

module.exports = Request;