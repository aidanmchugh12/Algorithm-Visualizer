import React from 'react';
import './NQueensVisualizer.css';
import NavBar from '../components/NavBar';
import { NQueens, continueSolving } from '../Algorithms/NQueens';

class NQueensVisualizer extends React.Component {
    constructor() {
        super();

        this.state = {
            BoardSize: 8,
            Speed: 120,
            AnimationInProgress: false,
            Board: [],
            SolutionsFound: 0,
            ContinueSolving: false,
        }

    }

    createBoard = (size) => {
        let NewBoard = [];

        for(let i = 0; i < size; i++) {
            NewBoard[i] = [];
            for(let j = 0; j < size; j++) {
                // if((i+j) % 2 === 0) {
                //     NewBoard[i][j] = 0;
                // } else {
                //     NewBoard[i][j] = 1;
                // }
                NewBoard[i][j] = 0;
            }
        }


        this.setState({ Board : NewBoard, SolutionsFound : 0});
    }

    solveBoard = () => {
        if(!this.state.AnimationInProgress) {
            this.setState({ AnimationInProgress: true }, () => {
                NQueens(this.state.BoardSize, this.state.Board, this.updateBoard, this.getSpeed, this.incrementSolutions, this.updateContinueSolving).then(() => {
                    this.setState({ AnimationInProgress: false });
                })
            })
        }
    }

    updateBoard = (board) => {
        this.setState({Board : board});
    }

    incrementSolutions = () => {
        this.setState({SolutionsFound : this.state.SolutionsFound+1});
    }

    updateContinueSolving = (arg) => {
        this.setState({ContinueSolving : arg});
    }

    getSpeed = () => {
        return this.state.Speed;
    }

    componentDidMount() {
        this.createBoard(this.state.BoardSize);
    }

    render() {
        const { Board } = this.state;
        return (
            <>
            <NavBar pageName="N-Queens Visualizer"></NavBar>

            <div className="visualizer">
                <button onClick={() => {this.solveBoard()}} disabled={this.state.AnimationInProgress}>Start N-Queens</button>
                <input onChange={(event) => {this.setState({Speed: event.target.value})}} type="range" id="speed-bar" min="10" max="250" step="10"></input>
                <button onClick={() => {this.createBoard(this.state.BoardSize)}} disabled={this.state.AnimationInProgress}>Reset Board</button>



                <table className="table">
                    <tbody>
                        {Board.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {row.map((cell, colIndex) => (
                                    <td 
                                    className="cell" 
                                    key={colIndex} 
                                    style={{backgroundColor: cell === 0 ? 'white' : 'black',}}
                                    >
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>

                <p>Solutions Found: {this.state.SolutionsFound}</p>
                <button onClick={() => {continueSolving()}} disabled={!this.state.ContinueSolving}>Continue Solving</button>



            </div>
            
            </>
        )
    }

}

export default NQueensVisualizer