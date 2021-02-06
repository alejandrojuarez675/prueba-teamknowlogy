
/**
 * Calculate if a DNA string has a mutation.
 * 
 * This method are based on the repetition of nitrogened bases inside the matrix.
 * 
 * @param {String[]} dnaString strings array that form a NxN matrix. 
 * The only 4 accepted caracters are A, T, C and G.
 */
export function hasMutation(dnaString) {
    validate(dnaString);

    const nSize = dnaString.length;
    const deathBorderSize = nSize - 3;

    for (let i=0; i < nSize; i++) {
        for (let j=0; j < nSize; j++) {

            //check the next 4 at rigth
            if (j < deathBorderSize) {
                const itsOkAtRight = !allCaractersAreEquals([
                    dnaString[i][j],
                    dnaString[i][j+1],
                    dnaString[i][j+2],
                    dnaString[i][j+3],
                ]);
                if (!itsOkAtRight) return true;
            }

            //check the next 4 at rigth-bottom
            if (j < deathBorderSize && i < deathBorderSize) {
                const itsOkAtRightBottom = !allCaractersAreEquals([
                    dnaString[i][j],
                    dnaString[i+1][j+1],
                    dnaString[i+2][j+2],
                    dnaString[i+3][j+3],
                ]);
                if (!itsOkAtRightBottom) return true;
            }

            //check the next 4 at bottom
            if (i < deathBorderSize) {
                const itsOkAtBottom = !allCaractersAreEquals([
                    dnaString[i][j],
                    dnaString[i+1][j],
                    dnaString[i+2][j],
                    dnaString[i+3][j],
                ]);
                if (!itsOkAtBottom) return true;
            }

            //check the next 4 at left-bottom
            if (i < deathBorderSize && j > 3) {
                const itsOkAtBottom = !allCaractersAreEquals([
                    dnaString[i][j],
                    dnaString[i+1][j-1],
                    dnaString[i+2][j-2],
                    dnaString[i+3][j-3],
                ]);
                if (!itsOkAtBottom) return true;
            }
        }
    }

    return false;
}

/**
 * This method validate the DNA string.
 * 
 * Throw Error in case of the DNA isn't valid
 * 
 * @param {String[]} dnaString strings array that form a NxN matrix. 
 * The only 4 accepted caracters are A, T, C and G.
 */
function validate(dnaString) {
}

/**
 * This method return true if all caracters inside the string are equals.
 * @param {String} caracters 
 */
function allCaractersAreEquals(caracters) {
    return caracters.every(char => char === caracters[0]);
}