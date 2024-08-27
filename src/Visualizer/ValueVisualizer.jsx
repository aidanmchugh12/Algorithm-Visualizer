import React from 'react'
import './ValueVisualizer.css'
import {getSelectionSortAnimation} from '../Algorithms/selectionSort'



class ValueVisualizer extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            value: 100,
            speed: 100,
            animationInProgress: false,
            array: [],
        }

    }

    RandomizeArrayValues = (min, max) => {
        const NewArray = []
        for(let i = 0; i < this.state.value; i++) {
            NewArray.push(Math.floor(Math.random() * (max - min + 1) + min))
        }

        this.setState({
          array: NewArray
        })
        console.log(this.state)

      }
      

    SelectionSortAnimationHandler = async (animations) => {
        const ArrayBars = document.getElementsByClassName('array-bar');
        const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


        for(let i = 0; i < animations.length; i++) {
            const animation = animations[i];

            var bar1Style = ArrayBars[animation[0]].style;
            var bar2Style = ArrayBars[animation[1]].style;
            bar1Style.backgroundColor = 'red';
            bar2Style.backgroundColor = 'red';

            await delay(this.state.speed);

            const temp = bar1Style.height;
            bar1Style.height = bar2Style.height;
            bar2Style.height = temp;

            await delay(this.state.speed);

            bar1Style.backgroundColor = 'black';
            bar2Style.backgroundColor = 'black';
        }
    }


    componentDidMount() {
        this.RandomizeArrayValues(10,100)
    }

    render() {
        const {array} = this.state
        return (
            <>
            <button onClick={() => {this.RandomizeArrayValues(10,100)}}>Randomize Values</button>
            <button onClick={() => {this.SelectionSortAnimationHandler(getSelectionSortAnimation(array))}}>Selection Sort</button>
            {/* <input onChange={(event) => {this.setState({speed: event.target.value})}} type="range" id="speed-bar" min="100" max="2000" step="100"></input> */}
            <div class="array-container">
                {array.map((value, index) => (
                    <div class="array-bar" key={index} style={{height: `${value/2}vh`}}></div>
                ))}
            </div>
            </>
        )
    }
}

export default ValueVisualizer