import {
  decorate, observable, action, computed,
} from 'mobx';

class ItemStore {
  items = {
    itemsArray: [],
    title: '',
    img: 'https://images.pexels.com/photos/5390/sunset-hands-love-woman.jpg?cs=srgb&dl=beautiful-hands-heart-5390.jpg&fm=jpg',
    description: '',
    skip: 0,
    loading: false,
    Item: null,
    add: true,
    done: false,
  };

  setMessage = (message) => {
    this.items.message = message;
  };

  incCounter = () => {
    this.items.skip += 1;
  };

  decCounter = () => {
    this.items.skip -= 1;
    if (this.items.skip < 0) {
      this.items.skip = 0;
    }
  };

  get total() {
    return this.items.itemsArray.length;
  }

  updateItems(items) {
    this.items.itemsArray = items;
  }

  setItem = (item) => {
    this.items.item = item;
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.items[name] = value;
  };

  pushItem(item) {
    this.items.itemsArray.unshift(item);
    const { itemsArray } = this.items;
    if (itemsArray.length > 9) {
      this.items.itemsArray.pop();
    }
    this.resetValues();
  }

  resetValues = () => {
    this.items.title = '';
    this.items.description = '';
    this.items.img = 'https://images.pexels.com/photos/5390/sunset-hands-love-woman.jpg?cs=srgb&dl=beautiful-hands-heart-5390.jpg&fm=jpg';
  };

  loading = () => {
    this.items.loading = !this.items.loading;
  };
}

decorate(ItemStore, {
  items: observable,
  pushItem: action,
  showMore: action,
  handleChange: action,
  updateItems: action,
  setItem: action,
  total: computed,
});

export default new ItemStore();
