export const insertionSort = async (array, getSpeed, updateBars) => {
    const barColors = new Array(array.length).fill('black');
    const delay = () => new Promise((resolve) => setTimeout(resolve, getSpeed()));

    for(let i = 1; i < array.length; i++) {
        let curr = array[i];
        let j = i-1;

        barColors[0] = 'yellow';
        barColors[i] = 'red';
        updateBars([...barColors], array);
        await delay();

        while(j >= 0 && array[j] > curr) {
            
            let temp = array[j];
            let tempColor = barColors[j];

            array[j] = array[j+1];
            array[j+1] = temp;

            barColors[j] = barColors[j+1];
            barColors[j+1] = tempColor;

            j = j-1;
            
            updateBars([...barColors], array);
            await delay();
        }
        
        array[j+1] = curr;
        barColors[j+1] = 'yellow';

        updateBars([...barColors], array);
        await delay();
    }

    barColors.fill('green');
    updateBars([...barColors], array);
}