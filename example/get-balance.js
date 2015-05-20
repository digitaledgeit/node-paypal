var paypal = require('..');

paypal(require('./config.json')).exec('GetBalance', function(err, res) {
  if (err) return console.log(err);
  console.log('$'+res[0].AMT);
});