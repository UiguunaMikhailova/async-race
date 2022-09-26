import { Car } from '../../../../types/types';
import getFlagImage from './svgFlag';
import getCarImage from './svgCar';

export default function renderCars({ name, color, id }: Car): string {
  return `
    <div class="car-buttons">
        <button class="button select" id="select-${id}">Select</button>
        <button class="button delete-button" id="remove-${id}">Remove</button>
        <div class="car-name">${name}</div>
    </div>
    <div class="road">
        <div class="car-controls">
            <button class="button start-car" id="start-${id}">A</button>
            <button class="button stop-car" id="stop-${id}" disabled>B</button>
        </div>
        <div class="car-image" id="car-image-${id}">
        ${getCarImage(color)}
        </div>
        <div class="flag">
            ${getFlagImage()}
        </div>
    </div>`;
}
