import './style.css'

const status = document.getElementById('status')
const input = document.getElementById('card-input')

function focus() {
  input.focus()
}

focus()
document.addEventListener('click', focus)

document.getElementById('give-up').addEventListener('click', () => {
  localStorage.removeItem('swipes')
  status.textContent = 'Scan to Proceed'
  focus()
})
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) focus()
})

input.addEventListener('keydown', (e) => {
  if (e.key !== 'Enter') return

  const cardData = input.value.trim()
  input.value = ''

  if (!cardData) return

  const swipes = JSON.parse(localStorage.getItem('swipes') ?? '[]')
  swipes.push({ data: cardData, ts: new Date().toISOString() })
  localStorage.setItem('swipes', JSON.stringify(swipes))

  status.textContent = 'yay'
})
