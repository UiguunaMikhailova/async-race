export default function renderHeader(): string {
  return `
  <header class="header">
    <button class="button" id="to-garage" disabled>Garage</button>
    <button class="button" id="to-winners">Winners</button>
    <div class="sort-btns">Sort buttons:
      <button class="button" id="wins">Wins</button>
      <button class="button" id="time">Time</button>
    </div>
  </header>
  `;
}
