import React, { useState, useEffect } from "react";
import NameForm from "./Components/Nameform";
import NameList from "./Components/NameList";
import SearchBar from "./Components/SearchBar";

const App: React.FC = () => {
  const [names, setNames] = useState<string[]>([
    "Garv",
    "Jitu",
    "Karan",
    "Ekagra",
  ]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchAlert, setSearchAlert] = useState<"found" | "notfound" | "">("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const addName = (name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;

    const alreadyExists = names.some(
      (n) => n.toLowerCase() === trimmed.toLowerCase()
    );

    if (alreadyExists) {
      setErrorMessage(` "${trimmed}" already exists in the list.`);
      return;
    }

    setNames((prev) => [...prev, trimmed]);
    setSuccessMessage(` "${trimmed}" was successfully added!`);
    setErrorMessage("");
  };

  const deleteName = (nameToDelete: string) => {
    setNames((prev) => prev.filter((n) => n !== nameToDelete));
  };

  const filteredNames = names.filter((name) =>
    name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Search alert effect
  useEffect(() => {
    if (searchQuery === "") {
      setSearchAlert("");
    } else if (filteredNames.length > 0) {
      setSearchAlert("found");
    } else {
      setSearchAlert("notfound");
    }

    const timeout = setTimeout(() => {
      setSearchAlert("");
    }, 2500);

    return () => clearTimeout(timeout);
  }, [searchQuery, filteredNames]);

  // Auto-dismiss error and success alerts
  useEffect(() => {
    if (errorMessage || successMessage) {
      const timeout = setTimeout(() => {
        setErrorMessage("");
        setSuccessMessage("");
      }, 2500);

      return () => clearTimeout(timeout);
    }
  }, [errorMessage, successMessage]);

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <div className="text-center mb-4">
        <h2 className="fw-semibold">👥User Info</h2>
        <p className="text-muted">Add, search and manage names easily</p>
      </div>

      <div className="card shadow-sm p-4 border-0">
        <SearchBar onSearch={setSearchQuery} />

        {searchAlert === "found" && (
          <div className="alert alert-success py-2" role="alert">
            Match found!
          </div>
        )}
        {searchAlert === "notfound" && (
          <div className="alert alert-warning py-2" role="alert">
            No match found.
          </div>
        )}
        {successMessage && (
          <div className="alert alert-success py-2" role="alert">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="alert alert-danger py-2" role="alert">
            {errorMessage}
          </div>
        )}

        <NameForm onAdd={addName} />
        <hr className="my-3" />
        <NameList names={filteredNames} onDelete={deleteName} />
      </div>
    </div>
  );
};

export default App;
