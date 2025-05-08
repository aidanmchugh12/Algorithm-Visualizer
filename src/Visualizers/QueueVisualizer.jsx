import React from "react";
import "./QueueVisualizer.css";
import NavBar from "../components/NavBar";
import { simpleQueue } from "../Algorithms/Queues/simpleQueue";

class QueueVisualizer extends React.Component {
  constructor() {
    super();

    this.state = {
      QueueSize: 8,
      Speed: 120,
      AnimationInProgress: false,
      Queue: [],
      ContinueSolving: false,
    };
  }

  createQueue = (size) => {
    let newQueue = [];

    for (let i = 0; i < size; i++) {
      newQueue[i] = 0;
    }

    this.setState({ Queue: newQueue });
  };

  updateQueue = (queue) => {
    this.setState({ Queue: queue });
  };

  getSpeed = () => {
    return this.state.Speed;
  };

  componentDidMount() {
    this.createQueue(this.state.QueueSize);
  }

  render() {
    const { Queue } = this.state;
    return (
      <>
        <NavBar pageName="Queue Visualizer"></NavBar>

        <div className="visualizer">
          <input
            onChange={(event) => {
              this.setState({ Speed: event.target.value });
            }}
            type="range"
            id="speed-bar"
            min="10"
            max="250"
            step="10"
          ></input>
          <button
            onClick={() => {
              this.createQueue(this.state.Queue);
            }}
            disabled={this.state.AnimationInProgress}
          >
            Clear Queue
          </button>

          <table className="table">
            <tbody>
              <tr>
                {Queue.map((value, index) => (
                  <td className="cell" key={index}>
                    {value}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </>
    );
  }
}

export default QueueVisualizer;
