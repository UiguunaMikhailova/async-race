import { state } from '../../model/state/state';

function createBtn(classBtn: string, text: string): HTMLButtonElement {
  const elem = document.createElement('button');
  elem.className = `button ${text === 'PREV' ? 'pagination-prev' : 'pagination-next'} ${classBtn}`;
  elem.textContent = text;
  return elem;
}

function getPagination(): string {
  const prev = createBtn('prev-btn-garage', 'PREV');
  const next = createBtn('next-btn-garage', 'NEXT');
  if (state.pageGarage > 1) {
    prev.disabled = false;
  } else {
    prev.disabled = true;
  }
  if (state.pageGarage * 7 >= +state.count) {
    next.disabled = true;
  } else {
    next.disabled = false;
  }
  return prev.outerHTML + next.outerHTML;
}

function getPaginationWinners(): string {
  const prev = createBtn('prev-btn-winners', 'PREV');
  const next = createBtn('next-btn-winners', 'NEXT');
  if (state.pageWinners > 1) {
    prev.disabled = false;
  } else {
    prev.disabled = true;
  }
  if (state.pageWinners * 10 >= +state.count) {
    next.disabled = true;
  } else {
    next.disabled = false;
  }
  return prev.outerHTML + next.outerHTML;
}

export { getPagination, getPaginationWinners };
