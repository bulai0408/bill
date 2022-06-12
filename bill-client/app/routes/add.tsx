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
  Select,
  Text,
} from "@chakra-ui/react";
import {
  Form,
  useActionData,
  useLoaderData,
  useTransition,
} from "@remix-run/react";
import {
  ActionFunction,
  json,
  LoaderFunction,
  redirect,
} from "@remix-run/server-runtime";

import api from "~/api";

type ActionData = {
  formError?: string;
  fieldErrors?: ErrorValues;
  fields?: FormValues;
};

type LoaderData = {
  data: RecordType[];
};

type RecordType = {
  id: number;
  name: string;
  belong: number;
  created_at: string;
  updated_at: string;
};

interface FormValues {
  name: string;
  price: string;
  typeId: string;
}

type ErrorValues = Partial<{
  [P in keyof FormValues]: string;
}>;

const formConfig: {
  name: string;
  key: string;
  attr?: InputProps;
  type?: string;
  placeholder?: string;
}[] = [
  {
    name: "name",
    key: "name",
    placeholder: "Description",
  },
  {
    name: "type",
    key: "typeId",
    type: "select",
  },
  {
    name: "price",
    key: "price",
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
  } else if (!values.typeId) {
    errors.typeId = "Type is required";
  }
  return errors;
};

const badRequest = (data: ActionData) => json(data, { status: 400 });

export const loader: LoaderFunction = async () => {
  const res = await api.get<RecordType[]>("/record/type");
  const data = res.data ?? [];
  return {
    data,
  };
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const name = form.get("name");

  const typeId = form.get("typeId");
  const price = form.get("price");

  if (
    typeof name !== "string" ||
    typeof price !== "string" ||
    typeof typeId !== "string"
  ) {
    return badRequest({
      formError: "Form not submitted correctly.",
    });
  }
  const fields = { name, price, typeId };
  const fieldErrors = validate(fields);
  if (Object.values(fieldErrors).some(Boolean))
    return badRequest({ fieldErrors, fields });
  try {
    await api.post("/record", {
      name,
      price: Number(price),
      typeId: Number(typeId),
    });
    return redirect("/list");
  } catch (e) {
    return badRequest({ formError: "Something went wrong" });
  }
};

const AddRecord = () => {
  const actionData = useActionData<ActionData>();
  const { data: typeList } = useLoaderData<LoaderData>();
  const { state } = useTransition();

  const isSubmitting = state === "submitting";
  return (
    <Form method="post">
      {formConfig.map((i) => {
        const { name, placeholder } = i;
        const key = i.key as keyof FormValues;
        const { attr, type } = i;
        const errorMessage = actionData?.fieldErrors?.[key];
        return (
          <FormControl
            key={key}
            isInvalid={!!errorMessage}
            isDisabled={isSubmitting}
          >
            <FormLabel htmlFor={key} className="first-letter:uppercase">
              {name}
            </FormLabel>
            {type === "select" ? (
              <Select name={key} id={key}>
                {typeList.map(({ id, name }) => (
                  <option value={id}>{name}</option>
                ))}
              </Select>
            ) : attr?.type === "number" ? (
              <NumberInput defaultValue={0} min={0}>
                <NumberInputField id={key} name={key} />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            ) : (
              <Input id={key} name={key} placeholder={placeholder} {...attr} />
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
