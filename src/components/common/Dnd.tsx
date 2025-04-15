"use client";
import CustomIcon from "@/Icons/Icon";
import { useState, useRef, useEffect } from "react";

interface Props {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

const Dnd = ({ files, setFiles }: Props) => {
  const [duplicationMessage, setDuplicationMessage] = useState<string | null>(
    null
  );
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const dropRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    console.log(files);
  }, [files]);

  useEffect(() => {
    if (duplicationMessage) {
      const timer = setTimeout(() => setDuplicationMessage(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [duplicationMessage]);

  useEffect(() => {
    imageUrls.forEach((url) => URL.revokeObjectURL(url));

    const newUrls = files.map((file) => URL.createObjectURL(file));
    setImageUrls(newUrls);

    return () => {
      newUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [files]);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
    dropRef.current?.classList.add("border-blue-500");
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    dropRef.current?.classList.remove("border-blue-500");
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    dropRef.current?.classList.remove("border-blue-500");
    const droppedFiles = Array.from(e.dataTransfer.files);

    const filteredFiles = droppedFiles.filter((file) => {
      const fileType = file.name.split(".");
      const fileExtension = fileType[fileType.length - 1].toLowerCase();
      const acceptFile = ["jpg", "jpeg", "png", "gif", "webp", "heic", "heif"];
      return acceptFile.some((item) => item === fileExtension);
    });

    if (filteredFiles.length < droppedFiles.length) {
      alert("파일 형식 오류");
    }

    if (filteredFiles.length > 0) {
      addFiles(filteredFiles);
    }
  };

  const addFiles = (newFiles: File[]) => {
    console.log(newFiles);
    const existingFileNames = files.map((file) => file.name);
    // let duplicateFileName: string | null = null;

    const filteredFiles = newFiles.filter((file) => {
      if (existingFileNames.includes(file.name)) {
        // duplicateFileName = file.name;
        return false;
      }
      return true;
    });

    const totalFiles = files.length + filteredFiles.length;

    if (totalFiles > 10) {
      alert("파일 업로드는 10개까지 가능합니다.");
    } else {
      setFiles((prev) => [...prev, ...filteredFiles]);
    }

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div>
      <label htmlFor="fileInput" className="cursor-pointer w-full">
        <input
          type="file"
          id="fileInput"
          className="hidden"
          ref={fileInputRef}
          multiple
          onChange={(e) => {
            if (e.target.files) addFiles(Array.from(e.target.files));
          }}
          accept="image/*"
          max={10}
        />
        <div
          ref={dropRef}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className="w-[600px] relative border border-dashed border-borderDefault bg-fillGrayDefault p-[1rem] text-center rounded-[1rem] flex-center flex-col "
        >
          {files.length === 0 ? (
            <>
              <CustomIcon icon="Image_Icon" className="w-[2rem] h-[2rem]" />
              <div className="flex justify-center items-center gap-2 mt-[0.75rem] text-[0.875rem]">
                <p className="text-fgPrimaryAccent ">클릭</p>
                <p>혹은 드래그</p>
              </div>
              <p className="text-gray-500 text-[0.75rem] font-[#A3A3A3]">
                JPG, JPEG, PNG 포맷 5MB 이하, 최대 10장
              </p>
            </>
          ) : (
            <div className="flex flex-wrap gap-[1rem]">
              {imageUrls.map((url, idx) => (
                <img
                  key={idx}
                  src={url}
                  alt={`파일 ${idx + 1}`}
                  className="w-[6.25rem] h-[5rem] object-cover rounded-[0.75rem]"
                />
              ))}
              {files.length < 10 && (
                <label
                  htmlFor="fileInput"
                  className="flex-center w-[6.25rem] h-[5rem] bg-fillGrayDefault rounded-[0.75rem] border border-dashed border-borderDefault cursor-pointer"
                >
                  <CustomIcon
                    icon="Plus_Icon"
                    className="w-[2rem] h-[2rem] shrink-0"
                  />
                </label>
              )}
            </div>
          )}
        </div>
      </label>
    </div>
  );
};

export default Dnd;
