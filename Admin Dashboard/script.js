// Admin Dashboard JavaScript

// Global Variables
let salesChart, pieChart;
let currentChartType = 'monthly';

// DOM Elements
const loadingOverlay = document.getElementById('loadingOverlay');
const darkModeToggle = document.getElementById('darkModeToggle');
const sidebar = document.getElementById('sidebar');
const content = document.getElementById('content');
const sidebarToggle = document.getElementById('sidebarToggle');
const navLinks = document.querySelectorAll('.nav-link');

// Initialize Dashboard
document.addEventListener('DOMContentLoaded', function() {
    // Hide loading overlay
    setTimeout(() => {
        loadingOverlay.style.opacity = '0';
        setTimeout(() => {
            loadingOverlay.style.display = 'none';
        }, 500);
    }, 1000);

    // Initialize charts
    initializeCharts();
    
    // Initialize dark mode
    initializeDarkMode();
    
    // Initialize navigation
    initializeNavigation();
    
    // Initialize sidebar toggle
    initializeSidebarToggle();
    
    // Initialize animations
    initializeAnimations();
    
    // Initialize real-time updates
    initializeRealTimeUpdates();
});

// Initialize Charts
function initializeCharts() {
    // Sales Chart
    const salesCtx = document.getElementById('salesChart').getContext('2d');
    salesChart = new Chart(salesCtx, {
        type: 'line',
        data: {
            labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
            datasets: [{
                label: 'المبيعات',
                data: [12000, 19000, 15000, 25000, 22000, 30000],
                borderColor: 'rgba(102, 126, 234, 1)',
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                borderWidth: 3,
                pointRadius: 6,
                pointHoverRadius: 8,
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        }
    });

    // Pie Chart
    const pieCtx = document.getElementById('pieChart').getContext('2d');
    pieChart = new Chart(pieCtx, {
        type: 'doughnut',
        data: {
            labels: ['الإلكترونيات', 'الملابس', 'الكتب', 'الأثاث', 'أخرى'],
            datasets: [{
                data: [35, 25, 20, 15, 5],
                backgroundColor: [
                    'rgba(102, 126, 234, 0.8)',
                    'rgba(118, 75, 162, 0.8)',
                    'rgba(39, 174, 96, 0.8)',
                    'rgba(243, 156, 18, 0.8)',
                    'rgba(231, 76, 60, 0.8)'
                ],
                borderWidth: 0,
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
                        usePointStyle: true
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        }
    });
}

// Update Chart Data
function updateChart(type) {
    currentChartType = type;
    
    let labels, data;
    
    switch(type) {
        case 'monthly':
            labels = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'];
            data = [12000, 19000, 15000, 25000, 22000, 30000];
            break;
        case 'weekly':
            labels = ['الأسبوع 1', 'الأسبوع 2', 'الأسبوع 3', 'الأسبوع 4'];
            data = [5000, 7500, 6000, 8500];
            break;
        case 'daily':
            labels = ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'];
            data = [800, 1200, 900, 1500, 1100, 1300, 1000];
            break;
    }
    
    salesChart.data.labels = labels;
    salesChart.data.datasets[0].data = data;
    salesChart.update('active');
    
    // Update chart buttons
    document.querySelectorAll('.chart-btn').forEach(btn => {
        btn.style.background = 'rgba(102, 126, 234, 0.3)';
    });
    event.target.style.background = 'linear-gradient(45deg, #667eea, #764ba2)';
}

// Initialize Dark Mode
function initializeDarkMode() {
    const isDarkMode = localStorage.getItem('darkMode') === 'enabled';
    
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            localStorage.removeItem('darkMode');
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
        
        // Update charts for dark mode
        updateChartsForDarkMode();
    });
}

// Update Charts for Dark Mode
function updateChartsForDarkMode() {
    const isDark = document.body.classList.contains('dark-mode');
    
    if (isDark) {
        salesChart.options.scales.y.grid.color = 'rgba(255, 255, 255, 0.1)';
        salesChart.options.scales.x.grid.color = 'rgba(255, 255, 255, 0.1)';
    } else {
        salesChart.options.scales.y.grid.color = 'rgba(0, 0, 0, 0.1)';
        salesChart.options.scales.x.grid.color = 'rgba(0, 0, 0, 0.1)';
    }
    
    salesChart.update();
}

// Initialize Sidebar Toggle
function initializeSidebarToggle() {
    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
        content.classList.toggle('expanded');
        
        // Update toggle button icon
        const icon = sidebarToggle.querySelector('i');
        if (sidebar.classList.contains('collapsed')) {
            icon.className = 'fas fa-chevron-right';
        } else {
            icon.className = 'fas fa-bars';
        }
        
        // Save state to localStorage
        localStorage.setItem('sidebarCollapsed', sidebar.classList.contains('collapsed'));
    });
    
    // Restore sidebar state from localStorage
    const isCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
    if (isCollapsed) {
        sidebar.classList.add('collapsed');
        content.classList.add('expanded');
        const icon = sidebarToggle.querySelector('i');
        icon.className = 'fas fa-chevron-right';
    }
}

// Initialize Navigation
function initializeNavigation() {
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            link.classList.add('active');
            
            // Handle navigation
            const section = link.getAttribute('href').substring(1);
            navigateToSection(section);
        });
    });
}

// Navigate to Section
function navigateToSection(section) {
    // Add loading animation
    showLoading();
    
    setTimeout(() => {
        // Simulate section change
        updateContentForSection(section);
        hideLoading();
    }, 500);
}

// Update Content for Section
function updateContentForSection(section) {
    const pageHeader = document.querySelector('.page-header h1');
    const pageSubtitle = document.querySelector('.page-header p');
    
    switch(section) {
        case 'dashboard':
            pageHeader.textContent = 'مرحباً بك في لوحة التحكم';
            pageSubtitle.textContent = 'إحصائيات وتقارير شاملة لنشاطك التجاري';
            break;
        case 'analytics':
            pageHeader.textContent = 'التحليلات المتقدمة';
            pageSubtitle.textContent = 'تحليل عميق للبيانات والأداء';
            break;
        case 'users':
            pageHeader.textContent = 'إدارة المستخدمين';
            pageSubtitle.textContent = 'عرض وإدارة حسابات المستخدمين';
            break;
        case 'orders':
            pageHeader.textContent = 'إدارة الطلبات';
            pageSubtitle.textContent = 'تتبع وإدارة جميع الطلبات';
            break;
        case 'products':
            pageHeader.textContent = 'إدارة المنتجات';
            pageSubtitle.textContent = 'إضافة وتعديل المنتجات';
            break;
        case 'reports':
            pageHeader.textContent = 'التقارير';
            pageSubtitle.textContent = 'تقارير مفصلة ومخصصة';
            break;
        case 'settings':
            pageHeader.textContent = 'الإعدادات';
            pageSubtitle.textContent = 'تخصيص إعدادات النظام';
            break;
    }
}

// Initialize Animations
function initializeAnimations() {
    // Animate statistics cards
    const cards = document.querySelectorAll('.dashboard-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
    
    // Animate numbers
    animateNumbers();
}

// Animate Numbers
function animateNumbers() {
    const numbers = document.querySelectorAll('.stat-number');
    
    numbers.forEach(number => {
        const finalValue = parseInt(number.textContent.replace(/[^\d]/g, ''));
        const duration = 2000;
        const increment = finalValue / (duration / 16);
        let currentValue = 0;
        
        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= finalValue) {
                currentValue = finalValue;
                clearInterval(timer);
            }
            
            // Format number with commas
            const formattedValue = currentValue.toLocaleString();
            number.textContent = number.textContent.replace(/\d[\d,]*/, formattedValue);
        }, 16);
    });
}

// Initialize Real-time Updates
function initializeRealTimeUpdates() {
    // Simulate real-time data updates
    setInterval(() => {
        updateRandomStat();
    }, 10000);
}

// Update Random Stat
function updateRandomStat() {
    const cards = document.querySelectorAll('.dashboard-card');
    const randomCard = cards[Math.floor(Math.random() * cards.length)];
    const statNumber = randomCard.querySelector('.stat-number');
    const currentValue = parseInt(statNumber.textContent.replace(/[^\d]/g, ''));
    const newValue = currentValue + Math.floor(Math.random() * 100);
    
    statNumber.textContent = statNumber.textContent.replace(/\d[\d,]*/, newValue.toLocaleString());
    
    // Add pulse animation
    statNumber.style.animation = 'pulse 0.5s ease';
    setTimeout(() => {
        statNumber.style.animation = '';
    }, 500);
}

// Export Data
function exportData() {
    showNotification('جاري تصدير البيانات...', 'info');
    
    setTimeout(() => {
        showNotification('تم تصدير البيانات بنجاح!', 'success');
    }, 2000);
}

// Refresh Data
function refreshData() {
    showNotification('جاري تحديث البيانات...', 'info');
    
    setTimeout(() => {
        // Simulate data refresh
        updateRandomStat();
        showNotification('تم تحديث البيانات بنجاح!', 'success');
    }, 1500);
}

// Show Loading
function showLoading() {
    loadingOverlay.style.display = 'flex';
    loadingOverlay.style.opacity = '1';
}

// Hide Loading
function hideLoading() {
    loadingOverlay.style.opacity = '0';
    setTimeout(() => {
        loadingOverlay.style.display = 'none';
    }, 500);
}

// Show Notification
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        gap: 10px;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        transform: translateX(400px);
        transition: transform 0.3s ease;
        z-index: 1001;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Hide notification
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    .dashboard-card {
        transition: all 0.3s ease;
    }
    
    .dashboard-card:hover {
        transform: translateY(-10px) scale(1.02);
    }
    
    .nav-link {
        transition: all 0.3s ease;
    }
    
    .nav-link:hover {
        transform: translateX(-5px);
    }
    
    .chart-btn {
        transition: all 0.3s ease;
    }
    
    .chart-btn:hover {
        transform: translateY(-2px);
    }
    
    .action-btn {
        transition: all 0.3s ease;
    }
    
    .action-btn:hover {
        transform: translateY(-2px);
    }
    
    .table tbody tr {
        transition: all 0.3s ease;
    }
    
    .table tbody tr:hover {
        transform: scale(1.01);
    }
`;
document.head.appendChild(style);

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case '1':
            navigateToSection('dashboard');
            break;
        case '2':
            navigateToSection('analytics');
            break;
        case '3':
            navigateToSection('users');
            break;
        case '4':
            navigateToSection('orders');
            break;
        case '5':
            navigateToSection('products');
            break;
        case '6':
            navigateToSection('reports');
            break;
        case '7':
            navigateToSection('settings');
            break;
        case 'd':
        case 'D':
            if (e.ctrlKey) {
                e.preventDefault();
                darkModeToggle.click();
            }
            break;
        case 'r':
        case 'R':
            if (e.ctrlKey) {
                e.preventDefault();
                refreshData();
            }
            break;
    }
});

// Add mobile sidebar toggle
function toggleSidebar() {
    sidebar.classList.toggle('active');
}

// Add touch gestures for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - open sidebar
            if (window.innerWidth <= 768) {
                sidebar.classList.add('active');
            }
        } else {
            // Swipe right - close sidebar
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active');
            }
        }
    }
}

// Performance optimization
let ticking = false;

function updateOnScroll() {
    ticking = false;
}

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateOnScroll);
        ticking = true;
    }
}

window.addEventListener('scroll', requestTick);

// Add accessibility features
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// Add focus indicators for keyboard navigation
const focusableElements = document.querySelectorAll('button, a, input, textarea, select');

focusableElements.forEach(element => {
    element.addEventListener('focus', () => {
        element.style.outline = '2px solid #667eea';
        element.style.outlineOffset = '2px';
    });
    
    element.addEventListener('blur', () => {
        element.style.outline = '';
        element.style.outlineOffset = '';
    });
});
