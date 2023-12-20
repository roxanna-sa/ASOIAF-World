import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { DarkModeProvider } from './contexts/DarkModeContext';
import BookList from './components/BookList';
import Favourites from './components/Favourites';
import NewBook from './components/NewBook';


const App: React.FC = () => {

  return (
    <DarkModeProvider>
      <Router>

        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/newBook" element={<NewBook />} />
        </Routes>

      </Router>
    </DarkModeProvider>
  );
};
export default App;