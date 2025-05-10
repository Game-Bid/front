"use client";
import CustomIcon from "@/Icons/Icon";
import { useState, useRef, useEffect } from "react";
import { showToast } from "./Toast";

interface Props {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

const Dnd = ({ files, setFiles }: Props) => {
  const [duplicationMessage, setDuplicationMessage] = useState<string | null>(
    null
  );
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [newImageIndex, setNewImageIndex] = useState<number[]>([]);
  const dropRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (duplicationMessage) {
      const timer = setTimeout(() => setDuplicationMessage(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [duplicationMessage]);

  useEffect(() => {
    imageUrls.forEach((url) => URL.revokeObjectURL(url));

    const prevCount = imageUrls.length;
    const newUrls = files.map((file) => URL.createObjectURL(file));
    setImageUrls(newUrls);

    if (newUrls.length > prevCount) {
      const newIndices = Array.from(
        { length: newUrls.length - prevCount },
        (_, i) => prevCount + i
      );
      setNewImageIndex(newIndices);

      const timer = setTimeout(() => {
        setNewImageIndex([]);
      }, 1000);

      return () => {
        clearTimeout(timer);
        newUrls.forEach((url) => URL.revokeObjectURL(url));
      };
    }

    return () => {
      newUrls.forEach((url) => URL.revokeObjectURL(url));
    };
    /* eslint-disable */
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
      showToast(
        "warning",
        "파일 형식 오류",
        "타입에 맞는 파일형식을 제출해주세요."
      );
    }

    if (filteredFiles.length > 0) {
      addFiles(filteredFiles);
    }
  };

  const addFiles = (newFiles: File[]) => {
    // console.log(newFiles);
    const existingFileNames = files.map((file) => file.name);
    // let duplicateFileName: string | null = null;

    const filteredFiles = newFiles.filter((file) => {
      if (existingFileNames.includes(file.name)) {
        // duplicateFileName = file.name;
        showToast(
          "warning",
          "중복 파일 제출",
          "똑같은 파일이 업로드 되었습니다."
        );
        return false;
      }
      return true;
    });

    const totalFiles = files.length + filteredFiles.length;

    if (totalFiles > 10) {
      showToast(
        "warning",
        "파일 갯수 초과",
        "파일업로드는 10개까지 가능합니다."
      );
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
          className="w-full relative border border-dashed border-borderDefault bg-fillGrayDefault p-1 text-center rounded-lg flex-center flex-col "
        >
          {files.length === 0 ? (
            <>
              <CustomIcon icon="Image_Icon" className="w-[2rem] h-[2rem]" />
              <div className="flex-center gap-[6px] text-0.875 mt-[12px]">
                <p className="text-fgPrimaryAccent ">클릭</p>
                <p>혹은 드래그</p>
              </div>
              <p className="text-[#A3A3A3] text-0.75 mt-[2px]">
                JPG, JPEG, PNG 포맷 5MB 이하, 최대 10장
              </p>
            </>
          ) : (
            <div className="flex-center flex-wrap gap-1">
              {imageUrls.map((url, idx) => (
                <div key={url + idx} className="w-fit h-fit relative group">
                  <img
                    src={url}
                    alt={`파일 ${idx + 1}`}
                    className={`w-[100px] h-[80px] tablet:w-[64px] tablet:h-[64px] object-cover rounded-md transition-all ${
                      newImageIndex.includes(idx)
                        ? "opacity-90 blur-[2px]"
                        : "group-hover:opacity-90 group-hover:blur-[2px]"
                    }`}
                  />
                  <div
                    className={`absolute inset-0 items-center justify-center flex-col gap-[8px]  ${
                      newImageIndex.includes(idx) ? "flex" : "hidden"
                    }`}
                  >
                    <p className="text-fgPrimaryFocused text-0.75 font-medium">
                      업로딩...
                    </p>
                    <div className=" w-[80px] h-[4px] tablet:w-[34px] tablet:h-[4px] bg-fgPrimaryFocused rounded-max overflow-hidden">
                      <div className="animate-expandWidth h-full bg-[#00DF80]"></div>
                    </div>
                  </div>
                  <div
                    className={`absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity `}
                  >
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        const newFiles = [...files];
                        newFiles.splice(idx, 1);
                        setFiles(newFiles);
                      }}
                      className="p-0.25 rounded-md bg-systemFailed"
                    >
                      <CustomIcon
                        icon="TRASH"
                        className="w-[1.25rem] h-[1.25rem]"
                      />
                    </button>
                  </div>
                </div>
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
