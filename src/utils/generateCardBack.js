// src/utils/generateCardBack.js
// Menghasilkan data URL gambar untuk bagian belakang kartu lanyard

export function generateCardBack({
    name = 'Fais Nur Amrulloh',
    title = 'Fullstack Developer',
    logoSrc = '/logo-fs.png', // logo FS kamu
} = {}) {
    return new Promise((resolve) => {
        const W = 500
        const H = 750
        const canvas = document.createElement('canvas')
        canvas.width = W
        canvas.height = H
        const ctx = canvas.getContext('2d')

        // === BACKGROUND - gradient biru gelap modern ===
        const bg = ctx.createLinearGradient(0, 0, W, H)
        bg.addColorStop(0, '#0a0a1a')
        bg.addColorStop(0.5, '#0d1b3e')
        bg.addColorStop(1, '#0a0a1a')
        ctx.fillStyle = bg
        ctx.fillRect(0, 0, W, H)

        // === DECORATIVE GRID LINES ===
        ctx.strokeStyle = 'rgba(59,130,246,0.08)'
        ctx.lineWidth = 1
        for (let i = 0; i < W; i += 40) {
            ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, H); ctx.stroke()
        }
        for (let j = 0; j < H; j += 40) {
            ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(W, j); ctx.stroke()
        }

        // === GLOW CIRCLE TOP ===
        const glowTop = ctx.createRadialGradient(W / 2, 120, 0, W / 2, 120, 200)
        glowTop.addColorStop(0, 'rgba(37,99,235,0.25)')
        glowTop.addColorStop(1, 'rgba(37,99,235,0)')
        ctx.fillStyle = glowTop
        ctx.fillRect(0, 0, W, H)

        // === GLOW CIRCLE BOTTOM ===
        const glowBot = ctx.createRadialGradient(W / 2, H - 100, 0, W / 2, H - 100, 180)
        glowBot.addColorStop(0, 'rgba(99,102,241,0.2)')
        glowBot.addColorStop(1, 'rgba(99,102,241,0)')
        ctx.fillStyle = glowBot
        ctx.fillRect(0, 0, W, H)

        // === BORDER CARD ===
        const borderGrad = ctx.createLinearGradient(0, 0, W, H)
        borderGrad.addColorStop(0, 'rgba(59,130,246,0.6)')
        borderGrad.addColorStop(0.5, 'rgba(99,102,241,0.4)')
        borderGrad.addColorStop(1, 'rgba(6,182,212,0.6)')
        ctx.strokeStyle = borderGrad
        ctx.lineWidth = 2
        roundRect(ctx, 10, 10, W - 20, H - 20, 20)
        ctx.stroke()

        // === TOP ACCENT LINE ===
        const accentGrad = ctx.createLinearGradient(60, 0, W - 60, 0)
        accentGrad.addColorStop(0, 'rgba(37,99,235,0)')
        accentGrad.addColorStop(0.3, '#3b82f6')
        accentGrad.addColorStop(0.7, '#6366f1')
        accentGrad.addColorStop(1, 'rgba(6,182,212,0)')
        ctx.strokeStyle = accentGrad
        ctx.lineWidth = 2.5
        ctx.beginPath()
        ctx.moveTo(60, 46)
        ctx.lineTo(W - 60, 46)
        ctx.stroke()

        // === LOGO - load dan draw ===
        const img = new Image()
        img.crossOrigin = 'anonymous'
        img.onload = () => {
            // Logo putih - invert karena logo asli hitam
            const offscreen = document.createElement('canvas')
            offscreen.width = img.width
            offscreen.height = img.height
            const offCtx = offscreen.getContext('2d')
            offCtx.drawImage(img, 0, 0)
            offCtx.globalCompositeOperation = 'difference'
            offCtx.fillStyle = 'white'
            offCtx.fillRect(0, 0, img.width, img.height)

            // === WATERMARK LOGO RAKSASA - layer paling belakang, sangat transparan ===
            // Digambar sebelum elemen lain supaya benar-benar berada "di belakang"
            const wmSize = W * 0.85
            const wmX = (W - wmSize) / 2
            const wmY = (H - wmSize) / 2
            ctx.save()
            ctx.globalAlpha = 0.06
            ctx.drawImage(offscreen, wmX, wmY, wmSize, wmSize)
            ctx.restore()

            // === CHIP KARTU + BARCODE - pojok kiri atas, seperti ID card asli ===
            drawCardChip(ctx, 60, 78)
            drawBarcode(ctx, 60, 128, 130, 36)

            // === NAMA ===
            ctx.textAlign = 'center'
            ctx.fillStyle = '#ffffff'
            ctx.font = 'bold 28px "Inter", sans-serif'
            ctx.letterSpacing = '1px'
            ctx.shadowColor = 'rgba(59,130,246,0.5)'
            ctx.shadowBlur = 12
            ctx.fillText(name, W / 2, 230)
            ctx.shadowBlur = 0

            // === TITLE / ROLE ===
            const titleGrad = ctx.createLinearGradient(100, 0, W - 100, 0)
            titleGrad.addColorStop(0, '#3b82f6')
            titleGrad.addColorStop(0.5, '#818cf8')
            titleGrad.addColorStop(1, '#06b6d4')
            ctx.fillStyle = titleGrad
            ctx.font = '500 16px "Inter", sans-serif'
            ctx.letterSpacing = '3px'
            ctx.fillText(title.toUpperCase(), W / 2, 262)

            // === DIVIDER ===
            const divGrad = ctx.createLinearGradient(80, 0, W - 80, 0)
            divGrad.addColorStop(0, 'rgba(255,255,255,0)')
            divGrad.addColorStop(0.5, 'rgba(99,102,241,0.5)')
            divGrad.addColorStop(1, 'rgba(255,255,255,0)')
            ctx.strokeStyle = divGrad
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(80, 285)
            ctx.lineTo(W - 80, 285)
            ctx.stroke()

            // === HEXAGON DECORATION ===
            drawHexGrid(ctx, W, H)

            // === CONTACT INFO ===
            ctx.textAlign = 'center'
            ctx.fillStyle = 'rgba(148,163,184,0.8)'
            ctx.font = '13px "Inter", sans-serif'
            ctx.letterSpacing = '0px'
            ctx.fillText('faisnuramrulloh@gmail.com', W / 2, H - 120)
            ctx.fillText('linkedin.com/in/fais-nur-amrulloh', W / 2, H - 98)

            // === BOTTOM ACCENT ===
            const botAccent = ctx.createLinearGradient(60, 0, W - 60, 0)
            botAccent.addColorStop(0, 'rgba(37,99,235,0)')
            botAccent.addColorStop(0.3, '#3b82f6')
            botAccent.addColorStop(0.7, '#6366f1')
            botAccent.addColorStop(1, 'rgba(6,182,212,0)')
            ctx.strokeStyle = botAccent
            ctx.lineWidth = 2
            ctx.beginPath()
            ctx.moveTo(60, H - 70)
            ctx.lineTo(W - 60, H - 70)
            ctx.stroke()

            // === TAGLINE ===
            ctx.fillStyle = 'rgba(100,116,139,0.7)'
            ctx.font = '11px "Inter", sans-serif'
            ctx.letterSpacing = '2px'
            ctx.fillText('BUILDING IDEAS INTO REALITY', W / 2, H - 50)

            resolve(canvas.toDataURL('image/png'))
        }

        img.onerror = () => {
            // Fallback jika logo gagal load - tetap render tanpa logo
            drawTextOnly(ctx, W, H, name, title)
            resolve(canvas.toDataURL('image/png'))
        }

        img.src = logoSrc
    })
}

// Helper: rounded rectangle path
function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath()
    ctx.moveTo(x + r, y)
    ctx.lineTo(x + w - r, y)
    ctx.quadraticCurveTo(x + w, y, x + w, y + r)
    ctx.lineTo(x + w, y + h - r)
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
    ctx.lineTo(x + r, y + h)
    ctx.quadraticCurveTo(x, y + h, x, y + h - r)
    ctx.lineTo(x, y + r)
    ctx.quadraticCurveTo(x, y, x + r, y)
    ctx.closePath()
}

// Helper: chip kartu (gaya chip ATM/KTP) - kotak gold/silver dengan garis kontak
function drawCardChip(ctx, x, y) {
    const w = 46
    const h = 34
    const r = 5

    ctx.save()

    // Base gold gradient
    const chipGrad = ctx.createLinearGradient(x, y, x + w, y + h)
    chipGrad.addColorStop(0, '#d4af6a')
    chipGrad.addColorStop(0.5, '#f0d999')
    chipGrad.addColorStop(1, '#b8924f')
    ctx.fillStyle = chipGrad
    roundRect(ctx, x, y, w, h, r)
    ctx.fill()

    // Outer border, slightly darker
    ctx.strokeStyle = 'rgba(120,90,40,0.5)'
    ctx.lineWidth = 1
    roundRect(ctx, x, y, w, h, r)
    ctx.stroke()

    // Contact lines (horizontal) - khas chip kartu
    ctx.strokeStyle = 'rgba(120,90,40,0.45)'
    ctx.lineWidth = 1
    const rows = 4
    for (let i = 1; i <= rows; i++) {
        const ly = y + (h / (rows + 1)) * i
        ctx.beginPath()
        ctx.moveTo(x + 4, ly)
        ctx.lineTo(x + w - 4, ly)
        ctx.stroke()
    }

    // Center divider block (kotak kecil di tengah, khas chip asli)
    ctx.fillStyle = 'rgba(120,90,40,0.35)'
    ctx.fillRect(x + w / 2 - 7, y + 4, 14, h - 8)

    ctx.restore()
}

// Helper: barcode dekoratif - garis vertikal lebar acak + nomor kartu kecil di bawahnya
function drawBarcode(ctx, x, y, w, h) {
    ctx.save()

    // Background putih tipis agar garis hitam barcode kontras dengan kartu gelap
    ctx.fillStyle = 'rgba(255,255,255,0.92)'
    roundRect(ctx, x - 6, y - 6, w + 12, h + 22, 4)
    ctx.fill()

    // Garis-garis barcode dengan lebar pseudo-random tapi konsisten (seeded pattern)
    const pattern = [2, 1, 3, 1, 1, 2, 4, 1, 2, 1, 3, 2, 1, 4, 1, 2, 1, 3, 1, 2, 2, 1, 3, 1, 1, 2, 1, 4]
    const unit = w / pattern.reduce((sum, v) => sum + v, 0)
    let cursorX = x

    ctx.fillStyle = '#0a0a1a'
    pattern.forEach((value, i) => {
        const barWidth = value * unit
        if (i % 2 === 0) {
            ctx.fillRect(cursorX, y, barWidth, h)
        }
        cursorX += barWidth
    })

    // Nomor kartu kecil di bawah barcode
    ctx.fillStyle = 'rgba(226,232,240,0.7)'
    ctx.font = '9px "Inter", monospace'
    ctx.textAlign = 'left'
    ctx.letterSpacing = '1px'
    ctx.fillText('FS-2026-0417', x, y + h + 14)

    ctx.restore()
}

// Helper: hexagon grid dekorasi
function drawHexGrid(ctx, W, H) {
    const hexSize = 18
    const positions = [
        [50, 420], [90, 460], [50, 500],
        [W - 50, 420], [W - 90, 460], [W - 50, 500],
        [W / 2 - 30, H - 160], [W / 2 + 30, H - 160],
    ]
    positions.forEach(([cx, cy]) => {
        ctx.beginPath()
        for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i - Math.PI / 6
            const hx = cx + hexSize * Math.cos(angle)
            const hy = cy + hexSize * Math.sin(angle)
            i === 0 ? ctx.moveTo(hx, hy) : ctx.lineTo(hx, hy)
        }
        ctx.closePath()
        ctx.strokeStyle = 'rgba(99,102,241,0.2)'
        ctx.lineWidth = 1
        ctx.stroke()
    })
}

function drawTextOnly(ctx, W, H, name, title) {
    ctx.textAlign = 'center'
    ctx.fillStyle = '#ffffff'
    ctx.font = 'bold 28px sans-serif'
    ctx.fillText(name, W / 2, 260)
    ctx.fillStyle = '#3b82f6'
    ctx.font = '16px sans-serif'
    ctx.fillText(title, W / 2, 295)
}