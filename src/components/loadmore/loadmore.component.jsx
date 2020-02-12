import React from "react";
import "./loadmore.style.scss";

import LoadingIcon from "../loadingIcon/loadingIcon";

function LoadmoreComponent({ isLoading, onClickFn }) {
  return (
    <div className="showmore-layout">
      {isLoading ? (
        <LoadingIcon style={{ fontSize: "1.5rem" }} />
      ) : (
        <h4 onClick={onClickFn}>Show more</h4>
      )}
    </div>
  );
}

export default React.memo(LoadmoreComponent);
