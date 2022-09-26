import {
  Car, StateCar, Winner, StateWinner,
} from '../../../types/types';
import urls from './urls';

async function getCars(page: number, limit = 7): Promise<StateCar> {
  const response = await fetch(`${urls.garage}?_page=${page}&_limit=${limit}`);
  const cars = await response.json() as Car[];
  const count = response.headers.get('X-Total-Count') as string;
  return {
    cars,
    count,
  };
}

async function getAllCars(): Promise<StateCar> {
  const response = await fetch(`${urls.garage}`);
  const cars = await response.json() as Car[];
  const count = response.headers.get('X-Total-Count') as string;
  return {
    cars,
    count,
  };
}

async function getCar(id: number): Promise<Car> {
  const response = await fetch(`${urls.garage}/${id}`);
  const car: Promise<Car> = response.json() as Promise<Car>;
  return car;
}

async function getWinners(page: number, sort: string, order = 'asc', limit = 10): Promise<StateWinner> {
  const sortString = sort !== '' ? `&_sort=${sort}&_order=${order}` : '';
  const response = await fetch(`${urls.winners}?_page=${page}&_limit=${limit}${sortString}`);
  const winners = await response.json() as Winner[];
  const countWinners = response.headers.get('X-Total-Count') as string;
  return {
    winners,
    countWinners,
  };
}

export {
  getCars,
  getCar,
  getWinners,
  getAllCars,
};
