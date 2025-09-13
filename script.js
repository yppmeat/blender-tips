let keys = null;

const list = document.querySelector('.list');
const nav = document.querySelector('.nav');
const radioBg = document.querySelector('.radio-background');

const maxWidth = 180;

nav.addEventListener('change', (e) => {
  updateList(e.target.value);
  radioBg.style.left = e.target.dataset.index * maxWidth + 10 + 'px';
});

function updateList(type) {
  list.innerHTML = '';
  if (!keys) return;

  keys[type].forEach(([key, desc]) => {
    list.insertAdjacentHTML(
      'beforeend',
      /* html */ `
      <div>
        <div class="key">${getKeyHtml(key)}</div>
        <span class="desc">${desc}</span>
      </div>
    `
    );
  });
}

function getKeyHtml(key) {
  return key
    .split(' ')
    .map((k) => {
      if (k === '+') return k;

      return /* html */ `
        <span>${k.replaceAll('\\', '')}</span>
      `;
    })
    .join(' ');
}

(async () => {
  keys = await (await fetch('keys.json')).json();
  updateList('common');
})();
