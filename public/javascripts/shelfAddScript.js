document.addEventListener("DOMContentLoaded", () => {

  const addButtons = document.querySelectorAll('.add');
  addButtons.forEach(button => {
    button.addEventListener('click', addToShelfMenu);
  })
});

async function addToShelfMenu(e) {
  // remove the event listeners for the buttons
  const addButtons = document.querySelectorAll('.add');
  addButtons.forEach(button => {
    button.removeEventListener('click', addToShelfMenu);
  });
  // push the pop up into life!
  const popUp = document.querySelector('#pop-up');
  popUp.classList.toggle('hidden');
  popUp.classList.toggle('pop-up');

  const buildId = e.target.id.split('-')[2];

  // add some event listener for submission
  const submitButton = document.querySelector('#pop-up-submit');
  submitButton.addEventListener('click', submitBuildToShelf);
  
  // add some event listener for cancel
  const cancelButton = document.querySelector('#pop-up-cancel');
  cancelButton.addEventListener('click', cancelBuildAdd);

  // changing id's for later access
  submitButton.id = `pop-up-submit-${buildId}`;
  cancelButton.id = `pop-up-cancel-${buildId}`;
}

async function submitBuildToShelf(e) {
  const buildId = e.target.id.split('-')[3];

  // from the select we get our shelfId and buildStatus

  // RESET
  const popUp = document.querySelector('#pop-up');
  popUp.classList.toggle('hidden');
  popUp.classList.toggle('pop-up');

  const addButtons = document.querySelectorAll('.add');
  addButtons.forEach(button => {
    button.addEventListener('click', addToShelfMenu);
  });

  const submitButton = document.querySelector(`#pop-up-submit-${buildId}`);
  submitButton.removeEventListener('click', submitBuildToShelf);
  submitButton.id = 'pop-up-submit';

  const cancelButton = document.querySelector(`#pop-up-cancel-${buildId}`);
  cancelButton.removeEventListener('click', cancelBuildAdd);
  cancelButton.id = 'pop-up-cancel';

}

function cancelBuildAdd(e) {
  const buildId = e.target.id.split('-')[3];

  
  // RESET
  const popUp = document.querySelector('#pop-up');
  popUp.classList.toggle('hidden');
  popUp.classList.toggle('pop-up');

  const addButtons = document.querySelectorAll('.add');
  addButtons.forEach(button => {
    button.addEventListener('click', addToShelfMenu);
  });

  const submitButton = document.querySelector(`#pop-up-submit-${buildId}`);
  submitButton.removeEventListener('click', submitBuildToShelf);
  submitButton.id = 'pop-up-submit';

  const cancelButton = document.querySelector(`#pop-up-cancel-${buildId}`);
  cancelButton.removeEventListener('click', cancelBuildAdd);
  cancelButton.id = 'pop-up-cancel';
}