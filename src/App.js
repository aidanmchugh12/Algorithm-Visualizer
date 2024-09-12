import './App.css';
import SortingVisualizer from './Visualizers/SortingVisualizer.jsx';
import NQueensVisualizer from './Visualizers/NQueensVisualizer.jsx';
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
        <Route path="/nqueens" element={<NQueensVisualizer />} />
      </Routes>
    </Router>
  );
}

export default App;
