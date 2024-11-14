const forest = document.querySelector('.forest');
        const grass = document.querySelector('.grass');
        const glow = document.querySelector('.glow');
        const message = document.querySelector('.message');
        const stars = document.querySelector('.stars');

        // Create stars
        for (let i = 0; i < 100; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.width = Math.random() * 2 + 'px';
            star.style.height = star.style.width;
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            star.style.animationDelay = Math.random() * 2 + 's';
            stars.appendChild(star);
        }

        // Create grass with varying colors
        for (let i = 0; i < 300; i++) {
            const blade = document.createElement('div');
            blade.className = 'grass-blade';
            blade.style.left = `${Math.random() * 100}%`;
            blade.style.height = `${Math.random() * 100 + 50}px`;
            blade.style.animationDelay = `${Math.random() * 2}s`;
            const hue = 120 + Math.random() * 20;
            blade.style.background = `linear-gradient(to top, 
                hsl(${hue}, 40%, 25%), 
                hsl(${hue}, 40%, 15%))`;
            grass.appendChild(blade);
        }

        function createFirefly() {
            const firefly = document.createElement('div');
            firefly.className = 'firefly';
            firefly.style.left = `${Math.random() * 100}%`;
            firefly.style.top = `${Math.random() * 100}%`;
            firefly.style.animationDelay = `${Math.random() * 4}s`;
            forest.appendChild(firefly);
            
            const move = () => {
                const targetX = Math.random() * 100;
                const targetY = Math.random() * 100;
                firefly.style.transition = 'left 4s, top 4s';
                firefly.style.left = `${targetX}%`;
                firefly.style.top = `${targetY}%`;
            };

            setInterval(move, 4000);
        }

        // Initial fireflies
        for (let i = 0; i < 40; i++) {
            createFirefly();
        }

        function createButterfly(x, y) {
            const butterfly = document.createElement('div');
            butterfly.className = 'butterfly';
            butterfly.style.left = x + 'px';
            butterfly.style.top = y + 'px';

            const leftWing = document.createElement('div');
            leftWing.className = 'wing';
            leftWing.style.left = '-15px';
            
            const rightWing = document.createElement('div');
            rightWing.className = 'wing';
            rightWing.style.right = '-15px';
            rightWing.style.transform = 'scaleX(-1)';

            butterfly.appendChild(leftWing);
            butterfly.appendChild(rightWing);
            forest.appendChild(butterfly);

            // Butterfly movement
            const move = () => {
                const targetX = Math.random() * window.innerWidth;
                const targetY = Math.random() * window.innerHeight;
                butterfly.style.transform = `translate(${targetX}px, ${targetY}px)`;
            };

            setInterval(move, 3000);
            setTimeout(() => butterfly.remove(), 10000);
        }

        function createFlower(x, y) {
            const flower = document.createElement('div');
            flower.className = 'flower';
            flower.style.left = x + 'px';
            flower.style.bottom = y + 'px';

            const center = document.createElement('div');
            center.className = 'flower-center';

            const petalCount = 8;
            for (let i = 0; i < petalCount; i++) {
                const petal = document.createElement('div');
                petal.className = 'petal';
                const angle = (i / petalCount) * 360;
                petal.style.transform = `rotate(${angle}deg) translate(12px, 0)`;
                center.appendChild(petal);
            }

            flower.appendChild(center);
            grass.appendChild(flower);

            // Add sparkle effect
            for (let i = 0; i < 5; i++) {
                const sparkle = document.createElement('div');
                sparkle.className = 'sparkle';
                sparkle.style.left = Math.random() * 40 - 20 + 'px';
                sparkle.style.top = Math.random() * 40 - 20 + 'px';
                flower.appendChild(sparkle);
                setTimeout(() => sparkle.remove(), 1000);
            }
        }

        // Enhanced mouse effects
        let isMouseDown = false;
        document.addEventListener('mousedown', () => isMouseDown = true);
        document.addEventListener('mouseup', () => isMouseDown = false);

        document.addEventListener('mousemove', (e) => {
            glow.style.left = e.clientX + 'px';
            glow.style.top = e.clientY + 'px';

            if (isMouseDown) {
                createFlower(e.clientX, window.innerHeight - e.clientY);
            }

            const fireflies = document.querySelectorAll('.firefly');
            fireflies.forEach(firefly => {
                const rect = firefly.getBoundingClientRect();
                const dx = e.clientX - (rect.left + rect.width/2);
                const dy = e.clientY - (rect.top + rect.height/2);
                const distance = Math.sqrt(dx*dx + dy*dy);
                
                if (distance < 150) {
                    const angle = Math.atan2(dy, dx);
                    const force = (150 - distance) / 2;
                    firefly.style.transform = `translate(${-Math.cos(angle) * force}px, ${-Math.sin(angle) * force}px)`;
                }
            });
        });

        document.addEventListener('click', (e) => {
            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.className = 'water-ripple';
            ripple.style.left = e.clientX - 50 + 'px';
            ripple.style.top = e.clientY - 50 + 'px';
            document.body.appendChild(ripple);
            setTimeout(() => ripple.remove(), 1000);

            createFlower(e.clientX, window.innerHeight - e.clientY);
            createButterfly(e.clientX, e.clientY);
  
            for (let i = 0; i < 3; i++) {
                createFirefly();
            }

            const messages = [
                "The world feels brighter with you in it.",
                "There's a magic in the air when you're near.",
                "Your smile brings light to every moment.",
                "You add beauty to the world, effortlessly.",
                "You have a grace that’s simply mesmerizing.",
                "Being around you is like a breath of fresh air.",
                "Your presence makes everything feel at ease.",
                "You light up the world in your own way."
            ];
            
            
            message.style.transform = 'translate(-50%, -60%)';
            message.style.opacity = 1;
            message.querySelector('h1').textContent = messages[Math.floor(Math.random() * messages.length)];
            
            setTimeout(() => {
                message.style.transform = 'translate(-50%, -50%)';
                message.style.opacity = 0;
            }, 2000);
        });