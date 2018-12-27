import React, { Component } from 'react';
import { observer } from 'mobx-react';
import './style.css';
import axios from 'axios';

class AddItem extends Component {
  addItem = (event, store) => {
    store.loading();
    event.preventDefault();
    const { title, description, img } = store.items;
    const newItem = { title, description, img };
    if (title.trim() && description.trim() && img.trim()) {
      setTimeout(() => {
        axios.post('/items', newItem).then((result) => {
          store.loading();
          if (result.status === 201) {
            const { data } = result;
            store.pushItem(data);
            store.setMessage('Added Successfully .. ');
          }
        });
      }, 1000);
    } else {
      store.loading();
      store.setMessage('Please fill all the fields !');
    }
  };

  render() {
    const { store } = this.props;
    const { message } = store.items;
    return (
      <div className="add_box">
        <h2>Add New Item</h2>
        <hr />
        <form
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
          {message ? <h3 className="message">{message}</h3> : null}
        </form>
      </div>
    );
  }
}

export default observer(AddItem);
