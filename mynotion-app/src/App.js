import React from 'react';
import './App.css';
import Navbar from './components/navbar';
import { BrowserRouter as Router, Routes, Route}
	from 'react-router-dom';
import Home from './pages';
import Study from './pages/study';


function App() {
return (
	<Router>
	<Navbar />
	<Routes>
		<Route exact path='/' exact element={<Home />} />
		<Route path='/study' element={<Study/>} />
	</Routes>
	</Router>
);
}

export default App;
