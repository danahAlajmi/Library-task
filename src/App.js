import './App.css';
import Home from './components/Home';
import Members from './components/Members';
import Books from './components/Books';
import Nav from './components/Nav';
import MemberDetails from './components/MemberDetails';
import BookDetails from './components/BookDetails';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/members" element={<Members />} />
        <Route path="/members/:memberSlug" element={<MemberDetails />} />
        <Route path="/books/:bookSlug" element={<BookDetails />} />
      </Routes>
    </div>
  );
}

export default App;
