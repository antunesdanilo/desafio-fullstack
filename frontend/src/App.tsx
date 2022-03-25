import React from 'react';
import './App.css';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {Routes, Route} from 'react-router-dom';

import Header from './Components/Header';
import Footer from './Components/Footer';

import Home from './Pages/Home';

import LevelList from './Pages/Level/List';
import LevelDetail from './Pages/Level/Detail';
import LevelForm from './Pages/Level/Form';

import DeveloperList from './Pages/Developer/List';
import DeveloperDetail from './Pages/Developer/Detail';
import DeveloperForm from './Pages/Developer/Form';

const App: React.FC = () => {
  return (
    <div className="App">
      <ToastContainer />
      <Header />
      <section id='secao-principal'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/level">
            <Route path="" element={<LevelList />} />
            <Route path="new" element={<LevelForm />} />
            <Route path=":id" element={<LevelDetail />} />
            <Route path="update/:id" element={<LevelForm />} />
          </Route>
          <Route path="/developer">
            <Route path="" element={<DeveloperList />} />
            <Route path="new" element={<DeveloperForm />} />
            <Route path=":id" element={<DeveloperDetail />} />
            <Route path="update/:id" element={<DeveloperForm />} />
          </Route>
        </Routes>
      </section>
      <Footer />
    </div>
  );
}

export default App;
