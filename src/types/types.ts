type Car = {
  name: string,
  color: string,
  id: number,
};
type Duration = {
  duration: number,
};
type Winner = {
  id: number,
  time: number,
  wins?: number,
};
type StateCar = {
  carsPage?: number,
  cars: Car[],
  count: string,
};
type StateWinner = {
  winnersPage?: number,
  winners?: Winner[],
  countWinners: string,
};
type Engine = {
  velocity: number,
  distance: number,
};
type Drive = {
  status: boolean,
  idCar: number,
  duration: number,
};

// eslint-disable-next-line import/prefer-default-export
export {
  Car, StateCar, Engine, Drive, Duration, Winner, StateWinner,
};
