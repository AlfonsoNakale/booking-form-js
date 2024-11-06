export default function createBadge() {
  const badge = document.createElement('div')
  badge.classList.add('badge')
  badge.innerHTML = `
    <span class="badge-text">Powered by Vite</span>
  `
  document.body.appendChild(badge)
}
