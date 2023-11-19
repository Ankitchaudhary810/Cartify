const braintree = require("braintree");

const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: "yxhk9zvt49m2kgp8",
    publicKey: "r3nd27s8s4q4bs2t",
    privateKey: "5d538a157814d5c19b2e30d91182aa02"
});


exports.getToken = (req, res) => {
    gateway.clientToken.generate({}, (err, response) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.send(response);
        }
    });
}

exports.processPayment = (req, res) => {
    const nonceFromTheClient = req.body.paymentMethodNonce;
    const amount = req.body.amount;
    gateway.transaction.sale({
        amount,
        paymentMethodNonce: nonceFromTheClient,
        options: {
            submitForSettlement: true
        }
    }, (err, result) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.json(result);
        }
    });
}