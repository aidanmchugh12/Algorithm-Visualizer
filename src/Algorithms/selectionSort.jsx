export const selectionSort = async (array, getSpeed, updateBars) => {
    const barColors = new Array(array.length).fill('black');
    const delay = () => new Promise((resolve) => setTimeout(resolve, getSpeed()));

    for(let i = 0; i < array.length; i++) {
        let minIndex = i;

        for(let curr = i + 1; curr < array.length; curr++) {
            barColors[curr] = 'red';
            updateBars([...barColors], array);

            await delay();

            if(array[curr] < array[minIndex]) {
                barColors[minIndex] = 'black';
                minIndex = curr;
                barColors[minIndex] = 'yellow';
            } else {
                barColors[curr] = 'black';
            }

            updateBars([...barColors], array);
        }

        if(i !== minIndex) {
            [array[i], array[minIndex]] = [array[minIndex], array[i]];
            
            barColors[i] = 'green';
            barColors[minIndex] = 'black';
        } else {
            barColors[i] = 'green';
        }

        updateBars([...barColors], array);
        await delay();
    }
}