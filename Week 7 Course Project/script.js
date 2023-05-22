var t1 = new just.timeline(); 
var container = document.querySelector(".container");
var wrapper = document.querySelector(".wrapper");
var boxCount = 0;

function createSquare() {
   var square = document.createElement("div");
   square.classList.add("square");
   square.style.backgroundColor = "hsl(" + just.random(0, 360) + ",50%,50%)";
   container.appendChild(square);
   return square;
}

function handleTooMany() {
   var h2 = document.querySelector("h2");
   h2.innerHTML = "OMG, that is a lot of boxes!";
   h2.style.color = "red";
}

function addAnimation() {
   if (boxCount === 22) {
      handleTooMany();
   }
   if (boxCount > 59) {
      return;
   }

   boxCount++;

   // create new square
   var square = createSquare();

   // add an animation onto the last one
   t1.animate({
      targets: square,
      delay: -500,
      duration: 800,
      easing: "ease-in-out",
      web: {
         y: [0, -30, 5, 0],
         scale: [0.6, { offset: 0.6, value: 1 }, 1],
         filter: {
            value: ["grayscale(.95)", "grayscale(0)"],
            easing: "ease"
         }
      }
   }); 
}

// preload some squares
for (var i = 0; i < 5; i++) {
   addAnimation();
}

// start playing box animation
t1.play({ repeat: Infinity, alternate: true });

// animate in text
var t2 = just.animate({
   targets: just.splitText("h2").characters,
   duration: 800,
   delay: 1200,
   easing: "ease-out",
   stagger: 30,
   web: {
      y: [-50, 5, 0],
      opacity: [0, 1]
   }
});
t2.play({ destroy: true });

// add another box on click
wrapper.addEventListener("click", addAnimation);