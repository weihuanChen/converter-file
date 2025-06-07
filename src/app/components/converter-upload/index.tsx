"use client"
import { dropzoneStyles } from "@/app/styles/global";
import UploadIcon from "./icon";

export interface DropzoneProps {
  id: string;
  onFileChange: (files: FileList | null) => void;
  accept?: string;
  multiple?: boolean;
  className?:string;
  disabled?:boolean
}
const ConverterUpload: React.FC<DropzoneProps> = ({
  id,
  onFileChange,
  accept = "*/*",
  multiple = false,
  className = "",
  disabled = false
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFileChange(e.target.files);
  };
  return (
    <div className={`${dropzoneStyles.container} ${className}`}>
      <input
        id={id}
        name={`${id}-input`}
        type="file"
        className={dropzoneStyles.input}
        onChange={handleChange}
        accept={accept}
        multiple={multiple}
      />
      <label htmlFor={id} className={dropzoneStyles.label}>
         <span className={dropzoneStyles.iconContainer}>
          <UploadIcon />
        </span>
        <span className={dropzoneStyles.text}>
          Drag & drop or <span className={dropzoneStyles.highlightText}>upload a file</span>
        </span>
      </label>
    </div>
  );
};
export default ConverterUpload;
