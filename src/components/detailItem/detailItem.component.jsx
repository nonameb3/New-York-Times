import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './detailItem.style.scss';

import breakingImage from '../../assets/image/breaking.png';

function shouldRenderHyperlink(webUrl) {
  if (!webUrl) return null;

  return (
    <a href={`${webUrl}`} target="_blank" rel="noopener noreferrer">
      Click to read on New York Times.
    </a>
  );
}

function DetailItemComponent(props) {
  const { imageUrl, abstract, paragraph, source, original, header, date, webUrl } = props;
  const dateString = moment(date).format('DD/MM/YYYY HH:mm');
  const image = imageUrl || breakingImage;

  return (
    <div className="detail-container">
      <div className="detail-main-image">
        <img src={image} alt="" />
      </div>
      <div className="detail-content">
        <h4 className="header">
          {header}
          <span className="header date">{` - ${dateString}`}</span>
        </h4>
        <p>{abstract}</p>
        <p>{paragraph === abstract ? null : paragraph}</p>
        {shouldRenderHyperlink(webUrl)}
        <p className="detail footer">
          {source ? `Source by: ${source}` : ''}
          <span>{original}</span>
        </p>
      </div>
    </div>
  );
}

DetailItemComponent.propTypes = {
  imageUrl: PropTypes.string,
  abstract: PropTypes.string,
  paragraph: PropTypes.string,
  source: PropTypes.string,
  original: PropTypes.string,
  header: PropTypes.string,
  date: PropTypes.string.isRequired,
  webUrl: PropTypes.string,
};

DetailItemComponent.defaultProps = {
  imageUrl: '',
  abstract: '',
  paragraph: '',
  source: '',
  original: '',
  header: '',
  webUrl: '',
};

export default DetailItemComponent;
