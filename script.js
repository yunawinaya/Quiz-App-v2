const quizContainer = document.getElementById('quiz'); // Get the quiz container element
const checkBtn = document.getElementById('checkBtn'); // Get the "Check Answers" button element
const resetBtn = document.getElementById('resetBtn'); // Get the "Reset" button element
const scoreContainer = document.getElementById('score'); // Get the score container element

const questions = [
  // Array of quiz questions with choices and correct answers
  {
    question: 'What is the capital of France?',
    choices: ['Paris', 'London', 'Berlin', 'Rome'],
    correctAnswer: 'Paris'
  },
  {
    question: 'What is the largest planet in our solar system?',
    choices: ['Mars', 'Venus', 'Jupiter', 'Saturn'],
    correctAnswer: 'Jupiter'
  },
  {
    question: 'What is the chemical symbol for gold?',
    choices: ['Au', 'Ag', 'Hg', 'Cu'],
    correctAnswer: 'Au'
  },
  {
    question: 'Who painted the Mona Lisa?',
    choices: ['Leonardo da Vinci', 'Pablo Picasso', 'Vincent van Gogh', 'Michelangelo'],
    correctAnswer: 'Leonardo da Vinci'
  },
  {
    question: 'Which country won the FIFA World Cup in 2018?',
    choices: ['Germany', 'Brazil', 'France', 'Argentina'],
    correctAnswer: 'France'
  }
];

function buildQuiz() {
  // Function to build the quiz HTML dynamically
  const output = [];

  questions.forEach((question, index) => {
    // Loop through each question and generate HTML elements for each question and its choices
    const choices = [];

    for (let i = 0; i < question.choices.length; i++) {
      // Loop through the choices and generate HTML elements for each choice
      choices.push(
        `<label>
          <input type="radio" name="question${index}" value="${question.choices[i]}">
          ${question.choices[i]}
        </label>`
      );
    }

    output.push(
      // Build the HTML for the question and its choices
      `<div class="question">${index + 1}. ${question.question}</div>
      <div class="choices">${choices.join('')}</div>`
    );
  });

  quizContainer.innerHTML = output.join(''); // Render the quiz HTML inside the quiz container
}

function showResults() {
  // Function to check the user's answers and display the results
  const answerContainers = quizContainer.querySelectorAll('.choices'); // Get all the answer containers
  let score = 0; // Initialize the score variable

  questions.forEach((question, index) => {
    // Loop through each question and check the user's answer
    const answerContainer = answerContainers[index];
    const userAnswer = (answerContainer.querySelector(`input[name=question${index}]:checked`) || {}).value;

    if (userAnswer === question.correctAnswer) {
      // If the user's answer is correct, increment the score and apply the "correct" style
      score++;
      answerContainer.classList.add('correct');
    } else {
      // If the user's answer is wrong, apply the "wrong" style
      answerContainer.classList.add('wrong');
    }
  });

  scoreContainer.innerHTML = `Your score: ${score} out of ${questions.length}`; // Display the user's score

  if (score === questions.length) {
    scoreContainer.innerHTML += ' - Excellent! 😃'; // Display a custom message for a perfect score
  } else if (score >= Math.floor(questions.length / 2)) {
    scoreContainer.innerHTML += ' - Good job! 😊'; // Display a custom message for a satisfactory score
  } else {
    scoreContainer.innerHTML += ' - Keep practicing! 😥'; // Display a custom message for a low score
  }
}

function resetQuiz() {
  // Function to reset the quiz by clearing selected answers and feedback
  const answerContainers = quizContainer.querySelectorAll('.choices');

  answerContainers.forEach((answerContainer) => {
    // Clear the selected answer and remove the "correct" and "wrong" styles
    answerContainer.classList.remove('correct', 'wrong');
    const inputs = answerContainer.querySelectorAll('input');
    inputs.forEach((input) => {
      input.checked = false;
    });
  });

  scoreContainer.innerHTML = ''; // Clear the score container
}

buildQuiz(); // Build the quiz on page load

checkBtn.addEventListener('click', showResults); // Add event listener for the "Check Answers" button
resetBtn.addEventListener('click', resetQuiz); // Add event listener for the "Reset" button
