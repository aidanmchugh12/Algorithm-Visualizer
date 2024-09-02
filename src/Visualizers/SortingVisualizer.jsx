import React from 'react'
import './SortingVisualizer.css'
import NavBar from '../components/NavBar'
import {selectionSort} from '../Algorithms/Sorts/selectionSort'
import {insertionSort} from '../Algorithms/Sorts/insertionSort'
import {bubbleSort} from '../Algorithms/Sorts/bubbleSort'



class SortingVisualizer extends React.Component {
    constructor() {
        super();

        this.state = {
            arraySize: 25,
            speed: 250,
            animationInProgress: false,
            array: [],
            barColors: [],
            currentSort: "",
        }

    }

    randomizeArrayValues = (min, max) => {
        const newArray = []
        const newColors = []

        for(let i = 0; i < this.state.arraySize; i++) {
            newArray.push(Math.floor(Math.random() * (max - min + 1) + min));
            newColors.push('black');
        }

        this.setState({
          array: newArray,
          barColors: newColors,
        })
      }
    
    sortHandler = () => {
        if(!this.state.animationInProgress) {
            const sortFunctions = {
                selectionSort: selectionSort,
                insertionSort: insertionSort,
                bubbleSort: bubbleSort,
            };
    
            const selectedSort = sortFunctions[this.state.currentSort];

            this.setState({ animationInProgress: true }, () => {
                selectedSort([...this.state.array], this.getSpeed, this.updateBars).then(() => {
                    this.setState({ animationInProgress: false });
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
        return this.state.speed;
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
                    <button onClick={() => {this.randomizeArrayValues(10,100)}} disabled={this.state.animationInProgress}>Randomize Values</button>
                    
                    <select onChange={(event) => this.setCurrentSort(event.target.value)} disabled={this.state.animationInProgress}>
                        <option value="selectionSort">Selection Sort</option>
                        <option value="insertionSort">Insertion Sort</option>
                        <option value="bubbleSort">Bubble Sort</option>
                    </select>

                    <button onClick={this.sortHandler} disabled={this.state.animationInProgress}>Sort</button>

                    <input onChange={(event) => {this.setState({speed: event.target.value})}} type="range" id="speed-bar" min="10" max="500" step="10"></input>
                    <input onChange={(event) => {this.setState({arraySize: event.target.value}, () => {this.randomizeArrayValues(10,100)})}} type="range" id="size-bar" min="10" max="50" step="10" disabled={this.state.animationInProgress}></input>
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