let continueFinding = true;
let resolvePause;

export const NQueens = async (numQueens, board, updateBoard, getSpeed, incrementSolutions, updateContinueSolving) => {
    let safeRow = Array(numQueens).fill(true);
    let safeLeftDiag = Array(2*numQueens-1).fill(true);
    let safeRightDiag = Array(2*numQueens-1).fill(true);

    await tryColumn(numQueens, 0, board, getSpeed, safeRow, safeLeftDiag, safeRightDiag, updateBoard, incrementSolutions, updateContinueSolving);
}

function checkSafe(row, col, safeRow, safeLeftDiag, safeRightDiag, N) {
    return safeRow[row] && safeLeftDiag[row+col] && safeRightDiag[row-col+(N-1)];
}

export const continueSolving = () => {
    if (resolvePause) resolvePause();
};

async function tryColumn(N, col, board, getSpeed, safeRow, safeLeftDiag, safeRightDiag, updateBoard, incrementSolutions, updateContinueSolving) {
    if (!continueFinding) return;

    const delay = () => new Promise((resolve) => setTimeout(resolve, getSpeed()));

    for (let row = 0; row < N; row++) {
        if (checkSafe(row, col, safeRow, safeLeftDiag, safeRightDiag, N)) {
            safeRow[row] = false;
            safeLeftDiag[row+col] = false;
            safeRightDiag[row-col+(N-1)] = false;

            let newBoard = board.map(r => [...r]);
            newBoard[row][col] = 1;
            updateBoard(newBoard);
            await delay();

            if (col === N-1) { // Solution found
                incrementSolutions();

                continueFinding = false;
                updateContinueSolving(true);

                await new Promise((resolve) => {resolvePause = resolve;});

                updateContinueSolving(false);
                continueFinding = true;
            } else {
                await tryColumn(N, col + 1, newBoard, getSpeed, safeRow, safeLeftDiag, safeRightDiag, updateBoard, incrementSolutions, updateContinueSolving);
                if (!continueFinding) return;
            }

            if (continueFinding) {
                safeRow[row] = true;
                safeLeftDiag[row+col] = true;
                safeRightDiag[row-col+(N-1)] = true;

                newBoard[row][col] = 0;
                updateBoard(newBoard);
            }
        }
    }
}

