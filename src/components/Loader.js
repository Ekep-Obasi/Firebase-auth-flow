import React from "react";
import { ThreeDots } from "react-loader-spinner";

const Loader = ({ visibility }) => {
  return (
    <div style={{ position: "fixed" }}>
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#0d6efd"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={visibility}
      />
    </div>
  );
};

export default Loader;
