import car from "./car.jpeg";
import book from "./book.jpeg";
import carrot from "./carrot.jpeg";
import earth from "./earth.jpeg";
import explosion from "./explosion.jpeg";
import fear from "./fear.jpeg";
import friend from "./friend.jpeg";
import happy from "./happy.jpeg";
import nice from "./nice.jpeg";
import relativity from "./relativity.jpeg";
import soldier from "./soldier.jpeg";
import speed from "./speed-limit.jpeg";
export const questions = [
  {
    option: ["Happy", "Srećan"],
    image: happy,
  },
  {
    option: ["Friend", "Prijatelju"],
    image: friend,
  },
  {
    option: ["Nice", "Lijepo"],
    image: nice,
  },
  {
    option: ["Explosion", "Eksplozija"],
    image: explosion,
  },
  {
    option: ["Carrot", "šargarepa"],
    image: carrot,
  },
  {
    option: ["Car", "Auto"],
    image: car,
  },
  {
    option: ["Soldier", "Vojnik"],
    image: soldier,
  },
  {
    option: ["Fear", "Strah"],
    image: fear,
  },
  {
    option: ["Relativity", "Relativnost"],
    image: relativity,
  },
  {
    option: ["Book", "Knjiga"],
    image: book,
  },
  {
    option: ["Earth", "Zemija"],
    image: earth,
  },
  {
    option: ["Speed limit", "ograničenje brzine"],
    image: speed,
  },
];

export function questObj(index, questions) {
  const optionIndex = Math.floor(Math.random() * 2);
  const selectedQues = questions[index];
  const ans = optionIndex ? selectedQues.option[1] : selectedQues.option[0];
  const questionOpt = optionIndex
    ? selectedQues.option[0]
    : selectedQues.option[1];
  return {
    index: index,
    answer: ans,
    question: questionOpt,
    image: selectedQues.image,
  };
}

export function checkAnswer(
  question,
  questionsLeft,
  score,
  answer,
  qnAnswered,
  wrong
) {
  let qnNumberIndex = Math.floor(Math.random() * questionsLeft.length);
  if (question.answer.toLowerCase() === answer.toLowerCase().trim()) {
    let questionsArray = [...questionsLeft];
    let done;
    questionsArray.splice(question.index, 1);
    if (questionsArray.length === 0) {
      questionsArray = [...questions];
      done = true;
    } else {
      done = false;
    }
    qnNumberIndex = Math.floor(Math.random() * questionsArray.length);
    return {
      remainingQn: questionsArray,
      scored: score + 1,
      qnAnswered: qnAnswered + 1,
      wronged: wrong,
      done,
      nextQuestion: questObj(qnNumberIndex, questionsArray),
    };
  }
  return {
    remainingQn: questionsLeft,
    scored: score,
    wronged: wrong + 1,
    done: false,
    qnAnswered: qnAnswered + 1,
    nextQuestion: questObj(qnNumberIndex, questionsLeft),
  };
}
