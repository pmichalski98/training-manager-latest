import { type ChangeEvent, type FormEvent, useState } from "react";
import { api } from "~/utils/api";
import FormData from "form-data";
import Button from "~/components/ui/Button";
import Image from "next/image";
import { AiFillDelete } from "react-icons/ai";

interface Fields {
  "Content-Type": string;
  file: File;
  Policy: string;
  "X-Amz-Signature": string;
}

function FileDropZone() {
  const [file, setFile] = useState<File>();
  const utils = api.useContext();

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    setFile(e.currentTarget.files?.[0]);
  }
  const { mutateAsync: getPresignedUrl } = api.photos.uploadPhoto.useMutation(
    {}
  );

  async function handleFileUpload(e: FormEvent) {
    e.preventDefault();
    if (!file) return;
    const { url, fields } = await getPresignedUrl();

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
        className=" flex flex-col"
        onSubmit={(e) => {
          handleFileUpload(e).catch(console.error);
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
            className="absolute left-0 top-0 h-full w-full cursor-pointer bg-rose-400 opacity-0  "
            id="file"
            type="file"
            onChange={handleFileChange}
          />
        </div>
        {file && (
          <div className="mt-10 flex  gap-2 ">
            <Image
              src={URL.createObjectURL(blob)}
              alt={"Photo to upload"}
              width={50}
              height={50}
            />
            <AiFillDelete size={20} onClick={() => setFile(undefined)} />
            <Button disabled={!file}>Upload file</Button>
          </div>
        )}
      </form>
    </>
  );
}
export default FileDropZone;
