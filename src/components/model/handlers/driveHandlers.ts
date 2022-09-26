import { startCar, stopCar, drive } from '../requests/drive';
import { checkWinner } from '../requests/winner';
import { state } from '../state/state';
import { checkPageGarage, updateStateWinners } from '../utils/helpers';
import { Drive, Car, Winner } from '../../../types/types';

async function startDrive(id: number, isRace: boolean): Promise<Drive> {
  (document.querySelector('.pagination-prev') as HTMLButtonElement).disabled = true;
  (document.querySelector('.pagination-next') as HTMLButtonElement).disabled = true;
  if (!isRace) {
    (document.getElementById(`stop-${id}`) as HTMLButtonElement).disabled = false;
  }
  const res = await startCar(id);
  const duration = res.distance / (res.velocity * 1000);
  const carImage = document.getElementById(`car-image-${id}`) as HTMLElement;

  carImage.style.animationName = 'drive';
  carImage.style.animationDuration = `${duration}s`;
  carImage.style.animationTimingFunction = 'linear';
  carImage.style.animationFillMode = 'forwards';

  const status = await drive(id);
  if (!status) {
    carImage.style.animationPlayState = 'paused';
  }
  const idCar = id;
  return { status, idCar, duration };
}

async function stopDrive(id: number): Promise<void> {
  checkPageGarage();
  (document.getElementById(`start-${id}`) as HTMLButtonElement).disabled = false;
  const carImage = document.getElementById(`car-image-${id}`) as HTMLElement;
  carImage.style.animation = 'none';
  await stopCar(id);
}

async function raceCars(racers: Promise<Drive>[], indexes: number[]): Promise<Winner> {
  await updateStateWinners();
  const { status, idCar, duration } = await Promise.race(racers);
  if (!status) {
    const failedIndex = indexes.findIndex((i) => i === idCar);
    const restPromises = [...racers.slice(0, failedIndex),
      ...racers.slice(failedIndex + 1, racers.length)];
    const restIds = [...indexes.slice(0, failedIndex),
      ...indexes.slice(failedIndex + 1, indexes.length)];
    if (!restPromises.length) {
      (document.getElementById('reset') as HTMLButtonElement).disabled = false;
      const message = document.getElementById('message') as HTMLElement;
      message.style.display = 'block';
      message.innerText = 'All cars are broken, nobody went first';
    }
    return raceCars(restPromises, restIds);
  }
  const id = state.cars.find((car: Car) => car.id === idCar)?.id as number;
  return {
    id,
    time: +duration.toFixed(2),
  };
}

async function race(): Promise<Winner> {
  const racers = state.cars.map(({ id }) => startDrive(id, true));
  const indexes = state.cars.map((car) => car.id);
  const winner = await await raceCars(racers, indexes);
  return winner;
}

async function raceBtnHandler(): Promise<void> {
  const startBtns = document.querySelectorAll('.start-car');
  const stopBtns = document.querySelectorAll('.stop-car');
  const selectBtns = document.querySelectorAll('.select');
  const removeBtns = document.querySelectorAll('.delete-button');
  (document.getElementById('to-winners') as HTMLButtonElement).disabled = true;
  (document.getElementById('create-submit') as HTMLButtonElement).disabled = true;
  (document.getElementById('generate-cars') as HTMLButtonElement).disabled = true;
  startBtns.forEach((elem) => {
    const btn = elem as HTMLButtonElement;
    btn.disabled = true;
  });
  stopBtns.forEach((elem) => {
    const btn = elem as HTMLButtonElement;
    btn.disabled = true;
  });
  selectBtns.forEach((elem) => {
    const btn = elem as HTMLButtonElement;
    btn.disabled = true;
  });
  removeBtns.forEach((elem) => {
    const btn = elem as HTMLButtonElement;
    btn.disabled = true;
  });
  const winner = await race();
  await checkWinner(winner);
  const message = document.getElementById('message') as HTMLElement;
  message.style.display = 'block';
  const carWin = state.cars.find((car) => car.id === winner.id);
  message.innerText = `${carWin?.name} went first [${winner.time}s]`;
  (document.getElementById('reset') as HTMLButtonElement).disabled = false;
}

async function resetBtnHandler(): Promise<void> {
  const startBtns = document.querySelectorAll('.start-car');
  const stopBtns = document.querySelectorAll('.stop-car');
  const selectBtns = document.querySelectorAll('.select');
  const removeBtns = document.querySelectorAll('.delete-button');
  (document.getElementById('to-winners') as HTMLButtonElement).disabled = false;
  (document.getElementById('create-submit') as HTMLButtonElement).disabled = false;
  (document.getElementById('generate-cars') as HTMLButtonElement).disabled = false;
  startBtns.forEach((elem) => {
    const btn = elem as HTMLButtonElement;
    btn.disabled = false;
  });
  stopBtns.forEach((elem) => {
    const btn = elem as HTMLButtonElement;
    btn.disabled = true;
  });
  selectBtns.forEach((elem) => {
    const btn = elem as HTMLButtonElement;
    btn.disabled = false;
  });
  removeBtns.forEach((elem) => {
    const btn = elem as HTMLButtonElement;
    btn.disabled = false;
  });
  const message = document.getElementById('message') as HTMLElement;
  message.style.display = 'none';
  state.cars.map(({ id }) => stopDrive(id));
}

export {
  startDrive,
  stopDrive,
  raceBtnHandler,
  resetBtnHandler,
};
