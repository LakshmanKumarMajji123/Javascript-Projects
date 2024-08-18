
const correctAnswer = ["D", "B", "C", "B", "D"]; //here this is correct answers "List"
/**u have to match the selected answer with the above answers */
const form = document.querySelector(".quiz-form");
const result = document.querySelector(".result");
const questions = document.querySelectorAll(".question");
//console.log(questions[1]);


form.addEventListener("submit", event => {

  event.preventDefault();

  let score = 0;

  const userAnswers = [form.q1.value, form.q2.value, form.q3.value, form.q4.value, form.q5.value];

  userAnswers.forEach((answer, index) => {

    if (answer === correctAnswer[index]) {

      questions[index].classList.add("correct");

      score += 1;

    } else {
      questions[index].classList.add("wrong");
    }
  });
  console.log(score);


  scrollTo(0, 0);
  //remove the "hide" one
  result.classList.remove("hide");
  //select the p"score" 
  result.querySelector("p").textContent = `You scored ${score}/5!`;


});
