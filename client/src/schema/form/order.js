import * as Yup from "yup";

export const OrderSchema = Yup.object().shape({
  totalAmount: Yup.object().shape({
    amount: Yup.string()
      .required("Amount is required"),
    currency: Yup.string().matches("EUR").required("Currency should be EUR"),
  }),
  consumer: Yup.object().shape({
    givenNames: Yup.string().required("Given Names are required"),
    surname: Yup.string().required("Surname is required"),
  }),
  shipping: Yup.object().shape({
    countryCode: Yup.string().required("Country Code is required"),
    name: Yup.string().required("Name is required"),
    postcode: Yup.string().required("Postcode is required"),
    suburb: Yup.string().required("Suburb is required"),
    line1: Yup.string().required("Address Line 1 is required"),
  }),
  items: Yup.array()
    .of(
      Yup.object().shape({
        quantity: Yup.number()
          .integer("Quantity must be an integer")
          .min(1, "Quantity must be at least 1"),
        price: Yup.object().shape({
          amount: Yup.string()
            .required("Price Amount is required"),
          currency: Yup.string().required("Price Currency is required"),
        }),
        name: Yup.string().required("Item Name is required"),
        category: Yup.string().required("Category is required"),
        sku: Yup.string().required("SKU is required"),
      })
    )
    .required("Items are required"),
  merchant: Yup.object().shape({
    redirectCancelUrl: Yup.string()
      .url("Invalid URL format")
      .required("Redirect Cancel URL is required"),
    redirectConfirmUrl: Yup.string()
      .url("Invalid URL format")
      .required("Redirect Confirm URL is required"),
  }),
  frequency: Yup.object().shape({
    number: Yup.number()
      .integer("Frequency number be an integer")
      .min(1, "Frequency number must be at least 1"),
    frequencyType: Yup.string().required("Frequency Type is required"),
  }),
  orderExpiryMilliseconds: Yup.number()
    .integer("Order Expiry Milliseconds must be an integer")
    .min(1, "Order Expiry Milliseconds must be at least 1"),
});
