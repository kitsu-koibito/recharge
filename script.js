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
    
    // Messages to display based on battery percentage
    const messages = [
        { threshold: 0, message: "Tap to start charging..." },
        { threshold: 1, message: "Charging..." },
        { threshold: 25, message: "Forget the bad memory..." },
        { threshold: 40, message: "Take some deep breath in..." },
        { threshold: 50, message: "You're halfway there..." },
        { threshold: 75, message: "Think of something cute..." },
        { threshold: 85, message: "Almost there..." },
        { threshold: 95, message: "Smile..." },
        { threshold: 100, message: "Fully charged! ❤️" }
    ];
    
    // Start or continue charging
    function startCharging() {
        if (isCharging) return;
        
        isCharging = true;
        rechargeBtn.style.display = 'none'; // Hide button immediately
        batteryMessage.textContent = "Charging...";
        
        chargingInterval = setInterval(() => {
            if (currentLevel < 100) {
                currentLevel += 1;
                updateBatteryDisplay();
                
                // Create heart particles when charging
                if (currentLevel % 5 === 0) {
                    createHeart();
                }
            } else {
                stopCharging();
                celebrate();
            }
        }, 100);
    }
    
    // Stop charging
    function stopCharging() {
        clearInterval(chargingInterval);
        isCharging = false;
        
        // Show reminder container when fully charged
        if (currentLevel >= 100) {
            setTimeout(() => {
                reminderContainer.classList.remove('hidden');
                reminderContainer.classList.add('visible');
            }, 1000); // Reduced to 1 second delay
        }
    }
    
    // Update the battery display
    function updateBatteryDisplay() {
        batteryLevel.style.width = `${currentLevel}%`;
        batteryPercentage.textContent = `${currentLevel}%`;
        
        // Update message based on current level
        for (let i = messages.length - 1; i >= 0; i--) {
            if (currentLevel >= messages[i].threshold) {
                batteryMessage.textContent = messages[i].message;
                break;
            }
        }
    }
    
    // Create heart particle effect
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
    
    // Celebration when fully charged
    function celebrate() {
        batteryMessage.textContent = "Fully charged! ❤️";
        
        // Create multiple hearts for celebration
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                createHeart();
            }, i * 200);
        }
    }
    
    // Create falling sakura petals
    function createSakuraPetals() {
        for (let i = 0; i < 20; i++) {
            const petal = document.createElement('div');
            petal.classList.add('sakura-petal');
            
            // Randomize petal properties
            const size = Math.random() * 15 + 5;
            petal.style.width = `${size}px`;
            petal.style.height = `${size}px`;
            petal.style.left = `${Math.random() * 100}%`;
            petal.style.animationDuration = `${Math.random() * 10 + 5}s`;
            petal.style.opacity = Math.random() * 0.6 + 0.3;
            
            sakuraContainer.appendChild(petal);
        }
    }

    // Handle button click
    rechargeBtn.addEventListener('click', startCharging);
    
    // Click on battery also starts charging
    document.querySelector('.battery').addEventListener('click', startCharging);
    
    // Create the initial sakura petals
    createSakuraPetals();
    
    // Periodically create new petals
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
        
        // Remove old petals to prevent too many elements
        if (sakuraContainer.children.length > 50) {
            sakuraContainer.removeChild(sakuraContainer.children[0]);
        }
    }, 500);
    
    // Add additional styles for heart animation
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
