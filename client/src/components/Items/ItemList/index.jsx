import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import './style.css';
import ItemElement from './ItemElement';

// ItemList Main Class

class ItemList extends Component {
  // get The List of Items from Database and sort it , so show the last items
  componentWillMount() {
    const { store } = this.props;
    axios.get('/items?$sort[createdAt]=-1').then((result) => {
      const { data } = result.data;
      store.updateItems(data); // Update the Items in ItemsArray In Store class
    });
  }

  // get the Next 9 Items
  next = () => {
    const { store } = this.props;
    store.incCounter(); // skip in Store is 0 by defaulf > increament It
    store.loading(); // Start Loading
    const { skip } = store.items; // get The skip value
    const skipItem = skip * 9; // For exaple if skip = 1 > Skip item = 9*1 = 9
    setTimeout(() => {
      // Request Element from server and skip 9 element
      axios.get(`/items?$skip=${skipItem}&$sort[createdAt]=-1`).then((result) => {
        store.loading(); // stop loading
        const { data } = result.data;
        if (data.length) { // check if Result is not Empty
          store.updateItems(data);
        } else {
          store.decCounter();
        }
      });
    }, 300);
  };

  prev = () => { // Same as Next but decreamnt the counter
    const { store } = this.props;
    store.decCounter();
    store.loading();
    const { skip } = store.items;
    const skipItem = skip * 9;
    setTimeout(() => {
      axios.get(`/items?$skip=${skipItem}&$sort[createdAt]=-1`).then((result) => {
        store.loading();
        const { data } = result.data;
        if (data.length) {
          store.updateItems(data);
        }
      });
    }, 300);
  };

  addItem = () => { // show the div of Add Item by set the value to true
    const { store } = this.props;
    store.items.add = true;
    store.setMessage(null); // clear the message
  };

  render() {
    const { store } = this.props;
    const { items } = store;
    return (
      <div className="items_box">
        <h1 className="item_box-title">Items List </h1>
        <button type="button" className="add_item" onClick={this.addItem}>
          <i className="fas fa-plus" />
          ADD
        </button>
        <hr />
        <ul className="items_list">
          {/* Send the Array to  ItemElement Class */}
          {items.itemsArray.map(item => (
            <ItemElement key={item.id} item={item} store={store} />
          ))}
        </ul>
        {/* Controling the Next and Prev Buttons */}
        {store.items.skip > 0 ? (
          <button type="button" className="button_prev" onClick={this.prev}>
            <i className="fas fa-backward" />
          </button>
        ) : null}
        {store.total === 9 ? (
          <button type="button" className="button_next" onClick={this.next}>
            <i className="fas fa-forward" />
          </button>
        ) : null}
      </div>
    );
  }
}

// Set the PropsType
ItemList.propTypes = {
  store: PropTypes.instanceOf(Object).isRequired,
};


export default observer(ItemList);
