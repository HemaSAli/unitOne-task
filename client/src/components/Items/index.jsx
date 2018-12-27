import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { observer } from 'mobx-react';
import ItemList from './ItemList';
import Loading from '../common/Loading';
import ItemDetails from './ItemDetails';
import AddItem from './AddItem';

// Main Class Of Items, Switch Between Add Item or Item Details
const Items = (props) => {
  const { store } = props;
  return (
    <div className="items_container">
      {/* Show the Loading div if the Value of Loading it true  */}
      {store.items.loading ? <Loading /> : null}
      <ItemList store={store} />
      {store.items.add ? (
        <AddItem store={store} />
      ) : (
        <ItemDetails store={store} />
      )}
    </div>
  );
};
// Set the PropsType
Items.propTypes = {
  store: PropTypes.instanceOf(Object).isRequired,
};

export default observer(Items);
