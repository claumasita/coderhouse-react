import './App.css';
import NavBar from './components/NavBar/NavBar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer'
import Item from './components/Item/Item'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <NavBar />
      <Routes>
        <Route exact path="/" element={<ItemListContainer greeting={ "Welcome" }/>} />
        <Route exact path="/category/:cate_name" element={<ItemListContainer />} />
        <Route exact path="/item/:id" element={<Item />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
