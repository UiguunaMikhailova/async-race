import renderWinner from './winner/winner';
import { state } from '../../model/state/state';
import { Winner } from '../../../types/types';
import { getAllCars } from '../../model/requests/getItems';

export default async function renderWinners(): Promise<string> {
  const arrayWinners = state.winners as Winner[];
  const { cars } = await getAllCars();
  return `
  <div class="winners">
      <h1 class="title">Winners (${state.countWinners})</h1>
      <h3 class="page">Page #${state.pageWinners}</h3>
      <table class="table">
      <tr>
      <th>Number</th>
      <th>Car</th>
      <th>Name</th>
      <th>Wins</th>
      <th>Best time (seconds)</th>
      </tr>
      ${arrayWinners.map((winner, index: number) => `
      <tr>${renderWinner(winner, index, cars)}</tr>
  `).join('')}
      </table>
  </div>
`;
}
