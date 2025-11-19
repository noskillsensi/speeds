document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. INTERFACE E EFEITOS ---
    const setupUI = () => {
        // Smooth Scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) target.scrollIntoView({ behavior: 'smooth' });
            });
        });

        // Scroll Reveal
        const observer = new IntersectionObserver((entries) => { 
            entries.forEach(entry => { 
                if(entry.isIntersecting) entry.target.classList.add('animate-fade-in');
            }); 
        }, { threshold: 0.1 });
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

        // Notificações de Prova Social (Brand: Speeds)
        if (window.Notiflix) { 
            Notiflix.Notify.Init({
                width: '300px', position: 'left-bottom', backgroundColor: '#111',
                textColor: '#fff', borderRadius: '8px', fontFamily: 'Poppins',
                success: { border: '1px solid #dc2626', notifIconColor: '#dc2626' }
            });

            setInterval(() => { 
                const names = ["Mateus K.", "Lucas S.", "João P.", "Enzo G.", "Rafael M."];
                const randomName = names[Math.floor(Math.random() * names.length)];
                const msgs = [
                    `<strong>${randomName}</strong> adquiriu o Speeds Vitalício.`,
                    `<strong>Nova venda:</strong> Acesso Speeds PRO liberado.`,
                    `<strong>${randomName}</strong> ativou o Regedit Mobile.`
                ];
                Notiflix.Notify.Success(msgs[Math.floor(Math.random() * msgs.length)], { plainText: false });
            }, 15000);
        }
    };

    // --- 2. GAMIFICAÇÃO (Lógica de Vendas) ---
    const setupGamification = () => {
        const progressBar = document.getElementById('progress-bar');
        const progressText = document.getElementById('progress-text');
        const vitalicioCard = document.getElementById('vitalicio-plan-card');
        let completed = false;

        const tasks = {
            t1: { done: false, el: document.getElementById('task-1'), pts: 30 },
            t2: { done: false, el: document.getElementById('task-2'), pts: 40 },
            t3: { done: false, el: document.getElementById('task-3'), pts: 30 }
        };

        const update = () => {
            if (completed) return;
            let pts = 0;
            if(tasks.t1.done) pts += tasks.t1.pts;
            if(tasks.t2.done) pts += tasks.t2.pts;
            if(tasks.t3.done) pts += tasks.t3.pts;

            if(progressBar) progressBar.style.width = `${pts}%`;
            if(progressText) progressText.innerText = `${pts}%`;

            if (pts >= 100 && !completed) {
                completed = true;
                setTimeout(() => {
                    if(window.Notiflix) Notiflix.Notify.Success('<strong>SISTEMA LIBERADO!</strong> Oferta exclusiva desbloqueada.', { timeout: 5000 });
                    if(vitalicioCard) {
                        vitalicioCard.classList.add('border-yellow-500', 'shadow-[0_0_50px_rgba(234,179,8,0.4)]');
                        vitalicioCard.classList.remove('border-red-600');
                    }
                    document.getElementById('planos')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 1000);
            }
        };

        window.completeTask = (id) => {
            let key = '';
            if(id === 'activated') key = 't1';
            else if(id === 'aim') key = 't2';
            else if(id === 'opt') key = 't3';

            if (completed || !tasks[key] || tasks[key].done) return;
            
            tasks[key].done = true;
            const el = tasks[key].el;
            if(el) {
                el.classList.remove('text-gray-500');
                el.classList.add('text-red-500', 'font-bold', 'bg-red-900/20');
                el.querySelector('i').classList.replace('far', 'fas');
                el.querySelector('i').classList.replace('fa-circle', 'fa-check-circle');
            }
            update();
        };
    };

    // --- 3. SIMULADOR DO CELULAR ---
    const setupSimulator = () => {
        const btn = document.getElementById('app-main-toggle-btn');
        const indicators = document.getElementById('status-indicators');
        const menu = document.getElementById('quick-functions');
        const glow = document.getElementById('btn-glow');
        let isOn = false;

        if(btn) {
            btn.addEventListener('click', () => {
                isOn = !isOn;
                const span = btn.querySelector('span');
                
                if (isOn) {
                    // LIGAR
                    span.innerText = "ON";
                    span.classList.replace('text-gray-700', 'text-white');
                    if(glow) glow.classList.replace('opacity-0', 'opacity-100');
                    
                    indicators.classList.remove('opacity-30');
                    menu.classList.remove('opacity-40', 'pointer-events-none');
                    
                    // Popular números falsos
                    document.querySelector('[data-stat="latency"]').innerText = "18ms";
                    document.querySelector('[data-stat="fps"]').innerText = "60";
                    document.querySelector('[data-stat="precision"]').innerText = "+95%";
                    
                    window.completeTask('activated');
                } else {
                    // DESLIGAR
                    span.innerText = "OFF";
                    span.classList.replace('text-white', 'text-gray-700');
                    if(glow) glow.classList.replace('opacity-100', 'opacity-0');
                    
                    indicators.classList.add('opacity-30');
                    menu.classList.add('opacity-40', 'pointer-events-none');
                }
            });
        }

        // Listeners dos Checkboxes
        document.querySelectorAll('#quick-functions input').forEach(chk => {
            chk.addEventListener('change', () => {
                const count = document.querySelectorAll('#quick-functions input:checked').length;
                if(count >= 1) window.completeTask('aim');
                if(count >= 2) window.completeTask('opt');
            });
        });
    };

    setupUI();
    setupGamification();
    setupSimulator();
});
