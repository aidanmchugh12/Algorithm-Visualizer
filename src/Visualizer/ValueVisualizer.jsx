import React from 'react'
import './ValueVisualizer.css'


class ValueVisualizer extends React.Component {
    constructor(props = {value: 10}) {
        super(props)

        this.state = {
            value: props.value,
            array: [],
        }

    }

    RandomizeArrayValues = (min, max) => {
        // Update the state using setState
        const NewArray = []
        for(let i = 0; i < 25; i++)
        {
            NewArray.push(Math.floor(Math.random() * (max - min + 1) + min))
        }
        this.setState({
          array: NewArray
        })

      }

    componentDidMount() {
        this.RandomizeArrayValues(10,100)
    }

    render() {
        const {array} = this.state
        return (
            <>
            <button onClick={() => {this.RandomizeArrayValues(10,100)}}>Randomize Values</button>
            <div class="array-container">
                {array.map((value, index) => (
                    <div class="array-bar" key={index} style={{height: `${value*5}px`}}></div>
                ))}
            </div>
            </>
        )
    }
}

export default ValueVisualizer