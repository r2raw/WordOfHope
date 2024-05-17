import React from "react";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";

function AttendancesFilter({ filter, setFilter }) {
  return (
    <div id="new-input-group">
      <input
        type="text"
        value={filter || ""}
        placeholder=" "
        onChange={(e) => {
          setFilter(e.target.value);
        }}
      />
      <span className="new-floating-label">Search</span>
      <span className="new-floating-icon"><SearchSharpIcon /></span>
    </div>
  );
}

export default AttendancesFilter