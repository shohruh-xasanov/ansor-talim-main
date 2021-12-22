// Adding hamburger animation
const hamburgerBtn = document.querySelector(".navbar__hamburger-icon");
hamburgerBtn.addEventListener("click", () => {
  hamburgerBtn.classList.toggle("open");
});

// Returning to main interface
const onClickLinks = () => {
  const navbarLinks = document.querySelector(".on");
  navbarLinks.addEventListener("click", function (evt) {
    if (
      evt.target.nodeName.toLowerCase() === "a" &&
      hamburgerBtn.classList.contains("open")
    ) {
      hamburgerBtn.classList.remove("open");
    }
  });
};
onClickLinks();

// More btn animation
const moreBtn1 = () => {
  let status = true;
  const allNewsBtn1 = document.querySelector(".more-btn");

  allNewsBtn1.addEventListener("click", () => {
    const extra = document.querySelectorAll(".news__card.extra");
    if (status) {
      allNewsBtn1.textContent = "Kamroq";
      status = false;
    } else {
      allNewsBtn1.textContent = "Barcha yangiliklar";
      status = true;
    }
    extra.forEach((el, index) => {
      el.classList.toggle("hide");
      el.style.animation = `add ${index / 10 + 0.5}s 0ms`;
    });
  });
};

moreBtn1();

const moreBtn2 = () => {
  let status = true;
  const allNewsBtn2 = document.querySelectorAll(".more-btn")[1];

  allNewsBtn2.addEventListener("click", () => {
    const extra = document.querySelectorAll(".course.extra");
    if (status) {
      allNewsBtn2.textContent = "Kamroq";
      status = false;
    } else {
      allNewsBtn2.textContent = "Barcha yangiliklar";
      status = true;
    }
    extra.forEach((el, index) => {
      el.classList.toggle("hide");
      el.style.animation = `add ${index / 10 + 0.5}s 0ms`;
    });
  });
};

moreBtn2();

// Modal
const modalInterface = () => {
  let modal = document.querySelector(".modal");
  let buttonBuy = document.querySelectorAll(".course__buy");
  let modalClose = document.querySelector(".modal-close");

  buttonBuy.forEach((el) => {
    el.addEventListener("click", () => {
      modal.style.top = "50%";
    });
  });

  modalClose.addEventListener("click", () => {
    modal.style.top = "-150%";
  });
};
modalInterface();

// Input checking for numbers
let a = document.querySelector(".input").value;
function onlyNumberKey(evt) {
  // Only ASCII character in that range allowed
  var ASCIICode = evt.which ? evt.which : evt.keyCode;
  if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57)) return false;
  return true;
}
