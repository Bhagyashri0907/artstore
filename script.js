const imageFiles = [
  "image1.jpeg",
  "image2.jpeg",
  "image3.jpeg",
  "image4.jpeg"
];

const paintings = imageFiles.map((file, index) => ({
  name: "Painting " + (index + 1),
  price: "$" + (100 + index * 20),
  description: "Beautiful painting",
  image: "gallery/" + file
}));

const slidesContainer = document.getElementById("slides");
const bgBlur = document.getElementById("bg-blur");

const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const closeModal = document.getElementById("closeModal");

paintings.forEach(p => {
  const slide = document.createElement("div");
  slide.className = "slide";

  slide.innerHTML = `
    <img src="${p.image}" alt="${p.name}" class="painting-img"/>
    <h3>${p.name}</h3>
    <p>${p.description}</p>
    <strong>${p.price}</strong>
    <div class="like-btn">🤍</div>
  `;

  // FULLSCREEN CLICK
  const img = slide.querySelector(".painting-img");
  img.addEventListener("click", () => {
    modal.style.display = "flex";
    modalImg.src = p.image;
  });

  // LIKE BUTTON
  const likeBtn = slide.querySelector(".like-btn");
  likeBtn.addEventListener("click", () => {
    likeBtn.classList.toggle("liked");
    likeBtn.textContent = likeBtn.classList.contains("liked") ? "❤️" : "🤍";
  });

  slidesContainer.appendChild(slide);
});

/* CLOSE MODAL */
closeModal.onclick = () => {
  modal.style.display = "none";
};

/* CLICK OUTSIDE CLOSE */
modal.onclick = () => {
  modal.style.display = "none";
};

let currentIndex = 0;
let autoSlide;

/* UPDATE */
function updateSlider() {
  slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
  bgBlur.style.backgroundImage = `url(${paintings[currentIndex].image})`;
}

/* NAVIGATION */
function nextSlide() {
  currentIndex = (currentIndex + 1) % paintings.length;
  updateSlider();
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + paintings.length) % paintings.length;
  updateSlider();
}

document.getElementById("next").onclick = nextSlide;
document.getElementById("prev").onclick = prevSlide;

/* AUTOPLAY */
function startAutoSlide() {
  autoSlide = setInterval(nextSlide, 3000);
}

function stopAutoSlide() {
  clearInterval(autoSlide);
}

startAutoSlide();

document.querySelector(".slider").addEventListener("mouseenter", stopAutoSlide);
document.querySelector(".slider").addEventListener("mouseleave", startAutoSlide);

/* SWIPE */
let startX = 0;

slidesContainer.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
});

slidesContainer.addEventListener("touchend", e => {
  let endX = e.changedTouches[0].clientX;

  if (startX - endX > 50) nextSlide();
  else if (endX - startX > 50) prevSlide();
});

/* INIT */
updateSlider();