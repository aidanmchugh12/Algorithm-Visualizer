import React from 'react'
import './ValueVisualizer.css'
import {selectionSort} from '../Algorithms/selectionSort'
import {insertionSort} from '../Algorithms/insertionSort'



class ValueVisualizer extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            arraySize: 50,
            speed: 10,
            animationInProgress: false,
            array: [],
            barColors: [],
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
    
    sortHandler = (sort) => {
        if(!this.state.animationInProgress) {
            this.setState({ animationInProgress: true }, () => {
                sort([...this.state.array], this.getSpeed, this.updateBars).then(() => {
                    this.setState({ animationInProgress: false });
                })
            })
        }
    }

    updateBars = (colors, arr) => {
        this.setState({barColors: colors, array: arr});
    }

    getSpeed = () => {
        return this.state.speed;
    }


    componentDidMount() {
        this.randomizeArrayValues(10,100);
    }

    render() {
        const { array, barColors } = this.state;
        return (
            <>
            <button onClick={() => {this.randomizeArrayValues(10,100)}} disabled={this.state.animationInProgress}>Randomize Values</button>
            <button onClick={() => {this.sortHandler(selectionSort)}} disabled={this.state.animationInProgress}>Selection Sort</button>
            <button onClick={() => {this.sortHandler(insertionSort)}} disabled={this.state.animationInProgress}>Insertion Sort</button>

            <input onChange={(event) => {this.setState({speed: event.target.value})}} type="range" id="speed-bar" min="1" max="500" step="1"></input>
            {/* <input onChange={(event) => {this.setState({arraySize: event.target.value})}} type="range" id="size-bar" min="5" max="50" step="1"></input> */}

            <div class="array-container">
                {array.map((value, index) => (
                    <div class="array-bar" key={index} style={{height: `${value/2}vh`, backgroundColor: barColors[index]}}></div>
                ))}
            </div>
            </>
        )
    }
}

export default ValueVisualizer