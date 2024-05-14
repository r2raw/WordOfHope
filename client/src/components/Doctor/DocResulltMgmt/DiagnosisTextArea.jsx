import React from "react";

function DiagnosisTextArea(props) {
  const { values, id, handleDiagnosticChange, deleteDiagnosis } = props;

  const handleDiagnosis = (e) => {
    const { value } = e.target;

    handleDiagnosticChange(value, id);
  };
  const handleDelete = (e) => {
    e.preventDefault();
    deleteDiagnosis(id);
  };
  return (
    <>
      <div id="new-input-group">
        <textarea
          className="card"
          name="diagnosis"
          value={values.diagnosis[id]}
          onChange={handleDiagnosis}
          placeholder=" "
          required
          maxLength={500}
        />
        <span className="new-floating-label">Diagnosis</span>
        <span className="word-count">{values.diagnosis[id].length}/500</span>
      </div>
      {id > 0 && (
        <button className="danger solid fade" onClick={handleDelete}>
          Delete
        </button>
      )}
    </>
  );
}

export default DiagnosisTextArea;
