document.addEventListener("DOMContentLoaded", () => {

  const editButtons = document.querySelectorAll('.edit');
  editButtons.forEach(button => {
    button.addEventListener('click', editShelfMenu);
  })
});

async function editShelfMenu(e) {
  // remove the event listeners for the buttons
  const editButtons = document.querySelectorAll('.edit');
  editButtons.forEach(button => {
    button.removeEventListener('click', editShelfMenu);
  });
  // push the pop up into life!
  const popUp = document.querySelector('#pop-up');
  popUp.classList.toggle('hidden');
  popUp.classList.toggle('pop-up');

  const buildAndShelfId = e.target.id.split('-')[3];

  // add event listener for submission
  const submitButton = document.querySelector('#pop-up-submit');
  submitButton.addEventListener('click', submitEditToShelf);

  // add event listener for delete
  const removeButton = document.querySelector('#pop-up-remove');
  removeButton.addEventListener('click', removeFromShelf);

  // add event listener for cancel
  const cancelButton = document.querySelector('#pop-up-cancel');
  cancelButton.addEventListener('click', cancelBuildEdit);

  // changing id's for later access
  submitButton.id = `pop-up-submit-${buildAndShelfId}`;
  removeButton.id = `pop-up-remove-${buildAndShelfId}`;
  cancelButton.id = `pop-up-cancel-${buildAndShelfId}`;
}

async function submitEditToShelf(e) {
  const buildAndShelfId = e.target.id.split('-')[3];
  
  // from the select we get our buildStatus
  const buildStatus = document.querySelector('#buildStatus').value;

  const res = await fetch(`/api/buildandshelves/${buildAndShelfId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      buildStatus
    })
  })

  // reflect the change in build status

  // RESET
  reset();

}

async function removeFromShelf() {
  const buildAndShelfId = e.target.id.split('-')[3];
  const res = await fetch(`/api/buildandshelves/${buildAndShelfId}`, {
    method: 'DELETE',
  })

  const data = await res.json()
  if (data.message === 'Success') {
    const container = document.querySelector(`#container-${buildAndShelfId}`)
    review.remove()
  } else {
    // create elements with error message
  }
}

function cancelBuildEdit(e) {
  const buildId = e.target.id.split('-')[3];


  // RESET
  reset();
}

function reset(id) {
  const popUp = document.querySelector('#pop-up');
  popUp.classList.toggle('hidden');
  popUp.classList.toggle('pop-up');

  const editButtons = document.querySelectorAll('.edit');
  editButtons.forEach(button => {
    button.addEventListener('click', editShelfMenu);
  })

  const submitButton = document.querySelector(`#pop-up-submit-${id}`);
  submitButton.removeEventListener('click', submitEditToShelf);
  submitButton.id = 'pop-up-submit';

  const removeButton = document.querySelector(`#pop-up-remove-${id}`);
  removeButton.removeEventListener('click', removeFromShelf);
  removeButton.id = 'pop-up-remove';

  const cancelButton = document.querySelector(`#pop-up-cancel-${id}`);
  cancelButton.removeEventListener('click', cancelBuildEdit);
  cancelButton.id = 'pop-up-cancel';
}