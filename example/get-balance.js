var PayPal = require('..');
var cfg = require('./config.json');

var paypal = PayPal(cfg.username, cfg.password, cfg.signature);

paypal.exec('GetBalance', function(err, res) {
  if (err) return console.log(err);
  console.log('$'+res[0].AMT);
});