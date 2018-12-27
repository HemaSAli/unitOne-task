import React from 'react';
import './style.css';
import PropTypes from 'prop-types';
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
              src={item.img}
              alt=""
            />

            <div className="item_description">{item.description}</div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

ItemDetails.propTypes = {
  store: PropTypes.instanceOf(Object).isRequired,
};


export default observer(ItemDetails);
