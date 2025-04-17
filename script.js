const symbols = ['🍒', '🍋', '🍊', '🍉', '⭐', '7️⃣'];
let balance = 1000;
const bet = 100;

const reelEls = [
  document.getElementById('reel1'),
  document.getElementById('reel2'),
  document.getElementById('reel3'),
];
const balanceEl = document.getElementById('balance');
const messageEl = document.getElementById('message');
const historyEl = document.getElementById('history');
const spinBtn = document.getElementById('spinBtn');

spinBtn.addEventListener('click', () => {
  if (balance < bet) {
    messageEl.innerText = "💸 Saldo insuficiente!";
    return;
  }

  spinBtn.disabled = true;
  messageEl.innerText = "Girando...";

  balance -= bet;
  balanceEl.innerText = balance;

  let result = [];
  for (let i = 0; i < 3; i++) {
    const rand = Math.floor(Math.random() * symbols.length);
    result.push(symbols[rand]);
  }

  let delay = 0;
  result.forEach((symbol, index) => {
    setTimeout(() => {
      reelEls[index].innerText = symbol;
    }, 300 * (index + 1));
  });

  setTimeout(() => {
    if (result[0] === result[1] && result[1] === result[2]) {
      const reward = 600;
      balance += reward;
      messageEl.innerText = `🎉 JACKPOT! Você ganhou ${reward} créditos!`;
    } else if (result[0] === result[1] || result[1] === result[2]) {
      const reward = 200;
      balance += reward;
      messageEl.innerText = `✨ Você ganhou ${reward} créditos!`;
    } else {
      messageEl.innerText = "😢 Nada dessa vez.";
    }

    balanceEl.innerText = balance;
    spinBtn.disabled = false;

    const log = `Giro: ${result.join(" ")} — Saldo: ${balance}`;
    const li = document.createElement('li');
    li.textContent = log;
    historyEl.prepend(li);
  }, 1200);
});
