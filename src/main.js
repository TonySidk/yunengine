import './index.css';

// ---------- 彗星拖尾 ----------
(function() {
    const canvas = document.getElementById('cometCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // ---------- 尺寸适配 ----------
    let width, height;
    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }
    window.addEventListener('resize', resize);
    resize();

    // ---------- 鼠标/触摸 坐标 (归一化) ----------
    let mouseX = width / 2;
    let mouseY = height / 2;
    let isMouseDown = false;      // 用于控制粒子发射速率 (按住加速)
    let lastMoveTime = 0;

    // 移动端/PC 统一事件
    function updatePointer(x, y, isActive = true) {
        mouseX = Math.min(width, Math.max(0, x));
        mouseY = Math.min(height, Math.max(0, y));
        isMouseDown = isActive;
        lastMoveTime = performance.now();
    }

    // ---------- 鼠标事件 ----------
    // Use window instead of canvas since canvas has pointer-events: none
    window.addEventListener('mousemove', (e) => {
        updatePointer(e.clientX, e.clientY, true);
    });
    window.addEventListener('mousedown', () => { isMouseDown = true; });
    window.addEventListener('mouseup', () => { isMouseDown = false; });
    window.addEventListener('mouseleave', () => {
        isMouseDown = false;
    });

    // ---------- 触摸事件 (移动端) ----------
    window.addEventListener('touchstart', (e) => {
        const touch = e.touches[0];
        if (touch) {
            updatePointer(touch.clientX, touch.clientY, true);
        }
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
        const touch = e.touches[0];
        if (touch) {
            updatePointer(touch.clientX, touch.clientY, true);
        }
    }, { passive: true });

    window.addEventListener('touchend', (e) => {
        isMouseDown = false;
    }, { passive: true });

    window.addEventListener('touchcancel', (e) => {
        isMouseDown = false;
    }, { passive: true });

    // ---------- 粒子系统 ----------
    const particles = [];
    const MAX_PARTICLES = 800;          // 性能与视觉平衡

    // 粒子类
    class Particle {
        constructor(x, y, vx, vy) {
            this.x = x;
            this.y = y;
            this.vx = vx;
            this.vy = vy;
            // 大小 (彗星头部较大，尾部渐小)
            this.size = 1 + Math.random() * 1.75;
            this.startSize = this.size;
            // 生命周期 (帧数)
            this.life = 1.0;          // 1 -> 0
            this.decay = 0.006 + Math.random() * 0.014;   // 衰减速度
            // 颜色 (每个粒子独立色相, 更丰富)
            this.hue = (200 + Math.random() * 70) % 360;
            this.sat = 80 + Math.random() * 20;
            this.light = 65 + Math.random() * 30;
            // 尾部拖尾透明度偏移 (让尾巴更柔和)
            this.alpha = 0.9 + Math.random() * 0.1;
            // 微旋转/飘动 (增加随机感)
            this.wobble = (Math.random() - 0.5) * 0.4;
        }

        // 更新粒子状态
        update() {
            // 速度逐渐衰减 (模拟阻力)
            this.vx *= 0.99;
            this.vy *= 0.99;
            // 随机微扰动 (减小发散，保持彗星收敛)
            this.vx += (Math.random() - 0.5) * 0.04;
            this.vy += (Math.random() - 0.5) * 0.04;
            // 位置更新
            this.x += this.vx;
            this.y += this.vy;
            // 生命周期衰减
            this.life -= this.decay;
            // 大小随生命衰减 (头部大, 尾巴小)
            this.size = this.startSize * this.life * 0.9 + 0.8;
            // 透明度随生命衰减
            this.alpha = this.life * 0.85 + 0.15;
            // 亮度微调 (尾部变暗)
            this.light = 70 * this.life + 20;
            // 限制最小尺寸
            if (this.size < 0.2) this.size = 0.2;
            return this.life > 0;
        }

        // 绘制粒子 (带光晕)
        draw(ctx) {
            const radius = this.size * 0.6;
            // 主光晕 (径向渐变)
            const gradient = ctx.createRadialGradient(
                this.x, this.y, 0,
                this.x, this.y, radius * 2.2
            );
            const alpha = this.alpha * 0.75;
            gradient.addColorStop(0, `hsla(${this.hue}, ${this.sat}%, ${this.light}%, ${alpha})`);
            gradient.addColorStop(0.5, `hsla(${this.hue + 15}, ${this.sat}%, ${this.light - 10}%, ${alpha * 0.5})`);
            gradient.addColorStop(1, `hsla(${this.hue + 30}, ${this.sat - 10}%, ${this.light - 30}%, 0)`);

            ctx.beginPath();
            ctx.arc(this.x, this.y, radius * 2.2, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();

            // 核心亮点 (更亮的小圆)
            ctx.beginPath();
            ctx.arc(this.x, this.y, radius * 0.5, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${this.hue + 10}, 100%, 90%, ${this.alpha * 0.7})`;
            ctx.fill();

            // 额外小高光 (闪烁感)
            if (this.size > 2.5) {
                ctx.beginPath();
                ctx.arc(this.x - radius * 0.2, this.y - radius * 0.2, radius * 0.15, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(0, 0%, 100%, ${this.alpha * 0.4})`;
                ctx.fill();
            }
        }
    }

    // ---------- 发射粒子 (根据鼠标位置和速度) ----------
    let lastX = mouseX;
    let lastY = mouseY;
    let frameCount = 0;

    function emitParticles() {
        // 计算鼠标移动速度 (用于控制粒子数量和初始速度)
        const dx = mouseX - lastX;
        const dy = mouseY - lastY;
        const speed = Math.sqrt(dx * dx + dy * dy);
        // 动态调整发射数量：移动越快，粒子越多；按住鼠标加速
        let count = 1;
        if (speed > 2) {
            count = Math.min(4 + Math.floor(speed / 6), 10);
        }
        if (isMouseDown) {
            count = Math.min(count + 3, 14); // 按住鼠标增加爆发
        }
        // 如果鼠标静止且未按住，减少到1~2个粒子 (保持轨迹)
        if (speed < 1 && !isMouseDown) {
            count = 1;
        }

        // 随机化少量粒子偏移
        for (let i = 0; i < count; i++) {
            if (particles.length >= MAX_PARTICLES) break;

            // 基础速度方向：跟随鼠标移动方向 + 随机散射
            let baseVx = dx * (0.12 + Math.random() * 0.2);
            let baseVy = dy * (0.12 + Math.random() * 0.2);

            // 减小随机散射 (彗星尾巴收敛，方向跟随运动方向为主)
            const angle = Math.random() * Math.PI * 2;
            const scatter = 0.1 + Math.random() * 0.35;
            baseVx += Math.cos(angle) * scatter;
            baseVy += Math.sin(angle) * scatter;

            // 偶尔加入轻微向上飘浮
            if (Math.random() > 0.85) {
                baseVy -= 0.1 + Math.random() * 0.2;
            }

            // 位置微偏移 (减小偏移量)
            const offsetX = (Math.random() - 0.5) * 1.0;
            const offsetY = (Math.random() - 0.5) * 1.0;

            const p = new Particle(
                mouseX + offsetX,
                mouseY + offsetY,
                baseVx,
                baseVy
            );
            // 赋予个体色彩变化
            p.hue = (p.hue + Math.random() * 30 - 15 + 360) % 360;
            particles.push(p);
        }

        // 更新上一次坐标
        lastX = mouseX;
        lastY = mouseY;
    }

    // ---------- 动画循环 ----------
    function animate(timestamp) {
        // 1. 发射新粒子 (基于鼠标状态)
        emitParticles();

        // 2. 更新 & 清理死亡粒子
        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            const alive = p.update();
            if (!alive) {
                particles.splice(i, 1);
            }
        }

        // 3. 限制最大数量 (防止溢出)
        if (particles.length > MAX_PARTICLES) {
            particles.splice(0, particles.length - MAX_PARTICLES);
        }

        // 4. 绘制
        ctx.clearRect(0, 0, width, height);

        // 绘制所有粒子 (采用叠加混合模式)
        ctx.globalCompositeOperation = 'lighter';
        for (const p of particles) {
            p.draw(ctx);
        }
        // 重置混合模式
        ctx.globalCompositeOperation = 'source-over';

        // 绘制鼠标位置的一个小光晕 (指示器，更炫)
        if (particles.length > 5) {
            const gradient = ctx.createRadialGradient(
                mouseX, mouseY, 0,
                mouseX, mouseY, 18
            );
            gradient.addColorStop(0, 'rgba(180, 220, 255, 0.25)');
            gradient.addColorStop(0.6, 'rgba(100, 150, 255, 0.08)');
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(mouseX, mouseY, 18, 0, Math.PI * 2);
            ctx.fill();
        }

        // 5. 继续下一帧
        requestAnimationFrame(animate);
    }

    // ---------- 启动 ----------
    animate(0);

    // 窗口resize 重置 lastX/Y 避免跳变
    window.addEventListener('resize', () => {
        mouseX = Math.min(width, Math.max(0, mouseX));
        mouseY = Math.min(height, Math.max(0, mouseY));
        lastX = mouseX;
        lastY = mouseY;
    });

    console.log('✨ 彗星拖尾已启动！');
})();

// Scroll Animations
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Optional: unobserve if you only want the animation to happen once
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.fade-in-up, .slide-in-right, .slide-in-left').forEach((el) => {
        observer.observe(el);
    });

    // 微信二维码弹窗
    const btn = document.getElementById('btnWechat');
    const modal = document.getElementById('wechatModal');
    const close = document.getElementById('closeModal');
    const inner = modal?.querySelector('.glass-panel');

    function openModal() {
        modal.classList.remove('opacity-0', 'pointer-events-none');
        modal.classList.add('opacity-100');
        inner?.classList.remove('scale-90');
        inner?.classList.add('scale-100');
        document.body.classList.remove('cursor-none');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.add('opacity-0', 'pointer-events-none');
        modal.classList.remove('opacity-100');
        inner?.classList.add('scale-90');
        inner?.classList.remove('scale-100');
        document.body.classList.add('cursor-none');
        document.body.style.overflow = '';
    }

    btn?.addEventListener('click', openModal);
    close?.addEventListener('click', closeModal);
    modal?.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
});

