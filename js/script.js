document.querySelector(".mobail-nav").onclick = () => {
  document.querySelector(".link ul").classList.toggle("active");
};

document.querySelector(".icon").onclick = () => {
  document.querySelector(".seting").classList.toggle("active");
  document.querySelector(".icon i").classList.toggle("fa-spin");
};

let landing = document.querySelector("main .landing");
let background = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.png"];
let colorList = document.querySelectorAll(".seting .options .color-list .color");
let backgroundOption = document.querySelectorAll(".seting .options .background span");
let mainColor = localStorage.getItem("mian-color");
let started = false;
let randomBack;
let backgroundoption = localStorage.getItem("background-option");

// add color from local storg
if (mainColor !== null) {
  document.documentElement.style.setProperty("--main-color", mainColor);
  document.querySelectorAll(".seting .options .color-list .color").forEach((color) => {
    color.classList.remove("active");
    if (color.dataset.color === mainColor) {
      color.classList.toggle("active")
    }
  })
}


// import background option from local storg
if (backgroundoption !== null) {
  if (backgroundoption === "yes") {
    started = false;
    randomBackground()
  } else {
    started = true;
    document.querySelectorAll(".seting .options .background span").forEach((e) => {
      if(e.classList.contains("yes")) {
        e.classList.remove("active")
      } else {
        e.classList.add("active");
      }
    })
  }
}
// chang main color and add local storg
// add function
function active(element) {
  element.target.parentElement.querySelectorAll(".active").forEach((e) => {
    e.classList.remove("active");
  });
  element.target.classList.add("active");
}
// 
colorList.forEach((e) => {
  e.addEventListener("click", (span) => {
    active(span)
    document.documentElement.style.setProperty("--main-color", span.target.dataset.color);
    localStorage.setItem("mian-color", span.target.dataset.color)
  })
})

// random background
function randomBackground() {
  if (!started) {
    randomBack = setInterval(() => {
      let random = Math.floor(Math.random() * background.length);
      landing.style.background = `url(../images/${background[random]})`
    }, 10000)
  }
}
randomBackground()

// run or stop background
backgroundOption.forEach((e) => {
e.addEventListener("click", (el) => {
  active(el);
  if (el.target.dataset.background === "yes") {
    localStorage.setItem("background-option", el.target.dataset.background)
    started = false;
    randomBackground()
  } else {
    localStorage.setItem("background-option", el.target.dataset.background)
    started = true;
    clearInterval(randomBack);
  }
});
})

// Our skills
let ourSkills = document.querySelector("#our-skills");
let ourSkillsEl = document.querySelectorAll("#our-skills .contenar .long .longac span"),
  startedOus = false;

window.onscroll = () => {

  if (scrollY >= ourSkills.offsetTop - 550) {
    if(!startedOus) {
      ourSkillsEl.forEach((span) => {
        span.style.width = span.dataset.width;
      })
    }
  }
}

// creat popup 
let img = document.querySelectorAll(".our-gallery .images img");

img.forEach(img => {
  img.addEventListener("click", (el) => {
    let window = document.createElement("div");
    window.classList = "window";
    let box = document.createElement("div");
    box.classList = "box";
    let image = document.createElement("img");
    image.src = img.src;
    if (img.alt !== null) {
    let h3 = document.createElement("h3");
    let h3Text = document.createTextNode(img.alt);
    h3.appendChild(h3Text)
    box.appendChild(h3);
    }
    let icon = document.createElement("span");
    let icont = document.createTextNode("X");
    icon.classList = "close";
    icon.appendChild(icont);
    box.appendChild(icon);
    box.appendChild(image);
    window.appendChild(box);
    document.body.appendChild(window);
  })
});

document.addEventListener("click", el => {
  if (el.target.classList.contains("close")) {
    document.querySelector(".window").remove();
  }
});

// rest options
document.querySelector(".rest").onclick = () => {
  localStorage.clear();
  window.location.reload();
}

document.querySelectorAll(".link ul li a").forEach(li => {
  li.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector(`#${e.target.dataset.section}`).scrollIntoView({
      behavior: "smooth"
    });
  })
})
