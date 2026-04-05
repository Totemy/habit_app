<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)
let animationId: number | null = null

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  color: string
  size: number
  rotation: number
  rotationSpeed: number
  opacity: number
  shape: 'rect' | 'circle' | 'strip'
}

function readThemeColor(token: string, fallback: string) {
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(token)
    .trim()

  return value || fallback
}

function launch() {
  const canvas = canvasRef.value
  if (!canvas) return

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const ctx = canvas.getContext('2d')!
  const colors = [
    readThemeColor('--color-confetti-red', '#ff6b6b'),
    readThemeColor('--color-confetti-yellow', '#ffd93d'),
    readThemeColor('--color-confetti-green', '#6bcb77'),
    readThemeColor('--color-confetti-blue', '#4d96ff'),
    readThemeColor('--color-confetti-orange', '#ff922b'),
    readThemeColor('--color-confetti-purple', '#cc5de8'),
    readThemeColor('--color-confetti-teal', '#20c997'),
    readThemeColor('--color-confetti-pink', '#f06595'),
    readThemeColor('--color-confetti-sky', '#74c0fc'),
    readThemeColor('--color-confetti-lime', '#a9e34b'),
  ]

  const particles: Particle[] = Array.from({ length: 160 }, () => ({
    x: Math.random() * canvas.width,
    y: -20 - Math.random() * 100,
    vx: (Math.random() - 0.5) * 4,
    vy: 2 + Math.random() * 4,
    color: colors[Math.floor(Math.random() * colors.length)]!,
    size: 6 + Math.random() * 8,
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() - 0.5) * 0.2,
    opacity: 1,
    shape: (['rect', 'circle', 'strip'] as const)[
      Math.floor(Math.random() * 3)
    ]!,
  }))

  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    let allGone = true

    for (const p of particles) {
      p.x += p.vx
      p.vy += 0.07
      p.y += p.vy
      p.rotation += p.rotationSpeed
      p.vx *= 0.99
      if (p.y > canvas.height - 80) p.opacity -= 0.03

      if (p.opacity > 0) {
        allGone = false
        ctx.save()
        ctx.globalAlpha = Math.max(0, p.opacity)
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rotation)
        ctx.fillStyle = p.color

        if (p.shape === 'circle') {
          ctx.beginPath()
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2)
          ctx.fill()
        } else if (p.shape === 'strip') {
          ctx.fillRect(-p.size / 2, -p.size / 6, p.size, p.size / 3)
        } else {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size)
        }

        ctx.restore()
      }
    }

    if (!allGone) animationId = requestAnimationFrame(draw)
  }

  animationId = requestAnimationFrame(draw)
}

function stop() {
  if (animationId !== null) {
    cancelAnimationFrame(animationId)
    animationId = null
  }
  const canvas = canvasRef.value
  canvas?.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height)
}

onMounted(launch)
onUnmounted(stop)
</script>

<template>
  <canvas ref="canvasRef" class="fixed inset-0 pointer-events-none z-[51]" />
</template>
