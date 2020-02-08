import React, { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import "./homepage.style.scss";

import { FectApiStart } from '../../reducer/new-york-time/nyt-action';
import CardItem from "../../components/cardItem/cardItem.componens";

function HomepageComponent() {
  const [articles, setArticles] = useState([]);
  const dispatch = useDispatch();
  const newYorkTimesData = useSelector(state => state.nytData)

  // role same as compoentDidmount
  useEffect(() => {
    dispatch(FectApiStart())
  },[dispatch]);

  // role same as compoentDidUpdate
  useEffect(() => {
    setArticles(newYorkTimesData.data)
  },[newYorkTimesData])

  return (
    <div className='homepage'>
      <h1>New York Times</h1>
      <div className='tools'>
        <input type='text' />
      </div>
      <div className='items-container'>
        {articles.map((e, index) => (
          <CardItem
            key={index}
            image='https://static01.nyt.com/images/2020/02/06/us/politics/06DC-Navy-Bloomberg/merlin_165128382_e7f94f44-9c35-4524-b2c6-2db141723674-articleLarge.jpg'
            header='hasdad'
            date='12/21/2010'
            info='inffofofo sdsdsqwewqewq., wqewqeqsit amet consectetur adipisicing elitsit amet consectetur adipisicing elitsit amet consectetur adipisicing elitsit amet consectetur adipisicing elitsit amet consectetur adipisicing elitsit amet consectetur adipisicing elit'
          />
        ))}
      </div>
    </div>
  );
}

export default HomepageComponent;
