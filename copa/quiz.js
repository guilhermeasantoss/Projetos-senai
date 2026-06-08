// Perguntas do Quiz
const questions = [
  {
    question: "Em que ano foi realizada a primeira Copa do Mundo?",
    options: ["1928", "1930", "1934", "1938"],
    correct: 1
  },
  {
    question: "Qual país sediou a primeira Copa do Mundo?",
    options: ["Brasil", "Argentina", "Uruguai", "Itália"],
    correct: 2
  },
  {
    question: "Quantas Copas do Mundo o Brasil já venceu?",
    options: ["3", "4", "5", "6"],
    correct: 2
  },
  {
    question: "Qual jogador é conhecido como 'O Rei do Futebol'?",
    options: ["Maradona", "Pelé", "Zidane", "Messi"],
    correct: 1
  },
  {
    question: "Em que ano Pelé conquistou sua primeira Copa do Mundo?",
    options: ["1954", "1958", "1962", "1966"],
    correct: 1
  },
  {
    question: "Quantas seleções participarão da Copa do Mundo de 2026?",
    options: ["32", "40", "48", "64"],
    correct: 2
  },
  {
    question: "Qual seleção tem mais títulos de Copa do Mundo?",
    options: ["Alemanha", "Brasil", "Itália", "Argentina"],
    correct: 1
  },
  {
    question: "Em que país foi realizada a Copa de 2022?",
    options: ["Rússia", "Catar", "Emirados Árabes", "Arábia Saudita"],
    correct: 1
  },
  {
    question: "Quem foi o artilheiro da Copa de 2014?",
    options: ["Thomas Müller", "Lionel Messi", "James Rodríguez", "Neymar"],
    correct: 2
  },
  {
    question: "Qual a Copa do Mundo com mais gols na história?",
    options: ["França 1998 (171 gols)", "Brasil 2014 (171 gols)", "Alemanha 2006 (147 gols)", "África do Sul 2010 (145 gols)"],
    correct: 0
  }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const feedbackEl = document.getElementById('feedback');
const nextBtn = document.getElementById('nextBtn');
const resultEl = document.getElementById('result');
const scoreEl = document.getElementById('score');
const messageEl = document.getElementById('message');
const quizContainer = document.getElementById('quizContainer');
const restartBtn = document.getElementById('restartBtn');

// Carregar pergunta
function loadQuestion() {
  answered = false;
  feedbackEl.classList.remove('show', 'correct', 'incorrect');
  nextBtn.style.display = 'none';
  
  const q = questions[currentQuestion];
  questionEl.textContent = `${currentQuestion + 1}. ${q.question}`;
  
  optionsEl.innerHTML = '';
  q.options.forEach((option, index) => {
    const optionDiv = document.createElement('div');
    optionDiv.classList.add('option');
    optionDiv.textContent = option;
    optionDiv.onclick = () => selectOption(index);
    optionsEl.appendChild(optionDiv);
  });
}

// Selecionar opção
function selectOption(selected) {
  if (answered) return;
  
  answered = true;
  const q = questions[currentQuestion];
  const options = document.querySelectorAll('.option');
  
  options.forEach((opt, index) => {
    opt.classList.add('disabled');
    if (index === q.correct) {
      opt.classList.add('correct');
    }
    if (index === selected && index !== q.correct) {
      opt.classList.add('incorrect');
    }
  });
  
  if (selected === q.correct) {
    score++;
    feedbackEl.textContent = '✅ Resposta correta!';
    feedbackEl.classList.add('correct');
  } else {
    feedbackEl.textContent = '❌ Resposta incorreta. A correta é: ' + q.options[q.correct];
    feedbackEl.classList.add('incorrect');
  }
  
  feedbackEl.classList.add('show');
  nextBtn.style.display = 'block';
}

// Próxima pergunta
nextBtn.onclick = () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
};

// Mostrar resultado
function showResult() {
  quizContainer.style.display = 'none';
  resultEl.style.display = 'block';
  
  const percentage = (score / questions.length) * 100;
  scoreEl.textContent = `Você acertou ${score} de ${questions.length} perguntas (${percentage.toFixed(0)}%)`;
  
  if (percentage === 100) {
    messageEl.textContent = '🏆 Perfeito! Você é um verdadeiro expert em Copa do Mundo!';
  } else if (percentage >= 70) {
    messageEl.textContent = '🎉 Muito bem! Você conhece bastante sobre a Copa!';
  } else if (percentage >= 50) {
    messageEl.textContent = '👍 Bom trabalho! Continue estudando sobre a Copa!';
  } else {
    messageEl.textContent = '📚 Que tal revisar mais sobre a história da Copa?';
  }
}

// Reiniciar quiz
restartBtn.onclick = () => {
  currentQuestion = 0;
  score = 0;
  quizContainer.style.display = 'block';
  resultEl.style.display = 'none';
  loadQuestion();
};

// Iniciar quiz
loadQuestion();
