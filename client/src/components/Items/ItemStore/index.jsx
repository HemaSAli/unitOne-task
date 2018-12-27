/*
Creating the Item Store and set the Observable Values and actions and computed
*/
import {
  decorate, observable, action, computed,
} from 'mobx';

class ItemStore {
  items = { // Ovservable Values
    itemsArray: [], // array of Items
    title: '',
    img: 'https://images.pexels.com/photos/5390/sunset-hands-love-woman.jpg?cs=srgb&dl=beautiful-hands-heart-5390.jpg&fm=jpg',
    description: '',
    skip: 0, // number of Skips
    loading: false, // show Loading ?
    Item: null, // Selected Item
    add: true, // add Component ?
  };

  setMessage = (message) => { // Set Message if error or Success
    this.items.message = message;
  };

  incCounter = () => { // Increament the Counter of Skip
    this.items.skip += 1;
  };

  decCounter = () => { // Decreamnt the Counter of Skip
    this.items.skip -= 1;
    if (this.items.skip < 0) { // Stop the Decreament if Less than 0
      this.items.skip = 0;
    }
  };

  get total() { // total of Items in Array
    return this.items.itemsArray.length;
  }

  updateItems(items) { // Update The Items in Array
    this.items.itemsArray = items;
  }

  setItem = (item) => { // Set the Selected Item to be View
    this.items.item = item;
  };

  handleChange = (event) => { // Handling the Change of Inputs
    const { name, value } = event.target;
    this.items[name] = value;
  };

  pushItem(item) { // Push Item to Array after Add
    this.items.itemsArray.unshift(item);
    const { itemsArray } = this.items;
    if (itemsArray.length > 9) {
      this.items.itemsArray.pop(); // Pop the last one If the length of Array become > 9
    }
    this.resetValues(); // Reset the inputs After Add
  }

  resetValues = () => {
    this.items.title = '';
    this.items.description = '';
    this.items.img = 'https://images.pexels.com/photos/5390/sunset-hands-love-woman.jpg?cs=srgb&dl=beautiful-hands-heart-5390.jpg&fm=jpg';
  };

  loading = () => { // Switch the Loading value
    this.items.loading = !this.items.loading;
  };
}

decorate(ItemStore, { // Set the Decorats
  items: observable, // Set Items as observable Values
  // actions
  pushItem: action,
  showMore: action,
  handleChange: action,
  updateItems: action,
  setItem: action,
  // computed
  total: computed,
});

export default new ItemStore();
