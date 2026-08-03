const razorpay = require("../config/razorpay");
const crypto = require("crypto");

const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    return res.json({
      success: true,
      order,
    });

  } catch (err) {
    console.log("CREATE ORDER ERROR :", err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    const body =
      razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac(
        "sha256",
        process.env.RAZORPAY_KEY_SECRET
      )
      .update(body)
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      return res.json({
        success: true,
        message: "Payment Verified",
      });
    }

    return res.status(400).json({
      success: false,
      message: "Invalid Payment",
    });

  } catch (err) {

    console.log("VERIFY ERROR :", err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};

const refundPayment = async (paymentId) => {

  try {

    console.log("========== REFUND START ==========");

    console.log(paymentId);

    const payment =
      await razorpay.payments.fetch(paymentId);

    console.log(payment);

    if (payment.status !== "captured") {

      throw new Error(
        "Payment not captured"
      );

    }

    const refund =
      await razorpay.payments.refund(
        paymentId,
        {
          speed: "normal",
        }
      );

    console.log(refund);

    return refund;

  } catch (err) {

    console.log("REFUND ERROR");

    console.log(err);

    throw err;

  }

};

module.exports = {
  createOrder,
  verifyPayment,
   refundPayment,
};