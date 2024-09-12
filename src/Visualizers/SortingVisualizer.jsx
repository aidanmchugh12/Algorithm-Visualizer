import React from 'react';
import './SortingVisualizer.css';
import NavBar from '../components/NavBar';
import {selectionSort} from '../Algorithms/Sorts/selectionSort';
import {insertionSort} from '../Algorithms/Sorts/insertionSort';
import {bubbleSort} from '../Algorithms/Sorts/bubbleSort';



class SortingVisualizer extends React.Component {
    constructor() {
        super();

        this.state = {
            ArraySize: 25,
            Speed: 250,
            AnimationInProgress: false,
            array: [],
            barColors: [],
            currentSort: "",
        }

    }

    randomizeArrayValues = (min, max) => {
        const newArray = []
        const newColors = []

        for(let i = 0; i < this.state.ArraySize; i++) {
            newArray.push(Math.floor(Math.random() * (max - min + 1) + min));
            newColors.push('black');
        }

        this.setState({
          array: newArray,
          barColors: newColors,
        })
      }
    
    sortHandler = () => {
        if(!this.state.AnimationInProgress) {
            const sortFunctions = {
                selectionSort: selectionSort,
                insertionSort: insertionSort,
                bubbleSort: bubbleSort,
            };
    
            const selectedSort = sortFunctions[this.state.currentSort];

            this.setState({ AnimationInProgress: true }, () => {
                selectedSort([...this.state.array], this.getSpeed, this.updateBars).then(() => {
                    this.setState({ AnimationInProgress: false });
                })
            })
        }
    }

    updateBars = (colors, arr) => {
        this.setState({barColors: colors, array: arr});
    }

    setCurrentSort = (sort) => {
        this.setState({currentSort: sort});
    }

    getSpeed = () => {
        return this.state.Speed;
    }


    componentDidMount() {
        this.setCurrentSort("selectionSort");
        this.randomizeArrayValues(10,100);
    }

    render() {
        const { array, barColors } = this.state;
        return (
            <>
            <NavBar pageName="Sorting Visualizer"></NavBar>

            <div class="visualizer">
                <div class="sorting-tools">
                    <button onClick={() => {this.randomizeArrayValues(10,100)}} disabled={this.state.AnimationInProgress}>Randomize Values</button>
                    
                    <select onChange={(event) => this.setCurrentSort(event.target.value)} disabled={this.state.AnimationInProgress}>
                        <option value="selectionSort">Selection Sort</option>
                        <option value="insertionSort">Insertion Sort</option>
                        <option value="bubbleSort">Bubble Sort</option>
                    </select>

                    <button onClick={this.sortHandler} disabled={this.state.AnimationInProgress}>Sort</button>

                    <input onChange={(event) => {this.setState({Speed: event.target.value})}} type="range" id="Speed-bar" min="10" max="500" step="10"></input>
                    <input onChange={(event) => {this.setState({ArraySize: event.target.value}, () => {this.randomizeArrayValues(10,100)})}} type="range" id="size-bar" min="10" max="50" step="10" disabled={this.state.AnimationInProgress}></input>
                </div>

                <div class="array-container">
                    {array.map((value, index) => (
                        <div class="array-bar" key={index} style={{height: `${value/2}vh`, backgroundColor: barColors[index]}}></div>
                    ))}
                </div>
            </div>
            
            </>
        )
    }
}

export default SortingVisualizer