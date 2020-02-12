import React from "react";
import "./loadmore.style.scss";

import LoadingIcon from "../loadingIcon/loadingIcon";

const visibleStyles = { 
  opacity: 1,
  fontSize: "1.5rem",
  position: 'absolute' 
};
const hiddenStyles = { opacity: 0 };
function LoadmoreComponent({ isVisible, isLoading, onClickFn }) {
  return (
    <div className={`showmore-layout ${isVisible?'':'hidden'}`}>
      <LoadingIcon style={isLoading ? visibleStyles :hiddenStyles} />
      <h4 onClick={onClickFn} style={!isLoading ? {} :hiddenStyles}>Show more</h4>
    </div>
  );
}

export default React.memo(LoadmoreComponent);
