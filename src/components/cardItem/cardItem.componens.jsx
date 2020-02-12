import React from "react";
import moment from "moment";
import "./carditem.style.scss";

function cardItemComponens({ image, header, date, source, info, onClick }) {
  const timeDiff = moment().diff(moment(date), 'minutes',false);
  let dateString = moment(date).format("DD/MM/YYYY HH:mm");
  if (timeDiff <= 60 && timeDiff > 0) {
    dateString = moment(date).fromNow();
  }

  return (
    <div className='item-float'>
      <div>
        <img src={image} width='250px' alt='' />
      </div>
      <div className='item-contents'>
        <span className='item-contents head' onClick={onClick ? onClick : null}>
          {header}
        </span>
        <span className='item-contents date'>
          {`${dateString}  ${source ? ' - '+source: ''}`}
        </span>
        <p>{info}</p>
      </div>
    </div>
  );
}

// use react memo for memorization
export default React.memo(cardItemComponens);
