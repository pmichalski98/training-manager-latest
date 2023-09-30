import React, { useState } from "react";
import Head from "next/head";
import Modal from "~/components/ui/Modal";
import IconButton from "~/components/IconButton";
import AddWorkoutForm from "~/components/AddWorkoutForm";
import FileDropZone from "~/components/FileDropZone";

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
        <Modal.Content title="">
          <h3 className="text-center text-3xl font-medium text-white">
            Photo Upload
          </h3>
          <div className="p-4">
            <FileDropZone />
          </div>
        </Modal.Content>
      </Modal>
    </div>
  );
}
