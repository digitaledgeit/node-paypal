var paypal = require('..');

paypal(require('./config.json')).exec('TransactionSearch', {STARTDATE: '2014-07-0T14:00:00Z'}, function(err, res) {
  if (err) return console.log(err);

  var total = res
      .map(function(txn) {
        if (txn.AMT) {
          return parseFloat(txn.AMT);
        } else {
          return 0;
        }
      })
      .reduce(function(txnA, txnB) {
        return txnA+txnB;
      })
  ;

  console.log('Total: $'+total.toFixed(2));

});