import React, { type ChangeEvent, type FormEvent, useState } from "react";
import { api } from "~/utils/api";
import FormData from "form-data";
import Button from "~/components/ui/Button";
import Image from "next/image";
import Spinner from "~/components/Spinner";
import Input from "~/components/ui/Input";

interface Fields {
  "Content-Type": string;
  file: File;
  Policy: string;
  "X-Amz-Signature": string;
}

function FileDropZone({
  closeModal,
}: {
  closeModal: (param: boolean) => void;
}) {
  const [weight, setWeight] = useState<number | undefined>();
  const [file, setFile] = useState<File>();
  const utils = api.useContext();

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    setFile(e.currentTarget.files?.[0]);
  }
  const { mutateAsync: getPresignedUrl, isLoading } =
    api.photos.uploadPhoto.useMutation({});
  const { mutate: addWeight } = api.body.addWeight.useMutation();

  async function handleFileUpload(e: FormEvent) {
    e.preventDefault();
    if (!file) return;
    const { url, fields } = await getPresignedUrl();
    if (weight) {
      addWeight(weight);
    }
    const urlFields: Fields = {
      ...fields,
      "Content-Type": file.type,
      file,
    };
    const formData = new FormData();
    for (const name in urlFields) {
      const key = name;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const value = urlFields[name];
      formData.append(key, value);
    }
    const res = await fetch(url, {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      body: formData,
      method: "POST",
      mode: "no-cors",
    });
    await utils.photos.invalidate();
    setFile(undefined);
  }

  const blob = new Blob([file!]);

  return (
    <>
      <form
        className={` flex flex-col`}
        onSubmit={(e) => {
          handleFileUpload(e).catch(console.error);
          closeModal(false);
        }}
      >
        <div className="relative   ">
          <label
            className=" flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-4 border-dashed border-secondary/40 bg-nav "
            htmlFor="file"
          >
            <div className="flex flex-col items-center justify-center stroke-secondary/40 pb-6 pt-5 text-rose-400 ">
              <svg
                aria-hidden="true"
                className="mb-3 h-10 w-10 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                ></path>
              </svg>
              <p className="mb-2 font-medium text-secondary/40">
                <span className="">Click</span> or drag and drop
              </p>
              <p className="text-xs text-secondary/40">SVG, PNG, JPG or GIF</p>
            </div>
          </label>
          <input
            className={`absolute left-0 top-0 h-full w-full cursor-pointer bg-rose-400 opacity-0`}
            id="file"
            type="file"
            onChange={handleFileChange}
          />
        </div>
        {file && (
          <div className=" mt-10 grid grid-cols-2 gap-10  ">
            <div className="relative ">
              <Image
                src={URL.createObjectURL(blob)}
                alt={"Photo to upload"}
                fill
              />
            </div>
            <div className="space-y-6">
              <div className="relative flex flex-col gap-1 rounded-lg bg-nav p-3 ring-1 ring-slate-400/10">
                <label htmlFor="weight" className="text-sm text-slate-400">
                  Weight (kg)
                </label>
                <Input
                  value={weight}
                  onChange={(e) => setWeight(Number(e.currentTarget.value))}
                  type="text"
                  id="weight"
                />
              </div>
              <div className="w-full space-y-2">
                <Button className="w-full text-center" disabled={!file}>
                  {isLoading ? <Spinner /> : "Upload photo"}
                </Button>
                <Button
                  className="w-full"
                  onClick={() => setFile(undefined)}
                  variant="danger"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}
      </form>
    </>
  );
}
export default FileDropZone;
