import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Editable,
  EditableInput,
  EditablePreview,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import {
  useLoaderData,
  Link,
  useCatch,
  Form,
  useTransition,
  useSubmit,
} from "@remix-run/react";
import {
  ActionFunction,
  LoaderFunction,
  redirect,
} from "@remix-run/server-runtime";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import { groupBy } from "lodash";
import { useEffect, useRef, useState } from "react";

import api from "~/api";

type Record = {
  created_at: string;
  name: string;
  id: number;
  updated_at: string;
  price: number;
  type: 0 | 1; // 0 = outcome & 1 = income
};

type LoaderData = {
  data: Record[];
};

export const loader: LoaderFunction = async () => {
  const res = await api.get<Record[]>("/record/list");
  const data = res.data ?? [];

  return {
    data,
  };
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const id = Number(form.get("id"));
  const name = form.get("name");
  const price = form.get("price");
  const _method = form.get("_method") as "delete" | "put";
  if (!["delete", "put"].includes(_method)) {
    throw new Response(`Not support ${form.get("_method")} method`, {
      status: 400,
    });
  }
  if (!id && id !== 0) {
    throw new Response("Lose of `id` params", {
      status: 400,
    });
  }

  if (isNaN(Number(price))) {
    throw new Response("Field `price` error", {
      status: 400,
    });
  }

  if (_method === "delete") {
    await api.delete(`/record/${id}`);
  } else if (_method === "put") {
    await api.put(`/record/${id}`, { name, price: Number(price) });
  } else {
    throw new Error("Something went wrong");
  }
  return redirect("/list");
};

const List = () => {
  const { data } = useLoaderData<LoaderData>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedRecord, setSelectedRecord] = useState<Record>();

  const groupByCreatedTimeData = groupBy(data, (i) =>
    dayjs(i.created_at).format("YYYY-MM-DD")
  );

  return (
    <Box>
      {Object.keys(groupByCreatedTimeData).map((key) => {
        const list = groupByCreatedTimeData[key];

        return (
          <Box key={key} className="mb-4 last:mb-0">
            <Text className="text-gray-500 text-lg mb-2 font-bold">{key}</Text>
            {list.map((item) => {
              const { id, price, type, name } = item;
              const money =
                type === 1 ? (
                  <Text className="text-green-500 font-bold italic">{`+${price}`}</Text>
                ) : (
                  <Text className="text-red-500 font-bold italic">{`-${price}`}</Text>
                );
              return (
                <Box
                  as={motion.div}
                  key={id}
                  className="flex justify-between items-center shadow-lg p-2 rounded mb-2 last:mb-0 px-4 ml-2 dark:!bg-red-500"
                  whileHover={{ scale: 1.01, y: -3 }}
                  onClick={() => {
                    setSelectedRecord(item);
                    onOpen();
                  }}
                >
                  <Text className="text-xl font-bold">{name}</Text>
                  {money}
                </Box>
              );
            })}
          </Box>
        );
      })}
      <RecordEditor
        isOpen={isOpen}
        onClose={onClose}
        selectedRecord={selectedRecord}
      />
      {isOpen ? null : (
        <Box className="fixed overflow-hidden bottom-4 left-1/2 -translate-x-1/2 bg-blue-400 rounded-full w-12 h-12 shadow-md cursor-pointer hover:scale-125 hover:-translate-y-2 transition-transform">
          <Link
            to="/add"
            className="w-full h-full flex items-center justify-center"
          >
            <AddIcon className="!text-white" />
          </Link>
        </Box>
      )}
    </Box>
  );
};

export default List;

const RecordEditor = ({
  isOpen,
  onClose,
  selectedRecord,
}: {
  isOpen: boolean;
  onClose: () => void;
  selectedRecord?: Record;
}) => {
  const { state } = useTransition();
  const updateFormRef = useRef<HTMLFormElement>(null);

  const isSubmitting = state === "submitting";
  const submit = useSubmit();

  function handleUpdate() {
    submit(updateFormRef.current, { replace: true });
  }

  useEffect(() => {
    return () => {
      if (isSubmitting) {
        onClose();
      }
    };
  }, [isSubmitting]);
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="flex justify-between items-center">
            <Text>Modify Your Bill</Text>
            <Box className="flex gap-4">
              <Button
                size="sm"
                onClick={handleUpdate}
                isLoading={isSubmitting}
                colorScheme="blue"
              >
                Modify
              </Button>
              <Form method="post">
                <input type="hidden" name="_method" value="delete" />
                <input type="hidden" name="id" value={selectedRecord?.id} />
                <Button size="sm" type="submit" colorScheme="red">
                  Delete
                </Button>
              </Form>
            </Box>
          </ModalHeader>
          <ModalBody>
            <Form
              ref={updateFormRef}
              method="post"
              className="flex justify-between items-center"
            >
              <Editable defaultValue={selectedRecord?.name} className="w-40">
                <EditablePreview />
                <EditableInput name="name" />
              </Editable>

              <Editable
                defaultValue={selectedRecord?.price as unknown as string}
                className="w-40"
                startWithEditView
              >
                <EditablePreview />
                <EditableInput name="price" type="number" />
              </Editable>
              <input type="hidden" name="_method" value="put" />
              <input type="hidden" name="id" value={selectedRecord?.id} />
            </Form>
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 500) {
    return <Box>Something went wrong with the server...</Box>;
  }
  throw new Error(`Error Code: ${caught.status}`);
}

export function ErrorBoundary() {
  return <Box>Shit😰</Box>;
}
