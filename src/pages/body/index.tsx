import { zodResolver } from "@hookform/resolvers/zod";
import * as Dialog from "@radix-ui/react-dialog";
import { log } from "console";
import * as datefns from "date-fns";
import { motion } from "framer-motion";
import Head from "next/head";
import Image from "next/image";
import { ReactNode, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineClose } from "react-icons/ai";
import { GoTrash } from "react-icons/go";
import useMeasure from "react-use-measure";
import FileDropZone from "~/components/FileDropZone";
import IconButton from "~/components/IconButton";
import Spinner from "~/components/Spinner";
import Button from "~/components/ui/Button";
import Input from "~/components/ui/Input";
import Modal from "~/components/ui/Modal";
import { useUtils } from "~/hooks/useUtils";
import { addMeasurementsSchema, addMeasurementsType } from "~/types/body";
import { api } from "~/utils/api";

type Measurements = ["neck", "chest", "waist", "hips", "thigh", "biceps"];
const measurementParts: Measurements = [
  "neck",
  "chest",
  "waist",
  "hips",
  "thigh",
  "biceps",
];
export default function Index() {
  return (
    <>
      <Head>
        <title>Training Manager</title>
        <meta name="description" content="Training Manager gym application" />
        <link rel="icon" href="/icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <div className=" mt-10 w-full bg-primary">
        <h1
          className=" text-4xl font-medium
         text-white"
        >
          Body
        </h1>
        <AddPhotoModal />
        <section className="mt-10 ">
          <AddMeasurementsModal />
          <Measurements />
        </section>
      </div>
    </>
  );
}

function Measurements() {
  const { data } = api.body.getMeasurements.useQuery();
  console.log(Object.entries(data[0]));
  return (
    <div className="mx-auto max-w-6xl py-8 lg:py-16 ">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto"></div>
        </div>
        <div className="mt-8 flex flex-col">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <SortableColumn>Body part (cm)</SortableColumn>
                      <SortableColumn>First</SortableColumn>
                      <SortableColumn>Last</SortableColumn>
                      <SortableColumn>Change</SortableColumn>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {data?.map((row) => (
                      <tr key={row.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {row.biceps}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {row.chest}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {row.waist}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {row.hips}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SortableColumn({ children }: { children: ReactNode }) {
  return (
    <th
      scope="col"
      className="px-3 py-3.5 text-left text-sm text-gray-900 first:pl-4 first:sm:pl-6"
    >
      {children}
    </th>
  );
}

function AddMeasurementsForm({
  closeModal,
}: {
  closeModal: (value: boolean) => void;
}) {
  const { mutateAsync, isLoading } = api.body.addNewMeasurements.useMutation();
  const {
    handleSubmit,
    formState: { errors },
    reset,
    register,
  } = useForm<addMeasurementsType>({
    resolver: zodResolver(addMeasurementsSchema),
  });

  async function formSubmit(data: addMeasurementsType) {
    await mutateAsync(data);
    reset();
    closeModal(false);
  }
  return (
    <form onSubmit={handleSubmit(formSubmit)}>
      <div className=" mb-10 grid grid-cols-2 gap-10">
        {measurementParts.map((bodyPart) => (
          <div key={bodyPart} className="flex flex-col">
            <label htmlFor={bodyPart} className="capitalize text-slate-400">
              {bodyPart}
            </label>
            <div className="flex items-center gap-1">
              <Input
                {...register(bodyPart, { valueAsNumber: true })}
                type="number"
                id={bodyPart}
                className="mt-1 min-w-0 rounded-lg  bg-nav px-2 py-1 text-center ring-1 ring-slate-400/10 "
              />
              <span>cm</span>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full text-right">
        <Button className="w-1/3 font-medium " disabled={isLoading}>
          Save
        </Button>
      </div>
    </form>
  );
}

function AddMeasurementsModal() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Modal open={open} onOpenChange={setOpen}>
        <div className="flex items-center justify-between">
          <h2 className=" text-2xl font-bold">Measurements</h2>
          <Modal.Button>
            <IconButton>+</IconButton>
          </Modal.Button>
        </div>
        <Modal.Content title="Adding measurements">
          <div className="mx-auto px-14">
            <AddMeasurementsForm closeModal={setOpen} />
          </div>
        </Modal.Content>
      </Modal>
    </>
  );
}

function PhotoList() {
  const [ref, bounds] = useMeasure();
  const utils = useUtils();

  const { data: photos, isLoading: photosIsLoading } =
    api.photos.getPhotos.useQuery();

  const { mutate: deletePhoto, isLoading: deleteIsLoading } =
    api.photos.deletePhoto.useMutation({
      onSuccess: async () => {
        await utils.photos.invalidate();
      },
    });

  if (photosIsLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }
  return (
    <div ref={ref} className=" overflow-hidden">
      <motion.div
        dragConstraints={{
          right: 0,
          left: -bounds.width,
        }}
        className="flex cursor-grab gap-2"
        drag="x"
      >
        {photos?.map((photo) => {
          return (
            <div
              key={photo.id}
              className={` rounded-lg border border-lightCyan`}
            >
              <div className="pointer-events-none relative min-h-[240px] min-w-[200px] ">
                <Image
                  src={`https://training-manager.s3.eu-central-1.amazonaws.com/${photo.id}`}
                  alt={"photo"}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                  className={"rounded-lg"}
                />
              </div>
              <div className={"flex items-start justify-between p-3"}>
                <div>
                  <h2 className="font-medium">
                    {datefns.format(photo.createdAt, "MMM do ")}
                  </h2>
                  <p className="text-fadedBlue">{photo.weight} kg</p>
                </div>
                <Button
                  onClick={() => deletePhoto({ photoId: photo.id })}
                  variant="secondary"
                  className="flex items-center gap-1"
                  disabled={deleteIsLoading}
                >
                  {deleteIsLoading ? <Spinner /> : <GoTrash size={25} />}
                </Button>
              </div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}

function AddPhotoModal() {
  const [openAddModal, setOpenAddModal] = useState(false);

  return (
    <div className="">
      <div className="my-10 flex items-center justify-between ">
        <h2 className=" text-2xl font-bold">Progress Pictures</h2>
        <Modal open={openAddModal} onOpenChange={setOpenAddModal}>
          <Modal.Button>
            <IconButton>+</IconButton>
          </Modal.Button>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-20  bg-black/50" />
            <Dialog.Content
              className={
                "fixed left-1/2 top-1/2 z-30 w-full max-w-xl -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-primary pb-6 "
              }
            >
              <div className="flex w-full items-center justify-between p-6">
                <Dialog.Title className={"mx-auto  text-3xl font-medium "}>
                  Photo Upload
                </Dialog.Title>
                <Dialog.Close className="hover:text-gray-400">
                  <AiOutlineClose size={35} />
                </Dialog.Close>
              </div>
              <div className="p-4">
                <FileDropZone closeModal={setOpenAddModal} />
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Modal>
      </div>
      <PhotoList />
    </div>
  );
}
