import { state } from '../state/state';
import { updateStateGarage, updateStateWinners } from '../utils/helpers';
import renderWinners from '../../view/winners/winners';

async function paginationNext(): Promise<void> {
  state.pageGarage += 1;
  await updateStateGarage();
}

async function paginationPrev(): Promise<void> {
  state.pageGarage -= 1;
  await updateStateGarage();
}

async function paginationNextWinners(): Promise<void> {
  state.pageWinners += 1;
  await updateStateWinners();
}

async function paginationPrevWinners(): Promise<void> {
  state.pageWinners -= 1;
  await updateStateWinners();
  const winnersPage = document.getElementById('winners-page') as HTMLElement;
  winnersPage.innerHTML = await renderWinners();
}

async function toGarage(): Promise<void> {
  state.currPage = 'garage';
  await updateStateGarage();
  (document.querySelector('.sort-btns') as HTMLElement).style.display = 'none';
  const toGarageButton = document.getElementById('to-garage') as HTMLButtonElement;
  toGarageButton.disabled = true;
  const toWinnersButton = document.getElementById('to-winners') as HTMLButtonElement;
  toWinnersButton.disabled = false;
  const winners = document.getElementById('winners-page') as HTMLElement;
  winners.style.display = 'none';
  const controls = document.getElementById('controls') as HTMLElement;
  controls.style.display = 'block';
  const garage = document.getElementById('garage-page') as HTMLElement;
  garage.style.display = 'block';
  (document.querySelector('.pagination-winners') as HTMLElement).style.display = 'none';
  (document.querySelector('.pagination') as HTMLElement).style.display = 'block';
}

async function toWinners(): Promise<void> {
  state.currPage = 'winners';
  await updateStateWinners();
  const winnersPage = document.getElementById('winners-page') as HTMLElement;
  const toGarageButton = document.getElementById('to-garage') as HTMLButtonElement;
  (document.querySelector('.sort-btns') as HTMLElement).style.display = 'block';
  toGarageButton.disabled = false;
  const toWinnersButton = document.getElementById('to-winners') as HTMLButtonElement;
  toWinnersButton.disabled = true;
  const garage = document.getElementById('garage-page') as HTMLElement;
  garage.style.display = 'none';
  const controls = document.getElementById('controls') as HTMLElement;
  controls.style.display = 'none';
  winnersPage.style.display = 'block';
  (document.querySelector('.pagination-winners') as HTMLElement).style.display = 'block';
  (document.querySelector('.pagination') as HTMLElement).style.display = 'none';
}

export {
  paginationNext,
  paginationPrev,
  toGarage,
  toWinners,
  paginationNextWinners,
  paginationPrevWinners,
};
