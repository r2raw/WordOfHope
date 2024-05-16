import React, { useState } from "react";
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import { Link } from "react-router-dom";
import SearchedPatientAddResult from "../ExistingAddResult/SearchedPatientAddResult";
import axios from "axios";
function AddExistingPatientResult() {
  const [searchValue, setSearchValue] = useState();
  const [foundPatient, setFoundPatient] = useState();
  const [searching, setSearching] = useState(false);
  const handleInputChange = (e) => {
    const { value } = e.target;

    setSearchValue(value);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `/search-existing-patient/${searchValue}`
      );

      setSearching(true);
      if (response.status === 200) {
        setFoundPatient(response.data);
      }
    } catch (error) {
      console.error("search-existin-error: " + error.message);
    }
  };
  return (
    <div className="admin-element add-result">
      <div>
        <Link to="../Result-Management">
          <ArrowBackSharpIcon />
        </Link>
      </div>
      <h1>Add Result</h1>
      <div className="search-patient">
        <div id="new-input-group">
          <input
            className="card"
            type="text"
            name="search-value"
            placeholder=" "
            value={searchValue}
            onChange={handleInputChange}
          />
          <span className="new-floating-label">Patient ID</span>
        </div>
        <button className="solid fade" onClick={handleSearch}>
          Search
        </button>
      </div>
      {searching ? (
        foundPatient.length > 0 ? (
          <SearchedPatientAddResult foundPatient={foundPatient} />
        ) : (
          <h1>Patient Not Found!</h1>
        )
      ) : null}
    </div>
  );
}

export default AddExistingPatientResult;
