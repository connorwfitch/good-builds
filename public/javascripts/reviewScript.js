document.addEventListener("DOMContentLoaded", () => {
  const reviewButton = document.querySelector('.review-submit');
  reviewButton.addEventListener('click', postReview);

  const deleteButtons = document.querySelectorAll('.review-delete');
  deleteButtons.forEach(button => {
    button.addEventListener('click', deleteReview);
  })
});

async function postReview(e) {
  const titleInput = document.querySelector('#title')
  const title = titleInput.value;
  const ratingInput = document.querySelector('#rating');
  const rating = ratingInput.value;
  const contentInput = document.querySelector('#content');
  const content = contentInput.value;
  titleInput.value = '';
  ratingInput.value = 5;
  contentInput.value = '';

  const buildId = e.target.id.split('-')[2];
  const userId = e.target.id.split('-')[1];

  const res = await fetch(`/api/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title,
      content,
      rating,
      buildId,
      userId,
    })
  })

  const data = await res.json()
  if (data.message === 'Success') {
    // console.log(data)
    const reviewsContainer = document.querySelector('.reviews-container');
    const newReview = document.createElement('div');
    newReview.classList.add('review');
    newReview.id = `review-${data.review.id}`;
    const reviewTop = document.createElement('h3');
    reviewTop.innerText = `${data.review.title} (${data.review.rating}/5)`;
    const reviewBottom = document.createElement('p');
    reviewBottom.innerText = data.review.content;

    const sideBySide = document.createElement('div');
    sideBySide.classList.add('side-by-side');

    const editButton = document.createElement('a');
    const deleteButton = document.createElement('button');
    editButton.classList.add('button');
    editButton.id = `review-edit-${data.review.id}`;
    deleteButton.classList.add('button', 'warning');
    deleteButton.id = `review-delete-${data.review.id}`;

    editButton.href = `/reviews/edit/${data.review.id}`;
    editButton.innerText = 'Edit Review';
    deleteButton.innerText = 'Delete Review';

    deleteButton.addEventListener('click', deleteReview);

    // APPENDING EVEYTHING
    sideBySide.append(editButton, deleteButton);
    newReview.append(reviewTop, reviewBottom, sideBySide);
    reviewsContainer.append(newReview);
  } else {
    // create elements with error message
  }
}

async function deleteReview(e) {
  const reviewId = e.target.id.split('-')[2];
  const res = await fetch(`/api/reviews/${reviewId}`, {
    method: 'DELETE',
  })

  const data = await res.json()
  if (data.message === 'Success') {
    const review = document.querySelector(`#review-${reviewId}`)
    review.remove()
  } else {
    // create elements with error message
  }
}