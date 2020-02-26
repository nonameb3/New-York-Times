import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

function loadingIcon(props) {
  return <FontAwesomeIcon icon={faSpinner} {...props} />;
}

export default React.memo(loadingIcon, () => false);
