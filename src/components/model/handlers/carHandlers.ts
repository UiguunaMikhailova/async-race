import { getCar } from '../requests/getItems';
import { createCar, deleteCar, updateCar } from '../requests/car';
import { deleteWinner } from '../requests/winner';
import renderGarage from '../../view/garage/garage';
import { state } from '../state/state';
import { updateStateGarage, updateStateWinners } from '../utils/helpers';
import generateCars from '../../view/garage/car/randomCars/randomCars';

async function createBtnHandler(e: Event): Promise<void> {
  e.preventDefault();
  const text = document.querySelector('#create-car-text') as HTMLInputElement;
  const name = text.value;
  text.value = '';

  const colorText = document.querySelector('#create-car-color') as HTMLInputElement;
  const color = colorText.value;
  colorText.value = '#000000';

  await createCar({ name, color });
  await updateStateGarage();
}

async function generateCarsBtnHandler(): Promise<void> {
  const arr = generateCars();

  await Promise.all(arr.map(async (car) => {
    await createCar(car);
  }));

  await updateStateGarage();

  const garagePage = document.getElementById('garage-page') as HTMLElement;
  garagePage.innerHTML = await renderGarage();
}

async function deleteBtnHandler(e: Event): Promise<void> {
  const id = +(e.target as HTMLElement).id.split('-')[1];
  await deleteCar(id);
  await deleteWinner(id);
  await updateStateGarage();
  await updateStateWinners();
}

async function updateBtnHandler(e: Event): Promise<void> {
  e.preventDefault();
  const textInput = document.getElementById('update-car-text') as HTMLInputElement;
  const colorInput = document.getElementById('update-car-color') as HTMLInputElement;

  const name = textInput.value;
  textInput.value = '';

  const color = colorInput.value;
  colorInput.value = '#000000';

  const id = +state.currCarId;
  state.currCarId = 0;

  await updateCar(id, { name, color });
  await updateStateGarage();
  await updateStateWinners();

  textInput.disabled = true;
  colorInput.disabled = true;
  (document.querySelector('.submit-btn') as HTMLButtonElement).disabled = true;
}

async function selectBtnHandler(e: Event): Promise<void> {
  const id = +(e.target as HTMLElement).id.split('-')[1];
  const currCar = await getCar(id);
  state.currCarId = currCar.id;

  const textInput = document.getElementById('update-car-text') as HTMLInputElement;
  textInput.value = currCar.name;

  const colorInput = document.getElementById('update-car-color') as HTMLInputElement;
  colorInput.value = currCar.color;

  textInput.disabled = false;
  colorInput.disabled = false;
  (document.querySelector('.submit-btn') as HTMLButtonElement).disabled = false;
}

export {
  createBtnHandler,
  deleteBtnHandler,
  updateBtnHandler,
  selectBtnHandler,
  generateCarsBtnHandler,
};
