export const PlayfairCipher = (text, key, mode) => {
    text = prepareText(text);

    const modeValue = mode === 'decrypt' ? -1 : 1;
    const alphabet = 'aąbcćdeęfghijklłmnńoópqrsśtuvwxyzżź-';
    const grid = createGrid(key, alphabet);
    let result = '';

    for (let i = 0; i < text.length; i += 2) {
        const pair = text.slice(i, i + 2);
        const [row1, col1] = findPosition(pair[0], grid);
        const [row2, col2] = findPosition(pair[1], grid);

        if (row1 === row2) {
            // Same row: shift columns
            result += grid[row1][(col1 + modeValue + grid[row1].length) % grid[row1].length];
            result += grid[row2][(col2 + modeValue + grid[row2].length) % grid[row2].length];
        } else if (col1 === col2) {
            // Same column: shift rows
            result += grid[(row1 + modeValue + grid.length) % grid.length][col1];
            result += grid[(row2 + modeValue + grid.length) % grid.length][col2];
        } else {
            // Rectangle rule: swap columns
            result += grid[row1][col2];
            result += grid[row2][col1];
        }
    }
    return result;
};

const createGrid = (key, alphabet) => {
    key = key.toLowerCase().replace(/[^aąbcćdeęfghijklłmnńoópqrsśtuvwxyzżź]/g, '');
    let grid = [];
    let combined = key + alphabet;
    for (let char of combined) {
        if (!grid.includes(char)) {
            grid.push(char);
        }
    }

    // 6 x 6
    const gridMatrix = [];
    for (let i = 0; i < grid.length; i += 6) {
        const row = [];
        for (let j = i; j < i + 6 && j < grid.length; j++) {
            row.push(grid[j]);
        }
        gridMatrix.push(row);
    }

    console.log(gridMatrix);

    return gridMatrix;
};

const findPosition = (char, grid) => {
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            if (grid[row][col] === char) {
                return [row, col];
            }
        }
    }
    throw new Error(`Character '${char}' not found in grid`);
};

const prepareText = (text) => {
    text = text.toLowerCase().replace(/[^aąbcćdeęfghijklłmnńoópqrsśtuvwxyzżź]/g, '');
    let result = '';


    for (let i = 0; i < text.length; i++) {
        result += text[i];
        if (i + 1 < text.length && text[i] === text[i + 1]) {
            result += 'x';
        }
    }

    if (result.length % 2 !== 0) {
        result += 'x';
    }
    return result;
};
