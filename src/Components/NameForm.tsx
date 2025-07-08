import React, { useState } from "react";
import type { NameFormProps } from "../types";

const NameForm: React.FC<NameFormProps> = ({ onAdd }) => {
  const [name, setName] = useState<string>("");

  const handleAdd = () => {
    onAdd(name);
    setName("");
  };

  return (
    <div className="input-group mt-3">
      <input
        type="text"
        value={name}
        placeholder="Enter name"
        onChange={(e) => setName(e.target.value)}
        className="form-control"
      />
      <button className="btn btn-primary" onClick={handleAdd}>
        Add
      </button>
    </div>
  );
};

export default NameForm;
