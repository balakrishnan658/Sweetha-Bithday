/**
 * ============================================================================
 * BIRTHDAY SURPRISE WEBSITE - INTERACTIVE STORYTELLING ENGINE
 * Pure Vanilla JavaScript | Zero Dependencies | Static Hosting Ready
 * Features: Personalized Name & DOB, 3D Tilt, Memory Photo Stack,
 *           Star & Heart Emoji Spray, and Background Audio
 * ============================================================================
 */

(function () {
  'use strict';

  /* --------------------------------------------------------------------------
   * 1. Centralized Configuration (Easily Customizable)
   * -------------------------------------------------------------------------- */
  const BIRTHDAY_CONFIG = {
    // Recipient Details (can be entered live or pre-set)
    recipientName: "Sweetha",
    birthdayDate: "September 20",

    // Screen 1: Welcome
    welcomeTitle: "A Little Surprise",
    welcomeSubtitle: "For someone very special, {NAME}...",
    welcomeButton: "Let's Begin →",

    // Screen 2: Balloons
    balloonTitle: "It's your special day, {NAME} ✨",
    balloonSubtitle: "A sky full of wishes floating just for you.",

    // Screen 3: Cake
    cakeTitle: "A special day deserves something sweet...",
    cakeSubtitle: "Close your eyes and make a wish, {NAME}.",
    cakeButtonText: "Make a Wish",
    cakeWishCompletedText: "Wish Made! ✨",

    // Screen 4: Flowers
    flowerTitle: "A little piece of the sky for your special day ☁️",
    flowerSubtitle: "Blooms as pure, calm and radiant as you are.",

    // Screen 5: Envelope
    envelopeTitle: "I wrote something for you...",
    envelopeSubtitle: "A few words straight from the heart.",
    envelopeButtonText: "Open the Letter 💌",

    // Screen 6: Personal Birthday Letter
    letterHeading: "Happy Birthday, {NAME} 💙",
    letterGreeting: "Dear {NAME},",
    letterParagraphs: [
      "Today is your special day, and I wanted to create something quiet, sincere and sweet just to remind you how deeply celebrated and appreciated you are.",
      "Your presence brings a calm, gentle brightness to everyone around you — just like a clear, cloudless morning sky. Your kindness, your laugh, and the warmth you carry make every ordinary day feel a little more meaningful.",
      "May this new chapter of your life be filled with dreams that gently take flight, peaceful moments of happiness, good health, and countless memories that make you smile from within.",
      "Never forget how truly wonderful and rare you are. May the year ahead be as bright and beautiful as your heart. Happy Birthday! 💙"
    ],
    letterClosing: "With love & warmest wishes,",
    letterSignature: "Always ✨",

    // Screen 7: Memories
    memoryTitle: "Memories with {NAME} 📸",

    // Screen 8: Celebration & Sharing
    celebrationTitle: "HAPPY BIRTHDAY {NAME} 🎉",
    celebrationSubtitle: "Hope your day is filled with happiness, smiles and beautiful memories. 💙",
    shareTitle: "Happy Birthday Surprise 💙",
    shareText: "A little birthday surprise for someone very special! ✨",
    shareUrl: window.location.href,

    // Audio file path
    musicFilePath: "assets/music.webm"
  };

  /* --------------------------------------------------------------------------
   * 2. DOM Elements Cache
   * -------------------------------------------------------------------------- */
  const screens = document.querySelectorAll('.screen');
  const progressDots = document.querySelectorAll('.progress-track .dot');
  const cakeContainer = document.getElementById('cake-container');
  const cakeArt = document.getElementById('cake-art');
  const btnWish = document.getElementById('btn-screen-3');
  const wishBtnText = document.getElementById('wish-btn-text');
  const interactiveEnvelope = document.getElementById('interactive-envelope');
  const btnEnvelope = document.getElementById('btn-screen-5');
  const btnReplay = document.getElementById('btn-replay');
  const btnShare = document.getElementById('btn-share');
  const toastEl = document.getElementById('toast');
  const toastText = document.getElementById('toast-text');
  const bgAudio = document.getElementById('bg-music');
  const musicToggleBtn = document.getElementById('music-toggle');
  const celebrationCanvas = document.getElementById('celebration-canvas');

  // Start on Screen 0 (Name & DOB Entry)
  let currentScreen = 0;
  const totalScreens = screens.length;
  let isTransitioning = false;
  let hasMadeWish = false;
  let isEnvelopeOpened = false;

  /* --------------------------------------------------------------------------
   * 3. Apply Configuration to HTML
   * -------------------------------------------------------------------------- */
  function applyConfiguration() {
    const name = BIRTHDAY_CONFIG.recipientName;
    const date = BIRTHDAY_CONFIG.birthdayDate;

    // Replace all recipient name markers across all cards
    document.querySelectorAll('.recipient-name').forEach(el => {
      el.textContent = name;
    });
    document.querySelectorAll('.recipient-name-peek').forEach(el => {
      el.textContent = name;
    });

    const letterTitle = document.getElementById('letter-title');
    if (letterTitle) {
      letterTitle.innerHTML = BIRTHDAY_CONFIG.letterHeading.replace('{NAME}', `<span class="recipient-name">${name}</span>`);
    }

    const letterGreeting = document.getElementById('letter-greeting');
    if (letterGreeting) {
      letterGreeting.innerHTML = BIRTHDAY_CONFIG.letterGreeting.replace('{NAME}', `<span class="recipient-name">${name}</span>`);
    }

    const letterDate = document.getElementById('letter-date');
    if (letterDate && date) {
      letterDate.textContent = date;
    }

    const letterClosing = document.getElementById('letter-closing');
    if (letterClosing) {
      letterClosing.textContent = BIRTHDAY_CONFIG.letterClosing;
    }

    const letterSignature = document.getElementById('letter-signature');
    if (letterSignature) {
      letterSignature.textContent = BIRTHDAY_CONFIG.letterSignature;
    }

    // Dynamic Paragraphs
    const letterBody = document.getElementById('letter-body');
    if (letterBody && BIRTHDAY_CONFIG.letterParagraphs && BIRTHDAY_CONFIG.letterParagraphs.length > 0) {
      letterBody.innerHTML = '';
      BIRTHDAY_CONFIG.letterParagraphs.forEach((pText, idx) => {
        const p = document.createElement('p');
        p.className = `letter-p p-${idx + 1}`;
        p.textContent = pText.replace('{NAME}', name);
        letterBody.appendChild(p);
      });
    }

    // Update Input fields if present
    const inputName = document.getElementById('input-name');
    if (inputName && !inputName.value) inputName.value = name;
    const inputDob = document.getElementById('input-dob');
    if (inputDob && !inputDob.value) inputDob.value = date;
  }

  /* --------------------------------------------------------------------------
   * 4. Navigation & 3D Screen Transition Engine
   * -------------------------------------------------------------------------- */
  function goToScreen(targetIndex) {
    if (targetIndex < 0 || targetIndex >= totalScreens || isTransitioning || targetIndex === currentScreen) {
      return;
    }

    isTransitioning = true;
    const currentScreenEl = document.getElementById(`screen-${currentScreen}`);
    const nextScreenEl = document.getElementById(`screen-${targetIndex}`);

    if (!currentScreenEl || !nextScreenEl) {
      isTransitioning = false;
      return;
    }

    // 3D Fade & Rotate out current screen
    currentScreenEl.classList.add('fade-out');

    setTimeout(() => {
      currentScreenEl.classList.remove('active', 'fade-out');
      currentScreen = targetIndex;

      // Activate target screen with 3D entry
      nextScreenEl.classList.add('active');

      // Update progress dots
      updateProgressDots(targetIndex);

      // Trigger Screen-specific hooks
      onScreenEntered(targetIndex);

      isTransitioning = false;
    }, 350);
  }

  function updateProgressDots(activeIndex) {
    progressDots.forEach(dot => {
      const step = parseInt(dot.getAttribute('data-goto'), 10);
      if (step === activeIndex) {
        dot.classList.add('active');
        dot.setAttribute('aria-current', 'step');
      } else {
        dot.classList.remove('active');
        dot.removeAttribute('aria-current');
      }
    });
  }

  function onScreenEntered(screenIndex) {
    // Screen 6 (Letter): restart paragraph animations
    if (screenIndex === 6) {
      const paragraphs = document.querySelectorAll('.letter-p');
      paragraphs.forEach(p => {
        p.style.opacity = '0';
        p.style.transform = 'translateY(14px)';
      });
      setTimeout(() => {
        paragraphs.forEach(p => {
          p.style.opacity = '';
          p.style.transform = '';
        });
      }, 50);
    }

    // Screen 7 (Memories): initialize photo stack to 0
    if (screenIndex === 7) {
      updateMemoryStack(0);
    }

    // Screen 8 (Final Celebration): Launch celebratory Confetti!
    if (screenIndex === 8) {
      launchCelebrationConfetti();
    }

    // Screen 9 (Best Friend Tribute): Sparkles around photo frame
    if (screenIndex === 9) {
      const bestfriendVisual = document.querySelector('.bestfriend-visual');
      if (bestfriendVisual) {
        spawnSparklesAround(bestfriendVisual);
      }
    }
  }

  /* --------------------------------------------------------------------------
   * 5. Interactive Cake ("Make a Wish")
   * -------------------------------------------------------------------------- */
  function handleMakeWish() {
    if (hasMadeWish) return;
    hasMadeWish = true;

    if (wishBtnText) {
      wishBtnText.textContent = BIRTHDAY_CONFIG.cakeWishCompletedText;
    }
    if (btnWish) btnWish.disabled = true;
    if (cakeContainer) cakeContainer.classList.add('wished');

    spawnSparklesAround(cakeContainer);

    setTimeout(() => {
      goToScreen(4);
    }, 1600);
  }

  function spawnSparklesAround(targetEl) {
    if (!targetEl) return;
    const rect = targetEl.getBoundingClientRect();
    const count = 16;
    for (let i = 0; i < count; i++) {
      const spark = document.createElement('span');
      spark.className = 'sparkle-particle';
      spark.textContent = Math.random() > 0.5 ? '✨' : '✦';
      spark.style.position = 'fixed';
      spark.style.left = `${rect.left + rect.width / 2}px`;
      spark.style.top = `${rect.top + rect.height / 3}px`;
      spark.style.color = Math.random() > 0.4 ? '#87CEEB' : '#BFE8F7';
      spark.style.fontSize = `${Math.floor(Math.random() * 12 + 14)}px`;
      spark.style.pointerEvents = 'none';
      spark.style.zIndex = '100';
      spark.style.transition = 'all 1.2s cubic-bezier(0.2, 0.9, 0.3, 1)';
      document.body.appendChild(spark);

      const angle = (i / count) * 2 * Math.PI;
      const distance = Math.random() * 80 + 50;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance - 20;

      requestAnimationFrame(() => {
        spark.style.transform = `translate(${tx}px, ${ty}px) scale(0)`;
        spark.style.opacity = '0';
      });

      setTimeout(() => {
        if (spark.parentNode) spark.parentNode.removeChild(spark);
      }, 1300);
    }
  }

  /* --------------------------------------------------------------------------
   * 6. Interactive Envelope ("Open the Letter")
   * -------------------------------------------------------------------------- */
  function handleOpenEnvelope() {
    if (isEnvelopeOpened) return;
    isEnvelopeOpened = true;

    if (interactiveEnvelope) interactiveEnvelope.classList.add('opened');
    if (btnEnvelope) btnEnvelope.disabled = true;

    spawnSparklesAround(interactiveEnvelope);

    setTimeout(() => {
      goToScreen(6);
    }, 1300);
  }

  /* --------------------------------------------------------------------------
   * 7. Interactive 3D Polaroid Memory Photo Stack (Screen 7)
   * -------------------------------------------------------------------------- */
  let currentPhotoIndex = 0;
  let memoryItems = [];
  let memoryDots = [];

  function updateMemoryStack(index) {
    if (!memoryItems || memoryItems.length === 0) {
      memoryItems = document.querySelectorAll('.memory-item');
      memoryDots = document.querySelectorAll('.m-dot');
    }
    if (memoryItems.length === 0) return;

    const total = memoryItems.length;
    currentPhotoIndex = ((index % total) + total) % total;

    memoryItems.forEach((item, idx) => {
      item.classList.remove('active', 'prev-card', 'next-card');
      if (idx === currentPhotoIndex) {
        item.classList.add('active');
      } else if (idx === ((currentPhotoIndex - 1 + total) % total)) {
        item.classList.add('prev-card');
      } else if (idx === ((currentPhotoIndex + 1) % total)) {
        item.classList.add('next-card');
      }
    });

    memoryDots.forEach((dot, idx) => {
      if (idx === currentPhotoIndex) dot.classList.add('active');
      else dot.classList.remove('active');
    });
  }

  function initMemoryStack() {
    memoryItems = document.querySelectorAll('.memory-item');
    memoryDots = document.querySelectorAll('.m-dot');

    updateMemoryStack(0);

    const prevBtn = document.getElementById('memory-prev');
    const nextBtn = document.getElementById('memory-next');
    const stackContainer = document.getElementById('memory-stack');

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        updateMemoryStack(currentPhotoIndex + 1);
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        updateMemoryStack(currentPhotoIndex - 1);
      });
    }

    if (stackContainer) {
      stackContainer.addEventListener('click', () => {
        updateMemoryStack(currentPhotoIndex + 1);
      });
    }

    memoryDots.forEach(dot => {
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        const mIdx = parseInt(dot.getAttribute('data-mindex'), 10);
        if (!isNaN(mIdx)) updateMemoryStack(mIdx);
      });
    });
  }

  /* --------------------------------------------------------------------------
   * 8. Replay Experience Engine
   * -------------------------------------------------------------------------- */
  function handleReplay() {
    hasMadeWish = false;
    isEnvelopeOpened = false;

    if (wishBtnText) wishBtnText.textContent = BIRTHDAY_CONFIG.cakeButtonText;
    if (btnWish) btnWish.disabled = false;
    if (cakeContainer) cakeContainer.classList.remove('wished');
    if (interactiveEnvelope) interactiveEnvelope.classList.remove('opened');
    if (btnEnvelope) btnEnvelope.disabled = false;

    stopConfetti();

    // Smoothly return to Screen 1
    goToScreen(1);
    showToast(`Reliving the surprise for ${BIRTHDAY_CONFIG.recipientName}! 💙`);
  }

  /* --------------------------------------------------------------------------
   * 9. Web Share API & Graceful Fallback
   * -------------------------------------------------------------------------- */
  async function handleShare() {
    const shareData = {
      title: BIRTHDAY_CONFIG.shareTitle,
      text: `${BIRTHDAY_CONFIG.shareText} Happy Birthday, ${BIRTHDAY_CONFIG.recipientName}! 💙`,
      url: window.location.href
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        showToast("Thanks for sharing the joy! ✨");
        return;
      } catch (err) {
        if (err.name !== 'AbortError') {
          copyUrlToClipboard();
        }
      }
    } else {
      copyUrlToClipboard();
    }
  }

  function copyUrlToClipboard() {
    const url = window.location.href;
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(url)
        .then(() => {
          showToast("Link copied to clipboard! 💙");
        })
        .catch(() => {
          legacyCopyFallback(url);
        });
    } else {
      legacyCopyFallback(url);
    }
  }

  function legacyCopyFallback(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    textArea.style.top = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      showToast("Link copied to clipboard! 💙");
    } catch (e) {
      showToast("Share this link with your friends! 💙");
    }
    document.body.removeChild(textArea);
  }

  function showToast(message) {
    if (!toastEl) return;
    if (toastText) toastText.textContent = message;
    toastEl.classList.add('show');
    clearTimeout(toastEl._timer);
    toastEl._timer = setTimeout(() => {
      toastEl.classList.remove('show');
    }, 2800);
  }

  /* --------------------------------------------------------------------------
   * 10. Background Audio Manager
   * -------------------------------------------------------------------------- */
  function playMusic() {
    if (!bgAudio) return;
    bgAudio.play()
      .then(() => {
        if (musicToggleBtn) {
          musicToggleBtn.style.display = 'inline-flex';
          musicToggleBtn.classList.add('playing');
          musicToggleBtn.setAttribute('aria-label', 'Pause background music');
        }
      })
      .catch(() => {
        // Autoplay policy or error, keep quiet
      });
  }

  function initAudioManager() {
    if (!bgAudio || !musicToggleBtn) return;

    // If audio is loaded, show toggle button
    bgAudio.addEventListener('canplay', () => {
      musicToggleBtn.style.display = 'inline-flex';
    }, { once: true });

    musicToggleBtn.addEventListener('click', () => {
      if (bgAudio.paused) {
        playMusic();
      } else {
        bgAudio.pause();
        musicToggleBtn.classList.remove('playing');
        musicToggleBtn.setAttribute('aria-label', 'Play background music');
      }
    });
  }

  /* --------------------------------------------------------------------------
   * 11. High-Performance Canvas Confetti
   * -------------------------------------------------------------------------- */
  let confettiAnimFrame = null;
  let confettiParticles = [];
  const confettiColors = ['#87CEEB', '#BFE8F7', '#E0F5FD', '#FFFFFF', '#A2DCF2', '#D3EEF8'];

  function resizeCanvas() {
    if (!celebrationCanvas) return;
    celebrationCanvas.width = window.innerWidth;
    celebrationCanvas.height = window.innerHeight;
  }

  function launchCelebrationConfetti() {
    if (!celebrationCanvas) return;
    resizeCanvas();
    const ctx = celebrationCanvas.getContext('2d');
    if (!ctx) return;

    confettiParticles = [];
    const particleCount = window.innerWidth < 480 ? 65 : 110;

    for (let i = 0; i < particleCount; i++) {
      confettiParticles.push({
        x: Math.random() * celebrationCanvas.width,
        y: Math.random() * -celebrationCanvas.height * 0.8,
        size: Math.random() * 8 + 6,
        color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
        tilt: Math.random() * 10 - 5,
        tiltAngle: Math.random() * Math.PI,
        tiltAngleInc: Math.random() * 0.07 + 0.03,
        speedY: Math.random() * 2.2 + 1.6,
        speedX: Math.random() * 1.5 - 0.75,
        opacity: Math.random() * 0.5 + 0.5,
        shape: Math.random() > 0.4 ? 'rect' : 'circle'
      });
    }

    let startTime = Date.now();
    const duration = 6500;

    function renderConfetti() {
      ctx.clearRect(0, 0, celebrationCanvas.width, celebrationCanvas.height);
      const elapsed = Date.now() - startTime;

      confettiParticles.forEach(p => {
        p.tiltAngle += p.tiltAngleInc;
        p.y += p.speedY;
        p.x += Math.sin(p.tiltAngle) * 1.2 + p.speedX;
        p.tilt = Math.sin(p.tiltAngle) * 12;

        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;

        if (p.shape === 'rect') {
          ctx.rect(p.x + p.tilt, p.y, p.size, p.size * 0.6);
        } else {
          ctx.arc(p.x + p.tilt, p.y, p.size * 0.4, 0, Math.PI * 2);
        }
        ctx.fill();

        if (p.y > celebrationCanvas.height && elapsed < duration) {
          p.y = -10;
          p.x = Math.random() * celebrationCanvas.width;
        }
      });

      if (elapsed < duration + 3000) {
        confettiAnimFrame = requestAnimationFrame(renderConfetti);
      } else {
        ctx.clearRect(0, 0, celebrationCanvas.width, celebrationCanvas.height);
        stopConfetti();
      }
    }

    if (confettiAnimFrame) cancelAnimationFrame(confettiAnimFrame);
    confettiAnimFrame = requestAnimationFrame(renderConfetti);
  }

  function stopConfetti() {
    if (confettiAnimFrame) {
      cancelAnimationFrame(confettiAnimFrame);
      confettiAnimFrame = null;
    }
    if (celebrationCanvas) {
      const ctx = celebrationCanvas.getContext('2d');
      if (ctx) ctx.clearRect(0, 0, celebrationCanvas.width, celebrationCanvas.height);
    }
  }

  /* --------------------------------------------------------------------------
   * 12. Interactive Star & Heart Emoji Spray on Button Click
   * -------------------------------------------------------------------------- */
  const SPRAY_EMOJIS = ['💙', '🤍', '🩵', '✨', '⭐', '🌟', '✦', '💖'];

  function sprayStarsAndHearts(originX, originY) {
    const particleCount = window.innerWidth < 480 ? 16 : 22;
    const particles = [];
    const container = document.body;

    for (let i = 0; i < particleCount; i++) {
      const emojiEl = document.createElement('span');
      emojiEl.className = 'emoji-spray-particle';
      emojiEl.textContent = SPRAY_EMOJIS[Math.floor(Math.random() * SPRAY_EMOJIS.length)];
      
      const size = Math.random() * 0.7 + 1.1;
      emojiEl.style.fontSize = `${size}rem`;
      emojiEl.style.left = '0px';
      emojiEl.style.top = '0px';

      container.appendChild(emojiEl);

      const angle = (Math.random() * Math.PI * 1.4) + (Math.PI * 0.8);
      const speed = Math.random() * 11 + 5;
      const vx = Math.cos(angle) * speed * (Math.random() > 0.5 ? 1 : -1);
      const vy = -Math.abs(Math.sin(angle) * speed) - (Math.random() * 4 + 2);

      particles.push({
        el: emojiEl,
        x: originX,
        y: originY,
        vx: vx,
        vy: vy,
        gravity: 0.38,
        drag: 0.965,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 18,
        scale: 1,
        opacity: 1,
        life: 0,
        maxLife: Math.floor(Math.random() * 20 + 45)
      });
    }

    function updateSpray() {
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.vx *= p.drag;
        p.rotation += p.rotSpeed;

        const progress = p.life / p.maxLife;
        p.opacity = Math.max(0, 1 - Math.pow(progress, 1.8));
        p.scale = Math.max(0.2, (1 - progress * 0.4) * (p.life < 8 ? p.life / 8 : 1));

        p.el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) rotate(${p.rotation}deg) scale(${p.scale})`;
        p.el.style.opacity = p.opacity;

        if (p.life >= p.maxLife) {
          if (p.el.parentNode) p.el.parentNode.removeChild(p.el);
          particles.splice(i, 1);
        }
      }

      if (particles.length > 0) {
        requestAnimationFrame(updateSpray);
      }
    }

    requestAnimationFrame(updateSpray);
  }

  /* --------------------------------------------------------------------------
   * 13. Interactive 3D Card Tilt & Specular Lighting
   * -------------------------------------------------------------------------- */
  function init3DCardTilt() {
    const tiltCards = document.querySelectorAll('.screen-card, .letter-card');

    tiltCards.forEach(card => {
      if (!card.querySelector('.card-glare')) {
        const glare = document.createElement('div');
        glare.className = 'card-glare';
        card.appendChild(glare);
      }

      function handleMove(e) {
        const rect = card.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        const x = clientX - rect.left;
        const y = clientY - rect.top;

        const normX = (x / rect.width) * 2 - 1;
        const normY = (y / rect.height) * 2 - 1;

        const maxTilt = 9;
        const tiltX = -normY * maxTilt;
        const tiltY = normX * maxTilt;

        card.style.transform = `perspective(1000px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) translateZ(8px)`;

        const glare = card.querySelector('.card-glare');
        if (glare) {
          glare.style.opacity = '0.7';
          glare.style.background = `radial-gradient(circle at ${(normX + 1) * 50}% ${(normY + 1) * 50}%, rgba(255, 255, 255, 0.65) 0%, transparent 65%)`;
        }
      }

      function handleLeave() {
        card.style.transform = '';
        const glare = card.querySelector('.card-glare');
        if (glare) glare.style.opacity = '0';
      }

      card.addEventListener('mousemove', handleMove);
      card.addEventListener('mouseleave', handleLeave);
      card.addEventListener('touchmove', handleMove, { passive: true });
      card.addEventListener('touchend', handleLeave);
    });
  }

  /* --------------------------------------------------------------------------
   * 14. Event Listeners & Initialization
   * -------------------------------------------------------------------------- */
  function initEventListeners() {
    // Universal Button Click Star & Heart Emoji Spray!
    document.addEventListener('pointerdown', (e) => {
      const targetBtn = e.target.closest('button, .btn, .interactive-envelope, .cake-art, .dot, .stack-nav-btn, .m-dot, .card-photo-accent');
      if (targetBtn) {
        const rect = targetBtn.getBoundingClientRect();
        const clickX = e.clientX && e.clientX > 0 ? e.clientX : rect.left + rect.width / 2;
        const clickY = e.clientY && e.clientY > 0 ? e.clientY : rect.top + rect.height / 2;
        sprayStarsAndHearts(clickX, clickY);
      }
    });

    // Screen 0: Name & DOB Entry Gate -> Screen 1
    const btnScreen0 = document.getElementById('btn-screen-0');
    if (btnScreen0) {
      btnScreen0.addEventListener('click', () => {
        const inputName = document.getElementById('input-name');
        const inputDob = document.getElementById('input-dob');
        const nameVal = (inputName && inputName.value.trim()) || "Sweetha";
        const dobVal = (inputDob && inputDob.value.trim()) || "September 20";

        BIRTHDAY_CONFIG.recipientName = nameVal;
        BIRTHDAY_CONFIG.birthdayDate = dobVal;

        try {
          localStorage.setItem('birthday_name', nameVal);
          localStorage.setItem('birthday_dob', dobVal);
        } catch (e) {}

        applyConfiguration();
        playMusic();
        goToScreen(1);
      });
    }

    // Screen 1: Welcome -> Screen 2
    const btnScreen1 = document.getElementById('btn-screen-1');
    if (btnScreen1) {
      btnScreen1.addEventListener('click', () => goToScreen(2));
    }

    // Screen 2: Balloons -> Screen 3
    const btnScreen2 = document.getElementById('btn-screen-2');
    if (btnScreen2) {
      btnScreen2.addEventListener('click', () => goToScreen(3));
    }

    // Screen 3: Cake -> Make a Wish
    if (btnWish) {
      btnWish.addEventListener('click', handleMakeWish);
    }
    if (cakeArt) {
      cakeArt.addEventListener('click', handleMakeWish);
    }

    // Screen 4: Flowers -> Screen 5
    const btnScreen4 = document.getElementById('btn-screen-4');
    if (btnScreen4) {
      btnScreen4.addEventListener('click', () => goToScreen(5));
    }

    // Screen 5: Envelope -> Screen 6
    if (btnEnvelope) {
      btnEnvelope.addEventListener('click', handleOpenEnvelope);
    }
    if (interactiveEnvelope) {
      interactiveEnvelope.addEventListener('click', handleOpenEnvelope);
    }

    // Screen 6: Letter -> Screen 7 (Memories)
    const btnScreen6 = document.getElementById('btn-screen-6');
    if (btnScreen6) {
      btnScreen6.addEventListener('click', () => goToScreen(7));
    }

    // Screen 7: Memories -> Screen 8 (Final Celebration)
    const btnScreen7 = document.getElementById('btn-screen-7');
    if (btnScreen7) {
      btnScreen7.addEventListener('click', () => goToScreen(8));
    }

    // Screen 8: Celebration -> Screen 9 (Best Friend Climax)
    const btnScreen8 = document.getElementById('btn-screen-8');
    if (btnScreen8) {
      btnScreen8.addEventListener('click', () => goToScreen(9));
    }

    // Screen 9: Replay & Share
    if (btnReplay) {
      btnReplay.addEventListener('click', handleReplay);
    }
    if (btnShare) {
      btnShare.addEventListener('click', handleShare);
    }

    // Progress Dots Navigation
    progressDots.forEach(dot => {
      dot.addEventListener('click', () => {
        const targetStep = parseInt(dot.getAttribute('data-goto'), 10);
        if (!isNaN(targetStep)) {
          goToScreen(targetStep);
        }
      });
    });

    // Window Resize Handling
    window.addEventListener('resize', () => {
      resizeCanvas();
    });

    // Keyboard Arrow Navigation
    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        if (currentScreen < totalScreens - 1) goToScreen(currentScreen + 1);
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        if (currentScreen > 0) goToScreen(currentScreen - 1);
      }
    });
  }

  /* --------------------------------------------------------------------------
   * 15. Bootstrapping
   * -------------------------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', () => {
    // Restore saved Name & DOB if available
    try {
      const savedName = localStorage.getItem('birthday_name');
      const savedDob = localStorage.getItem('birthday_dob');
      if (savedName) BIRTHDAY_CONFIG.recipientName = savedName;
      if (savedDob) BIRTHDAY_CONFIG.birthdayDate = savedDob;
    } catch (e) {}

    applyConfiguration();
    initEventListeners();
    init3DCardTilt();
    initMemoryStack();
    initAudioManager();
    window.addEventListener('resize', resizeCanvas);
  });

  // Expose configuration globally for DevTools
  window.BIRTHDAY_CONFIG = BIRTHDAY_CONFIG;
  window.sprayStarsAndHearts = sprayStarsAndHearts;

})();
