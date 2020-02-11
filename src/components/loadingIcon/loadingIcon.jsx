import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

function loadingIcon({ style }) {
  return <FontAwesomeIcon icon={faSpinner} className="fa-spin" style={style} />
}

export default React.memo(loadingIcon,() => false);
