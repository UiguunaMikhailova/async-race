import { Engine } from '../../../types/types';
import urls from './urls';

async function startCar(id: number): Promise<Engine> {
  const response = await fetch(`${urls.engine}?id=${id}&status=started`, {
    method: 'PATCH',
  });
  const res = response.json();
  return res;
}

async function stopCar(id: number): Promise<Engine> {
  const response = await fetch(`${urls.engine}?id=${id}&status=stopped`, {
    method: 'PATCH',
  });
  const res = response.json();
  return res;
}

async function drive(id: number): Promise<boolean> {
  const response = await fetch(`${urls.engine}?id=${id}&status=drive`, {
    method: 'PATCH',
  }).catch((err) => { throw new Error(err); });
  const res = response.ok;
  return res;
}

export { startCar, stopCar, drive };
