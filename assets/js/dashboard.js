// ===================================
// DASHBOARD JAVASCRIPT
// ===================================

// Theme Toggle (same as main.js but for dashboard)
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;
const themeIcon = document.getElementById('themeIcon');

const currentTheme = localStorage.getItem('theme') || 'light';
htmlElement.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const theme = htmlElement.getAttribute('data-theme');
    const newTheme = theme === 'light' ? 'dark' : 'light';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  });
}

// RTL Toggle Functionality
const rtlToggle = document.getElementById('rtlToggle');

// Check for saved RTL preference
const currentDir = localStorage.getItem('dir') || 'ltr';
htmlElement.setAttribute('dir', currentDir);
updateRtlButton(currentDir);

if (rtlToggle) {
  rtlToggle.addEventListener('click', () => {
    const dir = htmlElement.getAttribute('dir');
    const newDir = dir === 'ltr' ? 'rtl' : 'ltr';
    
    htmlElement.setAttribute('dir', newDir);
    localStorage.setItem('dir', newDir);
    updateRtlButton(newDir);
  });
}

function updateRtlButton(dir) {
  if (rtlToggle) {
    rtlToggle.textContent = dir === 'ltr' ? 'RTL' : 'LTR';
  }
}

function updateThemeIcon(theme) {
  if (themeIcon) {
    themeIcon.textContent = theme === 'light' ? '🌙' : '☀️';
  }
}

// ===================================
// SIDEBAR TOGGLE (MOBILE)
// ===================================

const sidebarToggle = document.getElementById('sidebarToggle');
const sidebar = document.querySelector('.dashboard-sidebar');
const body = document.body;

// Create overlay element if it doesn't exist
let overlay = document.querySelector('.sidebar-overlay');
if (!overlay && sidebar) {
  overlay = document.createElement('div');
  overlay.className = 'sidebar-overlay';
  body.appendChild(overlay);
}

if (sidebarToggle && sidebar) {
  // Add a close button to the sidebar for mobile
  const closeBtn = document.createElement('button');
  closeBtn.innerHTML = '✕';
  closeBtn.className = 'sidebar-close-btn';
  sidebar.prepend(closeBtn);

  const toggleSidebar = () => {
    sidebar.classList.toggle('show');
    if (overlay) overlay.classList.toggle('show');
    body.style.overflow = sidebar.classList.contains('show') ? 'hidden' : '';
  };

  sidebarToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleSidebar();
  });

  closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    sidebar.classList.remove('show');
    if (overlay) overlay.classList.remove('show');
    body.style.overflow = '';
  });
  
  // Close sidebar when clicking overlay
  if (overlay) {
    overlay.addEventListener('click', () => {
      sidebar.classList.remove('show');
      overlay.classList.remove('show');
      body.style.overflow = '';
    });
  }

  // Close sidebar when clicking links on mobile
  const navLinks = sidebar.querySelectorAll('.sidebar-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 768) {
        sidebar.classList.remove('show');
        if (overlay) overlay.classList.remove('show');
        body.style.overflow = '';
      }
    });
  });
}

// ===================================
// ACTIVE PAGE HIGHLIGHTING
// ===================================

const currentPage = window.location.pathname.split('/').pop();
const sidebarLinks = document.querySelectorAll('.sidebar-link');

sidebarLinks.forEach(link => {
  const href = link.getAttribute('href');
  if (href && href === currentPage) {
    link.classList.add('active');
  }
});

// ===================================
// CHART.JS CONFIGURATIONS
// ===================================

// Booking Activity Chart (Line)
const bookingActivityCtx = document.getElementById('bookingActivityChart');
if (bookingActivityCtx) {
  new Chart(bookingActivityCtx, {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [{
        label: 'Bookings',
        data: [12, 19, 25, 32, 45, 58, 72, 68, 54, 42, 28, 15],
        borderColor: '#0ea5e9',
        backgroundColor: 'rgba(14, 165, 233, 0.1)',
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
            color: getComputedStyle(document.documentElement).getPropertyValue('--border-color')
          }
        },
        x: {
          grid: {
            display: false
          }
        }
      }
    }
  });
}

// Lesson Types Distribution (Doughnut)
const lessonTypesCtx = document.getElementById('lessonTypesChart');
if (lessonTypesCtx) {
  new Chart(lessonTypesCtx, {
    type: 'doughnut',
    data: {
      labels: ['Kitesurfing Beginner', 'Kitesurfing Advanced', 'Windsurfing Beginner', 'Windsurfing Advanced', 'Private Sessions'],
      datasets: [{
        data: [35, 25, 20, 15, 5],
        backgroundColor: [
          '#0ea5e9',
          '#06b6d4',
          '#14b8a6',
          '#fbbf24',
          '#f59e0b'
        ],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom'
        }
      }
    }
  });
}

// Student Progress Chart (Bar)
const studentProgressCtx = document.getElementById('studentProgressChart');
if (studentProgressCtx) {
  new Chart(studentProgressCtx, {
    type: 'bar',
    data: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
      datasets: [{
        label: 'Skills Mastered',
        data: [2, 4, 6, 8, 12, 15],
        backgroundColor: '#0ea5e9',
        borderRadius: 8
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
            color: getComputedStyle(document.documentElement).getPropertyValue('--border-color')
          }
        },
        x: {
          grid: {
            display: false
          }
        }
      }
    }
  });
}

// ===================================
// BOOKING STATUS FILTER
// ===================================

const statusFilter = document.getElementById('statusFilter');
const bookingRows = document.querySelectorAll('.booking-row');

if (statusFilter && bookingRows.length > 0) {
  statusFilter.addEventListener('change', function() {
    const selectedStatus = this.value;
    
    bookingRows.forEach(row => {
      const rowStatus = row.getAttribute('data-status');
      
      if (selectedStatus === 'all' || rowStatus === selectedStatus) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  });
}

// ===================================
// GEAR CHECKLIST FUNCTIONALITY
// ===================================

const gearCheckboxes = document.querySelectorAll('.gear-checkbox');
const progressBar = document.getElementById('gearProgress');
const progressText = document.getElementById('gearProgressText');

// Load saved checklist state
function loadChecklistState() {
  const savedState = localStorage.getItem('gearChecklist');
  if (savedState) {
    const state = JSON.parse(savedState);
    gearCheckboxes.forEach((checkbox, index) => {
      checkbox.checked = state[index] || false;
    });
    updateProgress();
  }
}

// Save checklist state
function saveChecklistState() {
  const state = Array.from(gearCheckboxes).map(cb => cb.checked);
  localStorage.setItem('gearChecklist', JSON.stringify(state));
}

// Update progress bar
function updateProgress() {
  const total = gearCheckboxes.length;
  const checked = Array.from(gearCheckboxes).filter(cb => cb.checked).length;
  const percentage = Math.round((checked / total) * 100);
  
  if (progressBar) {
    progressBar.style.width = percentage + '%';
    progressBar.setAttribute('aria-valuenow', percentage);
  }
  
  if (progressText) {
    progressText.textContent = `${checked} of ${total} items packed (${percentage}%)`;
  }
}

// Add event listeners
gearCheckboxes.forEach(checkbox => {
  checkbox.addEventListener('change', function() {
    saveChecklistState();
    updateProgress();
    
    // Add animation to parent row
    const row = this.closest('tr');
    if (this.checked) {
      row.style.opacity = '0.6';
      row.style.textDecoration = 'line-through';
    } else {
      row.style.opacity = '1';
      row.style.textDecoration = 'none';
    }
  });
});

// Initialize checklist
if (gearCheckboxes.length > 0) {
  loadChecklistState();
}

// ===================================
// DASHBOARD STATS ANIMATION
// ===================================

function animateDashboardStat(element) {
  const target = parseInt(element.getAttribute('data-count'));
  const duration = 1500;
  const increment = target / (duration / 16);
  let current = 0;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

document.addEventListener('DOMContentLoaded', () => {
  const dashboardStats = document.querySelectorAll('.dashboard-stat[data-count]');
  dashboardStats.forEach(stat => {
    animateDashboardStat(stat);
  });
});

// ===================================
// SEARCH FUNCTIONALITY
// ===================================

const searchInput = document.getElementById('dashboardSearch');
if (searchInput) {
  searchInput.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const searchableItems = document.querySelectorAll('[data-searchable]');
    
    searchableItems.forEach(item => {
      const text = item.textContent.toLowerCase();
      const parent = item.closest('tr') || item.closest('.card') || item;
      
      if (text.includes(searchTerm)) {
        parent.style.display = '';
      } else {
        parent.style.display = 'none';
      }
    });
  });
}

// ===================================
// CONFIRM ACTIONS
// ===================================

const confirmButtons = document.querySelectorAll('[data-confirm]');
confirmButtons.forEach(button => {
  button.addEventListener('click', function(e) {
    const message = this.getAttribute('data-confirm');
    if (!confirm(message)) {
      e.preventDefault();
    }
  });
});

// ===================================
// NOTIFICATION SYSTEM (Simple)
// ===================================

function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.className = `alert alert-${type}`;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 9999;
    min-width: 300px;
    padding: 1rem 1.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    animation: slideIn 0.3s ease;
  `;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// ===================================
// WIND FORECAST ALERTS
// ===================================

const windAlerts = document.querySelectorAll('.wind-alert');
windAlerts.forEach(alert => {
  const windSpeed = parseInt(alert.getAttribute('data-wind-speed'));
  
  if (windSpeed > 25) {
    alert.classList.add('alert-danger');
    alert.innerHTML = `<strong>⚠️ High Wind Warning!</strong> Wind speed: ${windSpeed} knots. Advanced riders only.`;
  } else if (windSpeed > 15) {
    alert.classList.add('alert-warning');
    alert.innerHTML = `<strong>🌬️ Good Conditions!</strong> Wind speed: ${windSpeed} knots. Perfect for intermediate riders.`;
  } else {
    alert.classList.add('alert-info');
    alert.innerHTML = `<strong>🍃 Light Wind</strong> Wind speed: ${windSpeed} knots. Ideal for beginners.`;
  }
});

// ===================================
// TABLE SORTING (Simple)
// ===================================

const sortableHeaders = document.querySelectorAll('[data-sort]');
sortableHeaders.forEach(header => {
  header.style.cursor = 'pointer';
  header.addEventListener('click', function() {
    const table = this.closest('table');
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    const columnIndex = Array.from(this.parentElement.children).indexOf(this);
    const isAscending = this.classList.contains('sort-asc');
    
    rows.sort((a, b) => {
      const aValue = a.children[columnIndex].textContent.trim();
      const bValue = b.children[columnIndex].textContent.trim();
      
      if (isAscending) {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });
    
    // Remove all sort classes
    sortableHeaders.forEach(h => h.classList.remove('sort-asc', 'sort-desc'));
    
    // Add appropriate class
    this.classList.add(isAscending ? 'sort-desc' : 'sort-asc');
    
    // Reorder rows
    rows.forEach(row => tbody.appendChild(row));
  });
});

// ===================================
// CONSOLE INFO
// ===================================

console.log('%c📊 Dashboard Ready', 'font-size: 16px; color: #0ea5e9; font-weight: bold;');
console.log('%cAll dashboard features loaded successfully', 'color: #10b981;');

// ===================================
// LOGOUT FUNCTIONALITY
// ===================================

const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', function(e) {
    e.preventDefault();
    if (confirm('Are you sure you want to logout?')) {
      // Clear user session/role if needed
      localStorage.removeItem('userRole');
      window.location.href = '../../index.html';
    }
  });
}
