import React from "react";

const NotFoundPage: React.FC = () => {
  return (
    <div
      style={{
        justifyContent: "center",
        display: "flex",
        alignItems: "center",
        marginLeft: "15%",
        marginRight: "10%",
      }}
      className='row'
    >
      <h1 className={"display-3"}>404: Page Not Found</h1>
      <p className={"lead"}>
        Sorry you tried to reach a page that does not exist.
      </p>
    </div>
  );
};
export default NotFoundPage;
