import React from 'react';
import './App.css';
import ItemStore from './components/Items/ItemStore';
import Items from './components/Items';

const App = () => <Items store={ItemStore} />;
export default App;
