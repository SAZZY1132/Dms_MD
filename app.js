const form = document.getElementById('pairForm');
const phoneEl = document.getElementById('phone');
const resBox = document.getElementById('result');
const codeEl = document.getElementById('code');
const brandEl = document.getElementById('brand');

async function fetchInfo() {
  const r = await fetch('/api/info');
  const j = await r.json();
  brandEl.textContent = `${j.name} • Owner: ${j.owner} • Support: ${j.email}`;
}
fetchInfo();

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const phone = phoneEl.value.replace(/\D/g, '');
  if (!phone) return;
  form.querySelector('button').disabled = true;
  form.querySelector('button').textContent = 'Generating...';
  try {
    const r = await fetch('/api/pair', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone })
    });
    const j = await r.json();
    if (!r.ok) throw new Error(j.error || 'Failed');
    codeEl.textContent = j.code;
    resBox.classList.remove('hidden');
  } catch (err) {
    alert(err.message || String(err));
  } finally {
    form.querySelector('button').disabled = false;
    form.querySelector('button').textContent = 'Get Pairing Code';
  }
});