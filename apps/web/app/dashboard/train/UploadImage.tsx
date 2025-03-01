"use client";
import React, { useState } from "react";
import Image from "next/image";
import JSZip from "jszip";
import axios from "axios";

const UploadImage = ({
  onUploadDone,
}: {
  onUploadDone: (zipUrl: string) => void;
}) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const setUpFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFiles([...selectedFiles, ...Array.from(event.target.files)]);
      const files = event.target.files;
      const zip = new JSZip();
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL!}/pre-signed-url`
      );
      console.log(res);
      if (res.status == 200) {
        const key = res.data.key;
        const url = res.data.url;
        console.log(key, url);
        for (const file of files) {
          const content = await file.arrayBuffer();
          zip.file(file.name, content);
        }
        const zipFile = await zip.generateAsync({ type: "blob" });
        const formData = new FormData();
        formData.append("file", zipFile);
        formData.append("key", key);
        const resdata = await axios.put(url, formData, {
          headers: {
            "Content-Type": "application/zip",
          },
        });
        if (resdata) {
          onUploadDone(`${process.env.NEXT_PUBLIC_CLOUDFLARE_URL!}/${key}`);
        }
      }
    }
  };
  return (
    <div className="flex flex-col mt-5 gap-2 w-full">
      <label>Photos</label>
      <label className="flex flex-col items-center justify-center w-full h-60 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            SVG, PNG, JPG or GIF (MAX. 800x400px)
          </p>
        </div>
        <input
          onChange={setUpFile}
          id="dropzone-file"
          type="file"
          multiple
          className="hidden"
          accept="image/png, image/jpeg, image/gif, image/svg+xml"
        />
      </label>
      {selectedFiles.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-4">
          {selectedFiles.map((file, index) => (
            <div key={index} className="relative">
              <Image
                width={100}
                height={100}
                src={URL.createObjectURL(file)}
                alt="preview"
                className="w-24 h-24 object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default UploadImage;
