export default function divideArrayBySize(arr: string | any[], size: number) {
  if (!Array.isArray(arr)) {
    return "Input is not an array";
  }

  if (size < 2) {
    return "Size must be a minimum of 2";
  }

  const randomizedArray = shuffleArray(arr);

  const dividedArray: any[][] = [];
  const length = randomizedArray.length;

  if (length === 0) {
    return dividedArray; 
  }

  const numSubArrays = Math.ceil(length / size);

  for (let i = 0; i < numSubArrays; i++) {
    const startIndex = i * size;
    const endIndex = (i + 1) * size;
    const subArray = randomizedArray.slice(startIndex, endIndex);
    dividedArray.push(subArray);
  }

  return dividedArray;
}

function shuffleArray(array: any[]) {
  // Fisher-Yates shuffle algorithm
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
