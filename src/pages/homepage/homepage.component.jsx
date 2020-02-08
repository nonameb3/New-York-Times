import React from "react";
import "./homepage.style.scss";

function homepageComponent() {
  return (
    <div className="homepage">
      <h1>New York Times</h1>
      <div className='tools'>
        <input type='text' />
      </div>
      <div className='items-container'>
        <div className='item'>
          <div>
            <img
              src='https://static01.nyt.com/images/2020/02/06/us/politics/06DC-Navy-Bloomberg/merlin_165128382_e7f94f44-9c35-4524-b2c6-2db141723674-articleLarge.jpg'
              width='250px'
            />
          </div>
          <div className='item-content'>
            <span className='item-contents-head'>header</span>
            <span className='item-contents-date'>date -art</span>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia
            iure, tempora aperiam enim magni quod modi optio pariatur similique
            nulla. Consequuntur doloribus incidunt, quia illo minima sed autem
            vero debitis.
          </div>
        </div>
      </div>
    </div>
  );
}

export default homepageComponent;
