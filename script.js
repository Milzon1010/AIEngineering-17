document.addEventListener('DOMContentLoaded', () => {
  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      document.getElementById('main-title').textContent = data.title;

      const content = document.getElementById('content');

      // Introduction
      const introSection = document.createElement('section');
      const introTitle = document.createElement('h2');
      introTitle.textContent = data.introduction.title;
      const introText = document.createElement('p');
      introText.textContent = data.introduction.text;
      introSection.appendChild(introTitle);
      introSection.appendChild(introText);
      content.appendChild(introSection);

      // CNNs
      const cnnSection = document.createElement('section');
      const cnnTitle = document.createElement('h2');
      cnnTitle.textContent = data.cnn.title;
      const cnnText = document.createElement('p');
      cnnText.textContent = data.cnn.text;
      cnnSection.appendChild(cnnTitle);
      cnnSection.appendChild(cnnText);

      const layersList = document.createElement('ul');
      data.cnn.layers.forEach(layer => {
        const listItem = document.createElement('li');
        listItem.classList.add('layer-item');
        const layerName = document.createElement('strong');
        layerName.textContent = layer.name;
        listItem.appendChild(layerName);

        const description = document.createElement('p');
        description.textContent = layer.description;
        description.style.display = 'none';
        listItem.appendChild(description);

        listItem.addEventListener('click', () => {
          description.style.display = description.style.display === 'none' ? 'block' : 'none';
        });

        layersList.appendChild(listItem);
      });
      cnnSection.appendChild(layersList);
      content.appendChild(cnnSection);

      // Keras
      const kerasSection = document.createElement('section');
      const kerasTitle = document.createElement('h2');
      kerasTitle.textContent = data.keras.title;
      const kerasText = document.createElement('p');
      kerasText.textContent = data.keras.text;
      const kerasCode = document.createElement('pre');
      const code = document.createElement('code');
      code.textContent = data.keras.code;
      kerasCode.appendChild(code);
      kerasSection.appendChild(kerasTitle);
      kerasSection.appendChild(kerasText);
      kerasSection.appendChild(kerasCode);
      content.appendChild(kerasSection);

      // Conclusion
      const conclusionSection = document.createElement('section');
      const conclusionTitle = document.createElement('h2');
      conclusionTitle.textContent = data.conclusion.title;
      const conclusionText = document.createElement('p');
      conclusionText.textContent = data.conclusion.text;
      conclusionSection.appendChild(conclusionTitle);
      conclusionSection.appendChild(conclusionText);
      content.appendChild(conclusionSection);

      // Quiz
      const quizSection = document.createElement('section');
      const quizTitle = document.createElement('h2');
      quizTitle.textContent = data.quiz.title;
      quizSection.appendChild(quizTitle);

      const quizForm = document.createElement('form');
      quizForm.id = 'quiz-form';

      data.quiz.questions.forEach((q, i) => {
        const questionContainer = document.createElement('div');
        questionContainer.classList.add('question-container');

        const question = document.createElement('p');
        question.textContent = (i + 1) + '. ' + q.question;
        questionContainer.appendChild(question);

        q.options.forEach(option => {
          const label = document.createElement('label');
          const input = document.createElement('input');
          input.type = 'radio';
          input.name = 'question' + i;
          input.value = option;
          label.appendChild(input);
          label.append(option);
          questionContainer.appendChild(label);
        });

        quizForm.appendChild(questionContainer);
      });

      const submitButton = document.createElement('button');
      submitButton.type = 'submit';
      submitButton.textContent = 'Submit';
      quizForm.appendChild(submitButton);

      quizSection.appendChild(quizForm);
      content.appendChild(quizSection);

      const quizResult = document.createElement('p');
      quizResult.id = 'quiz-result';
      quizSection.appendChild(quizResult);

      quizForm.addEventListener('submit', e => {
        e.preventDefault();
        let score = 0;
        data.quiz.questions.forEach((q, i) => {
          const selectedOption = document.querySelector(`input[name="question${i}"]:checked`);
          if (selectedOption && selectedOption.value === q.answer) {
            score++;
          }
        });
        quizResult.textContent = `You scored ${score} out of ${data.quiz.questions.length}!`;
      });
    });
});
