import React, { Fragment, Component } from 'react';
import './style.css';
import PropTypes from 'prop-types';
import axios from 'axios';

class ItemElement extends Component {
  showDetails = (id) => {
    const { store } = this.props;
    store.items.loading = true;
    store.items.add = false;
    setTimeout(() => {
      axios.get(`/items/${id}`).then((result) => {
        store.items.loading = false;
        const { data } = result;
        store.setItem(data);
      });
    }, 1000);
  };

  render() {
    const { item } = this.props;
    return (
      <Fragment>
        <li key={item.id} className="item_element">
          <button type="button" className="item_li" onClick={() => this.showDetails(item.id)}>
            {item.title}
          </button>
        </li>
        <hr />
      </Fragment>
    );
  }
}

ItemElement.propTypes = {
  store: PropTypes.instanceOf(Object).isRequired,
  item: PropTypes.instanceOf(Object).isRequired,
};

export default ItemElement;
