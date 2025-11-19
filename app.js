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
// Coloque isso dentro do seu DOMContentLoaded
const setupInteractivePanel = () => {
    // Elementos
    const btnPower = document.getElementById('btn-power');
    const powerGlow = document.getElementById('power-glow');
    const powerLabel = document.getElementById('power-label');
    const functionsContainer = document.getElementById('functions-container');
    const btnOptimize = document.getElementById('btn-optimize');
    
    // Stats
    const statPing = document.getElementById('stat-ping');
    const statFps = document.getElementById('stat-fps');
    const statSensi = document.getElementById('stat-sensi');
    
    // Tarefas Visuais
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    const systemStatus = document.getElementById('system-status');
    const task1 = document.getElementById('task-1');
    const task2 = document.getElementById('task-2');
    const task3 = document.getElementById('task-3');

    // Estado
    let isSystemOn = false;
    let progressStep = 0; // 0 a 3

    // Função Auxiliar: Atualizar Progresso
    const updateProgress = (step) => {
        progressStep = step;
        const percentage = Math.round((step / 3) * 100);
        
        progressBar.style.width = `${percentage}%`;
        progressText.innerText = `${percentage}%`;
        
        if (step >= 1) task1.classList.add('task-done');
        if (step >= 2) task2.classList.add('task-done');
        if (step >= 3) {
            task3.classList.add('task-done');
            // Vitório
            setTimeout(() => {
                if(window.Notiflix) Notiflix.Notify.Success('SISTEMA OTIMIZADO! Oferta Liberada.');
                // Scroll suave até a oferta
                document.getElementById('vitalicio-plan-card')?.scrollIntoView({behavior: 'smooth', block: 'center'});
                // Efeito visual no card
                document.getElementById('vitalicio-plan-card')?.classList.add('animate-pulse');
            }, 1000);
        }
    };

    // Função Auxiliar: Animar Números
    const animateValue = (obj, start, end, duration, suffix = "") => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start) + suffix;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                obj.innerHTML = end + suffix; // Garante o valor final
                obj.classList.add('text-brand-red', 'drop-shadow-[0_0_5px_rgba(255,0,0,0.8)]'); // Fica vermelho neon no final
                obj.classList.remove('text-gray-600');
            }
        };
        window.requestAnimationFrame(step);
    };

    // 1. CLIQUE NO BOTÃO POWER (Ligar)
    btnPower.addEventListener('click', () => {
        if (isSystemOn) return; // Já tá ligado
        isSystemOn = true;

        // Visual Power Button
        btnPower.classList.add('power-on');
        powerGlow.classList.replace('bg-brand-red/0', 'bg-brand-red/30');
        powerLabel.innerText = "ONLINE";
        
        // Atualizar Status Texto
        systemStatus.innerHTML = '<i class="fa-solid fa-unlock mr-2 text-brand-red"></i>SISTEMA ATIVO';
        systemStatus.classList.replace('text-gray-500', 'text-white');

        // Destravar Funções (Visual)
        functionsContainer.classList.remove('opacity-40', 'grayscale', 'pointer-events-none');
        
        // Animar Stats (Simulação)
        animateValue(statPing, 999, 17, 1500, "ms");
        animateValue(statFps, 0, 90, 1500, "");
        setTimeout(() => {
            statSensi.innerHTML = "HIGH";
            statSensi.classList.add('text-brand-red');
        }, 1000);

        // Marcar Tarefa 1
        updateProgress(1);
    });

    // 2. CLIQUE NOS SWITCHES (Regedit / Mira)
    const triggers = document.querySelectorAll('.app-trigger');
    triggers.forEach(trigger => {
        trigger.addEventListener('change', () => {
            // Se já passou da etapa 2, ignora (para não bugar a barra)
            if (progressStep < 2) {
                updateProgress(2);
            }
        });
    });

    // 3. CLIQUE EM OTIMIZAR (Final)
    btnOptimize.addEventListener('click', () => {
        if (progressStep < 2) {
            // Se tentar clicar antes de ativar as funções
            btnOptimize.classList.add('shake');
            setTimeout(() => btnOptimize.classList.remove('shake'), 500);
            return;
        }

        // Loading State
        const originalText = btnOptimize.innerHTML;
        btnOptimize.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> PROCESSANDO...';
        btnOptimize.disabled = true;

        setTimeout(() => {
            // Success State
            btnOptimize.innerHTML = '<i class="fa-solid fa-check"></i> SUCESSO';
            btnOptimize.className = "w-full mt-4 bg-brand-red text-white font-teko text-xl py-4 rounded-xl tracking-wider shadow-[0_0_20px_rgba(255,0,0,0.6)] border border-red-500";
            
            updateProgress(3);
        }, 2000);
    });
};

// Chamar a função
setupInteractivePanel();
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
