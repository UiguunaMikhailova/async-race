import { getCars, getWinners } from '../requests/getItems';
import { StateCar, StateWinner } from '../../../types/types';

const stateSort = {
  sort: '',
  order: '',
};

const { cars, count }: StateCar = await getCars(1);
const { winners, countWinners }: StateWinner = await getWinners(1, stateSort.sort, stateSort.order);

const state = {
  pageGarage: 1,
  cars,
  count,
  currCarId: 0,
  pageWinners: 1,
  winners,
  countWinners,
  currPage: 'garage',
};

export { state, stateSort };
