document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initMobileDrawer();
    initCanvasHero();
    initFAQAccordions();
    initContactForm();
});

/* ==========================================================================
   1. NAVIGATION & ROUTING
   ========================================================================== */
function initNavigation() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    
    // Select all nav links across desktop and mobile
    const links = document.querySelectorAll('nav a, #mobile-drawer a');
    links.forEach(link => {
        // Skip branding logo links so they are never active-underlined
        if (link.classList.contains('mr-auto') || link.textContent.trim().toLowerCase().includes('avorawebstudio')) {
            return;
        }
        const href = link.getAttribute('href');
        // Match path exactly, or handle active root hash redirects
        if (href === currentPath || (currentPath === 'index.html' && href === '#')) {
            link.classList.add('nav-link-active');
            link.classList.remove('text-on-surface-variant', 'text-secondary', 'dark:text-surface-variant');
        } else {
            link.classList.remove('nav-link-active');
        }
    });

    // Shadow scroll effect on header
    const mainNav = document.getElementById('main-nav') || document.querySelector('nav');
    if (mainNav) {
        let scrollTicking = false;
        window.addEventListener('scroll', () => {
            if (!scrollTicking) {
                requestAnimationFrame(() => {
                    if (window.scrollY > 20) {
                        mainNav.classList.add('nav-scroll-shadow');
                    } else {
                        mainNav.classList.remove('nav-scroll-shadow');
                    }
                    scrollTicking = false;
                });
                scrollTicking = true;
            }
        });
    }
}

/* ==========================================================================
   2. MOBILE DRAWER TRIGGER
   ========================================================================== */
function initMobileDrawer() {
    const triggers = document.querySelectorAll('.mobile-menu-trigger');
    const closeBtn = document.getElementById('close-drawer');
    const drawer = document.getElementById('mobile-drawer');

    if (drawer) {
        triggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                drawer.classList.remove('translate-x-full');
                document.body.style.overflow = 'hidden'; // Lock scrolling
            });
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                drawer.classList.add('translate-x-full');
                document.body.style.overflow = ''; // Unlock scrolling
            });
        }

        // Close drawer if clicking on links
        const drawerLinks = drawer.querySelectorAll('a');
        drawerLinks.forEach(link => {
            link.addEventListener('click', () => {
                drawer.classList.add('translate-x-full');
                document.body.style.overflow = '';
            });
        });
    }
}

/* ==========================================================================
   3. INTERACTIVE CANVAS HERO (Particles Web Network)
   ========================================================================== */
function initCanvasHero() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;

    // Pause rendering when hero section is not visible
    let isCanvasVisible = true;
    const heroSection = canvas.closest('section');
    if (heroSection && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            isCanvasVisible = entries[0].isIntersecting;
        }, { threshold: 0 });
        observer.observe(heroSection);
    }

    const gl = canvas.getContext('webgl2', { alpha: true });
    if (!gl) {
        console.error('WebGL2 is not supported by your browser.');
        return;
    }

    // Enable blending for transparency
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    // Transparent background
    gl.clearColor(0, 0, 0, 0);

    const parent = canvas.parentElement;
    canvas.width = parent.offsetWidth;
    canvas.height = parent.offsetHeight;

    const vsSource = `#version 300 es
precision mediump float;
in vec2 aPosition;
void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`;

    const fsSource = buildFragmentShader();

    const program = createShaderProgram(gl, vsSource, fsSource);
    if (!program) {
        console.error('Failed to create shader program.');
        return;
    }

    gl.useProgram(program);

    // Full-screen quad
    const quadVertices = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);

    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);

    const vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, quadVertices, gl.STATIC_DRAW);

    const aPositionLoc = gl.getAttribLocation(program, 'aPosition');
    gl.enableVertexAttribArray(aPositionLoc);
    gl.vertexAttribPointer(aPositionLoc, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const uResolutionLoc = gl.getUniformLocation(program, 'uResolution');
    const uTimeLoc = gl.getUniformLocation(program, 'uTime');

    let startTime = performance.now();

    function render() {
        requestAnimationFrame(render);

        // Skip rendering when hero is not visible (saves GPU)
        if (!isCanvasVisible) return;

        const currentTime = performance.now();
        const elapsed = (currentTime - startTime) * 0.001; // seconds

        if (canvas.width !== parent.offsetWidth || canvas.height !== parent.offsetHeight) {
            canvas.width = parent.offsetWidth;
            canvas.height = parent.offsetHeight;
        }

        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.useProgram(program);
        gl.bindVertexArray(vao);

        gl.uniform2f(uResolutionLoc, canvas.width, canvas.height);
        gl.uniform1f(uTimeLoc, elapsed);

        gl.drawArrays(gl.TRIANGLES, 0, 6);
    }

    render();

    // Resize is handled inside the render loop — no separate listener needed

    // Dynamic fragment shader builder containing standard parameters and the 20-step palette of blues
    function buildFragmentShader() {
        const ZOOM_FACTOR = 0.3;
        const BASE_WAVE_AMPLITUDE = 0.2;
        const RANDOM_WAVE_FACTOR = 0.15;
        const WAVE_FREQUENCY = 4.0;
        const TIME_FACTOR = 0.25;
        const BASE_SWIRL_STRENGTH = 1.2;
        const SWIRL_TIME_MULT = 5.0;
        const NOISE_SWIRL_FACTOR = 0.2;
        const FBM_OCTAVES = 6;

        const seaColors = [
            [0.08, 0.05, 0.14],
            [0.12, 0.08, 0.22],
            [0.17, 0.12, 0.31],
            [0.23, 0.16, 0.40],
            [0.30, 0.21, 0.50],
            [0.37, 0.27, 0.60],
            [0.44, 0.33, 0.69],
            [0.51, 0.39, 0.77],
            [0.57, 0.45, 0.83],
            [0.62, 0.50, 0.88],
            [0.67, 0.55, 0.91],
            [0.71, 0.59, 0.93],
            [0.75, 0.64, 0.95],
            [0.79, 0.69, 0.97],
            [0.82, 0.73, 0.98],
            [0.85, 0.77, 0.99],
            [0.88, 0.81, 1.0],
            [0.91, 0.85, 1.0],
            [0.94, 0.89, 1.0],
            [0.97, 0.94, 1.0]
        ];

        const fbmOctavesInt = Math.floor(FBM_OCTAVES);
        const colorArraySrc = seaColors.map((c) => `vec3(${c[0].toFixed(4)}, ${c[1].toFixed(4)}, ${c[2].toFixed(4)})`).join(",\n  ");

        return `#version 300 es
precision highp float;
out vec4 outColor;

uniform vec2 uResolution;
uniform float uTime;

#define NUM_COLORS 20

vec3 seaColors[NUM_COLORS] = vec3[](
  ${colorArraySrc}
);

vec3 getSeaColor(int index) {
  for (int i = 0; i < NUM_COLORS; i++) {
    if (i == index) {
      return seaColors[i];
    }
  }
  return seaColors[0];
}

vec3 permute(vec3 x) {
  return mod(((x * 34.0) + 1.0) * x, 289.0);
}

float noise2D(vec2 v) {
  const vec4 C = vec4(
    0.211324865405187,
    0.366025403784439,
    -0.577350269189626,
    0.024390243902439
  );

  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);

  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;

  i = mod(i, 289.0);
  vec3 p = permute(
    permute(i.y + vec3(0.0, i1.y, 1.0)) +
    i.x + vec3(0.0, i1.x, 1.0)
  );

  vec3 m = max(
    0.5 - vec3(
      dot(x0, x0),
      dot(x12.xy, x12.xy),
      dot(x12.zw, x12.zw)
    ),
    0.0
  );
  m = m * m;
  m = m * m;

  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;

  m *= 1.792843 - 0.853734 * (a0 * a0 + h * h);

  vec3 g;
  g.x  = a0.x  * x0.x + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;

  return 130.0 * dot(m, g);
}

float fbm(vec2 st) {
  float value = 0.0;
  float amplitude = 0.5;
  float freq = 1.0;
  for (int i = 0; i < ${fbmOctavesInt}; i++) {
    value += amplitude * noise2D(st * freq);
    freq *= 2.0;
    amplitude *= 0.5;
  }
  return value;
}

void main() {
  vec2 uv = (gl_FragCoord.xy / uResolution.xy) * 2.0 - 1.0;
  uv.x *= uResolution.x / uResolution.y;

  uv *= float(${ZOOM_FACTOR});

  float t = uTime * float(${TIME_FACTOR});

  float waveAmp = float(${BASE_WAVE_AMPLITUDE}) + float(${RANDOM_WAVE_FACTOR})
                  * noise2D(vec2(t, 27.7));

  float waveX = waveAmp * sin(uv.y * float(${WAVE_FREQUENCY}) + t);
  float waveY = waveAmp * sin(uv.x * float(${WAVE_FREQUENCY}) - t);
  uv.x += waveX;
  uv.y += waveY;

  float r = length(uv);
  float angle = atan(uv.y, uv.x);
  float swirlStrength = float(${BASE_SWIRL_STRENGTH})
                        * (1.0 - smoothstep(0.0, 1.0, r));

  angle += swirlStrength * sin(uTime + r * float(${SWIRL_TIME_MULT}));
  uv = vec2(cos(angle), sin(angle)) * r;

  float n = fbm(uv);

  float swirlEffect = float(${NOISE_SWIRL_FACTOR})
                      * sin(t + n * 3.0);
  n += swirlEffect;

  float noiseVal = 0.5 * (n + 1.0);

  float idx = clamp(noiseVal, 0.0, 1.0) * float(NUM_COLORS - 1);
  int iLow = int(floor(idx));
  iLow = max(0, min(iLow, NUM_COLORS - 1));
  int iHigh = max(0, min(iLow + 1, NUM_COLORS - 1));
  float f = fract(idx);

  vec3 colLow = getSeaColor(iLow);
  vec3 colHigh = getSeaColor(iHigh);
  vec3 color = mix(colLow, colHigh, f);

  if (iLow == 0 && iHigh == 0) {
    outColor = vec4(color, 0.0);
  } else {
    outColor = vec4(color, 1.0);
  }
}
`;
    }

    function createShaderProgram(gl, vsSource, fsSource) {
        const vertexShader = gl.createShader(gl.VERTEX_SHADER);
        if (!vertexShader) return null;

        gl.shaderSource(vertexShader, vsSource);
        gl.compileShader(vertexShader);
        if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
            console.error("Vertex shader error:", gl.getShaderInfoLog(vertexShader));
            gl.deleteShader(vertexShader);
            return null;
        }

        const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
        if (!fragmentShader) {
            gl.deleteShader(vertexShader);
            return null;
        }

        gl.shaderSource(fragmentShader, fsSource);
        gl.compileShader(fragmentShader);
        if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
            console.error("Fragment shader error:", gl.getShaderInfoLog(fragmentShader));
            gl.deleteShader(vertexShader);
            gl.deleteShader(fragmentShader);
            return null;
        }

        const program = gl.createProgram();
        if (!program) {
            gl.deleteShader(vertexShader);
            gl.deleteShader(fragmentShader);
            return null;
        }

        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error("Could not link WebGL program:", gl.getProgramInfoLog(program));
            gl.deleteShader(vertexShader);
            gl.deleteShader(fragmentShader);
            gl.deleteProgram(program);
            return null;
        }

        return program;
    }
}

/* ==========================================================================
   4. FAQ ACCORDIONS WITH MAX-HEIGHT DYNAMICS
   ========================================================================== */
function initFAQAccordions() {
    const accordions = document.querySelectorAll('.faq-accordion');
    
    accordions.forEach(acc => {
        const trigger = acc.querySelector('.faq-trigger');
        const panel = acc.querySelector('.faq-panel');

        if (trigger && panel) {
            trigger.addEventListener('click', () => {
                const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
                
                // Toggle state attributes
                trigger.setAttribute('aria-expanded', !isExpanded);
                
                if (!isExpanded) {
                    // Open accordion: Set max-height to its scrollHeight
                    panel.style.maxHeight = panel.scrollHeight + 'px';
                } else {
                    // Close accordion: Reset max-height
                    panel.style.maxHeight = '0px';
                }
            });
        }
    });
}

/* ==========================================================================
   6. CONTACT FORM & PRICING CLICK HANDLER (WEB3FORMS & SCROLLING)
   ========================================================================== */
function showStatusModal(isSuccess, title, message) {
    const modal = document.getElementById('status-modal');
    const card = document.getElementById('modal-card');
    const iconContainer = document.getElementById('modal-icon-container');
    const icon = document.getElementById('modal-icon');
    const titleEl = document.getElementById('modal-title');
    const messageEl = document.getElementById('modal-message');

    if (!modal || !card || !iconContainer || !icon || !titleEl || !messageEl) return;

    // Configure content
    titleEl.textContent = title;
    messageEl.textContent = message;

    // Success vs Error themes
    if (isSuccess) {
        iconContainer.className = 'w-16 h-16 rounded-full flex items-center justify-center mb-6 bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400';
        icon.textContent = 'check_circle';
    } else {
        iconContainer.className = 'w-16 h-16 rounded-full flex items-center justify-center mb-6 bg-rose-50 text-rose-600 dark:bg-rose-950/30 dark:text-rose-400';
        icon.textContent = 'error';
    }

    // Unhide and enable interactions
    modal.classList.remove('hidden', 'pointer-events-none');
    modal.setAttribute('aria-hidden', 'false');

    // Force reflow for CSS transition
    modal.offsetHeight;

    // Apply animation classes
    modal.classList.remove('opacity-0');
    modal.classList.add('opacity-100');
    card.classList.remove('scale-95', 'translate-y-4');
    card.classList.add('scale-100', 'translate-y-0');

    // Focus close button for accessibility
    const closeBtn = document.getElementById('modal-close-btn');
    if (closeBtn) {
        closeBtn.focus();
    }
}

function closeStatusModal() {
    const modal = document.getElementById('status-modal');
    const card = document.getElementById('modal-card');

    if (!modal || !card) return;

    // Reverse transitions
    modal.classList.remove('opacity-100');
    modal.classList.add('opacity-0');
    card.classList.remove('scale-100', 'translate-y-0');
    card.classList.add('scale-95', 'translate-y-4');
    modal.setAttribute('aria-hidden', 'true');

    // Hide after animation finishes
    setTimeout(() => {
        if (modal.classList.contains('opacity-0')) {
            modal.classList.add('hidden', 'pointer-events-none');
        }
    }, 300);
}

function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const pricingButtons = document.querySelectorAll('.pricing-btn');
    const intakeTypeSelect = document.getElementById('intake-type');
    const modal = document.getElementById('status-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');

    // Inject API key from config (obfuscated in config.js)
    const keyField = document.getElementById('w3f-key');
    if (keyField && typeof _siteConfig !== 'undefined') {
        keyField.value = _siteConfig.getFormKey();
    }

    // Modal listeners
    if (modal && modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeStatusModal);
        
        // Close on clicking outside the card
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeStatusModal();
            }
        });

        // Close on pressing Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
                closeStatusModal();
            }
        });
    }

    // Smooth scroll to contact form and pre-populate selection dropdown based on tier clicked
    pricingButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const tier = button.getAttribute('data-tier');
            const targetElement = document.getElementById('lets-talk');

            if (targetElement) {
                const offset = 80; // Breathing room so header isn't cut off by sticky navigation
                const elementRect = targetElement.getBoundingClientRect().top;
                const bodyRect = document.body.getBoundingClientRect().top;
                const elementPosition = elementRect - bodyRect;
                const scrollPosition = elementPosition - offset;

                window.scrollTo({
                    top: scrollPosition,
                    behavior: 'smooth'
                });
            }

            // Pre-select project tier inside intake form selection dropdown
            if (intakeTypeSelect) {
                if (tier === 'personal') {
                    intakeTypeSelect.value = 'landing'; // maps to Landing Page for Personal tier
                } else if (tier === 'business') {
                    intakeTypeSelect.value = 'business'; // maps to Business Website for Business tier
                } else if (tier === 'custom') {
                    intakeTypeSelect.value = 'refresh'; // maps to Website Refresh for Custom tier
                }
            }
        });
    });

    // Form submit logic via AJAX targeting Web3Forms API endpoint
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn ? submitBtn.innerText : 'CONNECT';

            // Show loading state on button and text status
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerText = 'SENDING...';
            }

            if (formStatus) {
                formStatus.classList.remove('hidden');
                formStatus.className = 'font-body-md text-body-md text-secondary transition-all duration-300';
                formStatus.innerText = 'Sending your message...';
            }

            try {
                const formData = new FormData(contactForm);
                const object = Object.fromEntries(formData);
                const json = JSON.stringify(object);

                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: json
                });

                const result = await response.json();

                if (response.ok && result.success) {
                    if (formStatus) {
                        formStatus.classList.add('hidden');
                        formStatus.innerText = '';
                    }
                    contactForm.reset();
                    showStatusModal(true, 'Message Sent Successfully', 'Thank you! Your project details have been received. We will get back to you shortly.');
                } else {
                    throw new Error(result.message || 'Submission failed. Please try again.');
                }
            } catch (error) {
                console.error('Submission Error:', error);
                if (formStatus) {
                    formStatus.classList.add('hidden');
                    formStatus.innerText = '';
                }
                showStatusModal(false, 'Submission Failed', error.message || 'Failed to send message. Please check your connection and try again.');
            } finally {
                // Restore button state
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerText = originalBtnText;
                }
            }
        });
    }
}
