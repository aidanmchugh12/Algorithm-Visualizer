export const binarySearch = async (array, key, getSpeed, updateBars) => {
    const barColors = new Array(array.length).fill('black');
    const delay = () => new Promise((resolve) => setTimeout(resolve, getSpeed()));

    let low = 0;
    let high = array.length - 1;
    let mid;

    while(high >= low) {
        mid = low + Math.floor((high - low) / 2);

        if(array[mid] == key) {
            barColors[mid] = 'green';
            updateBars([...barColors], array);
            return;
        }
        else if(array[mid] < key) {
            // Set bars to red that we aren't looking at
            for(let i = low; i <= mid; i++) {
                barColors[i] = 'red';
            }
            updateBars([...barColors], array);
            await delay();
            low = mid + 1;
        } else {
            // Set bars to red that we aren't looking at
            for(let i = mid; i <= high; i++) {
                barColors[i] = 'red';
            }
            updateBars([...barColors], array);
            await delay();

            high = mid - 1;
        }
        await delay();
    }

    // Set all bars to red because element was not reached
    for(let i = 0; i < array.length; i++) {
        barColors[i] = 'red';
    }
    updateBars([...barColors], array);
}