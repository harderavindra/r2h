document.addEventListener("DOMContentLoaded", () => {

  const awardList = document.querySelector(".award-list");
  const awardRows = [...document.querySelectorAll(".award")];
  const textBox   = document.querySelector(".award-text");
  const textItems = textBox ? [...textBox.querySelectorAll("p")] : [];

  const btnPrev = document.querySelector(".award-prev");
  const btnNext = document.querySelector(".award-next");

  let current = 0;
  const total = 5;

  const matrix = [
    [4,5,1,2,3],
    [5,1,2,3,4],
    [1,2,3,4,5],
    [2,3,4,5,1],
    [3,4,5,1,2]
  ];

  function updateAwards() {

    awardRows.forEach((award, rowIndex) => {
      const imgs = [...award.querySelectorAll("img")];

      const centerIndex = matrix[current][rowIndex] - 1;
      const prevIndex   = (centerIndex + 4) % 5; // one step behind

      imgs.forEach((img, i) => {

        // COMMON RESET
        img.style.zIndex = 0;

        if (i === centerIndex) {
          // CENTER IMAGE
          img.style.transition = "left 1s ease, z-index 0s";
          img.style.left = "0";
          img.style.zIndex = 2;
        }

        else if (i === prevIndex) {
          // LEFT SIDE IMAGE
          img.style.transition = "left 1s ease, z-index 0s";
          img.style.left = "-100%";
          img.style.zIndex = 2;
        }

        else {
          // HIDDEN ELEMENTS (NO TRANSITION)
          img.style.transition = "none";
          img.style.left = "100%";
          img.style.zIndex = 0;
        }
      });
    });

    // Text fade
    if (textItems.length > 0) {
      textItems.forEach((p, i) => {
        p.style.transition = "opacity .8s ease";
        p.style.opacity = (i === current) ? "1" : "0";
      });
    }
  }

  function nextAward() {
    current = (current + 1) % total;
    updateAwards();
  }

  function prevAward() {
    current = (current - 1 + total) % total;
    updateAwards();
  }

  let autoplay = setInterval(nextAward, 5000);

  if (btnNext) btnNext.addEventListener("click", () => {
    clearInterval(autoplay);
    nextAward();
    autoplay = setInterval(nextAward, 5000);
  });

  if (btnPrev) btnPrev.addEventListener("click", () => {
    clearInterval(autoplay);
    prevAward();
    autoplay = setInterval(nextAward, 5000);
  });

  updateAwards();
});


