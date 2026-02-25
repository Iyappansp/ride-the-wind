import os
import re

new_navbar = """      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto align-items-center">
          <li class="nav-item">
            <a class="nav-link" href="index.html">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="about.html">About</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="programs.html">Programs</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="instructors.html">Instructors</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="contact.html">Contact</a>
          </li>
          
          <!-- User Profile (Visible after login) -->
          <li class="nav-item dropdown auth-logged-in" style="display: none;">
            <a class="nav-link dropdown-toggle d-flex align-items-center gap-2" href="#" id="profileDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <i class="fa-solid fa-user-circle fa-lg"></i> Profile
            </a>
            <ul class="dropdown-menu dropdown-menu-end shadow-sm border-0" aria-labelledby="profileDropdown">
              <li><h6 class="dropdown-header">Dashboard</h6></li>
              <li><a class="dropdown-item" href="dashboard/student/index.html"><i class="fa-solid fa-user-graduate me-2"></i>Student Dashboard</a></li>
              <li><a class="dropdown-item" href="dashboard/admin/index.html"><i class="fa-solid fa-user-shield me-2"></i>Admin Dashboard</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="#" onclick="logoutUser(event)"><i class="fa-solid fa-sign-out-alt me-2"></i>Logout</a></li>
            </ul>
          </li>
          
          <!-- CTAs -->
          <li class="nav-item auth-logged-out ms-lg-2 my-2 my-lg-0">
            <a class="nav-link btn btn-outline-primary px-3 py-2" style="border-radius: 5px; font-weight: 500;" href="login.html">
              Login
            </a>
          </li>
          <li class="nav-item ms-lg-2 my-2 my-lg-0">
            <a class="nav-link btn btn-primary text-white px-4 py-2" style="border-radius: 5px; font-weight: 600;" href="booking.html">
              Book Now
            </a>
          </li>

          <li class="nav-item ms-lg-3">
            <div class="d-flex gap-2 justify-content-center">
              <button class="theme-toggle" id="rtlToggle" aria-label="Toggle RTL">
                <span id="rtlIcon">🇸🇦</span>
              </button>
              <button class="theme-toggle" id="themeToggle" aria-label="Toggle dark mode" data-testid="theme-toggle">
                <span id="themeIcon">🌙</span>
              </button>
            </div>
          </li>
        </ul>
      </div>"""

def replace_navbar_in_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        pattern = re.compile(r' {6}<div class="collapse navbar-collapse" id="navbarNav">.*?</ul>\n {6}</div>', re.DOTALL)
        
        if pattern.search(content):
            new_content = pattern.sub(new_navbar, content)
            if new_content != content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Updated navbar in {filepath}")
    except Exception as e:
        print(f"Error processing nav in {filepath}: {e}")

def update_dashboard_brand(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # We need to replace Admin Panel / Student Portal with 'Ride The Wind | Admin Panel'
        # Let's match:
        # <h4 style="..."><span style="font-size: 1.5rem;">🏄</span> Admin Panel</h4>
        # and replace with:
        # <h4 style="..."><span style="font-size: 1.5rem;">🏄</span> Ride The Wind</h4><div style="font-size:0.8rem; color: #666; margin-top:-5px; padding-left: 2rem;">Admin Panel</div>
        
        # Handle variations of spaces
        orig_content = content
        
        # For Admin
        content = re.sub(
            r'<h4([^>]+)>\s*<span([^>]+)>🏄</span>\s*Admin Panel\s*</h4>',
            r'<h4\1>\n          <span\2>🏄</span>\n          Ride The Wind\n        </h4>\n        <div style="font-size: 0.85rem; color: var(--text-muted); padding-left: 2.2rem; margin-top: -0.2rem;">Admin Panel</div>',
            content,
            flags=re.IGNORECASE
        )
        
        # For Student
        content = re.sub(
            r'<h4([^>]+)>\s*<span([^>]+)>🏄</span>\s*Student Portal\s*</h4>',
            r'<h4\1>\n          <span\2>🏄</span>\n          Ride The Wind\n        </h4>\n        <div style="font-size: 0.85rem; color: var(--text-muted); padding-left: 2.2rem; margin-top: -0.2rem;">Student Portal</div>',
            content,
            flags=re.IGNORECASE
        )

        if content != orig_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Updated dashboard brand in {filepath}")
            
    except Exception as e:
        print(f"Error processing dashboard brand in {filepath}: {e}")

html_files = []
dash_files = []
for root, dirs, files in os.walk('.'):
    if 'node_modules' in root:
        continue
    for f in files:
        if f.endswith('.html'):
            path = os.path.join(root, f)
            html_files.append(path)
            if 'dashboard' in path:
                dash_files.append(path)

for f in html_files:
    replace_navbar_in_file(f)

for f in dash_files:
    update_dashboard_brand(f)
