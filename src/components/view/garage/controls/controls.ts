export default function getControls(): string {
  return `<div class="controls" id="controls">
    <form class="form" id="create-car">
        <input type="text" class="name" id="create-car-text">
        <input type="color" class="color" id="create-car-color">
        <button type="submit" class="button" id="create-submit">Create</button>
    </form>
    <form class="form" id="update-car">
        <input type="text" class="name" id="update-car-text" disabled>
        <input type="color" class="color" id="update-car-color" disabled>
        <button type="submit" class="button submit-btn" disabled>Update</button>
    </form>
    <div class="buttons">
        <button class="button" id="race">Race</button>
        <button class="button" id="reset" disabled>Reset</button>
        <button class="button" id="generate-cars">Generate cars</button>
    </div>
</div>`;
}
