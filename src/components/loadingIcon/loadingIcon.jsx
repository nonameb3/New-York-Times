import React from 'react';
import PropsTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

function loadingIcon({ style }) {
  return <FontAwesomeIcon icon={faSpinner} className="fa-spin" style={style} />;
}

loadingIcon.propTypes = {
  style: PropsTypes.instanceOf(Object),
};

loadingIcon.defaultProps = {
  style: {},
};

export default React.memo(loadingIcon, () => false);
