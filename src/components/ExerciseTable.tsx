import { Exercise } from ".prisma/client";
import { ReactNode } from "react";

export default function ExerciseTable({ exercise }: { exercise: Exercise }) {
  const setNumber = new Array(exercise.sets).fill(1);

  return (
    <div className="mx-auto max-w-6xl py-8 lg:py-16 ">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h2 className="text-xl font-semibold capitalize text-lightCyan">
              {exercise.exerciseName}
            </h2>
          </div>
        </div>
        <div className="mt-8 flex flex-col">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <div className=" min-w-full  ">
                  <div>
                    <div className="grid grid-cols-4">
                      <ColumnHeader>Sets</ColumnHeader>
                      <ColumnHeader>Reps</ColumnHeader>
                      <ColumnHeader>Weight</ColumnHeader>
                    </div>
                  </div>
                  <div className="space-y-2 ">
                    {setNumber.map((_, i) => (
                      <div
                        key={i}
                        className="grid w-full grid-cols-4   rounded-lg bg-inputBg"
                      >
                        <div className="whitespace-nowrap px-3 py-4  pl-6 pr-3 text-sm font-medium  sm:pl-6">
                          {i + 1}
                        </div>
                        <div className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {exercise.reps}
                        </div>
                        <div className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {exercise.weight}
                        </div>
                        <div className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <input type="checkbox" />{" "}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ColumnHeader({ children }: { children: ReactNode }) {
  return (
    <th
      scope="col"
      className="px-3 py-3.5 text-left text-sm text-fadedBlue first:pl-4 first:sm:pl-6"
    >
      {children}
    </th>
  );
}
