import renderGarage from './garage/garage';
import renderWinners from './winners/winners';
import renderHeader from './header/header';
import getControls from './garage/controls/controls';
import renderMessage from './message/message';
import { getPagination, getPaginationWinners } from './pagination/paginationControl';

export default function render(): void {
  const main = document.createElement('main');
  main.innerHTML = `
  ${renderHeader()}
  ${getControls()}
  <div class="garage-page" id="garage-page">
    ${renderGarage()}
  </div>
  <div class="winners-page" id="winners-page">
    ${renderWinners()}
  </div>
  <div class="pagination">
    ${getPagination()}
  </div>
  <div class="pagination-winners">
    ${getPaginationWinners()}
  </div>
  ${renderMessage()}
  `;
  document.body.append(main);
}
