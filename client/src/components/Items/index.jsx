import React, { Component } from 'react';
import './style.css';
import { observer } from 'mobx-react';
import ItemList from './ItemList';
import Loading from '../common/Loading';
import ItemDetails from './ItemDetails';
import AddItem from './AddItem';

class Items extends Component {
  state = {};

  render() {
    const { store } = this.props;
    return (
      <div className="items_container">
        {store.items.loading ? <Loading /> : null}
        <ItemList store={store} />
        {store.items.add ? <AddItem store={store} /> : <ItemDetails store={store} />}
      </div>
    );
  }
}

export default observer(Items);
