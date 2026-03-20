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
const travelHero = document.getElementById("travelHero");

let currentIndex = 0;
let autoPlayId;
let scrollLock = false;

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

function handleSlideChange(nextIndex) {
  updateSlides(nextIndex);
  startAutoPlay();
}

function handleWheelNavigation(event) {
  if (!travelHero.contains(event.target) || scrollLock || Math.abs(event.deltaY) < 18) {
    return;
  }

  event.preventDefault();
  scrollLock = true;

  if (event.deltaY > 0) {
    handleSlideChange(currentIndex + 1);
  } else {
    handleSlideChange(currentIndex - 1);
  }

  window.setTimeout(() => {
    scrollLock = false;
  }, 700);
}

nextBtn.addEventListener("click", () => {
  handleSlideChange(currentIndex + 1);
});

prevBtn.addEventListener("click", () => {
  handleSlideChange(currentIndex - 1);
});

railDots.forEach((dot) => {
  dot.addEventListener("click", () => {
    handleSlideChange(Number(dot.dataset.index));
  });
});

cards.forEach((card) => {
  card.addEventListener("click", () => {
    handleSlideChange(Number(card.dataset.index));
  });
});

travelHero.addEventListener("wheel", handleWheelNavigation, { passive: false });

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    stopAutoPlay();
  } else {
    startAutoPlay();
  }
});

updateSlides(0);
startAutoPlay();
