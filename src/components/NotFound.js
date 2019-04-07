import React from "react";
import { Link } from "react-router-dom";

export default function NotFound(props) {
  return (
    <>
      <div className="row">
        <div className="col-12 aling-self-center text-center">
          <h4 className="mb-0">Oops!</h4>
          <span className="font-italic">Page not found :(</span>
          <h1>404</h1>
          <Link to="/">Back to Home</Link>
        </div>
      </div>
    </>
  );
}
