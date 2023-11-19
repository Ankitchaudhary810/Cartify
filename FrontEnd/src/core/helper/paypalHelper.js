import { API } from "../../backend";

export const getMeToken = async (userId, Token) => {
    try {
      const response = await fetch(`${API}payment/gettoken/${userId}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Token}`
        }
      })
      return response.json();
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
  
  export const proccessPayment = async (userId, Token, paymentInfo) => {
    try {
      const response = await fetch(`${API}payment/braintree/${userId}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Token}`
        },
        body: JSON.stringify(paymentInfo)
      });
      if (!response.ok) {
        throw new Error('Failed to process payment');
      }
    console.log("response: " , response);
      return response.json();
    } catch (err) {
      console.log("err: ", err);
      throw err;
    }
  };
  