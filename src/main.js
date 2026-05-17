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


input.addEventListener('input', () => {
  if(progressBar) progressBar.style.width = '90%'
})
input.addEventListener('keydown', (e) => {
  if (e.key !== 'Enter') return

  const cardData = input.value.trim()
  input.value = ''

  if (!cardData){
    if(progressBar){
      progressBar.style.width = '0%'
    }
      return
    }

  const swipes = JSON.parse(localStorage.getItem('swipes') ?? '[]')
  swipes.push({ data: cardData, ts: new Date().toISOString() })
  localStorage.setItem('swipes', JSON.stringify(swipes))
  status.textContent = 'yay'
  if(progressBar){
    progressBar.style.width = '100%'
  }
  setTimeout(() => {
    if (progressBar){
      progressBar.style.transition = 'none'
      progressBar.style.width = '0%'
      progressBar.offsetHeight
      progressBar.style.transition = ''
    }
    status.textContent = 'Scan to Proceed'}, 2000)
  
})
