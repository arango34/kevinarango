const video = document.querySelector('.video-container');
const preloader = document.querySelector('.preloader');

window.addEventListener('load', function () {
  preloader.classList.add('hide-preloader');
});

// ********** set date ************
// select span
const date = document.getElementById('date');
date.innerHTML = new Date().getFullYear();

// ********** close links ************
const navToggle = document.querySelector('.nav-toggle');
const linksContainer = document.querySelector('.links-container');
const links = document.querySelector('.links');

navToggle.addEventListener('click', function () {
  // linksContainer.classList.toggle("show-links");

  const linksHeight = links.getBoundingClientRect().height;
  const containerHeight = linksContainer.getBoundingClientRect().height;
  if (containerHeight === 0) {
    linksContainer.style.height = `${linksHeight}px`;
    // linksContainer.classList.add('links-container-show');
  } else {
    linksContainer.style.height = 0;
    linksContainer.classList.remove('links-container-show');
  }
  // console.log(linksContainer.getBoundingClientRect());
});

// ********** fixed navbar ************

const navbar = document.getElementById('nav');
const topLink = document.querySelector('.top-link');

window.addEventListener('scroll', function () {
  const scrollHeight = window.pageYOffset;
  const navHeight = navbar.getBoundingClientRect().height;
  if (scrollHeight > navHeight) {
    navbar.classList.add('fixed-nav');
  } else {
    navbar.classList.remove('fixed-nav');
  }
  // setup back to top link

  if (scrollHeight > 500) {
    console.log('helo');

    topLink.classList.add('show-link');
  } else {
    topLink.classList.remove('show-link');
  }
});

// ********** smooth scroll ************
// select links
const scrollLinks = document.querySelectorAll('.scroll-link');
scrollLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    // prevent default
    e.preventDefault();
    // navigate to specific spot
    const id = e.currentTarget.getAttribute('href').slice(1);
    const element = document.getElementById(id);

    const navHeight = navbar.getBoundingClientRect().height;
    const containerHeight = linksContainer.getBoundingClientRect().height;
    const fixedNav = navbar.classList.contains('fixed-nav');
    let position = element.offsetTop - navHeight;

    if (!fixedNav) {
      position = position - navHeight + 2;
    }
    if (navHeight > 82) {
      position = position + containerHeight;
    }

    window.scrollTo({
      left: 0,
      top: position,
    });
    // close
    linksContainer.style.height = 0;
  });
});
// calculate heights

const descBtns = document.querySelectorAll('.description-btn');
const downIcons = document.querySelectorAll('.down-icon');

const showDesc = (e) => {
  const container = e.target.parentElement.previousElementSibling;
  const desc = container.firstElementChild.firstElementChild.firstElementChild;
  if (e.target.textContent.trim() === 'see description') {
    const height = desc.getBoundingClientRect().height + 22;
    container.style.height = `${height}px`;
    e.target.innerHTML = `Hide<i class="fa-solid fa-chevron-up up-icon"></i>`;
  } else {
    container.style.height = 0;
    e.target.innerHTML = `see description<i
                    class="fa-solid fa-chevron-down down-icon"
                  ></i>`;
  }
};

descBtns.forEach((btn) => {
  btn.addEventListener('click', showDesc);
});

downIcons.forEach((icon) => {
  icon.addEventListener('click', showDesc);
});
