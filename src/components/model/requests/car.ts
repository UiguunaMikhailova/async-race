import urls from './urls';

async function createCar(car: { name: string, color: string }): Promise<void> {
  await fetch(urls.garage, {
    method: 'POST',
    body: JSON.stringify(car),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

async function deleteCar(id: number): Promise<void> {
  await fetch(`${urls.garage}/${id}`, {
    method: 'DELETE',
  });
}

async function updateCar(id: number, car: { name: string, color: string }): Promise<void> {
  await fetch(`${urls.garage}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(car),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export { createCar, deleteCar, updateCar };
