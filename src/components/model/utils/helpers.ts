import { state, stateSort } from '../state/state';
import { getCars, getWinners } from '../requests/getItems';
import renderGarage from '../../view/garage/garage';
import renderWinners from '../../view/winners/winners';

function checkPageGarage(): void {
  if (state.pageGarage > 1) {
    (document.querySelector('.prev-btn-garage') as HTMLButtonElement).disabled = false;
  } else {
    (document.querySelector('.prev-btn-garage') as HTMLButtonElement).disabled = true;
  }
  if (state.pageGarage * 7 >= +state.count) {
    (document.querySelector('.next-btn-garage') as HTMLButtonElement).disabled = true;
  } else {
    (document.querySelector('.next-btn-garage') as HTMLButtonElement).disabled = false;
  }
}

function checkPageWinners(): void {
  if (state.pageWinners > 1) {
    (document.querySelector('.prev-btn-winners') as HTMLButtonElement).disabled = false;
  } else {
    (document.querySelector('.prev-btn-winners') as HTMLButtonElement).disabled = true;
  }
  if (state.pageWinners * 10 >= +state.countWinners) {
    (document.querySelector('.next-btn-winners') as HTMLButtonElement).disabled = true;
  } else {
    (document.querySelector('.next-btn-winners') as HTMLButtonElement).disabled = false;
  }
}

async function updateStateGarage(): Promise<void> {
  const { cars, count } = await getCars(state.pageGarage);
  state.cars = cars;
  state.count = count;
  checkPageGarage();
  const garagePage = document.getElementById('garage-page') as HTMLElement;
  garagePage.innerHTML = await renderGarage();
}

async function updateStateWinners(): Promise<void> {
  const {
    winners,
    countWinners,
  } = await getWinners(state.pageWinners, stateSort.sort, stateSort.order);
  state.winners = winners;
  state.countWinners = countWinners;
  checkPageWinners();
  const winnersPage = document.getElementById('winners-page') as HTMLElement;
  winnersPage.innerHTML = await renderWinners();
}

async function sortWins(): Promise<void> {
  stateSort.sort = 'wins';
  stateSort.order = stateSort.order === 'asc' ? 'desc' : 'asc';
  const btn = document.getElementById('wins') as HTMLElement;
  await updateStateWinners();
  const arrow = stateSort.order === 'asc' ? '&#9650' : '&#9660';
  btn.innerHTML = `Wins ${arrow}`;
  (document.getElementById('time') as HTMLElement).innerHTML = 'Time';
}

async function sortTime(): Promise<void> {
  stateSort.sort = 'time';
  stateSort.order = stateSort.order === 'asc' ? 'desc' : 'asc';
  const btn = document.getElementById('time') as HTMLElement;
  await updateStateWinners();
  const arrow = stateSort.order === 'asc' ? '&#9650' : '&#9660';
  btn.innerHTML = `Time ${arrow}`;
  (document.getElementById('wins') as HTMLElement).innerHTML = 'Wins';
}

export {
  checkPageGarage, checkPageWinners, updateStateGarage, updateStateWinners, sortWins, sortTime,
};
