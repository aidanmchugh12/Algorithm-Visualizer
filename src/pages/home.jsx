import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import "./Home.css";

export default function Home() {
  return (
    <>
      <NavBar pageName="Algorithm Visualizer"></NavBar>
      <div class="algorithm-selection">
        <div className="algorithm-selection">
          <Link to="/sorting" className="card-link">
            <div className="card">
              <img src="./images/sorting.png" alt="sorting" />
              <div>Sorting</div>
            </div>
          </Link>
          <Link to="/searching" className="card-link">
            <div className="card">
              <img src="./images/searching.png" alt="searching" />
              <div>Searching</div>
            </div>
          </Link>
          {/* <Link to="/queues" className="card-link">
                    <div className="card">
                        <img src="./images/queues.png" alt="queues"/>
                        <div>Queues</div>
                    </div>
                </Link> */}

          <Link to="/n-queens" className="card-link">
            <div className="card">
              <img src="./images/nqueens.png" alt="nqueens" />
              <div>N-Queens</div>
            </div>
          </Link>
          {/* <Link to="/trees" className="card-link">
                    <div className="card">Trees</div>
                </Link>
                <Link to="/graphs" className="card-link">
                    <div className="card">Graphs</div>
                </Link>
                <Link to="/clustering" className="card-link">
                    <div className="card">Clustering</div>
                </Link> */}
        </div>
      </div>
    </>
  );
}
