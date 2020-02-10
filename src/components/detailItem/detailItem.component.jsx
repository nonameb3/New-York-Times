import React from "react";
import moment from "moment";
import "moment/locale/th";
import "./detailItem.style.scss";

import breakingImage from "../../assets/image/breaking.png";

function shouldRenderHyperlink(webUrl) {
  if (!webUrl) return;

  return (
    <a href={`${webUrl}`} target='_blank' rel='noopener noreferrer'>
      Click to read on New York Times.
    </a>
  );
}

function DetailItemComponent(props) {
  const {
    imageUrl,
    abstract,
    paragraph,
    source,
    original,
    header,
    date,
    webUrl
  } = props;
  const dateString = moment(date).format("DD/MM/YYYY HH:mm");
  const image = imageUrl ? imageUrl : breakingImage;

  return (
    <div className='detail-container'>
      <div className='detail-main-image'>
        <img src={image} alt='' />
      </div>
      <div className='detail-content'>
        <h4 className='header'>
          {header}
          <span className='header date'> - {dateString}</span>
        </h4>
        <p>{abstract}</p>
        <p>{paragraph === abstract ? null : paragraph}</p>
        {shouldRenderHyperlink(webUrl)}
        <p className='detail footer'>
          Source by: {source}
          <span>{original}</span>
        </p>
      </div>
    </div>
  );
}

export default DetailItemComponent;
