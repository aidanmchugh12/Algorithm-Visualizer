export const linearSearch = async (array, key, getSpeed, updateBars) => {
    const barColors = new Array(array.length).fill('black');
    const delay = () => new Promise((resolve) => setTimeout(resolve, getSpeed()));


    for(let i = 0; i < array.length; i++) {

        barColors[i] = 'yellow';
        updateBars([...barColors], array);
        await delay();

        if(array[i] === key) {
            barColors[i] = 'green';
            updateBars([...barColors], array);
            break;
        } else {
            barColors[i] = 'black';
            updateBars([...barColors], array);
        }
    }
}