import React, { useEffect, useRef } from "react";

const MatrixBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let fontSize = Math.max(14, Math.floor(width / 60));
    let columns = Math.floor(width / fontSize);
    let drops = Array(columns).fill(1);
    const letters = "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズヅブプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let frame = 0;
    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      fontSize = Math.max(14, Math.floor(width / 60));
      columns = Math.floor(width / fontSize);
      drops = Array(columns).fill(1);
    }
    window.addEventListener("resize", resize);
    resize();
    function draw() {
      frame++;
      if (frame % 3 !== 0) { // Só desenha a cada 3 frames para reduzir velocidade
        animationFrameId = requestAnimationFrame(draw);
        return;
      }
      ctx.fillStyle = "rgba(16,21,26,0.5)";
      ctx.fillRect(0, 0, width, height);
      ctx.font = fontSize + "px monospace";
      ctx.fillStyle = "#39ff14";
      for (let i = 0; i < columns; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      animationFrameId = requestAnimationFrame(draw);
    }
    draw();
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh' }}
      aria-hidden="true"
    />
  );
};

export default MatrixBackground; 