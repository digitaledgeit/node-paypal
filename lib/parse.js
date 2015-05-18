
/**
 * Parse the PayPal NVP response into a list
 * @param   {Object}  data
 * @returns {Array}
 */
module.exports = function(data) {//TODO: decode name and value
  var list = [];
  for (var name in data) {
    if (data.hasOwnProperty(name)) {
      var matches = name.match(/^L_([A-Z]+)([0-9]+)$/);
      if (matches) {
        if (!list[matches[2]]) {
          list[matches[2]] = {};
        }
        list[matches[2]][matches[1]] = data[name];
      } else {
        list[name] = data[name];
      }
    }
  }
  return list;
};