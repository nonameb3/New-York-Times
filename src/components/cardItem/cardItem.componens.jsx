import React from "react";
import './carditem.style.scss';

function cardItemComponens({ image, header, date, info }) {
  return (
    <div className='item-float'>
      <div>
        <img src={image} width='250px' alt=""/>
      </div>
      <div className='item-contents'>
        <span className='item-contents head'>{header}</span>
        <span className='item-contents date'>{date}</span>
        {info}
      </div>
    </div>
  );
}

export default cardItemComponens;
