const slides = [
  {
    title: "Komodo",
    location: "Indonesia",
  },
  {
    title: "Kerala",
    location: "India",
  },
  {
    title: "Matterhorn",
    location: "Switzerland",
  },
  {
    title: "Lofoten",
    location: "Norway",
  },
  {
    title: "Santorini",
    location: "Greece",
  },
  {
    title: "Banff",
    location: "Canada",
  },
  {
    title: "Bali",
    location: "Indonesia",
  },
  {
    title: "Patagonia",
    location: "Chile",
  },
  {
    title: "Kyoto",
    location: "Japan",
  },
];

const copySlides = Array.from(document.querySelectorAll(".copy-slide"));
const backgroundSlides = Array.from(document.querySelectorAll(".hero-background"));
const cards = Array.from(document.querySelectorAll(".place-card"));
const railDots = Array.from(document.querySelectorAll(".rail-dot"));
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

let currentIndex = 0;
let autoPlayId;

function getRelativePosition(cardIndex, activeIndex, total) {
  return (cardIndex - activeIndex + total) % total;
}

function updateSlides(newIndex) {
  currentIndex = (newIndex + slides.length) % slides.length;

  copySlides.forEach((slide, index) => {
    slide.classList.toggle("active", index === currentIndex);
  });

  backgroundSlides.forEach((slide, index) => {
    slide.classList.toggle("active", index === currentIndex);
  });

  railDots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentIndex);
  });

  cards.forEach((card, index) => {
    const position = getRelativePosition(index, currentIndex, cards.length);
    card.classList.remove("active", "next", "future", "hidden");

    if (position === 0) {
      card.classList.add("active");
    } else if (position === 1) {
      card.classList.add("next");
    } else if (position === 2) {
      card.classList.add("future");
    } else {
      card.classList.add("hidden");
    }
  });
}

function startAutoPlay() {
  stopAutoPlay();
  autoPlayId = window.setInterval(() => {
    updateSlides(currentIndex + 1);
  }, 5000);
}

function stopAutoPlay() {
  if (autoPlayId) {
    window.clearInterval(autoPlayId);
  }
}

nextBtn.addEventListener("click", () => {
  updateSlides(currentIndex + 1);
  startAutoPlay();
});

prevBtn.addEventListener("click", () => {
  updateSlides(currentIndex - 1);
  startAutoPlay();
});

railDots.forEach((dot) => {
  dot.addEventListener("click", () => {
    updateSlides(Number(dot.dataset.index));
    startAutoPlay();
  });
});

cards.forEach((card) => {
  card.addEventListener("click", () => {
    updateSlides(Number(card.dataset.index));
    startAutoPlay();
  });
});

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    stopAutoPlay();
  } else {
    startAutoPlay();
  }
});

updateSlides(0);
startAutoPlay();
