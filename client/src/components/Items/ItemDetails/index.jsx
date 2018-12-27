import React from 'react';
import './style.css';
import { observer } from 'mobx-react';

const ItemDetails = (props) => {
  const { store } = props;
  const { item } = store.items;

  return (
    <div className="item_details">
      {item ? (
        <div>
          <h2 className="item_title">{item.title}</h2>
          <hr />
          <div>
            <img
              className="item_image"
              src="https://images.pexels.com/photos/5390/sunset-hands-love-woman.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt=""
            />

            <div className="item_description">{item.description}</div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default observer(ItemDetails);
