import React from 'react'
import './App.css';
import PaginationNewscontainer from './components/PaginationNewscontainer';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
      
        <Route path='/' element={<PaginationNewscontainer apikey={process.env.REACT_APP_API_KEY}  key="general" country='in' category="general" pagesize={4}></PaginationNewscontainer>} />
        <Route path='/business' element={<PaginationNewscontainer apikey={process.env.react_app_api_key}  key="business" country='in' category="business" pagesize={4}></PaginationNewscontainer>} />
        <Route path='/entertainment' element={<PaginationNewscontainer apikey={process.env.react_app_api_key}  key="entertaiment" country='in' category="entertainment" pagesize={4}></PaginationNewscontainer>} />
        <Route path='/health' element={<PaginationNewscontainer apikey={process.env.react_app_api_key}  key="health" country='in' category="health" pagesize={4}></PaginationNewscontainer>} />
        <Route path='/science' element={<PaginationNewscontainer apikey={process.env.react_app_api_key}  key="science" country='in' category="science" pagesize={4}></PaginationNewscontainer>} />
        <Route path='/sports' element={<PaginationNewscontainer apikey={process.env.react_app_api_key}  key="sports" country='in' category="sports" pagesize={4}></PaginationNewscontainer>} />
        <Route path='/technology' element={<PaginationNewscontainer apikey={process.env.react_app_api_key}  key="technology" country='in' category="technology" pagesize={4}></PaginationNewscontainer>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
