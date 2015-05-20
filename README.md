# paypal

A client for the PayPal classic NVP API.

## Installation

    npm install --save @digitaledgeit/paypal
    
## Usage

Balance check:

    var paypal = require('@digitaledgeit/paypal');
    
    paypal(cfg).exec('GetBalance', function(err, res) {
      if (err) return console.log(err);
      console.log('$'+res[0].AMT);
    });

Transaction search:

    var paypal = require('@digitaledgeit/paypal');
    
    paypal(cfg).exec('TransactionSearch', {STARTDATE: '2014-07-0T14:00:00Z'}, function(err, res) {
      if (err) return console.err(err);
      
      var total = res
        .map(function(txn) {
          return parseFloat(txn.AMT);
        })
        .reduce(function(txnA, txnB) {
          return txnA+txnB;
        })
      ;
      
      console.log(total);
      
    });

## API

### Methods

#### new PayPal(config)

Create a new PayPal API client.

- config.username
- config.password
- config.signature
- config.sandbox

#### .exec(method, [params], callback)

Execute an operation.
    
## License

The MIT License (MIT)

Copyright (c) 2015 James Newell
    
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
    
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
    
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.