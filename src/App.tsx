import React, { useState, useEffect } from "react";
import NameForm from "./Components/NameForm";
import NameList from "./Components/NameList";
import SearchBar from "./Components/SearchBar";

const App: React.FC = () => {
  const [names, setNames] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");
  const [searchAlert, setSearchAlert] = useState<"found" | "notfound" | "">("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  // Load from localStorage on mount
  useEffect(() => {
    const storedNames = localStorage.getItem("names");
    if (storedNames) {
      setNames(JSON.parse(storedNames));
    } else {
      setNames(["Garv", "Jitu", "Karan", "Ekagra"]); // Default values
    }
  }, []);

  // Save to localStorage when names change
  useEffect(() => {
    localStorage.setItem("names", JSON.stringify(names));
  }, [names]);

  const addName = (name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;

    const alreadyExists = names.some(
      (n) => n.toLowerCase() === trimmed.toLowerCase()
    );

    if (alreadyExists) {
      setErrorMessage(`"${trimmed}" already exists in the list.`);
      return;
    }

    setNames((prev) => [...prev, trimmed]);
    setSuccessMessage(`"${trimmed}" was successfully added!`);
    setErrorMessage("");
  };

  const deleteName = (nameToDelete: string) => {
    setNames((prev) => prev.filter((n) => n !== nameToDelete));
  };

  // Debounce searchQuery input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 800);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Auto-clear search input after 3 seconds of no typing
  useEffect(() => {
    if (searchQuery === "") return;

    const clearTimer = setTimeout(() => {
      setSearchQuery("");
      setDebouncedQuery("");
    }, 2500);

    return () => clearTimeout(clearTimer);
  }, [searchQuery]);

  const filteredNames = names.filter((name) =>
    name.toLowerCase().includes(debouncedQuery.toLowerCase())
  );

  // Search alert
  useEffect(() => {
    if (debouncedQuery === "") {
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
  }, [debouncedQuery, filteredNames]);

  // Auto-dismiss messages
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
        <h2 className="fw-semibold">👥 User Info</h2>
        <p className="text-muted">Add, search and manage names easily</p>
      </div>

      <div className="card shadow-sm p-4 border-0">
        <SearchBar onSearch={setSearchQuery} value={searchQuery} />

        {searchAlert === "found" && (
          <div className="alert alert-success py-2 mt-2" role="alert">
            Match found!
          </div>
        )}
        {searchAlert === "notfound" && (
          <div className="alert alert-warning py-2 mt-2" role="alert">
            No match found.
          </div>
        )}
        {successMessage && (
          <div className="alert alert-success py-2 mt-2" role="alert">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="alert alert-danger py-2 mt-2" role="alert">
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
