const summer = () => {
  let counter = 1;
  let sum = 0;
  let numOfRes = 4;
  while (counter < 13) {
    sum = sum + numOfRes * 150;
    numOfRes = numOfRes + 4;
    counter++
  }

  return sum;
};

console.log(summer());
