import React from 'react';
import './SearchingVisualizer.css';
import NavBar from '../components/NavBar';
import { linearSearch } from '../Algorithms/Searches/linearSearch';
import { binarySearch } from '../Algorithms/Searches/binarySearch';


class SearchingVisualizer extends React.Component {
    constructor() {
        super();

        this.state = {
            ArraySize: 25,
            Speed: 250,
            AnimationInProgress: false,
            searchValue: 10,
            array: [],
            barColors: [],
            currentSearch: "",
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
    
    searchHandler = () => {
        if(!this.state.AnimationInProgress) {
            const searchFunctions = {
                linearSearch: linearSearch,
                binarySearch: binarySearch,
            };
    
            const selectedSearch = searchFunctions[this.state.currentSearch];

            this.setState({ AnimationInProgress: true }, () => {
                selectedSearch([...this.state.array], this.state.searchValue, this.getSpeed, this.updateBars).then(() => {
                    this.setState({ AnimationInProgress: false });
                })
            })
        }
    }

    handleInputChange = (event) => {
        const value = Number(event.target.value);
        this.setState({ searchValue: value });
    };

    updateBars = (colors, arr) => {
        this.setState({barColors: colors, array: arr});
    }

    setcurrentSearch = (search) => {
        // Sort array for binary search
        if(search === "binarySearch") {
            this.setState({array: this.state.array.sort((a, b) => a - b)});
        }

        this.setState({currentSearch: search});
    }

    getSpeed = () => {
        return this.state.Speed;
    }


    componentDidMount() {
        this.setcurrentSearch("linearSearch");
        this.randomizeArrayValues(10,100);
    }

    render() {
        const { array, barColors } = this.state;
        return (
            <>
            <NavBar pageName="Searching Visualizer"></NavBar>

            <div class="visualizer">
                <div class="searching-tools">
                    <button onClick={() => {this.randomizeArrayValues(10,100)}} disabled={this.state.AnimationInProgress}>Randomize Values</button>
                    
                    <select onChange={(event) => this.setcurrentSearch(event.target.value)} disabled={this.state.AnimationInProgress}>
                        <option value="linearSearch">Linear Search</option>
                        <option value="binarySearch">Binary Search</option>
                    </select>
                    <input type="number" placeholder="Input a value to search" onChange={this.handleInputChange}></input>

                    <button onClick={this.searchHandler} disabled={this.state.AnimationInProgress}>Search</button>

                    <input onChange={(event) => {this.setState({Speed: event.target.value})}} type="range" id="Speed-bar" min="10" max="500" step="10"></input>
                    <input onChange={(event) => {this.setState({ArraySize: event.target.value}, () => {this.randomizeArrayValues(10,100)})}} type="range" id="size-bar" min="10" max="50" step="10" disabled={this.state.AnimationInProgress}></input>
                </div>

                <div class="array-container">
                    {array.map((value, index) => (
                        <div class="array-bar" key={index} style={{height: `${value/2}vh`, backgroundColor: barColors[index]}}>{value}</div>
                    ))}
                </div>
            </div>
            
            </>
        )
    }
}

export default SearchingVisualizer