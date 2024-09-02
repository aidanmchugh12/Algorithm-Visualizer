import './App.css';
import SortingVisualizer from './Visualizers/SortingVisualizer.jsx';
import Home from './pages/Home.jsx';
import Contact from './pages/Contact.jsx';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
  return (

    // <div className="App">
    //   <SortingVisualizer></SortingVisualizer>

    // </div>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/sorts" element={<SortingVisualizer />} />
      </Routes>
    </Router>
  );
}

export default App;
