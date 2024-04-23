import React from "react";

function Error({ error }) {
  return (
    <div className="error">
      <div>
        <h3>OOPS :/</h3>
        <h1 style={{ fontWeight: "bold" }}>{error.message}</h1>
        <h6>{error.code}</h6>
      </div>
    </div>
  );
}

export default Error;
