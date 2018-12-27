import React from 'react';
import './App.css';
import ItemStore from './components/Items/ItemStore';
import Items from './components/Items';

const App = () => <Items store={ItemStore} />; // Send the Item Store to Items Copmonent
export default App;
