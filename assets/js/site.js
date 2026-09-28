const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => [...r.querySelectorAll(s)];

$('#menuToggle')?.addEventListener('click', () => $('#menu')?.classList.toggle('open'));

const path = location.pathname.replace(/\/$/,'') || '/';
$$('.menu a').forEach(a => { if (a.getAttribute('href') === path || (path === '' && a.getAttribute('href') === '/')) a.classList.add('active'); });

$$('[data-year]').forEach(el => el.textContent = new Date().getFullYear());

const search = $('#articleSearch');
if (search) {
  const cards = $$('.article-item');
  const empty = $('#searchEmpty');
  search.addEventListener('input', e => {
    const q = e.target.value.toLowerCase().trim();
    let visible = 0;
    cards.forEach(card => {
      const ok = card.innerText.toLowerCase().includes(q);
      card.style.display = ok ? '' : 'none';
      if (ok) visible++;
    });
    if (empty) empty.style.display = visible ? 'none' : 'block';
  });
}

const savingsForm = $('#savingsForm');
if (savingsForm) {
  savingsForm.addEventListener('input', () => {
    const tasks = Number($('#tasks').value) || 0;
    const mins = Number($('#mins').value) || 0;
    const hourly = Number($('#hourly').value) || 0;
    const monthly = tasks * 4.33;
    const hoursSaved = (monthly * mins) / 60;
    const value = hoursSaved * hourly;
    $('#hoursSaved').textContent = `${hoursSaved.toFixed(1)} h`;
    $('#savedValue').textContent = `$${value.toFixed(0)}`;
  });
  savingsForm.dispatchEvent(new Event('input'));
}

const promptForm = $('#promptForm');
if (promptForm) {
  promptForm.addEventListener('submit', e => {
    e.preventDefault();
    const role = $('#pRole').value.trim() || 'expert assistant';
    const task = $('#pTask').value.trim() || 'complete the task';
    const audience = $('#pAudience').value.trim() || 'a general audience';
    const context = $('#pContext').value.trim() || 'Use clear, practical language.';
    const output = `You are a ${role}.\n\nTask: ${task}\n\nAudience: ${audience}\n\nContext: ${context}\n\nRequirements:\n1. State assumptions briefly.\n2. Give a practical step-by-step answer.\n3. Use headings and concise examples.\n4. Flag uncertainty instead of inventing facts.\n5. End with a clear next action.\n\nReturn a polished, usable result.`;
    $('#promptOutput').value = output;
  });
}

$('#copyPrompt')?.addEventListener('click', async () => {
  const box = $('#promptOutput');
  if (!box?.value) return;
  await navigator.clipboard.writeText(box.value);
  $('#copyPrompt').textContent = 'Copied';
  setTimeout(() => $('#copyPrompt').textContent = 'Copy', 1200);
});
