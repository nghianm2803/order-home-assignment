import * as Yup from "yup";

export const OrderSchema = Yup.object().shape({
  totalAmount: Yup.object().shape({
    amount: Yup.string().required("Amount is required"),
    currency: Yup.string().required("Currency is required"),
  }),
  // consumer: Yup.object().shape({
  //   givenNames: Yup.string().required("Given Names are required"),
  //   surname: Yup.string().required("Surname is required"),
  // }),
  // shipping: Yup.object().shape({
  //   name: Yup.string().required("Name is required"),
  //   line1: Yup.string().required("Address Line 1 is required"),
  //   suburb: Yup.string().required("Suburb is required"),
  //   postcode: Yup.string().required("Postcode is required"),
  //   countryCode: Yup.string().required("Country Code is required"),
  // }),
  // items: Yup.array()
  //   .of(
  //     Yup.object().shape({
  //       name: Yup.string().required("Item Name is required"),
  //       category: Yup.string().required("Category is required"),
  //       gtin: Yup.string().required("GTIN is required"),
  //       sku: Yup.string().required("SKU is required"),
  //       quantity: Yup.number()
  //         .required("Quantity is required")
  //         .integer("Quantity must be an integer")
  //         .min(1, "Quantity must be at least 1"),
  //       price: Yup.object().shape({
  //         amount: Yup.string().required("Price Amount is required"),
  //         currency: Yup.string().required("Price Currency is required"),
  //       }),
  //     })
  //   )
  //   .required("Items are required"),
  // merchant: Yup.object().shape({
  //   redirectConfirmUrl: Yup.string()
  //     .url("Invalid URL format")
  //     .required("Redirect Confirm URL is required"),
  //   redirectCancelUrl: Yup.string()
  //     .url("Invalid URL format")
  //     .required("Redirect Cancel URL is required"),
  // }),
});