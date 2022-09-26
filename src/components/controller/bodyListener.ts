import {
  paginationNext,
  paginationPrev,
  paginationNextWinners,
  paginationPrevWinners,
} from '../model/handlers/paginationHandlers';
import { deleteBtnHandler, selectBtnHandler } from '../model/handlers/carHandlers';
import { startDrive, stopDrive } from '../model/handlers/driveHandlers';

export default async function bodyListener(e: Event): Promise<void> {
  const elem = e.target as HTMLButtonElement;
  if (elem.classList.contains('delete-button')) {
    await deleteBtnHandler(e);
  }
  if (elem.classList.contains('select')) {
    await selectBtnHandler(e);
  }
  if (elem.classList.contains('next-btn-garage')) {
    await paginationNext();
  }
  if (elem.classList.contains('prev-btn-garage')) {
    await paginationPrev();
  }
  if (elem.classList.contains('next-btn-winners')) {
    await paginationNextWinners();
  }
  if (elem.classList.contains('prev-btn-winners')) {
    await paginationPrevWinners();
  }
  if (elem.classList.contains('start-car')) {
    elem.disabled = true;
    const id = +elem.id.split('-')[1];
    await startDrive(id, false);
  }
  if (elem.classList.contains('stop-car')) {
    elem.disabled = true;
    const id = +elem.id.split('-')[1];
    await stopDrive(id);
  }
}
