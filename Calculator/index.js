let calNumbers = Array.from(document.querySelectorAll(".calValue"));
let calItems = Array.from(document.querySelectorAll(".calItem"));
let input = document.querySelector("#result");
let result = 0;
let memory = 0;
let symbol;
let x;
input.value = 0;

calItems.forEach((item) => {
  item.addEventListener("mousedown", () => {
    item.style.backgroundColor = "rgb(124 124 124)";
  });
  item.addEventListener("mouseup", () => {
    item.style.backgroundColor = "#b3b1b1";
  });
  item.addEventListener("mouseenter", () => {
    item.style.backgroundColor = "rgba(255, 255, 255, 0.688)";
  });
  item.addEventListener("mouseleave", () => {
    item.style.backgroundColor = "#b3b1b1";
  });
});

calNumbers.forEach((element) =>
  element.addEventListener("click", () => {
    if (element) {
      memory = `${memory == 0 ? "" : memory}${element.value}`;
      input.value = memory;
    }
  })
);

let operators = Array.from(document.querySelectorAll(".calSymbol"));

let equal = document.querySelector("#equalSymbol");
let ac = document.querySelector("#ac");
let erase = document.querySelector("#delete");

ac.addEventListener("click", () => {
  input.value = 0;
  memory = input.value;
});

erase.addEventListener("click", () => {
  input.value = input.value.substr(0, input.value.length - 1);
  memory = input.value;
});

operators.forEach((operator) => {
  MouseOperators(operator);
});

function MouseOperators(operator) {
  operator.addEventListener("mousedown", (e) => {
    console.log(e.target);

    operator.style.backgroundColor = "#fff";
    operator.style.color = "rgb(239, 178, 62)";
    symbol = operator.value;
    x = memory;
    console.log(memory, x);
    input.value = 0;
    memory = 0;
  });

  operator.addEventListener("mouseup", () => {
    operator.style.backgroundColor = "rgb(239, 178, 62)";
    operator.style.color = "#fff";
  });

  operator.addEventListener("mouseenter", () => {
    operator.style.backgroundColor = "rgba(239, 177, 62, 0.54)";
  });

  operator.addEventListener("mouseleave", () => {
    operator.style.backgroundColor = "rgb(239, 178, 62)";
  });
}

equal.addEventListener("mouseenter", () => {
  equal.style.backgroundColor = "rgba(239, 177, 62, 0.54)";
  equal.style.color = "#000";
});

equal.addEventListener("mouseleave", () => {
  equal.style.backgroundColor = "rgb(239, 178, 62)";
  equal.style.color = "#000";
});

equal.addEventListener("mousedown", () => {
  equal.style.backgroundColor = "#fff";
  equal.style.color = "rgb(239, 178, 62)";
});

equal.addEventListener("mouseup", () => {
  equal.style.backgroundColor = "rgb(239, 178, 62)";
  equal.style.color = "#000";
});

let sum = (x, y) => {
  return Number.parseInt(x) + Number.parseInt(y);
};
let sub = (x, y) => {
  return x - y;
};
let mult = (x, y) => {
  return x * y;
};
let div = (x, y) => {
  return x / y;
};

equal.addEventListener("click", Calculate);

function Calculate() {
  switch (symbol) {
    case "+":
      input.value = sum(x, input.value);
      break;
    case "-":
      input.value = sub(x, input.value);
      break;
    case "*":
      input.value = mult(x, input.value);
      break;
    case "/":
      input.value = div(x, input.value);
      break;
    default:
      console.log("Error");
  }
  memory = input.value;
  //   x = input.value;
}
