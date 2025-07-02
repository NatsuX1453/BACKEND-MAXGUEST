// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
const currentTheme = localStorage.getItem('theme');

// Check for saved theme or prefered scheme
if (currentTheme) {
	document.documentElement.setAttribute('data-theme', currentTheme);
	if (currentTheme === 'dark') {
		themeToggle.querySelector('.fa-moon').style.opacity = '0';
		themeToggle.querySelector('.fa-sun').style.opacity = '1';
	}
} else if (prefersDarkScheme.matches) {
	document.documentElement.setAttribute('data-theme', 'dark');
	localStorage.setItem('theme', 'dark');
	themeToggle.querySelector('.fa-moon').style.opacity = '0';
	themeToggle.querySelector('.fa-sun').style.opacity = '1';
}

// Toggle theme on button click
themeToggle.addEventListener('click', () => {
	let theme;
	if (document.documentElement.getAttribute('data-theme') === 'dark') {
		document.documentElement.setAttribute('data-theme', 'light');
		theme = 'light';
		themeToggle.querySelector('.fa-moon').style.opacity = '1';
		themeToggle.querySelector('.fa-sun').style.opacity = '0';
	} else {
		document.documentElement.setAttribute('data-theme', 'dark');
		theme = 'dark';
		themeToggle.querySelector('.fa-moon').style.opacity = '0';
		themeToggle.querySelector('.fa-sun').style.opacity = '1';
	}
	localStorage.setItem('theme', theme);
});

// Smooth scrolling para los enlaces del navbar
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
	anchor.addEventListener('click', function (e) {
		e.preventDefault();
		document.querySelector(this.getAttribute('href')).scrollIntoView({
			behavior: 'smooth',
		});
	});
});

// Formulario CTA (simulación)
const ctaForm = document.querySelector('.cta-form');
if (ctaForm) {
	ctaForm.addEventListener('submit', (e) => {
		e.preventDefault();
		const email = ctaForm.querySelector('input').value;
		alert(`¡Gracias! Te contactaremos pronto a ${email} para acceso a la beta.`);
		ctaForm.reset();
	});
}

function updateLogos(theme) {
	const omegaMain = document.getElementById('omega-main');
	const omegaFooter = document.getElementById('omega-footer');
	if (theme === 'dark') {
		if (omegaMain) omegaMain.src = 'img/omega-white.png';
		if (omegaFooter) omegaFooter.src = 'img/omega-white.png';
	} else {
		if (omegaMain) omegaMain.src = 'img/omega-black.png';
		if (omegaFooter) omegaFooter.src = 'img/omega-black.png';
	}
}

// Al cargar la página
if (currentTheme) {
	updateLogos(currentTheme);
} else if (prefersDarkScheme.matches) {
	updateLogos('light');
}

// Al hacer toggle
themeToggle.addEventListener('click', () => {
	let theme;
	if (document.documentElement.getAttribute('data-theme') === 'dark') {
		updateLogos('dark');
	} else {
		updateLogos('light');
	}
});

let timer;
let timeLeft = 25 * 60;
let running = false;
const totalTime = 25 * 60;

const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const timerStatus = document.getElementById('timer-status');

const circle = document.querySelector('#progress-ring circle');
const radius = circle.r.baseVal.value;
const circumference = 2 * Math.PI * radius;
circle.style.strokeDasharray = `${circumference}`;
circle.style.strokeDashoffset = `${circumference}`;

function setProgress(percent) {
	const offset = circumference - percent * circumference;
	circle.style.strokeDashoffset = offset;
}

function updateDisplay() {
	const min = String(Math.floor(timeLeft / 60)).padStart(2, '0');
	const sec = String(timeLeft % 60).padStart(2, '0');
	timerDisplay.textContent = `${min}:${sec}`;
	setProgress((totalTime - timeLeft) / totalTime);
}

function startTimer() {
	if (running) return;
	running = true;
	timerStatus.textContent = '¡En marcha!';
	timer = setInterval(() => {
		if (timeLeft > 0) {
			timeLeft--;
			updateDisplay();
		} else {
			clearInterval(timer);
			running = false;
			timerStatus.textContent = '¡Tiempo terminado! Toma un descanso.';
			setProgress(1);
			alert('¡Terminó el tiempo! Toma un descanso.');
		}
	}, 1000);
}

function pauseTimer() {
	if (!running) return;
	running = false;
	clearInterval(timer);
	timerStatus.textContent = 'En pausa';
}

function resetTimer() {
	running = false;
	clearInterval(timer);
	timeLeft = totalTime;
	updateDisplay();
	timerStatus.textContent = 'Listo para comenzar';
}

if (startBtn && pauseBtn && resetBtn) {
	startBtn.addEventListener('click', startTimer);
	pauseBtn.addEventListener('click', pauseTimer);
	resetBtn.addEventListener('click', resetTimer);
	updateDisplay();
}
