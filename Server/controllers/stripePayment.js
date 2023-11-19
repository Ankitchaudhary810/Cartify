const stripe = require('stripe')("sk_test_51NIY30SE2byZZ6Gsw1JkcAiv57LdN2hHkta99ncJSevk9UItJNo2wx7n1Da0U3L0MzqBYA0vvDzwEXoVVUoqs5Wq00s7Zt03Q5");
const { v4: uuidv4 } = require('uuid');

exports.makePayment = async (req, res) => {
  const { token , FinalAmount} = req.body;
  console.log("Token ", token);
  const idempotencyKey = uuidv4();
  
  try {
    const customer = await stripe.customers.create({
      source: token.id,
      email: token.email,
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: FinalAmount,
      currency: "inr",
      customer: customer.id,
      receipt_email: token.email,
      description: `Purchase of Product Name`,
      shipping: {
        name: token.card.name,
        address: {
          country: token.card.address_country
        }
      }
    }, { idempotencyKey: idempotencyKey });

    console.log(paymentIntent);
    res.status(200).json(paymentIntent);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Payment failed' });
  }
}
