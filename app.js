document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. EFEITOS VISUAIS (Scroll Reveal) ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) entry.target.classList.add('animate-fade-in');
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // --- 2. NOTIFICAÇÕES DE PROVA SOCIAL (FAKE) ---
    if (window.Notiflix) {
        // Configuração Global
        Notiflix.Notify.Init({
            width: '300px',
            position: 'left-bottom',
            opacity: 1,
            borderRadius: '8px',
            timeout: 4000,
            cssAnimationStyle: 'from-left',
            useGoogleFont: true,
            fontFamily: 'Poppins',
        });

        setInterval(() => {
            const names = ["Pedro H.", "Lucas G.", "João V.", "Matheus S.", "Gabriel O."];
            const actions = ["acabou de ativar o Speeds PRO", "comprou o acesso Vitalício", "entrou para a elite"];
            const randomName = names[Math.floor(Math.random() * names.length)];
            const randomAction = actions[Math.floor(Math.random() * actions.length)];
            
            Notiflix.Notify.Success(`<strong>${randomName}</strong> ${randomAction}`);
        }, 15000); // A cada 15 segundos
    }

    // --- 3. SIMULADOR DO APP (Lógica Core) ---
    const mainBtn = document.getElementById('app-main-toggle-btn');
    const icon = mainBtn ? mainBtn.querySelector('.toggle-icon') : null;
    const floatingPanel = document.getElementById('app-floating-panel');
    const statusDivs = document.getElementById('status-indicators');
    const quickFuncs = document.getElementById('quick-functions');
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    
    let appState = { active: false, progress: 0, tasks: [false, false, false] };

    // Função para atualizar progresso
    const updateProgress = () => {
        const completedCount = appState.tasks.filter(Boolean).length;
        const targetPct = Math.round((completedCount / 3) * 100);
        
        if (progressBar) progressBar.style.width = `${targetPct}%`;
        if (progressText) progressText.textContent = `${targetPct}%`;

        // Atualizar check visual na lista de tarefas
        document.getElementById('task-1').classList.toggle('text-brand-red', appState.tasks[0]);
        document.getElementById('task-1').classList.toggle('font-bold', appState.tasks[0]);
        
        document.getElementById('task-2').classList.toggle('text-brand-red', appState.tasks[1]);
        
        document.getElementById('task-3').classList.toggle('text-brand-red', appState.tasks[2]);

        // O grande final
        if (targetPct === 100) {
            setTimeout(() => {
                if(window.Notiflix) Notiflix.Notify.Success('ACESSO LIBERADO! Oferta Exclusiva Desbloqueada.');
                const vitalicioCard = document.getElementById('vitalicio-plan-card');
                if(vitalicioCard) {
                    vitalicioCard.classList.add('ring-4', 'ring-red-600', 'scale-110');
                    vitalicioCard.scrollIntoView({behavior: 'smooth', block: 'center'});
                }
            }, 1000);
        }
    };

    // Ação: Ligar App
    if(mainBtn) {
        mainBtn.addEventListener('click', () => {
            appState.active = !appState.active;
            
            if (appState.active) {
                // Ligou
                icon.classList.remove('text-gray-600');
                icon.classList.add('text-green-500', 'drop-shadow-[0_0_10px_rgba(34,197,94,0.8)]');
                mainBtn.classList.remove('pulse-attention');
                statusDivs.classList.remove('opacity-30');
                quickFuncs.classList.remove('opacity-30', 'pointer-events-none');
                floatingPanel.classList.remove('hidden');
                
                // Completar Tarefa 1
                appState.tasks[0] = true;
                updateProgress();

                // Simular dados
                document.querySelector('[data-stat="latency"]').innerHTML = "18<span class='text-xs'>ms</span>";
                document.querySelector('[data-stat="fps"]').innerHTML = "90";
                document.querySelector('[data-stat="precision"]').innerHTML = "+95%";
                document.querySelectorAll('[data-stat]').forEach(el => el.classList.add('text-brand-red'));

            } else {
                // Desligou
                icon.classList.add('text-gray-600');
                icon.classList.remove('text-green-500', 'drop-shadow-[0_0_10px_rgba(34,197,94,0.8)]');
                statusDivs.classList.add('opacity-30');
                quickFuncs.classList.add('opacity-30', 'pointer-events-none');
                floatingPanel.classList.add('hidden');
            }
        });
    }

    // Ação: Clicar nas Funções (Tarefa 2)
    document.querySelectorAll('input[type="checkbox"]').forEach(chk => {
        chk.addEventListener('change', () => {
            if (!appState.active) return;
            // Se ativar qualquer função, conta como tarefa 2
            if (!appState.tasks[1]) {
                appState.tasks[1] = true;
                updateProgress();
            }
        });
    });

    // Ação: Botão Otimizar (Tarefa 3)
    const optBtn = document.getElementById('apply-optimization-btn');
    if(optBtn) {
        optBtn.addEventListener('click', () => {
            const originalText = optBtn.innerHTML;
            optBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> PROCESSANDO...';
            optBtn.disabled = true;
            
            setTimeout(() => {
                optBtn.innerHTML = '<i class="fas fa-check"></i> SUCESSO!';
                optBtn.classList.replace('bg-gray-800', 'bg-green-600');
                optBtn.classList.replace('hover:bg-brand-red', 'hover:bg-green-700');
                
                appState.tasks[2] = true;
                updateProgress();

                setTimeout(() => {
                    optBtn.innerHTML = originalText;
                    optBtn.disabled = false;
                    optBtn.classList.replace('bg-green-600', 'bg-gray-800');
                    optBtn.classList.replace('hover:bg-green-700', 'hover:bg-brand-red');
                }, 2000);
            }, 1500);
        });
    }

    // --- 4. RASTREAMENTO (Pixel Safe Mode) ---
    document.querySelectorAll('.purchase-link').forEach(link => {
        link.addEventListener('click', (e) => {
            // Verifica se fbq existe antes de chamar para não quebrar o site em adblockers
            if (typeof fbq === 'function') {
                fbq('track', 'InitiateCheckout');
            }
        });
    });
});
