const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get("id");
const username = urlParams.get("username");
const olderReviews = JSON.parse(localStorage.getItem("reviews")) || [];

function generateReviewDateElement(review) {
  var reviewDate = new Date(review.date).toLocaleDateString();
  var reviewHTML = `<div class="review-date">${reviewDate}</div>`;
  return reviewHTML;
}

function populateOlderReviewDates() {
  var olderReviewsContainer = document.getElementById("older-reviews-container");

  olderReviews.forEach(function(review) {
    var reviewDateElement = generateReviewDateElement(review);
    olderReviewsContainer.innerHTML += reviewDateElement;
  });
}

function submitReview() {
  var titlu = document.getElementById("title").value.trim();
  var email = document.getElementById("email").value.trim();
  var rating = document.getElementById("rating").value;
  var review = document.getElementById("review").value.trim();

  //validarile recenziei
  if (!titlu || titlu.length < 3) {
    alert("Titlul trebuie să conțină cel puțin 3 caractere!");
    return;
  }

  if (!email || !email.includes("@")) {
    alert("Introduceți o adresă de e-mail validă!");
    return;
  }

  if (!rating) {
    alert("Vă rugăm să selectați o evaluare!");
    return;
  }

  if (!review || review.length < 10) {
    alert("Recenzia trebuie să conțină cel puțin 10 caractere!");
    return;
  }

  var reviewObj = {
    title: titlu,
    username: username,
    email: email,
    rating: rating,
    date: new Date().toLocaleDateString(),
    review: review,
  };

  var reviews = localStorage.getItem("reviews");
  if (reviews) {
    reviews = JSON.parse(reviews);
  } else {
    reviews = [];
  }
  reviews.push(reviewObj);
  localStorage.setItem("reviews", JSON.stringify(reviews));

  alert("Recenzia a fost trimisă cu succes!");
  document.getElementById("review-form").reset();
  window.location.href =
    "/Mainpage/mainpage.html?id=" + userId + "&username=" + username;
}

function renderReviews() {
  var reviews = localStorage.getItem("reviews");
  if (reviews) {
    reviews = JSON.parse(reviews);
    var reviewsContainer = document.getElementById("reviewsContainer");
    reviewsContainer.innerHTML = "";

    reviews.forEach(function(review) {
      if (review.username === username) {
        var reviewElement = document.createElement("div");
        reviewElement.classList.add("review");
        reviewElement.innerHTML = `
        <div class="title-and-date">
        <h4>${review.title}</h4>
        <p>${review.rating}</p>
        <p>Data: ${review.date}</p>
      </div>
        `;

        reviewsContainer.appendChild(reviewElement);
      }
    });
  }
}

renderReviews();