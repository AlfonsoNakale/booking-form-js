import { gsap } from 'gsap'

export default function animateTitle() {
  const title = document.querySelector('.title')
  if (!title) return

  gsap.from(title, {
    duration: 1,
    y: -50,
    opacity: 0,
    ease: 'power3.out',
  })
}
