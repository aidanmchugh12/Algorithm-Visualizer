export const bubbleSort = async (array, getSpeed, updateBars) => {
    const barColors = new Array(array.length).fill('black');
    const delay = () => new Promise((resolve) => setTimeout(resolve, getSpeed()));

    for(let i = 0; i < array.length; i++) {
        for(let j = 0; j < array.length - i - 1; j++) {
            
            
            barColors[j] = 'blue';
            updateBars([...barColors], array);
            await delay();


            if(array[j] > array[j+1]) {
                [array[j], array[j+1]] = [array[j+1], array[j]];
                [barColors[j], barColors[j+1]] = [barColors[j+1], barColors[j]];
                barColors[j] = 'black';
            } else {
                barColors[j] = 'black'; // Turn to black because values were not swapped
            }

            updateBars([...barColors], array);
            await delay();

        }
        
        barColors[array.length-i-1] = 'green';
        updateBars([...barColors], array);
    }
}