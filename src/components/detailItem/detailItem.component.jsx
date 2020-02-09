import React from "react";
import './detailItem.style.scss';

function DetailItemComponent(props) {
  const {imageUrl, abstract, paragraph, source, original,header, date} = props;

  return (
    <div className="detail-container">
      <div className='detail-main-image'>
        <img src={imageUrl} alt='' />
      </div>
      <div className='detail-content'>
        <h4 className='header'>
          {header}
          <span className='Header date'>{date}</span>
        </h4>
        <p>{abstract}</p>
        <p>{paragraph}</p>
        <p className='detail footer'>
          {source}
          <span>{original}</span>
        </p>
      </div>
    </div>
  );
}

export default DetailItemComponent;
