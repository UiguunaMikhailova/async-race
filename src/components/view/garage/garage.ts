import renderCars from './car/car';
import { state } from '../../model/state/state';

export default function renderGarage(): string {
  return `
        <div class="garage">
            <h1 class="title">Garage (${state.count})</h1>
            <h3 class="page">Page #${state.pageGarage}</h3>
            <div class="cars">
            ${state.cars.map((car) => `
            <div class="car-container">${renderCars(car)}</div>
        `).join('')}
            </div>
        </div>
  `;
}
