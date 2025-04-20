import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState
} from 'react';

export type UploadInputRef = {
  file: File | null;
};

type UploadInputProps = {
  label?: string;
  placeholder?: string;
};

const UploadInput = forwardRef<UploadInputRef, UploadInputProps>(
  ({ label = 'Upload File', placeholder = 'Click to upload' }, ref) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);
    const fileRef = useRef<File | null>(null);

    useImperativeHandle(ref, () => ({
      get file() {
        return fileRef.current;
      }
    }));

    function handleClick() {
      inputRef.current?.click();
    }

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
      const file = e.target.files?.[0];
      fileRef.current = file ?? null;
      setFileName(file?.name || null);
    }

    return (
      <div className="flex flex-col items-start space-y-2 w-full">
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <div
          onClick={handleClick}
          className="cursor-pointer w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-md hover:border-orange-500 text-sm text-gray-500 bg-gray-50 transition-colors duration-200"
        >
          {fileName ? (
            <span className="text-gray-800">{fileName}</span>
          ) : (
            <span>{placeholder}</span>
          )}
        </div>
        <input
          ref={inputRef}
          type="file"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    );
  }
);

UploadInput.displayName = 'UploadInput';

export { UploadInput };
