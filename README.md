# 🏄 Kitesurfing & Windsurfing School Template

A complete, production-ready static website template for kitesurfing and windsurfing schools. Built with HTML5, CSS3, vanilla JavaScript, Bootstrap 5, and Tailwind CSS.

## 🌊 Overview

This premium template provides everything needed to launch a professional kitesurfing and windsurfing school website with integrated booking system, wind forecast display, and comprehensive dashboards for both students and administrators.

## ✨ Features

### Public Website
- **Responsive Design**: Mobile-first, fully responsive across all devices
- **Ocean/Beach Aesthetic**: Bright blues, teals, turquoise with sandy tones
- **Dark Mode**: Built-in light/dark theme toggle with localStorage persistence
- **RTL Support**: Separate stylesheet for right-to-left language support
- **SEO Optimized**: Semantic HTML5, proper meta tags, heading hierarchy
- **Form Validation**: Client-side JavaScript validation for all forms
- **Smooth Animations**: Scroll animations and interactive hover effects
- **Wind-Based Booking**: Lessons matched to wind conditions and skill levels

### Dashboard Features (UI Only - Static Data)

#### Admin Dashboard
- **Overview**: Real-time stats, bookings, revenue (dummy data)
- **Booking Management**: View and manage all lesson bookings
- **Student Management**: Student profiles and progress tracking
- **Instructor Management**: Instructor schedules and assignments
- **Wind Forecast**: 7-day forecast with visual indicators
- **Messages**: Inquiries and customer communication
- **Settings**: School configuration and preferences

#### Student Dashboard
- **Personal Overview**: Upcoming lessons and progress stats
- **My Lessons**: View booked sessions and lesson history
- **Progress Tracking**: Skills mastered and achievement badges
- **Equipment Checklist**: Interactive gear packing list (localStorage)
- **Certificates**: Downloadable certificates and credentials
- **Profile & Settings**: Personal information management

### Special Features
- **Wind Forecast System**: Visual cards + calendar grid with color-coded conditions
- **Skill Level Filtering**: Beginner, Intermediate, Advanced categorization
- **Interactive Booking**: Filter lessons by skill level and wind conditions
- **Chart.js Integration**: Beautiful data visualization in dashboards
- **Gallery Lightbox**: Click-to-expand image gallery
- **Testimonials**: Customer reviews and success stories

## 📁 Project Structure

```
kitesurfing-school-template/
├── assets/
│   ├── css/
│   │   ├── style.css          # Main styles (ocean/beach theme)
│   │   ├── dark-mode.css      # Dark mode specific styles
│   │   └── rtl.css            # RTL language support
│   ├── js/
│   │   ├── main.js            # Core JavaScript functionality
│   │   └── dashboard.js       # Dashboard-specific features
│   └── images/                # Placeholder for custom images
├── pages/
│   ├── index.html             # Home page
│   ├── about.html             # About us & mission
│   ├── programs.html          # Services & programs
│   ├── booking.html           # Booking with wind forecast
│   ├── instructors.html       # Instructor profiles
│   ├── gallery.html           # Photo gallery
│   ├── blog.html              # Blog/articles
│   ├── contact.html           # Contact form
│   ├── coming-soon.html       # Coming soon page
│   └── 404.html               # Error page
├── dashboard/
│   ├── admin/
│   │   ├── index.html         # Admin overview
│   │   ├── bookings.html      # Booking management
│   │   ├── students.html      # Student management
│   │   ├── instructors.html   # Instructor management
│   │   ├── wind-forecast.html # Wind schedule
│   │   ├── messages.html      # Customer messages
│   │   └── settings.html      # Admin settings
│   └── student/
│       ├── index.html         # Student overview
│       ├── my-lessons.html    # Booked lessons
│       ├── progress.html      # Progress tracking
│       ├── equipment.html     # Gear checklist
│       ├── certificates.html  # Achievements
│       ├── profile.html       # User profile
│       └── settings.html      # Account settings
└── README.md                  # This file
```

## 🎨 Design System

### Color Palette

#### Light Mode
- **Primary**: `#0ea5e9` (Sky Blue) - Main brand color
- **Secondary**: `#06b6d4` (Cyan) - Accent color
- **Accent**: `#14b8a6` (Teal) - Highlights
- **Sand**: `#fbbf24` (Amber) - Beach tones
- **Background**: `#ffffff` / `#f0f9ff` (White/Light Blue)
- **Text**: `#0f172a` / `#475569` (Dark Slate)

#### Dark Mode
- **Primary**: `#38bdf8` (Light Sky Blue)
- **Background**: `#0f172a` / `#1e293b` (Deep Navy/Slate)
- **Text**: `#f1f5f9` / `#cbd5e1` (Light Gray)

#### Wind Conditions
- **Low Wind** (8-12 knots): `#86efac` (Green) - Beginner friendly
- **Medium Wind** (13-20 knots): `#fbbf24` (Yellow) - Intermediate ideal
- **High Wind** (20+ knots): `#f87171` (Red) - Advanced only

### Typography
- **Headings**: Poppins (Bold, 600-800)
- **Body**: Inter (Regular, 400-700)
- **Font Sizes**: Responsive scaling with mobile-first approach

## 🚀 Getting Started

### Quick Start

1. **Download or Clone** this template
2. **Open** `pages/index.html` in your browser
3. **Navigate** through all pages
4. **Access Dashboards**:
   - Admin: `dashboard/admin/index.html`
   - Student: `dashboard/student/index.html`

### No Build Process Required
This template uses CDN links for all external libraries:
- Bootstrap 5 (CSS & JS)
- Tailwind CSS
- Chart.js (for dashboards)
- Google Fonts (Inter & Poppins)

Simply open the HTML files in any modern browser!

## 🛠️ Customization Guide

### 1. Branding

**Update Logo & Name**:
```html
<!-- In all HTML files -->
<a class="navbar-brand" href="index.html">
  <span style="font-size: 1.8rem;">🏄</span>
  Your School Name
</a>
```

**Change Colors**:
Edit CSS variables in `assets/css/style.css`:
```css
:root {
  --primary: #0ea5e9;      /* Your brand color */
  --secondary: #06b6d4;    /* Accent color */
  --accent: #14b8a6;       /* Highlight color */
  /* ... */
}
```

### 2. Content

**Replace Placeholder Images**:
- Search for `images.unsplash.com` URLs
- Replace with your own image URLs or local paths
- Recommended sizes:
  - Hero images: 1600x900px
  - Card images: 800x600px
  - Profile photos: 300x300px

### 3. Forms Integration

**Contact/Booking Forms** are ready for:

**Option A: Formspree**
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

**Option B: Netlify Forms**
```html
<form data-netlify="true" name="contact">
```

## 📱 Responsive Breakpoints

- **Mobile**: < 480px
- **Tablet**: 481px - 768px
- **Desktop**: > 768px

## ♿ Accessibility Features

- Semantic HTML5 elements
- ARIA labels on interactive elements
- Keyboard navigation support
- Alt text for all images
- Color contrast compliance (WCAG AA)

## 🌐 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📦 Deployment

### Static Hosting Options

**Netlify** (Recommended):
1. Drag & drop entire folder
2. Enable form handling
3. Configure custom domain
4. SSL enabled automatically

**Vercel / GitHub Pages / AWS S3** also supported

### Pre-Deployment Checklist

- [ ] Replace all placeholder content
- [ ] Update contact information
- [ ] Add your own images
- [ ] Test all forms
- [ ] Verify responsive design
- [ ] Check all links
- [ ] Test dark mode
- [ ] Optimize images

## 📄 License

This template is provided as-is for personal or commercial use. Attribution appreciated but not required.

## 🚀 Technical Stack

- **HTML5**: Semantic, accessible markup
- **CSS3**: Custom properties, Flexbox, Grid
- **JavaScript (ES6+)**: Vanilla JS, no frameworks
- **Bootstrap 5**: Component library (CDN)
- **Tailwind CSS**: Utility classes (CDN)
- **Chart.js**: Data visualization (CDN)
- **Google Fonts**: Inter & Poppins

## 🎯 Use Cases

Perfect for:
- Kitesurfing schools
- Windsurfing schools
- Water sports centers
- Surf camps
- Beach equipment rentals

## 📝 Version History

**Version 1.0.0** - December 2024
- Initial release
- Complete public website (10 pages)
- Admin dashboard (7 pages)
- Student dashboard (7 pages)
- Dark mode & RTL support
- Wind forecast system
- Interactive booking

---

**Built with 💙 for wind sports enthusiasts**

Ready to ride the wind? 🏄‍♂️🌊

*Note: This is a static HTML template with UI-only dashboards using dummy data. For a fully functional booking system, integrate with a backend service.*
#   r i d e - t h e - w i n d  
 