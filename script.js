document.addEventListener('DOMContentLoaded', () => {
    const batteryLevel = document.getElementById('battery-level');
    const batteryPercentage = document.getElementById('battery-percentage');
    const batteryMessage = document.getElementById('battery-message');
    const rechargeBtn = document.getElementById('recharge-btn');
    const sakuraContainer = document.getElementById('sakura-container');
    const reminderContainer = document.getElementById('reminder-container');
    
    let currentLevel = 0;
    let chargingInterval;
    let isCharging = false;

    const messages = [
        { threshold: 0, message: "Tap to start charging..." },
        { threshold: 1, message: "Charging..." },
        { threshold: 20, message: "Forget the bad memory..." },
        { threshold: 30, message: "Take some deep breath in..." },
        { threshold: 40, message: "You're doing great..." },
        { threshold: 50, message: "You're halfway there..." },
        { threshold: 60, message: "Slowly and gently breathe out..." },
        { threshold: 75, message: "Think of something cute..." },
        { threshold: 80, message: "Power save mode turning off..." },
        { threshold: 90, message: "Almost there..." },
        { threshold: 95, message: "Smile..." },
        { threshold: 100, message: "Fully charged! ❤️" }
    ];

    function startCharging() {
        if (isCharging) return;
        
        isCharging = true;
        rechargeBtn.style.display = 'none';
        batteryMessage.textContent = "Charging...";
        
        chargingInterval = setInterval(() => {
            if (currentLevel < 100) {
                currentLevel += 1;
                updateBatteryDisplay();

                if (currentLevel % 5 === 0) {
                    createHeart();
                }
            } else {
                stopCharging();
                celebrate();
            }
        }, 100);
    }

    function stopCharging() {
        clearInterval(chargingInterval);
        isCharging = false;

        if (currentLevel >= 100) {
            setTimeout(() => {
                reminderContainer.classList.remove('hidden');
                reminderContainer.classList.add('visible');
            }, 1000);
        }
    }

    function updateBatteryDisplay() {
        batteryLevel.style.width = `${currentLevel}%`;
        batteryPercentage.textContent = `${currentLevel}%`;

        for (let i = messages.length - 1; i >= 0; i--) {
            if (currentLevel >= messages[i].threshold) {
                batteryMessage.textContent = messages[i].message;
                break;
            }
        }
    }

    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '❤️';
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.animationDuration = `${Math.random() * 2 + 1}s`;
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 3000);
    }

    function celebrate() {
        batteryMessage.textContent = "Fully charged! ❤️";

        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                createHeart();
            }, i * 200);
        }
    }

    function createSakuraPetals() {
        for (let i = 0; i < 20; i++) {
            const petal = document.createElement('div');
            petal.classList.add('sakura-petal');

            const size = Math.random() * 15 + 5;
            petal.style.width = `${size}px`;
            petal.style.height = `${size}px`;
            petal.style.left = `${Math.random() * 100}%`;
            petal.style.animationDuration = `${Math.random() * 10 + 5}s`;
            petal.style.opacity = Math.random() * 0.6 + 0.3;
            
            sakuraContainer.appendChild(petal);
        }
    }

    rechargeBtn.addEventListener('click', startCharging);
    document.querySelector('.battery').addEventListener('click', startCharging);

    createSakuraPetals();

    setInterval(() => {
        const petal = document.createElement('div');
        petal.classList.add('sakura-petal');
        
        const size = Math.random() * 15 + 5;
        petal.style.width = `${size}px`;
        petal.style.height = `${size}px`;
        petal.style.left = `${Math.random() * 100}%`;
        petal.style.animationDuration = `${Math.random() * 10 + 5}s`;
        petal.style.opacity = Math.random() * 0.6 + 0.3;
        
        sakuraContainer.appendChild(petal);

        if (sakuraContainer.children.length > 50) {
            sakuraContainer.removeChild(sakuraContainer.children[0]);
        }
    }, 500);

    const style = document.createElement('style');
    style.textContent = `
        body {
            min-height: 101vh;
        }

        .heart {
            position: absolute;
            font-size: 20px;
            pointer-events: none;
            animation: float-up 3s ease-out forwards;
            z-index: 100;
        }
        
        @keyframes float-up {
            0% {
                transform: translateY(0) scale(0.5);
                opacity: 0.7;
            }
            100% {
                transform: translateY(-100px) scale(1.5);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});
