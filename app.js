// Presentation App JavaScript
class PresentationApp {
    constructor() {
        this.currentSlide = 1;
        this.totalSlides = 13;
        this.isFullscreen = false;
        this.charts = {};
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateSlideIndicator();
        this.updateProgressBar();
        this.initCharts();
        
        // Add slide change animations
        this.setupSlideAnimations();
    }

    setupEventListeners() {
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'ArrowRight':
                case 'Space':
                    e.preventDefault();
                    this.nextSlide();
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    this.previousSlide();
                    break;
                case 'Home':
                    e.preventDefault();
                    this.goToSlide(1);
                    break;
                case 'End':
                    e.preventDefault();
                    this.goToSlide(this.totalSlides);
                    break;
                case 'F11':
                    e.preventDefault();
                    this.toggleFullscreen();
                    break;
            }
        });

        // Touch/swipe support for mobile
        let startX = 0;
        let endX = 0;

        document.addEventListener('touchstart', (e) => {
            startX = e.changedTouches[0].screenX;
        });

        document.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].screenX;
            this.handleSwipe(startX, endX);
        });

        // Update navigation button states
        this.updateNavigationButtons();
    }

    handleSwipe(startX, endX) {
        const threshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                this.nextSlide(); // Swipe left - next slide
            } else {
                this.previousSlide(); // Swipe right - previous slide
            }
        }
    }

    nextSlide() {
        if (this.currentSlide < this.totalSlides) {
            this.goToSlide(this.currentSlide + 1);
        }
    }

    previousSlide() {
        if (this.currentSlide > 1) {
            this.goToSlide(this.currentSlide - 1);
        }
    }

    goToSlide(slideNumber) {
        if (slideNumber < 1 || slideNumber > this.totalSlides) return;

        // Remove active class from current slide
        const currentSlideEl = document.getElementById(`slide-${this.currentSlide}`);
        if (currentSlideEl) {
            currentSlideEl.classList.remove('active');
            currentSlideEl.classList.add(slideNumber > this.currentSlide ? 'prev' : 'next');
        }

        // Update current slide
        this.currentSlide = slideNumber;

        // Add active class to new slide
        const newSlideEl = document.getElementById(`slide-${this.currentSlide}`);
        if (newSlideEl) {
            // Remove transition classes
            setTimeout(() => {
                document.querySelectorAll('.slide').forEach(slide => {
                    slide.classList.remove('prev', 'next');
                });
            }, 100);

            newSlideEl.classList.add('active');
        }

        // Update UI elements
        this.updateSlideIndicator();
        this.updateProgressBar();
        this.updateNavigationButtons();

        // Initialize charts for specific slides
        setTimeout(() => {
            this.initChartsForCurrentSlide();
        }, 300);
    }

    updateSlideIndicator() {
        const currentSlideEl = document.getElementById('current-slide');
        const totalSlidesEl = document.getElementById('total-slides');
        
        if (currentSlideEl) currentSlideEl.textContent = this.currentSlide;
        if (totalSlidesEl) totalSlidesEl.textContent = this.totalSlides;
    }

    updateProgressBar() {
        const progressFill = document.getElementById('progress-fill');
        if (progressFill) {
            const progress = (this.currentSlide / this.totalSlides) * 100;
            progressFill.style.width = `${progress}%`;
        }
    }

    updateNavigationButtons() {
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        
        if (prevBtn) {
            prevBtn.disabled = this.currentSlide === 1;
        }
        
        if (nextBtn) {
            nextBtn.disabled = this.currentSlide === this.totalSlides;
        }
    }

    setupSlideAnimations() {
        // Add intersection observer for slide animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.slide').forEach(slide => {
            observer.observe(slide);
        });
    }

    toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.log('Fullscreen not supported:', err);
            });
            this.isFullscreen = true;
        } else {
            document.exitFullscreen();
            this.isFullscreen = false;
        }
    }

    initCharts() {
        // Initialize all charts that might be needed
        setTimeout(() => {
            this.initAudienceChart();
            this.initImpactChart();
            this.initCostChart();
        }, 500);
    }

    initChartsForCurrentSlide() {
        switch(this.currentSlide) {
            case 6:
                this.initAudienceChart();
                break;
            case 9:
                this.initImpactChart();
                break;
            case 10:
                this.initCostChart();
                break;
        }
    }

    initAudienceChart() {
        const canvas = document.getElementById('audienceChart');
        if (!canvas) return;

        // Destroy existing chart if it exists
        if (this.charts.audience) {
            this.charts.audience.destroy();
        }

        const ctx = canvas.getContext('2d');
        
        this.charts.audience = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Households', 'Restaurants', 'Retail'],
                datasets: [{
                    data: [85, 10, 5],
                    backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C'],
                    borderWidth: 3,
                    borderColor: '#fff',
                    hoverOffset: 10
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true,
                            font: {
                                size: 14,
                                family: 'Inter'
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                return `${context.label}: ${context.parsed}%`;
                            }
                        }
                    }
                },
                animation: {
                    animateRotate: true,
                    animateScale: true,
                    duration: 1500,
                    easing: 'easeOutQuart'
                }
            }
        });
    }

    initImpactChart() {
        const canvas = document.getElementById('impactChart');
        if (!canvas) return;

        // Destroy existing chart if it exists
        if (this.charts.impact) {
            this.charts.impact.destroy();
        }

        const ctx = canvas.getContext('2d');
        
        this.charts.impact = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Food Waste\nReduction', 'Carbon Footprint\nReduction', 'Economic\nSavings'],
                datasets: [{
                    label: 'Environmental Impact',
                    data: [35, 2.5, 400],
                    backgroundColor: ['#1FB8CD', '#5D878F', '#FFC185'],
                    borderColor: ['#1FB8CD', '#5D878F', '#FFC185'],
                    borderWidth: 2,
                    borderRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value, index, values) {
                                if (index === 0) return value + '%';
                                if (index === 1) return value + 'T CO₂';
                                if (index === 2) return '$' + value;
                                return value;
                            }
                        },
                        grid: {
                            color: 'rgba(0,0,0,0.1)'
                        }
                    },
                    x: {
                        ticks: {
                            maxRotation: 0,
                            font: {
                                size: 12
                            }
                        },
                        grid: {
                            display: false
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                const value = context.parsed.y;
                                const label = context.label.replace(/\n/g, ' ');
                                if (label.includes('Reduction')) {
                                    if (label.includes('Food')) return `${label}: ${value}% reduction`;
                                    if (label.includes('Carbon')) return `${label}: ${value} tons CO₂ saved`;
                                }
                                if (label.includes('Economic')) return `${label}: $${value} saved annually`;
                                return `${label}: ${value}`;
                            }
                        }
                    }
                },
                animation: {
                    delay: (context) => context.dataIndex * 200,
                    duration: 1000,
                    easing: 'easeOutBounce'
                }
            }
        });
    }

    initCostChart() {
        const canvas = document.getElementById('costChart');
        if (!canvas) return;

        // Destroy existing chart if it exists
        if (this.charts.cost) {
            this.charts.cost.destroy();
        }

        const ctx = canvas.getContext('2d');
        
        this.charts.cost = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['ESP8266 MCU', 'MQ-135 Sensor', 'DHT11 Sensor', 'OLED Display', 'PCB & Assembly', 'Enclosure'],
                datasets: [{
                    data: [8, 12, 3, 8, 7, 5],
                    backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545'],
                    borderWidth: 2,
                    borderColor: '#fff',
                    hoverOffset: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            padding: 15,
                            usePointStyle: true,
                            font: {
                                size: 12,
                                family: 'Inter'
                            },
                            generateLabels: (chart) => {
                                const data = chart.data;
                                return data.labels.map((label, index) => ({
                                    text: `${label}: $${data.datasets[0].data[index]}`,
                                    fillStyle: data.datasets[0].backgroundColor[index],
                                    strokeStyle: data.datasets[0].borderColor,
                                    pointStyle: 'circle',
                                    hidden: false
                                }));
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                const value = context.parsed;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = ((value / total) * 100).toFixed(1);
                                return `${context.label}: $${value} (${percentage}%)`;
                            },
                            afterLabel: (context) => {
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                return `Total Cost: $${total}`;
                            }
                        }
                    }
                },
                animation: {
                    animateRotate: true,
                    duration: 1500,
                    easing: 'easeInOutQuart'
                }
            }
        });
    }

    // Utility method to add dynamic animations to elements
    animateElements(selector, animationType = 'fadeInUp', delay = 100) {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element, index) => {
            element.style.animationDelay = `${index * delay}ms`;
            element.classList.add(animationType);
        });
    }

    // Method to handle slide-specific animations
    handleSlideAnimations(slideNumber) {
        const slide = document.getElementById(`slide-${slideNumber}`);
        if (!slide) return;

        // Remove any existing animation classes
        slide.querySelectorAll('[class*="animate"]').forEach(el => {
            el.className = el.className.replace(/animate-\w+/g, '');
        });

        // Add slide-specific animations
        setTimeout(() => {
            switch(slideNumber) {
                case 2:
                    this.animateElements('.stat-card', 'fadeInUp', 150);
                    break;
                case 3:
                    this.animateElements('.solution-card', 'slideInLeft', 200);
                    this.animateElements('.gap-item', 'slideInRight', 100);
                    break;
                case 4:
                    this.animateElements('.feature-item', 'fadeInUp', 100);
                    this.animateElements('.arch-component', 'zoomIn', 300);
                    break;
                case 5:
                    this.animateElements('.ai-card', 'rotateIn', 200);
                    break;
                case 6:
                    this.animateElements('.use-case-card', 'slideInLeft', 150);
                    break;
                case 7:
                    this.animateElements('.tech-card', 'flipInY', 200);
                    break;
                case 8:
                    this.animateElements('.demo-card', 'bounceIn', 150);
                    break;
                case 11:
                    this.animateElements('.innovation-card', 'fadeInUp', 200);
                    break;
                case 12:
                    this.animateElements('.phase-timeline', 'slideInRight', 300);
                    break;
            }
        }, 300);
    }
}

// Global functions for navigation buttons
function nextSlide() {
    if (window.presentationApp) {
        window.presentationApp.nextSlide();
    }
}

function previousSlide() {
    if (window.presentationApp) {
        window.presentationApp.previousSlide();
    }
}

function toggleFullscreen() {
    if (window.presentationApp) {
        window.presentationApp.toggleFullscreen();
    }
}

// Additional utility functions
function goToSlide(slideNumber) {
    if (window.presentationApp) {
        window.presentationApp.goToSlide(slideNumber);
    }
}

// Enhanced slide navigation with URL hash support
function updateURLHash(slideNumber) {
    history.replaceState(null, null, `#slide-${slideNumber}`);
}

function getSlideFromURL() {
    const hash = window.location.hash;
    if (hash.startsWith('#slide-')) {
        const slideNumber = parseInt(hash.replace('#slide-', ''));
        if (slideNumber >= 1 && slideNumber <= 13) {
            return slideNumber;
        }
    }
    return 1;
}

// Add CSS animations dynamically
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        /* Animation classes */
        .animate-fadeInUp {
            animation: fadeInUp 0.6s ease-out both;
        }
        
        .animate-slideInLeft {
            animation: slideInLeft 0.6s ease-out both;
        }
        
        .animate-slideInRight {
            animation: slideInRight 0.6s ease-out both;
        }
        
        .animate-zoomIn {
            animation: zoomIn 0.6s ease-out both;
        }
        
        .animate-rotateIn {
            animation: rotateIn 0.8s ease-out both;
        }
        
        .animate-flipInY {
            animation: flipInY 0.8s ease-out both;
        }
        
        .animate-bounceIn {
            animation: bounceIn 0.8s ease-out both;
        }

        @keyframes slideInLeft {
            from {
                opacity: 0;
                transform: translateX(-30px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(30px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        @keyframes zoomIn {
            from {
                opacity: 0;
                transform: scale(0.8);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }

        @keyframes rotateIn {
            from {
                opacity: 0;
                transform: rotate(-10deg) scale(0.9);
            }
            to {
                opacity: 1;
                transform: rotate(0) scale(1);
            }
        }

        @keyframes flipInY {
            from {
                opacity: 0;
                transform: rotateY(-90deg);
            }
            to {
                opacity: 1;
                transform: rotateY(0);
            }
        }

        @keyframes bounceIn {
            from, 20%, 40%, 60%, 80%, to {
                animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
            }
            
            0% {
                opacity: 0;
                transform: scale3d(.3, .3, .3);
            }
            
            20% {
                transform: scale3d(1.1, 1.1, 1.1);
            }
            
            40% {
                transform: scale3d(.9, .9, .9);
            }
            
            60% {
                opacity: 1;
                transform: scale3d(1.03, 1.03, 1.03);
            }
            
            80% {
                transform: scale3d(.97, .97, .97);
            }
            
            to {
                opacity: 1;
                transform: scale3d(1, 1, 1);
            }
        }

        /* Responsive chart containers */
        @media (max-width: 768px) {
            .audience-chart-container,
            .impact-chart-container,
            .cost-chart-container {
                height: 250px !important;
            }
        }
        
        /* Loading states for charts */
        .chart-loading {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 200px;
            background: var(--color-surface);
            border-radius: var(--radius-lg);
        }
        
        .chart-loading::after {
            content: 'Loading chart...';
            color: var(--color-text-secondary);
            font-style: italic;
        }
    `;
    document.head.appendChild(style);
}

// Preload next slide content for smooth transitions
function preloadSlideContent(slideNumber) {
    const slide = document.getElementById(`slide-${slideNumber}`);
    if (!slide) return;
    
    // Preload any images in the slide
    const images = slide.querySelectorAll('img');
    images.forEach(img => {
        if (!img.complete) {
            const imagePreloader = new Image();
            imagePreloader.src = img.src;
        }
    });
}

// Enhanced error handling
function handlePresentationError(error, context = '') {
    console.error(`Presentation Error ${context}:`, error);
    
    // You could show a user-friendly error message
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--color-error);
        color: white;
        padding: 15px;
        border-radius: 8px;
        z-index: 9999;
        font-size: 14px;
        max-width: 300px;
    `;
    errorMessage.textContent = 'An error occurred. Please refresh the page.';
    document.body.appendChild(errorMessage);
    
    setTimeout(() => {
        errorMessage.remove();
    }, 5000);
}

// Initialize the presentation app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    try {
        // Add animation styles
        addAnimationStyles();
        
        // Initialize the presentation app
        window.presentationApp = new PresentationApp();
        
        // Handle initial URL hash
        const initialSlide = getSlideFromURL();
        if (initialSlide !== 1) {
            setTimeout(() => {
                window.presentationApp.goToSlide(initialSlide);
            }, 500);
        }
        
        // Add window resize handler for responsive charts
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                Object.values(window.presentationApp.charts).forEach(chart => {
                    if (chart && typeof chart.resize === 'function') {
                        chart.resize();
                    }
                });
            }, 250);
        });
        
        // Add visibility change handler to pause/resume animations
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                // Pause animations if page is not visible
                document.body.style.animationPlayState = 'paused';
            } else {
                // Resume animations when page is visible
                document.body.style.animationPlayState = 'running';
            }
        });
        
        console.log('Presentation app initialized successfully');
        
    } catch (error) {
        handlePresentationError(error, 'initialization');
    }
});

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PresentationApp };
}