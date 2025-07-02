const slides = document.querySelectorAll('.tutorial-slide');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
let currentSlide = 0;

function showSlide(index) {
	slides.forEach((slide, i) => {
		slide.classList.toggle('active', i === index);
	});
	prevBtn.style.display = index === 0 ? 'none' : 'inline-block';
	nextBtn.textContent = index === slides.length - 1 ? 'Finalizar' : 'Siguiente';
}

nextBtn.addEventListener('click', () => {
	if (currentSlide < slides.length - 1) {
		currentSlide++;
		showSlide(currentSlide);
	} else {
		window.location.href = 'index.html';
	}
});

prevBtn.addEventListener('click', () => {
	if (currentSlide > 0) {
		currentSlide--;
		showSlide(currentSlide);
	}
});

showSlide(currentSlide);
