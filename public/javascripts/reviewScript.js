document.addEventListener("DOMContentLoaded", () => {
  createReviewListener();
});

function createReviewListener() {
  const reviewButton = document.querySelector('.review-submit');

  reviewButton.addEventListener('click', postReview);
}

async function postReview(e) {
  const title = document.querySelector('#title').value;
  const rating = document.querySelector('#rating').value;
  const content = document.querySelector('#content').value;

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
    const reviewTop = document.createElement('h3');
    reviewTop.innerText = `${data.review.title} (${data.review.rating}/5)`;
    const reviewBottom = document.createElement('p');
    reviewBottom.innerText = data.review.content;

    newReview.append(reviewTop);
    newReview.append(reviewBottom);

    reviewsContainer.append(newReview);
  } else {
    // create elements with error message
  }
}