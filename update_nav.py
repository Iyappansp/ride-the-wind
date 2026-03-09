import os
import re

# Favicon tag
favicon_tag = '<link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🏄</text></svg>">'

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
          
          <!-- Book Now CTA -->
          <li class="nav-item ms-lg-2 my-2 my-lg-0">
            <a class="nav-link btn btn-primary text-white px-4 py-2" style="border-radius: 5px; font-weight: 600; box-shadow: 0 4px 14px 0 rgba(14, 165, 233, 0.3);" href="booking.html">
              Book Now
            </a>
          </li>

          <!-- Combined User Profile Dropdown -->
          <li class="nav-item dropdown ms-lg-2">
            <a class="nav-link dropdown-toggle d-flex align-items-center gap-2 p-1 no-caret" href="#" id="profileDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <div class="profile-pic-container">
                <img src="https://ui-avatars.com/api/?name=User&background=0ea5e9&color=fff" alt="User Profile" class="profile-pic" data-testid="profile-picture">
              </div>
            </a>
            <ul class="dropdown-menu dropdown-menu-end shadow-lg border-0 mt-3" aria-labelledby="profileDropdown" style="border-radius: 15px; min-width: 220px; padding: 0.75rem;">
              <li class="px-3 py-2 border-bottom mb-2">
                <span class="d-block fw-bold text-primary" id="navUserName">Guest Explorer</span>
                <small class="text-muted" id="navUserRole">Not Signed In</small>
              </li>
              <li>
                <a class="dropdown-item py-2 d-flex align-items-center gap-3 rounded-3" href="dashboard/student/index.html">
                  <div class="icon-circle bg-light text-primary"><i class="fa-solid fa-gauge"></i></div>
                  <span>Dashboard</span>
                </a>
              </li>
              <li>
                <a class="dropdown-item py-2 d-flex align-items-center gap-3 rounded-3 auth-logged-out" href="login.html">
                  <div class="icon-circle bg-light text-primary"><i class="fa-solid fa-sign-in-alt"></i></div>
                  <span>Login Options</span>
                </a>
              </li>
              <li><hr class="dropdown-divider"></li>
              <li>
                <a class="dropdown-item py-2 d-flex align-items-center gap-3 rounded-3 text-danger auth-logged-in" href="#" onclick="logoutUser(event)">
                  <div class="icon-circle bg-light-danger text-danger"><i class="fa-solid fa-sign-out-alt"></i></div>
                  <span>Logout</span>
                </a>
              </li>
            </ul>
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

def fix_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        orig_content = content

        # 1. Update Navbar
        nav_pattern = re.compile(r' {6}<div class="collapse navbar-collapse" id="navbarNav">.*?</ul>\n {6}</div>', re.DOTALL)
        if nav_pattern.search(content):
            content = nav_pattern.sub(new_navbar, content)

        # 2. Add Favicon if missing
        if 'rel="icon"' not in content and '<link rel="icon"' not in content:
            content = content.replace('<head>', f'<head>\n  {favicon_tag}')

        # 3. Update Dashboard Brand
        if 'dashboard' in filepath:
            # Side Bar Brand (Ensuring it's correct)
            content = re.sub(
                r'<h4([^>]+)>\s*<span([^>]+)>🏄</span>\s*Admin Panel\s*</h4>',
                r'<h4\1>\n          <span\2>🏄</span>\n          Ride The Wind\n        </h4>\n        <div style="font-size: 0.85rem; color: var(--text-muted); padding-left: 2.2rem; margin-top: -0.2rem;">Admin Panel</div>',
                content, flags=re.IGNORECASE
            )
            content = re.sub(
                r'<h4([^>]+)>\s*<span([^>]+)>🏄</span>\s*Student Portal\s*</h4>',
                r'<h4\1>\n          <span\2>🏄</span>\n          Ride The Wind\n        </h4>\n        <div style="font-size: 0.85rem; color: var(--text-muted); padding-left: 2.2rem; margin-top: -0.2rem;">Student Portal</div>',
                content, flags=re.IGNORECASE
            )
            
            # Top Bar Brand (Mobile Visibility - very flexible regex)
            # Match the first div after dashboard-content that looks like a header
            topbar_pattern = re.compile(r'<div\s+class="d-flex\s+justify-content-between\s+align-items-center\s+mb-4">', re.IGNORECASE)
            if topbar_pattern.search(content) and 'Ride The Wind' not in content.split('</h1>')[1 if '</h1>' in content else 0]: # Wait, splitting by h1[1] would check AFTER the first h1. 
                 # Let's just check if the specific mobile link is already there
                 if 'text-primary" style="font-family: \'Poppins\';">Ride The Wind</span>' not in content:
                     replacement = """<div class="d-flex justify-content-between align-items-center mb-4">
      <div class="d-flex align-items-center gap-3">
        <a href="../../index.html" class="d-lg-none text-decoration-none d-flex align-items-center gap-2">
          <span style="font-size: 1.5rem;">🏄</span>
          <span class="fw-bold text-primary" style="font-family: 'Poppins';">Ride The Wind</span>
        </a>
      </div>"""
                     content = topbar_pattern.sub(replacement, content, count=1)

        # 4. Footer CTA (Stay idempotent)
        if '<li><a href="booking.html">Book Now</a></li>' in content:
            content = content.replace('<li><a href="booking.html">Book Now</a></li>', 
                                     '<li class="mt-2"><a href="booking.html" class="btn btn-primary btn-sm text-white px-3" style="border-radius: 4px;">Book Now</a></li>')

        if content != orig_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Processed {filepath}")

    except Exception as e:
        print(f"Error processing {filepath}: {e}")

for root, dirs, files in os.walk('.'):
    if 'node_modules' in root or '.git' in root:
        continue
    for f in files:
        if f.endswith('.html'):
            fix_file(os.path.join(root, f))
