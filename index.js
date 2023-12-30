const hangmanQuestions = [
  {
    word: "Fruit",
    hint: "It can be found in many colors and is usually sweet.",
    answer: "Orange",
  },
  {
    word: "Capital",
    hint: "The most important and usually the largest city of a country.",
    answer: "Ankara",
  },
  {
    word: "Profession",
    hint: "A person who treats illnesses and works to heal patients.",
    answer: "Doctor",
  },
  {
    word: "Movie",
    hint: "A visual story that many people can watch at the same time.",
    answer: "Cinema",
  },
  {
    word: "Color",
    hint: "The color of the sky during the daytime.",
    answer: "Blue",
  },
  {
    word: "City",
    hint: "A European city famous for its canals and historic buildings.",
    answer: "Venice",
  },
  {
    word: "Animal",
    hint: "Known for its long neck and spots on its fur.",
    answer: "Giraffe",
  },
  {
    word: "Country",
    hint: "Home to the Pyramids and the Sphinx.",
    answer: "Egypt",
  },
  {
    word: "Sport",
    hint: "Played on a rectangular field with a spherical ball.",
    answer: "Soccer",
  },
  {
    word: "Technology",
    hint: "A fruit company known for iPhones and MacBooks.",
    answer: "Apple",
  },
  {
    word: "Language",
    hint: "The native language of Japan.",
    answer: "Japanese",
  },
  {
    word: "Instrument",
    hint: "A woodwind instrument often used in jazz.",
    answer: "Saxophone",
  },
  {
    word: "Planet",
    hint: "The Red Planet in our solar system.",
    answer: "Mars",
  },
  {
    word: "Food",
    hint: "A traditional Italian dish with layers of pasta and cheese.",
    answer: "Lasagna",
  },
  {
    word: "Drink",
    hint: "A popular beverage made from roasted coffee beans.",
    answer: "Espresso",
  },
  {
    word: "Vehicle",
    hint: "A two-wheeled vehicle powered by pedals.",
    answer: "Bicycle",
  },
  {
    word: "Book",
    hint: "A fantasy series by J.K. Rowling featuring a young wizard.",
    answer: "Harry Potter",
  },
  {
    word: "Music",
    hint: "A genre known for its fast beats and electronic sound.",
    answer: "Techno",
  },
];

const imgHang = document.querySelector("#imgHang");
const questTitle = document.querySelector("#questTitle");
const question = document.querySelector("#question");
const questLeng = document.querySelector("#questLeng");
const compScore = document.querySelector("#compScore");
const guestLeft = document.querySelector("#guestLeft");
const youScore = document.querySelector("#youScore");
const guess_arr = document.querySelector("#guess_arr");
const trueAns = document.querySelector("#trueAns");
class HangmanGame {
  hangData = [];
  win = 0;
  lose = 0;
  hangImg = 0;
  chanceTry = 6;
  wrong_words = [];
  arr_true = [];
  imgINdex = 0;
  answer_arr = [];

  constructor(data) {
    this.hangData = data;
  }

  domUI() {
    compScore.innerHTML = this.lose;
    youScore.innerHTML = this.win;
    guestLeft.innerHTML = this.chanceTry;
    guess_arr.innerHTML = this.wrong_words.join("");
  }

  compchose() {
    return Math.floor(Math.random() * this.hangData.length);
  }

  indexArr(compAns, questAns) {
    let correctIndexes = [];
    for (let i = 0; i < compAns.length; i++) {
      if (compAns[i] === questAns) {
        correctIndexes.push(i);
      }
    }
    return correctIndexes;
  }

  start() {
    let randIndex = this.compchose();
    questTitle.innerHTML = this.hangData[randIndex].word;
    question.innerHTML = this.hangData[randIndex].hint;
    this.answer_arr = this.hangData[randIndex].answer.toLowerCase().split("");

    let list = [];
    for (let i = 0; i < this.answer_arr.length; i++) {
      list.push(`<li id="list_${i}" class="letter"></li>`);
    }
    questLeng.innerHTML = list.join("");
  }

  restart() {
    this.imgINdex = 0;
    this.chanceTry = 6;
    imgHang.src = `./assets/images/hang-0.png`;
    questLeng.innerHTML = "";
    this.wrong_words = [];
    this.arr_true = [];
    this.answer_arr = [];
    trueAns.innerHTML = "";
    guess_arr.innerHTML = "";
    this.start();
  }
}

const Mygame = new HangmanGame(hangmanQuestions);
Mygame.domUI();
Mygame.restart();

window.addEventListener("keypress", (e) => {
  if (
    !(
      (e.keyCode >= 97 && e.keyCode <= 122) ||
      (e.keyCode >= 65 && e.keyCode <= 90)
    )
  ) {
    alert("Yalnızca harf giriniz");
    return; // Harf dışında bir tuşa basıldığında, devam etme
  }

  let myChoice = e.key.toLowerCase();

  if (
    Mygame.arr_true.includes(myChoice) ||
    Mygame.wrong_words.includes(myChoice)
  ) {
    alert("Bu harfi kullandınız");
  } else if (Mygame.answer_arr.includes(myChoice) && Mygame.chanceTry > 0) {
    let correctIndex = Mygame.indexArr(Mygame.answer_arr, myChoice);
    for (let index of correctIndex) {
      Mygame.arr_true[index] = myChoice;
      const list_index = document.querySelector(`#list_${index}`);
      list_index.innerHTML = myChoice;
    }
  } else if (Mygame.chanceTry > 0) {
    Mygame.wrong_words.push(myChoice);
    Mygame.chanceTry -= 1;
    Mygame.imgINdex++;
    imgHang.src = `./assets/images/hang-${Mygame.imgINdex}.png`;
  } else if (Mygame.chanceTry === 0) {
    console.log("Kaybettiniz");
    Mygame.lose++;
    trueAns.innerHTML = `True answer: ${Mygame.answer_arr.join("")}`;

    setTimeout(() => {
      Mygame.restart();
    }, 1000);
  }

  if (Mygame.arr_true.join("") === Mygame.answer_arr.join("")) {
    console.log("Kazandınız");
    Mygame.win++;
    Mygame.restart();
    Mygame.domUI();
  }

  Mygame.domUI();
});
