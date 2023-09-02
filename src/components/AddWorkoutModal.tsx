import React, { useState } from "react";
import Modal from "~/components/ui/Modal";
import IconButton from "~/components/IconButton";
import AddWorkoutForm from "~/components/AddWorkoutForm";

function AddWorkoutModal() {
  const [openAddModal, setOpenAddModal] = useState(false);

  return (
    <div className="mt-20 flex items-center justify-between">
      <h2 className=" text-2xl font-bold">Workouts</h2>
      <Modal open={openAddModal} onOpenChange={setOpenAddModal}>
        <Modal.Button>
          <span className="text-5xl hover:text-gray-400">+</span>
        </Modal.Button>
        <Modal.Content title="New workout">
          <h3 className="text-center text-3xl font-medium text-white">
            Workout Details
          </h3>
          <AddWorkoutForm closeModal={setOpenAddModal} />
        </Modal.Content>
      </Modal>
    </div>
  );
}

export default AddWorkoutModal;
