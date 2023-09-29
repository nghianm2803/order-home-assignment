const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors());
app.use(express.json());

// Proxy requests to the scalapay API
app.get("/api/orders", async (req, res) => {
  try {
    const apiUrl =
      "https://integration.api.scalapay.com/v1/reporting/orders?size=3&page=0";

    const response = await axios.get(apiUrl, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer qhtfs87hjnc12kkos`,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error proxying request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// const sampleRequestBody = {
//   totalAmount: { amount: "190.00", currency: "EUR" },
//   consumer: {
//     phoneNumber: "0400000001",
//     givenNames: "Joe",
//     surname: "Consumer",
//     email: "test@scalapay.com",
//   },
//   billing: {
//     name: "Joe Consumer",
//     line1: "Via della Rosa, 58",
//     suburb: "Montelupo Fiorentino",
//     postcode: "50056",
//     countryCode: "IT",
//     phoneNumber: "0400000000",
//   },
//   shipping: {
//     name: "Joe Consumer",
//     line1: "Via della Rosa, 58",
//     suburb: "Montelupo Fiorentino",
//     postcode: "50056",
//     countryCode: "IT",
//     phoneNumber: "0400000000",
//   },
//   items: [
//     {
//       name: "T-Shirt",
//       category: "clothes",
//       subcategory: ["shirt", "long-sleeve"],
//       brand: "TopChoice",
//       gtin: "123458791330",
//       sku: "12341234",
//       quantity: 1,
//       price: { amount: "10.00", currency: "EUR" },
//       pageUrl: "https://www.scalapay.com//product/view/",
//       imageUrl: "https://www.scalapay.com//product/view/",
//     },
//     {
//       name: "Jeans",
//       category: "clothes",
//       subcategory: ["pants", "jeans"],
//       brand: "TopChoice",
//       gtin: "123458722222",
//       sku: "12341235",
//       quantity: 1,
//       price: { amount: "20.00", currency: "EUR" },
//     },
//   ],
//   discounts: [
//     { displayName: "10% Off", amount: { amount: "3.00", currency: "EUR" } },
//   ],
//   merchant: {
//     redirectConfirmUrl: "https://portal.integration.scalapay.com/success-url",
//     redirectCancelUrl: "https://portal.integration.scalapay.com/failure-url",
//   },
//   merchantReference: "merchantOrder-1234",
//   taxAmount: { amount: "3.70", currency: "EUR" },
//   shippingAmount: { amount: "10.00", currency: "EUR" },
//   type: "online",
//   product: "pay-in-3",
//   frequency: { number: "1", frequencyType: "monthly" },
//   orderExpiryMilliseconds: 600000,
// };

app.post("/api/orders", async (req, res) => {
  try {
    const apiUrl = "https://integration.api.scalapay.com/v2/orders";

    console.log("POST Request to Proxy Server");
    console.log("Complete Request:", req);

    console.log("Request Body:", req.body);

    const response = await axios.post(apiUrl, req.body, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer qhtfs87hjnc12kkos`,
      },
    });

    console.log("POST Response from Scalapay API:", response.data);

    res.json(response.data);
  } catch (error) {
    console.error("Error creating order: ", error);
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server is running on port ${PORT}`);
});
