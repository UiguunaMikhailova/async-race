/* eslint-disable @typescript-eslint/no-unused-vars */
import { Car, Winner } from '../../../../types/types';
import getCarImage from '../../garage/car/svgCar';

export default function renderWinner(
  { id, time, wins }: Winner,
  number: number,
  cars: Car[],
): string {
  const carWinner = cars.find((car) => car.id === id) as Car;
  return `
  <td>${number + 1}</td>
  <td class="car-image">${getCarImage(carWinner.color)}</td>
  <td>${carWinner.name}</td>
  <td>${wins}</td>
  <td>${time}</td>`;
}
