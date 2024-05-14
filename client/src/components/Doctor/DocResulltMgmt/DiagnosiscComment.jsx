import React from "react";

function DiagnosiscComment(props) {
  const { values, handleInputChange } = props;

  return (
    <div id="new-input-group">
      <textarea
        className="card"
        value={values.comment}
        onChange={handleInputChange}
        name="comment"
        placeholder=" "
        maxLength={500}
      />
      <span className="new-floating-label">Comment</span>
      <span className="word-count">{values.comment.length}/500</span>
    </div>
  );
}

export default DiagnosiscComment;
