import './App.css';
import SortingVisualizer from './Visualizers/SortingVisualizer.jsx';
import SearchingVisualizer from './Visualizers/SearchingVisualizer.jsx';
import NQueensVisualizer from './Visualizers/NQueensVisualizer.jsx';
import Home from './pages/Home.jsx';
import Contact from './pages/Contact.jsx';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import QueueVisualizer from './Visualizers/QueueVisualizer.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/sorting" element={<SortingVisualizer />} />
        <Route path="/searching" element={<SearchingVisualizer />} />
        <Route path="/queues" element={<QueueVisualizer />}/>
        <Route path="/n-queens" element={<NQueensVisualizer />} />
      </Routes>
    </Router>
  );
}

export default App;
