import React from "react";
import { useSelector } from "react-redux";
import LoadingReducer from "../../redux/reducers/LoadingReducer";
import loadding from "../../assets/images/loader_cms.gif";

const Loading = () => {
  const { isLoading } = useSelector((state) => state.LoadingReducer);

  if (isLoading === true) {
    return (
      <div
        style={{
          position: "fixed",
          zIndex: 9999,
          backgroundColor: "rgba(0,0,0,.9)",
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          className="loading__img"
          style={{ width: "150px", zIndex: "9999" }}
          src={loadding}
          alt="Loading"
        />
      </div>
    );
  }
};

export default Loading;
