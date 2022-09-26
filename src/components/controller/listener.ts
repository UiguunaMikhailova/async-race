import { toGarage, toWinners } from '../model/handlers/paginationHandlers';
import { createBtnHandler, updateBtnHandler, generateCarsBtnHandler } from '../model/handlers/carHandlers';
import { raceBtnHandler, resetBtnHandler } from '../model/handlers/driveHandlers';
import { checkPageGarage, sortWins, sortTime } from '../model/utils/helpers';
import bodyListener from './bodyListener';

export default function listener(): void {
  checkPageGarage();
  document.body.addEventListener('click', async (e) => {
    bodyListener(e);
  });
  const createCarButton = document.getElementById('create-car') as HTMLElement;
  createCarButton?.addEventListener('submit', async (e) => {
    await createBtnHandler(e);
  });
  const updateCarButton = document.getElementById('update-car') as HTMLElement;
  updateCarButton?.addEventListener('submit', async (e) => {
    await updateBtnHandler(e);
  });
  const generateCarsButton = document.getElementById('generate-cars') as HTMLElement;
  generateCarsButton?.addEventListener('click', async () => {
    await generateCarsBtnHandler();
  });
  const raceButton = document.getElementById('race') as HTMLButtonElement;
  raceButton?.addEventListener('click', async () => {
    raceButton.disabled = true;
    await raceBtnHandler();
  });
  const resetButton = document.getElementById('reset') as HTMLButtonElement;
  resetButton?.addEventListener('click', async () => {
    resetButton.disabled = true;
    (document.getElementById('race') as HTMLButtonElement).disabled = false;
    await resetBtnHandler();
  });
  (document.getElementById('to-garage') as HTMLElement).addEventListener('click', async () => {
    await toGarage();
  });
  (document.getElementById('to-winners') as HTMLElement).addEventListener('click', async () => {
    await toWinners();
  });
  (document.getElementById('wins') as HTMLElement).addEventListener('click', async () => {
    await sortWins();
  });
  (document.getElementById('time') as HTMLElement).addEventListener('click', async () => {
    await sortTime();
  });
}
