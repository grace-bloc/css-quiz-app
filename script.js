let questionNumber = 0;
let score = 0;

//Generate question HTML
function generateQuestion(){
  if(questionNumber < STORE.length){
    return `<div class="question-${questionNumber}">
    <h2><br/>${STORE[questionNumber].question}</h2>
    <form>
    <fieldset>
    <label class="answerOption">
    <input type="radio" value = "${STORE[questionNumber].answers[0]}" name="answer" required>
    <span>${STORE[questionNumber].answers[0]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${STORE[questionNumber].answers[1]}" name="answer" required>
    <span>${STORE[questionNumber].answers[1]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${STORE[questionNumber].answers[2]}" name="answer" required>
    <span>${STORE[questionNumber].answers[2]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${STORE[questionNumber].answers[3]}" name="answer" required>
    <span>${STORE[questionNumber].answers[3]}</span>
    </label>
    <button type="submit" class="submitButton">Submit</button>
    </fieldset>
    </form>
    </div>`;
  } else {
    renderResults();
    restartQuiz();
    $('.questionNumber').text(10);
  }
}

//increment question number
 function changeQuestionNumber(){
   questionNumber ++;
   $('.questionNumber').text(questionNumber+1);
 }

//increment score
function changeScore(){
   score ++;
 }

//start quiz
//on startQuixButton click hide start div
//Unhide quiz form div
function startQuiz(){
  $('.titlestart').on('click', '.js-startButton',
    function (event){
      $('.titlestart').remove();
      $('.questionAnswerForm').css('display', 'block');
      $('.questionNumber').text(1);
  });
}


//Render question in DOM
function renderQuestion(){
  $('.questionAnswerForm').html(generateQuestion());
}

//unser selects answer on submit run user feedback
function userSelectAnswer(){
  $('form').on('submit', function(event){
    event.preventDefault();
    let selected = $('input:checked');
    let answer = selected.val();
    let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
    if(answer === correctAnswer){
      selected.parent().addClass('correct');
      ifAnswerIsCorrect();
    } else {
      selected.parent().addClass('wrong');
      ifAnswerIsWrong();
    }
  });
}

function ifAnswerIsCorrect(){
  userAnswerFeedbackCorrect();
  updateScore();
}

function ifAnswerIsWrong(){
  userAnswerFeedbackWrong();
}

//user feedback for currect answer
function userAnswerFeedbackCorrect(){
  let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
  $('.questionAnswerForm').html(
    `<div class="correctFeedback">
        <div class="icon"><img src="${STORE[questionNumber].icon}" alt="${STORE[questionNumber].alt}"/>
        </div>
        <p>Well Done! <br>The force is strong with you.</p>
        <button type="button" class="nextButton">Next</button></div>`);
}

//user feedbac for wrong answer
 function userAnswerFeedbackWrong() {
  let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
  $('.questionAnswerForm').html(
    `<div class="correctFeedback">
      <div class="icon"><img src="${STORE[questionNumber].icon}" alt="${STORE[questionNumber].alt}"/>

      </div>
      <p><b>You missed it!</b>
      <p>The correct answer is:<p><p class="c-answer">${correctAnswer}</p><button type="button" class="nextButton">Next</button></div>`);
}

//update score text
function updateScore(){
  changeScore();
  $('.score').text(score);
}

//when quiz is over this is the html for the page

function renderResults(){
  if(score >= 8){
    $('.questionAnswerForm').html(`<div class="results correctFeedback"><h3>You are a true  Jedi &lt;CSS&gt; Master</h3><img src="https://ui-ex.com/images/yoda-transparent-star-wars-4.png" alt="Yoda" width="200px" /><p>You store is ${score} / 10</p><p>You are ready to face your destiny!</p><button class="restartButton">Restart your test</button></div>`);
   /* } else if (score < 8 && score >= 5) { $('questionAnswerForm').html(`<div class="results correctFeedback"><h3>You are almost ready Padawan, but you will need to practice more</h3><img scr="https://studio.code.org/v3/assets/piudC0FcXxuaMPZszFjoDYplAEKMHcoBaV3JWB1lGzw/rey.png" alt="Trainee"/><p>You stored: ${score} / 10</p><p>Continue to hone your skills</p><button class="restartButton">Restart your test</button></div>`);*/

  }else if (score < 8 && score >= 5) {
    $('.questionAnswerForm').html(`<div class="results correctFeedback"><h3>You have trained well Padawan, but you will need more practice.</h3><img src="https://studio.code.org/v3/assets/piudC0FcXxuaMPZszFjoDYplAEKMHcoBaV3JWB1lGzw/rey.png" width="150px" alt="Trainee"/><p>You got ${score} / 10</p><p>Continue to prefect your skills</p><button class="restartButton">Restart Quiz</button></div>`);
  
    } else {
      /*$('questionAnswerForm').html(`<div class="results correctFeedback"><h3>You will need more practice Padawan.</h3><img scr="https://upload.wikimedia.org/wikipedia/en/thumb/5/58/GeneralGrievous.png/220px-GeneralGrievous.png" alt="General" /><p>You stored: ${score} / 10</p><p>Continue to hone your skills</p><button class="restartButton">Restart your test</button></div>`);*/

      $('.questionAnswerForm').html(`<div class="results correctFeedback"><h3>You will need more practice Padawan.</h3><img src="https://upload.wikimedia.org/wikipedia/en/thumb/5/58/GeneralGrievous.png/220px-GeneralGrievous.png" width="200px" alt="General"/><p>You got ${score} / 10</p><p>You will face your denstiny soon enough!</p><button class="restartButton">Restart Quiz</button></div>`);
    }
}

function renderNextQuestion(){
  $('main').on('click', '.nextButton', function(event){
    changeQuestionNumber();
    renderQuestion();
    userSelectAnswer();
  });
}

//Restart qiz function 
function restartQuiz(){
  $('main').on('click', '.restartButton', function(event) {
    location.reload();
  });
}


//run quiz function
function createQuiz(){
  startQuiz();
  renderQuestion();
  userSelectAnswer();
  renderNextQuestion();
}

$(createQuiz);

