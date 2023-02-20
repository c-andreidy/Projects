const table = document.querySelector(".scoretable");
const name_URL = "https://words.dev-apis.com/word-of-the-day?random=1";
const availableAttemps = 6;
let attempContainer;
let answerWord;
const letters = [];
let currentAttemp = [];
let currentSpace;
let row = 0,
  col = 0;

let gameOver = false;
let win = false;

let guessWord = document.querySelector("h3");
document.querySelector("h3").setAttribute("hidden", "");

async function init() {
  async function commit() {
    if (currentAttemp.length !== answerWord.length) {
      console.log("You must complete the blank spaces"); //this is working as spected
      return;
    }

    const res = await fetch("https://words.dev-apis.com/validate-word", {
      method: "POST",
      body: JSON.stringify({ word: currentAttemp.join("") }),
    });
    const { validWord } = await res.json();
    //  const validWord = resObj.validWord;

    if (!validWord) {
      markInvalidWord();
      return;
    }
    const mapLetters = letterCounter(answerWord);

    for (let i = 0; i < answerWord.length; i++) {
      if (currentAttemp[i] === answerWord[i]) {
        //mark as correct
        if (document.getElementById(`letter-${row}-${i}`))
          document
            .getElementById(`letter-${row}-${i}`)
            .classList.add("correct");

        mapLetters[currentAttemp[i]]--;
      } else if (
        answerWord.includes(currentAttemp[i]) &&
        mapLetters[currentAttemp[i]] > 0
      ) {
        console.log(mapLetters[currentAttemp[i]]);
        if (document.getElementById(`letter-${row}-${i}`))
          document.getElementById(`letter-${row}-${i}`).classList.add("close");
        mapLetters[currentAttemp[i]] - 1;
        win = false;
      } else {
        if (document.getElementById(`letter-${row}-${i}`))
          document.getElementById(`letter-${row}-${i}`).classList.add("wrong");
        win = false;
      }
    }

    if (currentAttemp.join("") === answerWord.join("")) {
      console.log("you win");
      guessWord.innerHTML = `Congratulations, you win!`;
      document.querySelector("h3").removeAttribute("hidden");
      document.querySelector("h1").classList.add("winner");
      win = true;
    } else if (row + 1 === availableAttemps) {
      guessWord.innerHTML = `GAME OVER, The word was ${answerWord
        .join("")
        .toCapitalize()}`;
      document.querySelector("h3").removeAttribute("hidden");
      gameOver = true;
      win = false;
    }

    currentAttemp = [];
    row++;

    if (row < answerWord.length + 1) {
      document.getElementById(`letter-${row}-0`).focus();
    }
  }
  async function markInvalidWord() {
    for (let i = 0; i < answerWord.length; i++) {
      document.getElementById(`letter-${row}-${i}`).classList.remove("invalid");

      setTimeout(
        () =>
          document
            .getElementById(`letter-${row}-${i}`)
            .classList.add("invalid"),
        10
      );
      guessWord.innerHTML = `So, sorry, invalid word.`;
      document.querySelector("h3").removeAttribute("hidden");
    }
  }

  async function backspace() {
    currentSpace.value = "";
    if (col > 0) col--;
    currentSpace = document.querySelector(`#letter-${row}-${col}`);
    currentAttemp.pop(currentSpace);
    if (`letter-${row}-${col}`) {
      document.getElementById(`letter-${row}-${col}`).focus();
    }
    document.querySelector("h3").setAttribute("hidden", "");
  }

  if (win || gameOver) {
    //you are no allowed to type anything else.
  } else {
    document.addEventListener("keydown", function handleKeyPress(event) {
      const action = event.key;
      if (action === "Enter") {
        commit();
      } else if (action === "Backspace") {
        backspace();
      } else if (isLetter(action)) {
        // addLetter(action);
      } else {
        console.log("Invalid caracter");
      }
    });
  }
}

init();

function isLetter(letter) {
  return /^[a-zA-Z]$/.test(letter);
}

async function getWord() {
  const promise = await fetch(name_URL);
  const processedPromise = await promise.json();
  const word = processedPromise.word;
  answerWord = Array.from(word);
  console.log(word);
  function handleLetters() {
    for (let i = 0; i < availableAttemps; ++i) {
      attempContainer = document.createElement("div");
      attempContainer.setAttribute("class", "attempt-section");
      attempContainer.classList.add(`attemp-${i}`);
      table.append(attempContainer);

      for (let j = 0; j < answerWord.length; j++) {
        const letter = document.createElement("input");
        letter.setAttribute("class", "letter-container");
        letter.setAttribute("maxlength", "1");

        if (j === 0 && i === 0) letter.setAttribute("autofocus", true);

        //   letter.setAttribute("value", "");
        attempContainer.append(letter);
        letter.setAttribute(`id`, `letter-${i}-${j}`);
        letters.push(letter);

        letter.addEventListener("input", (event) => {
          (row = i), (col = j);
          if (event.target.value.length === 1) {
            if (col < answerWord.length) {
              col++;
              currentAttemp.push(event.target.value);
            }

            if (document.getElementById(`letter-${row}-${col}`)) {
              currentSpace = document.getElementById(`letter-${row}-${col}`);
              document.getElementById(`letter-${row}-${col}`).focus();
            }
          } else {
            //do nothing
          }
        });
      }
    }
  }
  handleLetters();
}

getWord();

function letterCounter(array) {
  const obj = {};
  for (let i = 0; i < array.length; i++) {
    const letter = array[i];
    if (obj[letter]) {
      obj[letter]++;
    } else {
      obj[letter] = 1;
    }
  }
  return obj;
}
