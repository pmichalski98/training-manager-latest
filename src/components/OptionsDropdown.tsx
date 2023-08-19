import React, { useState } from "react";
import DropDown from "~/components/ui/Dropdown";
import { BsThreeDotsVertical } from "react-icons/bs";
import Button from "~/components/ui/Button";
import Modal from "~/components/ui/Modal";
import { EditWorkoutForm } from "~/pages";
import { api } from "~/utils/api";
import { type WorkoutWithId } from "~/types/workout";

function OptionsDropdown({ workout }: { workout: WorkoutWithId }) {
  const utils = api.useContext();
  const [openEditModal, setOpenEditModal] = useState(false);
  const { mutate: deleteTraining, isLoading: isDeleting } =
    api.workout.deleteWorkout.useMutation({
      onSuccess: async () => {
        await utils.workout.getWorkouts.invalidate();
      },
    });
  return (
    <DropDown>
      <DropDown.Button>
        <BsThreeDotsVertical size={20} />
      </DropDown.Button>
      <DropDown.Content>
        <div className=" space-y-1 rounded border-2 border-[#7ECBFF]/20 bg-[#1B3A56]/50 px-3 py-1 outline-none ">
          <Button
            onClick={() => deleteTraining({ workoutId: workout.id })}
            disabled={isDeleting}
            variant="secondary"
            className="capitalize"
          >
            delete
          </Button>
          <Modal open={openEditModal} onOpenChange={setOpenEditModal}>
            <Modal.Button>
              <Button variant="secondary" className="capitalize">
                edit
              </Button>
            </Modal.Button>
            <Modal.Content title={`Edit ${workout.workoutName} workout`}>
              <h3 className="text-center text-3xl font-medium text-white">
                Workout Details
              </h3>
              <EditWorkoutForm
                closeModal={setOpenEditModal}
                workout={workout}
              />
            </Modal.Content>
          </Modal>
        </div>
      </DropDown.Content>
    </DropDown>
  );
}

export default OptionsDropdown;
