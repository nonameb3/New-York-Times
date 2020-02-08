import React from "react";
import moment from "moment";
import "./carditem.style.scss";

function cardItemComponens({ image, header, date, source, info }) {
  const dateString = moment(date).format("DD/MM/YYYY HH:mm");

  console.log("render carditem");
  return (
    <div className='item-float'>
      <div>
        <img src={image} width='250px' alt='' />
      </div>
      <div className='item-contents'>
        <span className='item-contents head'>{header}</span>
        <span className='item-contents date'>
          {dateString} - {source}
        </span>
        <p>{info}</p>
      </div>
    </div>
  );
}

// use react memo for memorization
export default React.memo(cardItemComponens);
