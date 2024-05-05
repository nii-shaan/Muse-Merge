import React from "react";
import { Controller } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function TextEditor({ name, control, label, defaultValue = "" }) {
  return (
    <div className="max-w-[1000px] w-[80%] min-h-[500px] min-w-[250px] bg-white">
      {label && <label className="text-sm text-white">{label}</label>}
      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange } }) => (
          <ReactQuill
            theme="snow"
            defaultValue={defaultValue}   
            onChange={onChange}
          />
        )}
      />
    </div>
  );
}

export default TextEditor;
