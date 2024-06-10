const adviceAPIUrl = 'https://api.adviceslip.com/advice';
const adviceId = document.querySelector('#adivceId');
const adviceContent = document.querySelector('.advice-content');

const initElem = (data) => {
  adviceId.textContent = data.slip.id;
  adviceContent.textContent = data.slip.advice;
}

const speak = (message) => {
    VoiceRSS.speech({
        key: "52bfbd75e1c24955831329926a53c5ed",
        src: message,
        hl: "en-us",
        v: "Mike",
        r: -2,
        c: "mp3",
        f: "44khz_16bit_stereo",
        ssml: false,
    });
};

const getAdvice = async (adviceAPIUrl, initElem) => {
  await fetch(adviceAPIUrl)
  .then((response) => {
     if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
  })
  .then((data) => initElem(data))
  .catch((err) => console.error(err));
}

const renderAdvice = () => {
  getAdvice(adviceAPIUrl, initElem);
}

const tellAdvice = () => {
  speak(`Advice number ${adviceId.textContent} .... ${adviceContent.textContent}`);
}

const dice = document.querySelector('#loadAdvice');
const voice = document.querySelector('#tellAdvice');
dice.addEventListener('click', renderAdvice);
voice.addEventListener('click', tellAdvice);
