import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";

export const Editcell = ({ getValue, onSave, isEditing }) => {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);

  const onBlur = () => {
    onSave(value);
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  if (isEditing === false) {
    return <p>{getValue()}</p>;
  }

  return (
    <>
      <Input
        className="h-7 "
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        onBlur={onBlur}
      />
    </>
  );
};
