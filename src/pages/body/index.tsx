import React, { useState } from "react";
import Head from "next/head";
import Modal from "~/components/ui/Modal";
import IconButton from "~/components/IconButton";
import AddWorkoutForm from "~/components/AddWorkoutForm";
import FileDropZone from "~/components/FileDropZone";
import * as Dialog from "@radix-ui/react-dialog";
import { AiOutlineClose } from "react-icons/ai";

function Index() {
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
        <AddPictureModal />
      </div>
    </>
  );
}

export default Index;

function AddPictureModal() {
  const [openAddModal, setOpenAddModal] = useState(false);

  return (
    <div className="mt-20 flex items-center justify-between ">
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
  );
}
