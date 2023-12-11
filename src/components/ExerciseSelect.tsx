import * as Select from "@radix-ui/react-select";
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { twMerge } from "tailwind-merge";
import React, { Dispatch, ReactNode, SetStateAction } from "react";

interface ExerciseSelectProps {
  value: string | undefined;
  setValue: Dispatch<SetStateAction<undefined | string>>;
  data: {
    exerciseName: string;
  }[];
}
export default function ExerciseSelect({
  data,
  value,
  setValue,
}: ExerciseSelectProps) {
  return (
    <Select.Root value={value} onValueChange={setValue}>
      <Select.Trigger className="inline-flex items-center justify-center gap-2 rounded bg-setRow p-2 text-lg ">
        <Select.Value placeholder="Choose exercise..." />
        <Select.Icon className="">
          <ChevronDownIcon width={24} height={24} />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content className="overflow-hidden rounded bg-nav text-lg">
          <Select.ScrollUpButton />
          <Select.Viewport className="rounded p-3">
            {data.map((exercise) => (
              <SelectItem
                key={exercise.exerciseName}
                value={exercise.exerciseName}
              >
                {exercise.exerciseName}
              </SelectItem>
            ))}
          </Select.Viewport>
          <Select.ScrollDownButton />
          <Select.Arrow />
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}

interface SelectItemI extends Select.SelectItemProps {
  className?: string;
  children: ReactNode;
}
const SelectItem = ({ children, className, ...props }: SelectItemI) => {
  return (
    <Select.Item
      className={twMerge(
        "text-violet11 data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1 relative flex h-[25px] select-none items-center rounded-[3px] pl-[25px] pr-[35px] text-lg capitalize leading-none data-[disabled]:pointer-events-none data-[highlighted]:outline-none",
        className
      )}
      {...props}
    >
      <Select.ItemText>{children}</Select.ItemText>
      <Select.ItemIndicator className="absolute left-0 inline-flex w-[25px] items-center justify-center">
        <CheckIcon />
      </Select.ItemIndicator>
    </Select.Item>
  );
};
