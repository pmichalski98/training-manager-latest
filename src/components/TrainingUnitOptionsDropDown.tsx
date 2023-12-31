import React, { useState } from "react";
import DropDown from "~/components/ui/Dropdown";
import { BsThreeDotsVertical } from "react-icons/bs";
import Button from "~/components/ui/Button";
import Modal from "~/components/ui/Modal";
import { api } from "~/utils/api";
import { TrainingUnitWithId } from "~/types/training";
import EditWorkoutForm from "~/components/EditWorkoutForm";
import IconButton from "~/components/IconButton";

function TrainingOptionsDropDown({
  trainingUnit,
}: {
  trainingUnit: TrainingUnitWithId;
}) {
  const utils = api.useContext();
  const [openEditModal, setOpenEditModal] = useState(false);
  const { mutate: deleteTrainingUnit, isLoading: isDeleting } =
    api.trainingUnit.deleteTrainingUnit.useMutation({
      onSuccess: async () => {
        await utils.trainingUnit.getTrainingHistory.invalidate();
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
                deleteTrainingUnit({ trainingUnitId: trainingUnit.id })
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
        <Modal.Content title={`Editing ${trainingUnit.trainingName} workout`}>
          <h3 className="text-center text-3xl font-medium text-white">
            Workout Details
          </h3>
          <EditWorkoutForm
            closeModal={setOpenEditModal}
            training={trainingUnit}
          />
        </Modal.Content>
      </Modal>
    </>
  );
}

export default TrainingOptionsDropDown;
