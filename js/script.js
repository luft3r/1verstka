// Анимированный фон в стиле "матрицы" (кодовые дожди)
window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('matrix-bg');
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Символы для "дождя" (японские катакана + цифры + символы)
    const symbols = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズヅブプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    const fontSize = 22;
    const columns = Math.floor(width / fontSize);
    const drops = Array(columns).fill(1);

    function draw() {
        ctx.fillStyle = 'rgba(24, 28, 27, 0.18)';
        ctx.fillRect(0, 0, width, height);
        ctx.font = `bold ${fontSize}px monospace`;
        ctx.shadowColor = '#b30024';
        ctx.shadowBlur = 8;
        for (let i = 0; i < drops.length; i++) {
            const text = symbols[Math.floor(Math.random() * symbols.length)];
            ctx.fillStyle = '#b30024'; // неоновый красный
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            if (drops[i] * fontSize > height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
        ctx.shadowBlur = 0;
    }

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }
    window.addEventListener('resize', resize);

    setInterval(draw, 50);
});
