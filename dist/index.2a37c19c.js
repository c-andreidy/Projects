const ball = document.querySelector(".ball");
popmotion.animate({
    from: "0px",
    to: "100px",
    repeat: Infinity,
    repeatType: "mirror",
    type: "spring",
    onUpdate (upgrade) {
        //  ball.getElementsByClassName.left = upgrade;
        ball.style.left = upgrade;
    }
});

//# sourceMappingURL=index.2a37c19c.js.map
