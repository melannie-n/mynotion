import React from 'react';
import './App.css';
import Navbar from './components/navbar';
import { BrowserRouter as Router, Routes, Route}
	from 'react-router-dom';
import Connect from './pages/connect';
import Study from './pages/study';
import Land from './pages';


function App() {
return (
	<Router>
	<Navbar />
	<Routes>
		{/* @TODO: Make logo button for landing page */}
		<Route exact path='/' exact element={<Land />} />
		<Route path='/connect' element ={<Connect />} />
		<Route path='/study' element={<Study/>} />
	</Routes>
	</Router>
);
}

export default App;
