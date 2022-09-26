import { Winner } from '../../../types/types';
import urls from './urls';

async function deleteWinner(id: number): Promise<void> {
  const statusWinner = (await fetch(`${urls.winners}/${id}`)).status;
  if (statusWinner !== 404) {
    await fetch(`${urls.winners}/${id}`, {
      method: 'DELETE',
    });
  }
}

async function setWinner(winner: Winner): Promise<void> {
  await fetch(urls.winners, {
    method: 'POST',
    body: JSON.stringify(winner),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

async function updateWinner(id: number, winner: Winner): Promise<void> {
  await fetch(`${urls.winners}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(winner),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

async function checkWinner(winner: Winner): Promise<void> {
  const { id, time } = winner;
  const statusWinner = (await fetch(`${urls.winners}/${id}`)).status;
  if (statusWinner === 404) {
    await setWinner({
      id,
      wins: 1,
      time,
    });
  } else {
    const prevWinner = await (await fetch(`${urls.winners}/${id}`)).json();
    const newTime = time < prevWinner.time ? time : prevWinner.time;
    await updateWinner(id, {
      id,
      wins: prevWinner.wins + 1,
      time: newTime,
    });
  }
}

export { checkWinner, deleteWinner };
