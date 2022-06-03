import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputProps,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import { Form, useActionData, useTransition } from "@remix-run/react";
import { ActionFunction, json, redirect } from "@remix-run/server-runtime";
import api from "~/api";
// import { Field, FieldProps, Form, Formik, FormikProps } from "formik";

type ActionData = {
  formError?: string;
  fieldErrors?: ErrorValues;
  fields?: FormValues;
};

interface FormValues {
  name: string;
  price: string;
}

type ErrorValues = Partial<{
  [P in keyof FormValues]: string;
}>;

const formConfig: { name: string; attr?: InputProps }[] = [
  {
    name: "name",
  },
  {
    name: "price",
    attr: {
      type: "number",
    },
  },
];

const validate = (values: FormValues) => {
  let errors: ErrorValues = {};

  if (!values.name) {
    errors.name = "Name is required";
  } else if (!values.price) {
    errors.price = "Price is required";
  }
  return errors;
};

const badRequest = (data: ActionData) => json(data, { status: 400 });

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const name = form.get("name");

  const price = form.get("price");

  if (typeof name !== "string" || typeof price !== "string") {
    return badRequest({
      formError: "Form not submitted correctly.",
    });
  }
  const fields = { name, price };
  const fieldErrors = validate(fields);
  if (Object.values(fieldErrors).some(Boolean))
    return badRequest({ fieldErrors, fields });
  try {
    await api.post("/record/create", {
      name,
      price: Number(price),
      type: 0,
    });
    return redirect("/list");
  } catch (e) {
    return badRequest({ formError: "Something went wrong" });
  }
};

const AddRecord = () => {
  const actionData = useActionData<ActionData>();
  const { state } = useTransition();

  const isSubmitting = state === "submitting";
  return (
    <Form method="post">
      {formConfig.map((i) => {
        const key = i.name as keyof FormValues;
        const attr = i.attr;
        const errorMessage = actionData?.fieldErrors?.[key];
        return (
          <FormControl
            key={key}
            isInvalid={!!errorMessage}
            isDisabled={isSubmitting}
          >
            <FormLabel htmlFor={key} className="first-letter:uppercase">
              {key}
            </FormLabel>
            {attr?.type === "number" ? (
              <NumberInput defaultValue={0} min={0}>
                <NumberInputField id={key} name={key} />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            ) : (
              <Input id={key} name={key} {...attr} />
            )}
            {errorMessage ? (
              <FormErrorMessage>{errorMessage}</FormErrorMessage>
            ) : null}
          </FormControl>
        );
      })}
      <Box>
        {actionData?.formError ? (
          <FormErrorMessage>{actionData.formError}</FormErrorMessage>
        ) : null}
      </Box>

      <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default AddRecord;
