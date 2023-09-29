import React from "react";
import { LoadingButton } from "@mui/lab";
import { Container, Stack, Alert, Typography } from "@mui/material";
import { FormProvider, FTextField } from "../components/form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { OrderSchema } from "../schema/form/order";
import ExpandSection from "../components/ExpandForm";

const defaultValues = {
  totalAmount: { amount: "190.00", currency: "EUR" },
  consumer: {
    phoneNumber: "0400000001",
    givenNames: "Joe",
    surname: "Consumer",
    email: "test@scalapay.com",
  },
  billing: {
    name: "Joe Consumer",
    line1: "Via della Rosa, 58",
    suburb: "Montelupo Fiorentino",
    postcode: "50056",
    countryCode: "IT",
    phoneNumber: "0400000000",
  },
  shipping: {
    name: "Joe Consumer",
    line1: "Via della Rosa, 58",
    suburb: "Montelupo Fiorentino",
    postcode: "50056",
    countryCode: "IT",
    phoneNumber: "0400000000",
  },
  items: [
    {
      name: "T-Shirt",
      category: "clothes",
      subcategory: ["shirt", "long-sleeve"],
      brand: "TopChoice",
      gtin: "123458791330",
      sku: "12341234",
      quantity: 1,
      price: { amount: "10.00", currency: "EUR" },
      pageUrl: "https://www.scalapay.com//product/view/",
      imageUrl: "https://www.scalapay.com//product/view/",
    },
    {
      name: "Jeans",
      category: "clothes",
      subcategory: ["pants", "jeans"],
      brand: "TopChoice",
      gtin: "123458722222",
      sku: "12341235",
      quantity: 1,
      price: { amount: "20.00", currency: "EUR" },
    },
  ],
  discounts: [
    { displayName: "10% Off", amount: { amount: "3.00", currency: "EUR" } },
  ],
  merchant: {
    redirectConfirmUrl: "https://portal.integration.scalapay.com/success-url",
    redirectCancelUrl: "https://portal.integration.scalapay.com/failure-url",
  },
  merchantReference: "merchantOrder-1234",
  taxAmount: { amount: "3.70", currency: "EUR" },
  shippingAmount: { amount: "10.00", currency: "EUR" },
  type: "online",
  product: "pay-in-3",
  frequency: { number: "1", frequencyType: "monthly" },
  orderExpiryMilliseconds: 600000,
};

const OrderForm = () => {
  const methods = useForm({
    resolver: yupResolver(OrderSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = methods;

  const apiUrl = "http://localhost:3001/api/orders";
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(apiUrl, data, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer qhtfs87hjnc12kkos`,
        },
      });
      console.log("Response: ", response);
      // Redirect the user to the checkout URL from the response.
      window.location.href = response.data.checkoutUrl;
    } catch (error) {
      reset();
      setError("responseError", {
        type: "manual",
        message: "An error occurred while creating the order.",
      });
    }
  };

  return (
    <Container maxWidth="xs" data-testid="login-page">
      <Typography mt={5}>Create Order</Typography>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          {!!errors.responseError && (
            <Alert severity="error">{errors.responseError.message}</Alert>
          )}

          {/* Total Amount */}
          <ExpandSection title="Total Amount">
            <FTextField name="totalAmount.amount" label="Amount" />
            <FTextField name="totalAmount.currency" label="Currency" />
          </ExpandSection>

          {/* Consumer */}
          <ExpandSection title="Consumer">
            <FTextField name="consumer.phoneNumber" label="Phone Number" />
            <FTextField name="consumer.givenNames" label="Given Names" />
            <FTextField name="consumer.surname" label="Surname" />
            <FTextField name="consumer.email" label="Email" />
          </ExpandSection>

          {/* Billing */}
          <ExpandSection title="Billing">
            <FTextField name="billing.name" label="Name" />
            <FTextField name="billing.line1" label="Address Line 1" />
            <FTextField name="billing.suburb" label="Suburb" />
            <FTextField name="billing.postcode" label="Postcode" />
            <FTextField name="billing.countryCode" label="Country Code" />
            <FTextField name="billing.phoneNumber" label="Phone Number" />
          </ExpandSection>

          {/* Shipping */}
          <ExpandSection title="Shipping">
            <FTextField name="shipping.name" label="Name" />
            <FTextField name="shipping.line1" label="Address Line 1" />
            <FTextField name="shipping.suburb" label="Suburb" />
            <FTextField name="shipping.postcode" label="Postcode" />
            <FTextField name="shipping.countryCode" label="Country Code" />
            <FTextField name="shipping.phoneNumber" label="Phone Number" />
          </ExpandSection>

          {/* Items */}
          <Typography variant="subtitle2" textAlign={"left"}>
            Items
          </Typography>
          {defaultValues.items.map((item, index) => (
            <div key={index}>
              <FTextField name={`items[${index}].name`} label="Item Name" />
              <FTextField name={`items[${index}].category`} label="Category" />
              <FTextField name={`items[${index}].quantity`} label="Quantity" />
              <FTextField
                name={`items[${index}].price.amount`}
                label="Price Amount"
              />
              <FTextField
                name={`items[${index}].price.currency`}
                label="Price Currency"
              />
              <FTextField name={`items[${index}].sku`} label="sku" />
            </div>
          ))}

          {/* Discounts */}
          {/* <Typography variant="subtitle2" textAlign={"left"}>Discounts</Typography>
          {defaultValues.discounts.map((discount, index) => (
            <div key={index}>
              <FTextField
                name={`discounts[${index}].displayName`}
                label="Discount Name"
              />
            </div>
          ))} */}

          {/* Merchant */}
          <ExpandSection title="Merchant">
            <FTextField
              name="merchant.redirectConfirmUrl"
              label="Redirect Confirm URL"
            />
            <FTextField
              name="merchant.redirectCancelUrl"
              label="Redirect Cancel URL"
            />
          </ExpandSection>

          {/* Tax Amount */}
          <ExpandSection title="Tax Amount">
            <FTextField name="taxAmount.amount" label="Tax Amount" />
            <FTextField name="taxAmount.currency" label="Tax Currency" />
          </ExpandSection>

          {/* Shipping Amount */}
          <ExpandSection title="Shipping Amount">
            <FTextField name="shippingAmount.amount" label="Shipping Amount" />
            <FTextField
              name="shippingAmount.currency"
              label="Shipping Currency"
            />
          </ExpandSection>

          {/* Type */}
          <Typography variant="subtitle2" textAlign={"left"}>
            Type
          </Typography>
          <FTextField name="type" label="Type" />

          {/* Product */}
          <Typography variant="subtitle2" textAlign={"left"}>
            Product
          </Typography>
          <FTextField name="product" label="Product" />

          {/* Frequency */}
          <ExpandSection title="Frequency">
            <FTextField name="frequency.number" label="Frequency Number" />
            <FTextField name="frequency.frequencyType" label="Frequency Type" />
          </ExpandSection>

          {/* Order Expiry Milliseconds */}
          <Typography variant="subtitle2" textAlign={"left"}>
            Order Expiry Milliseconds
          </Typography>
          <FTextField
            name="orderExpiryMilliseconds"
            label="Order Expiry Milliseconds"
          />
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Create
        </LoadingButton>
      </FormProvider>
    </Container>
  );
};

export default OrderForm;
