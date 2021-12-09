const btn = document.querySelector(".btn");
const text = document.querySelector(".dictionary-text");
const form = document.querySelector(".dictionary-form");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const word = document.getElementById("text");
  const value = word.value;

  URL_API = `https://api.dictionaryapi.dev/api/v2/entries/en/${value}`;

  fetch(URL_API)
    .then((response) => response.json())
    .then((data) => {
      text.innerHTML = data.message;

      const res = data[0].meanings;

      const output = res.map(function (item) {
        return `<ul><li class="result">Definition: ${item.definitions[0].definition}<p>Example: ${item.definitions[0].example}</p></li></ul>`;
      });

      text.innerHTML = output.join("");
      const pronunciation = document.getElementById("audio");

      const audios = data[0].phonetics;
      const audio = audios.map(function (sound) {
        playSound(sound.audio);
        if (!sound.audio) {
          return (pronunciation.innerHTML = data.message);
        }
        return `
          <audio  src=${sound.audio} controls autoplay>
            
          </audio>`;
      });

      pronunciation.innerHTML = audio.join("");
    });
});
function playSound(pronounce) {
  var music = new Audio(pronounce);
  music.load();
  music.play();
}
