import React, { useState } from "react";
import DropDown from "~/components/ui/Dropdown";
import { BsThreeDotsVertical } from "react-icons/bs";
import Button from "~/components/ui/Button";
import Modal from "~/components/ui/Modal";
import { api } from "~/utils/api";
import { type TrainingWithId } from "~/types/training";
import EditWorkoutForm from "~/components/EditWorkoutForm";
import IconButton from "~/components/IconButton";

function TrainingOptionsDropDown({
  training,
  trainingUnit,
}: {
  trainingUnit?: boolean;
  training: TrainingWithId;
}) {
  const utils = api.useContext();
  const [openEditModal, setOpenEditModal] = useState(false);
  const { mutate: deleteTraining, isLoading: isDeleting } =
    api.training.deleteTraining.useMutation({
      onSuccess: async () => {
        await utils.training.getTrainings.invalidate();
      },
    });
  const [open, setOpen] = useState(false);

  return (
    <>
      <DropDown open={open} onOpenChange={setOpen}>
        <DropDown.Button>
          <IconButton type="edit" />
        </DropDown.Button>
        <DropDown.Content>
          <div className=" space-y-1 rounded border-2 border-[#7ECBFF]/20 bg-[#1B3A56]/50 px-3 py-1 outline-none ">
            <Button
              onClick={() =>
                deleteTraining({ trainingId: training.trainingId })
              }
              disabled={isDeleting}
              variant="secondary"
              className="capitalize"
            >
              delete
            </Button>
            <Button
              onClick={() => {
                setOpen(false);
                setOpenEditModal(true);
              }}
              variant="secondary"
              className="capitalize"
            >
              edit
            </Button>
          </div>
        </DropDown.Content>
      </DropDown>
      <Modal open={openEditModal} onOpenChange={setOpenEditModal}>
        <Modal.Content title={`Editing ${training.trainingName} workout`}>
          <h3 className="text-center text-3xl font-medium text-white">
            Workout Details
          </h3>
          <EditWorkoutForm closeModal={setOpenEditModal} training={training} />
        </Modal.Content>
      </Modal>
    </>
  );
}

export default TrainingOptionsDropDown;
