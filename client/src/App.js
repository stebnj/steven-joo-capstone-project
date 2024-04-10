import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import ListingDetails from './pages/ListingsDetails/ListingDetails';
import './App.scss';


function App() {
  return(
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/listings/:id" element={<ListingDetails />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
