document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. CONFIGURAÇÕES GERAIS E UI ---
    const setupUI = () => {
        // Smooth Scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) target.scrollIntoView({ behavior: 'smooth' });
            });
        });

        // Scroll Reveal (Efeito de aparecer ao rolar)
        const observer = new IntersectionObserver((entries) => { 
            entries.forEach(entry => { 
                if(entry.isIntersecting) entry.target.classList.add('animate-fade-in');
            }); 
        }, { threshold: 0.1 });
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

        // Notificações de Venda (Prova Social)
        if (window.Notiflix) { 
            // Estilo customizado para o Speeds Sensi (Preto e Vermelho Tech)
            Notiflix.Notify.Init({
                width: '300px',
                position: 'left-bottom',
                backgroundColor: '#111',
                textColor: '#fff',
                borderRadius: '4px',
                fontFamily: 'Poppins',
                success: { border: '1px solid #dc2626', notifIconColor: '#dc2626' }
            });

            setInterval(() => { 
                const names = ["Lucas M.", "Gabriel S.", "João P.", "Mateus K.", "Enzo F."];
                const randomName = names[Math.floor(Math.random() * names.length)];
                const messages = [
                    `<strong>${randomName}</strong> ativou o Speeds Vitalício.`, 
                    `<strong>Nova venda:</strong> Plano Speeds PRO liberado.`, 
                    `<strong>${randomName}</strong> acabou de otimizar a mira.`
                ];
                Notiflix.Notify.Success(messages[Math.floor(Math.random() * messages.length)], { plainText: false });
            }, 12000 + Math.random() * 8000);
        }
    };

    // --- 2. LÓGICA DA GAMIFICAÇÃO (Jornada do Usuário) ---
    const setupGamification = () => {
        const progressBar = document.getElementById('progress-bar');
        const progressText = document.getElementById('progress-text');
        const vitalicioPlanCard = document.getElementById('vitalicio-plan-card');
        let journeyCompleted = false;

        const tasks = {
            activated: { completed: false, points: 30, element: document.getElementById('task-1') },
            testedAim: { completed: false, points: 40, element: document.getElementById('task-2') },
            optimized: { completed: false, points: 30, element: document.getElementById('task-3') }
        };

        const updateProgress = () => {
            if (journeyCompleted) return;
            let points = 0;
            if (tasks.activated.completed) points += tasks.activated.points;
            if (tasks.testedAim.completed) points += tasks.testedAim.points;
            if (tasks.optimized.completed) points += tasks.optimized.points;

            if(progressBar) progressBar.style.width = `${points}%`;
            if(progressText) progressText.textContent = `${points}%`;

            if (points >= 100 && !journeyCompleted) {
                journeyCompleted = true;
                setTimeout(() => {
                    if(window.Notiflix) Notiflix.Notify.Success('<strong>SISTEMA LIBERADO!</strong> Oferta Speeds Sensi desbloqueada.', { timeout: 5000 });
                    
                    // Efeito visual no card de preço
                    if(vitalicioPlanCard) {
                        vitalicioPlanCard.classList.add('border-yellow-400', 'shadow-[0_0_40px_rgba(250,204,21,0.3)]');
                        vitalicioPlanCard.classList.remove('border-red-600');
                    }
                    
                    // Auto-scroll para preços
                    document.getElementById('planos')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 800);
            }
        };

        // Função global para completar tarefas
        window.completeTask = (taskName) => {
            if (journeyCompleted || !tasks[taskName] || tasks[taskName].completed) return;
            tasks[taskName].completed = true;
            
            const el = tasks[taskName].element;
            if (el) {
                el.classList.remove('text-gray-600');
                el.classList.add('text-red-500', 'font-bold');
                el.querySelector('i').classList.replace('far', 'fas'); // Muda ícone para preenchido
                el.querySelector('i').classList.replace('fa-circle', 'fa-circle-check');
            }

            if (window.Notiflix) {
                const msgs = {
                    activated: 'Speeds Sensi Conectado!',
                    testedAim: 'Calibragem Concluída!',
                    optimized: 'Dispositivo Otimizado!'
                };
                Notiflix.Notify.Success(msgs[taskName]);
            }
            updateProgress();
        };
    };

    // --- 3. FAQ DINÂMICO (Atualizado para Speeds) ---
    const setupFAQ = () => {
        const container = document.getElementById('faq-container');
        if (!container) return;
        
        const faqs = [
            { q: "O Speeds Sensi dá ban?", a: "Não. O Speeds funciona como um otimizador de tela e processamento. Ele não injeta códigos dentro do Free Fire, portanto é 100% seguro e anti-ban." },
            { q: "Serve para qualquer celular?", a: "Sim. O sistema foi desenhado para rodar tanto em Android (Samsung, Xiaomi, Motorola) quanto em iOS (iPhone), mesmo em aparelhos mais antigos." },
            { q: "Como recebo o acesso?", a: "Imediatamente após o pagamento. Você recebe um e-mail com seu login e o link para baixar o painel Speeds." },
            { q: "Tem garantia?", a: "Sim, garantia incondicional de 7 dias. Se não subir capa, devolvemos seu dinheiro." }
        ];

        container.innerHTML = faqs.map((item, idx) => `
            <div class="bg-gray-900/50 border border-gray-800 rounded mb-2 overflow-hidden">
                <button onclick="this.nextElementSibling.classList.toggle('hidden')" class="w-full text-left p-4 font-semibold text-gray-200 flex justify-between items-center hover:bg-gray-800 transition">
                    ${item.q} <i class="fa-solid fa-chevron-down text-xs"></i>
                </button>
                <div class="hidden p-4 pt-0 text-gray-400 text-sm border-t border-gray-800/50 mt-2">
                    ${item.a}
                </div>
            </div>
        `).join('');
    };

    // --- 4. SIMULADOR DO APP (Lógica do Fake App) ---
    const setupSimulator = () => {
        const toggleBtn = document.getElementById('app-main-toggle-btn');
        const indicators = document.getElementById('status-indicators');
        const functions = document.getElementById('quick-functions');
        const floatingPanel = document.getElementById('app-floating-panel'); // Se existir no HTML
        
        let isOn = false;

        if(toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                isOn = !isOn;
                const span = toggleBtn.querySelector('span');
                const bg = toggleBtn.querySelector('div.bg-gray-900');
                const border = toggleBtn.querySelector('.absolute');

                if (isOn) {
                    // Ligar
                    span.textContent = 'ON';
                    span.classList.replace('text-gray-600', 'text-white');
                    bg.classList.replace('bg-gray-900', 'bg-red-600');
                    bg.classList.add('shadow-[0_0_20px_#dc2626]');
                    border.classList.add('animate-spin'); // Efeito visual extra
                    
                    indicators.classList.remove('opacity-30');
                    functions.classList.remove('opacity-30', 'pointer-events-none');
                    
                    // Atualizar números falsos
                    document.querySelector('[data-stat="latency"]').textContent = "18ms";
                    document.querySelector('[data-stat="fps"]').textContent = "60";
                    document.querySelector('[data-stat="precision"]').textContent = "+90%";
                    
                    window.completeTask('activated');
                } else {
                    // Desligar
                    span.textContent = 'OFF';
                    span.classList.replace('text-white', 'text-gray-600');
                    bg.classList.replace('bg-red-600', 'bg-gray-900');
                    bg.classList.remove('shadow-[0_0_20px_#dc2626]');
                    border.classList.remove('animate-spin');

                    indicators.classList.add('opacity-30');
                    functions.classList.add('opacity-30', 'pointer-events-none');
                }
            });
        }

        // Listener para checkboxes do simulador
        document.querySelectorAll('#quick-functions input').forEach(input => {
            input.addEventListener('change', () => {
                // Se marcar 2 opções, completa a tarefa
                const checkedCount = document.querySelectorAll('#quick-functions input:checked').length;
                if(checkedCount >= 1) window.completeTask('testedAim');
                if(checkedCount >= 2) window.completeTask('optimized');
            });
        });
    };

    // INICIALIZAÇÃO
    setupUI();
    setupGamification();
    setupFAQ();
    setupSimulator();
});
