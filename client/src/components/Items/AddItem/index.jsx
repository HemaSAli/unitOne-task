import React, { Component } from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import './style.css';
import axios from 'axios';

// AddItem Component

class AddItem extends Component {
  // Function of Add Item
  addItem = (event, store) => {
    store.loading();
    event.preventDefault();
    const { title, description, img } = store.items;
    const newItem = { title, description, img };
    if (title.trim() && description.trim() && img.trim()) { // Check that Fields not Empty
      setTimeout(() => { // Set Timeout of Add Item
        axios
          .post('/items', newItem) // send the Object on the route Item using Post method
          .then((result) => {
            store.loading(); // switch loading after recive the result
            if (result.status === 201) {
              const { data } = result;
              store.pushItem(data); // Push the Item in the ItemArray Of store
              store.setMessage('Added Successfully .. '); // Set the Message
            }
          })
          .catch((error) => {
            store.loading();
            const { status } = error.response;
            if (status === 400) { // handling 400 Bad Request Error Which send from the Server
              store.setMessage('Please fill all the fields !'); // Set Message
            } else {
              store.setMessage('Server Error ! '); // Set Message of Server Error
            }
          });
      }, 300);
    } else {
      store.loading();
      store.setMessage('Please fill all the fields !'); // Set Message if any of Inputs Is empty
    }
  };

  render() {
    const { store } = this.props;
    const { message } = store.items;
    return (
      <div className="add_box">
        <h2>Add New Item</h2>
        <hr />
        {/* Form Of AddItem  */}
        <form
        // Send the Store and event to function onSubmit
          onSubmit={event => this.addItem(event, store)}
          className="add_form"
        >
          <input
            type="text"
            className="input_new"
            name="title"
            placeholder="Title"
            onChange={store.handleChange}
            value={store.items.title}
          />
          <input
            type="text"
            className="input_new"
            name="img"
            placeholder="Img link"
            onChange={store.handleChange}
            value={store.items.img}
          />
          <textarea
            cols="10"
            type="text"
            className="input_new"
            name="description"
            placeholder="Description"
            onChange={store.handleChange}
            value={store.items.description}
          />
          <input type="submit" value="Submit" className="input_submit" />
          {/* Show Message if exist > error or Success */}
          {message ? <h3 className="message">{message}</h3> : null}
        </form>
      </div>
    );
  }
}
// Set the PropsType
AddItem.propTypes = {
  store: PropTypes.instanceOf(Object).isRequired,
};

export default observer(AddItem);
