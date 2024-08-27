// function SelectionSort(array) {
//     for(let i = 0; i < array.length; i++) {
//         var min = i;
//         for(let curr = i + 1; curr < array.length; curr++) {
//             if(array[curr] < array[min]) {
//                 min = curr;
//             }
//         }

//         if(i !== min) {
//             var temp = array[i];
//             array[i] = array[min];
//             array[min] = temp;
//         }
//     }

//     return array;
// }

export function getSelectionSortAnimation(array) {
    var animations = []
    for(let i = 0; i < array.length; i++) {
        var min = i;
        for(let curr = i + 1; curr < array.length; curr++) {
            if(array[curr] < array[min]) {
                min = curr;
            }
        }

        if(i !== min) {
            var temp = array[i];
            array[i] = array[min];
            array[min] = temp;
            animations.push([i, min]);
        }
    }

    return animations;
}