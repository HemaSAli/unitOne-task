import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import './style.css';
import ItemElement from './ItemElement';

class ItemList extends Component {
  componentWillMount() {
    const { store } = this.props;
    axios.get('/items?$sort[createdAt]=-1').then((result) => {
      const { data } = result.data;
      store.updateItems(data);
    });
  }

  next = () => {
    const { store } = this.props;
    store.incCounter();
    store.loading();
    const { skip } = store.items;
    const skipItem = skip * 9;
    setTimeout(() => {
      axios.get(`/items?$skip=${skipItem}&$sort[createdAt]=-1`).then((result) => {
        store.loading();
        const { data } = result.data;
        if (data.length) {
          store.updateItems(data);
        } else {
          store.decCounter();
        }
      });
    }, 300);
  };

  prev = () => {
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

  addItem = () => {
    const { store } = this.props;
    store.items.add = true;
    store.setMessage(null);
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
          {items.itemsArray.map(item => (
            <ItemElement key={item.id} item={item} store={store} />
          ))}
        </ul>
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

ItemList.propTypes = {
  store: PropTypes.instanceOf(Object).isRequired,
};


export default observer(ItemList);
