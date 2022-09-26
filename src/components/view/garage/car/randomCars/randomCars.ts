import { carBrands, carModels } from './carNames';

function getColor(): string {
  const charsString = '0123456789ABCDEF';
  let str = '';
  for (let i = 0; i < 6; i += 1) {
    str += charsString[Math.floor(Math.random() * 16)];
  }
  return `#${str}`;
}

function getName(): string {
  const brand = carBrands[Math.floor(Math.random() * carBrands.length)];
  const model = carModels[Math.floor(Math.random() * carModels.length)];
  return `${brand} ${model}`;
}

export default function generateCars(): { name: string, color: string }[] {
  const randomCarsCount = 100;
  const arr = new Array(randomCarsCount).fill(1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const arrCars = arr.map((x) => ({ name: getName(), color: getColor() }));
  return arrCars;
}
