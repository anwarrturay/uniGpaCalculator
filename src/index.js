import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import DataContextProvider from './components/context/DataContext'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <DataContextProvider>
      <Router>
        <Routes>
          <Route path='/*' element={<App />}/>
        </Routes>
      </Router>
    </DataContextProvider>
  </React.StrictMode>
);

