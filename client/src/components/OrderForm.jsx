import React from "react";
import { LoadingButton } from "@mui/lab";
import { Container, Stack, Alert, Typography, IconButton } from "@mui/material";
import { FormProvider, FTextField } from "../components/form";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { OrderSchema } from "../schema/form/order";
import ExpandSection from "../components/ExpandForm";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

const defaultValues = {
  totalAmount: { amount: "190.00", currency: "EUR" },
  consumer: {
    phoneNumber: "",
    givenNames: "Joe",
    surname: "Consumer",
    email: "",
  },
  billing: {
    name: "",
    line1: "",
    suburb: "",
    postcode: "",
    countryCode: "",
    phoneNumber: "",
  },
  shipping: {
    name: "Joe Consumer",
    line1: "Via della Rosa, 58",
    suburb: "Montelupo Fiorentino",
    postcode: "50056",
    countryCode: "IT",
    phoneNumber: "",
  },
  items: [
    {
      gtin: "",
      name: "T-Shirt",
      category: "clothes",
      brand: "",
      sku: "12341234",
      quantity: 1,
      price: { amount: "10.00", currency: "EUR" },
      pageUrl: "",
      imageUrl: "",
    },
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

  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: "items",
  });

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
      setError("responseError", error);
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
            <FTextField
              type="number"
              name="totalAmount.amount"
              label="Amount"
              inputProps={{ min: 1 }}
              required
            />
            <FTextField name="totalAmount.currency" label="Currency" required />
          </ExpandSection>

          {/* Consumer */}
          <ExpandSection title="Consumer">
            <FTextField name="consumer.phoneNumber" label="Phone Number" />
            <FTextField
              name="consumer.givenNames"
              label="Given Names"
              required
            />
            <FTextField name="consumer.surname" label="Surname" required />
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
            <FTextField name="shipping.phoneNumber" label="Phone Number" />
            <FTextField name="shipping.name" label="Name" required/>
            <FTextField name="shipping.line1" label="Address Line 1" required/>
            <FTextField name="shipping.suburb" label="Suburb" required/>
            <FTextField name="shipping.postcode" label="Postcode" required/>
            <FTextField name="shipping.countryCode" label="Country Code" required/>
          </ExpandSection>

          {/* Items */}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={1}
            style={{
              borderRadius: "5px",
              paddingLeft: "5px",
              paddingRight: "5px",
              border: "1px solid #ccc",
            }}
          >
            <Typography variant="subtitle2" textAlign={"left"}>
              Items
            </Typography>
            <IconButton variant="contained" onClick={() => append({})}>
              <AddIcon fontSize="small" />
            </IconButton>
          </Stack>
          {fields.map((item, index) => (
            <div key={item.id}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                mb={1}
                style={{
                  borderRadius: "5px",
                  paddingLeft: "15px",
                  paddingRight: "5px",
                  border: "1px solid #ccc",
                }}
              >
                <Typography variant="subtitle2" textAlign={"left"}>
                  Item {index + 1}
                </Typography>
                <IconButton variant="outlined" onClick={() => remove(index)}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Stack>
              <Stack spacing={1}>
                <FTextField
                  name={`items[${index}].gtin`}
                  label="Global Trade Item Number"
                />
                <FTextField
                  name={`items[${index}].quantity`}
                  label="Quantity"
                />
                <FTextField
                  // type="number"
                  name={`items[${index}].price.amount`}
                  label="Price Amount"
                  // inputProps={{ min: 1 }}
                />
                <FTextField
                  name={`items[${index}].price.currency`}
                  label="Price Currency"
                />
                <FTextField name={`items[${index}].name`} label="Item Name" />
                <FTextField
                  name={`items[${index}].category`}
                  label="Category"
                />
                <FTextField name={`items[${index}].brand`} label="Brand" />
                <FTextField name={`items[${index}].pageUrl`} label="Page Url" />
                <FTextField
                  name={`items[${index}].imageUrl`}
                  label="Image Url"
                />
              </Stack>
            </div>
          ))}

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
            <FTextField
              // type="number"
              name="taxAmount.amount"
              label="Tax Amount"
              // inputProps={{ min: 1 }}
            />
            <FTextField name="taxAmount.currency" label="Tax Currency" />
          </ExpandSection>

          {/* Shipping Amount */}
          <ExpandSection title="Shipping Amount">
            <FTextField
              // type="number"
              name="shippingAmount.amount"
              label="Shipping Amount"
              // inputProps={{ min: 1 }}
            />
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
            <FTextField
              name="frequency.number"
              label="Frequency Number"
              required
            />
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
