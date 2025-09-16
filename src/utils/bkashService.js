const BASE_URL = process.env.BKASH_BASE_URL;
const APP_KEY = process.env.BKASH_APP_KEY;
let accessToken = null;

// Generate access token
async function generateToken() {
  try {
    const response = await fetch(`${BASE_URL}/tokenized/checkout/token/grant`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        username: process.env.BKASH_USERNAME,
        password: process.env.BKASH_PASSWORD,
      },
      body: JSON.stringify({
        app_key: process.env.BKASH_APP_KEY,
        app_secret: process.env.BKASH_APP_SECRET,
      }),
    });

    const data = await response.json();
    console.log("Token generation data:", data);

    if (data.id_token) {
      accessToken = data.id_token; // Store the token
      return accessToken;
    } else {
      throw new Error("Token generation failed");
    }
  } catch (error) {
    console.error("Error generating token:", error);
    throw new Error("Failed to generate access token");
  }
}

// Initiate payment
async function initiatePayment(amount, orderId, callbackURL) {
  if (!accessToken) {
    await generateToken();
  }
  try {
    // Make the POST request to the bKash payment API
    const response = await fetch(`${BASE_URL}/tokenized/checkout/create`, {
      method: "POST",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
        "X-APP-Key": APP_KEY,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        mode: "0011",
        payerReference: orderId,
        callbackURL: `${process.env.BASE_URL}/api/bkash/${callbackURL}?paymentID=${orderId}`,
        merchantAssociationInfo: "MI05MID54RF09123456One",
        amount: amount,
        currency: "BDT",
        intent: "sale",
        merchantInvoiceNumber: orderId,
      }),
    });

    const data = await response.json();
    console.log("Payment initiation data:", data);

    return data;
  } catch (error) {
    console.error("Error initiating payment:", error);
    throw new Error("Failed to initiate payment");
  }
}

module.exports = { initiatePayment };
