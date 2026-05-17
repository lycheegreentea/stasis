import './style.css'

const status = document.getElementById('status')
const input = document.getElementById('card-input')
const progressBar = document.getElementById('progress-bar')
function focus() {
  input.focus()
}

focus()
document.addEventListener('click', focus)

document.getElementById('give-up').addEventListener('click', () => {
  localStorage.removeItem('swipes')
  status.textContent = 'Scan to Proceed'
  if(progressBar) progressBar.style.width = '0%'
  focus()
})
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) focus()
})

const EXPECTED_CARD_LENGTH = 25
input.addEventListener('input', (e) => {
  if (!progressBar) return
  const currentLength = e.target.value.length
  const percentage = Math.min((currentLength / EXPECTED_CARD_LENGTH) * 100, 100)
  progressBar.style.width = `${percentage}%`
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
  setTimeout(() => {
    if (progressBar) progressBar.style.width = '0%'
    status.textContent = 'Scan to Proceed'
  }, 2000)
  
})
