const ball = document.querySelector(".ball");

popmotion.animate({
  from: "0px",
  to: "100px",
  repeat: Infinity,
  repeatType: "mirror",
  type: "sprint",
  onupgrate(upgrade) {
    //  ball.getElementsByClassName.left = upgrade;
    ball.style.left = upgrade;
  },
});
