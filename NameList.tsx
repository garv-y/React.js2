import React from "react";
import type { NameListProps } from "../types";

const NameList: React.FC<NameListProps> = ({ names, onDelete }) => {
  return (
    <ul className="list-group">
      {names.length === 0 ? (
        <li className="list-group-item text-center text-muted">
          No names available.
        </li>
      ) : (
        names.map((name) => (
          <li
            key={name}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span>{name}</span>
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => onDelete(name)}
            >
              Delete
            </button>
          </li>
        ))
      )}
    </ul>
  );
};

export default NameList;
