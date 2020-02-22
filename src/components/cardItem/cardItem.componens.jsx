import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './carditem.style.scss';

function cardItemComponens({ image, header, date, source, info, onClick }) {
  const timeDiff = moment().diff(moment(date), 'minutes', false);
  let dateString = moment(date).format('DD/MM/YYYY HH:mm');
  if (timeDiff <= 60 && timeDiff > 0) {
    dateString = moment(date).fromNow();
  }

  return (
    <div className="item-float">
      <div>
        <img src={image} width="250px" alt="" />
      </div>
      <div className="item-contents">
        <span
          className="item-contents head"
          onKeyDown={e => e.preventDefault()}
          onClick={onClick}
          role="button"
          tabIndex="0"
        >
          {header}
        </span>
        <span className="item-contents date">
          {`${dateString}  ${source ? ` - ${source}` : ''}`}
        </span>
        <p>{info}</p>
      </div>
    </div>
  );
}

cardItemComponens.propTypes = {
  image: PropTypes.string,
  header: PropTypes.string,
  date: PropTypes.string.isRequired,
  source: PropTypes.string,
  info: PropTypes.string,
  onClick: PropTypes.func,
};

cardItemComponens.defaultProps = {
  image: '',
  header: '',
  source: '',
  info: '',
  onClick: () => {},
};

// use react memo for memorization
export default React.memo(cardItemComponens);
