import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home.jsx';
import DogInfoForm from './pages/dogInfo.jsx';
import AccountPage from './pages/account.jsx';
import DailyChecklist from './pages/dailyCheckList.jsx';

const App = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/dogInfo" element={<DogInfoForm />} />
    <Route path="/account" element={<AccountPage />} />
    <Route path="/dailyCheckList" element={<DailyChecklist />} />
  </Routes>
);

export default App;
