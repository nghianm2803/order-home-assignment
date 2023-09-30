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
