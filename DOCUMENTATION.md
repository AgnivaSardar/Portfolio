# AGNIVA - 3D Portfolio Website

A stunning, fully responsive 3D portfolio website built with HTML, CSS, JavaScript, and Three.js. Features smooth animations, interactive elements, and a dark theme.

## 🎨 Features

### Loading & Welcome Screens
- **Powering Up Animation**: Rotating rings and geometric shapes with progress bar
- **Welcome Screen**: "HELLO" message with loading dots before main portfolio loads
- Smooth transitions between screens

### Hero Section
- 3D interactive canvas with rotating geometric shapes (cubes, spheres, torus)
- Mouse tracking for parallax effects
- Call-to-action buttons
- Scroll indicator

### Main Sections
1. **About** - Personal introduction and skills showcase with animated orbital elements
2. **Projects** - 6 featured projects with hover effects and technology tags
3. **Education** - Timeline view of educational background
4. **Experience** - Work experience with highlights
5. **Contact** - Contact form and direct contact information

### Design Elements
- Dark theme with neon accent colors (cyan, magenta, purple)
- Smooth scroll animations
- Responsive design (mobile, tablet, desktop)
- Hover effects and transitions
- Gradient backgrounds

## 📁 Project Structure

```
portfolio website/
├── index.html              # Main HTML file
├── css/
│   └── style.css          # All styling (dark theme, animations)
├── js/
│   └── main.js            # JavaScript (3D effects, interactions)
├── assets/                # For images and other assets
├── README.md              # Original README
└── DOCUMENTATION.md       # This file
```

## 🚀 Quick Start

1. **Open in Browser**: Simply open `index.html` in your web browser
2. **No Server Required**: This is a static website that works locally
3. **Deploy**: Upload all files to a web hosting service

## 🎯 Customization Guide

### Update Personal Information

1. **Hero Title & Subtitle** (index.html, line ~95)
   ```html
   <h1 class="hero-title">YOUR NAME</h1>
   <p class="hero-subtitle">Your Title & Description</p>
   ```

2. **About Section** (index.html, line ~141)
   - Update the description text
   - Modify or add skills in the skill tags

3. **Projects** (index.html, lines ~192-248)
   - Edit project titles, descriptions, and technologies
   - Add project links

4. **Education** (index.html, lines ~263-290)
   - Update university/school names and dates
   - Modify descriptions

5. **Experience** (index.html, lines ~304-344)
   - Update job titles, companies, and dates
   - Modify job descriptions

6. **Contact Information** (index.html, lines ~386-404)
   ```html
   <a href="mailto:your.email@example.com">your.email@example.com</a>
   <a href="tel:+1234567890">+1 (234) 567-890</a>
   <a href="https://linkedin.com/in/yourprofile">your LinkedIn</a>
   ```

### Configure Contact Form

The contact form currently shows a success message locally. To actually receive emails:

**Option 1: Using Formspree (Recommended)**
1. Go to https://formspree.io
2. Sign up and create a new form
3. Replace the form endpoint in `js/main.js` (line ~160):
   ```javascript
   const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
   ```

**Option 2: Using FormSubmit**
1. Go to https://formsubmit.co
2. Update the form endpoint in js/main.js

### Customize Colors

Edit the CSS variables in `css/style.css` (lines 10-15):

```css
:root {
    --primary-color: #00d4ff;      /* Cyan */
    --secondary-color: #ff006e;    /* Magenta */
    --bg-dark: #0a0e27;            /* Main background */
    --bg-darker: #050811;          /* Darker background */
    --text-light: #e0e0e0;         /* Main text */
    --text-lighter: #b0b0b0;       /* Lighter text */
    --border-color: #1a1f3a;       /* Borders */
    --accent-color: #8338ec;       /* Purple accent */
}
```

### Add Project Images

1. Place images in the `assets/` folder
2. Update the project cards with actual images:
   ```html
   <div class="project-image">
       <img src="assets/project-1.jpg" alt="Project name">
   </div>
   ```

### Modify Animation Speeds

- **Scroll animations**: Edit keyframes in `css/style.css`
- **3D rotation speed**: Adjust values in `js/main.js` (lines ~130-135)
- **Loading screen duration**: Change timeout in `js/main.js` (line ~280)

## 🔧 Technical Details

### Dependencies
- **Three.js**: For 3D graphics (loaded via CDN)
- **No other external dependencies required**

### Browser Compatibility
- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile browsers: Fully responsive

### Performance Tips
1. Optimize images before adding them
2. Use WebP format for better compression
3. Consider disabling 3D on very low-end devices
4. Minify CSS/JS for production

## 📱 Responsive Breakpoints

- **Desktop**: Full layout (1200px+)
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px

## 🎬 Animation Timeline

1. **0-3 seconds**: Loading screen with progress bar
2. **3-5 seconds**: Welcome screen transition
3. **5+ seconds**: Main portfolio loads with fade-in effects
4. **Continuous**: 3D hero animations and scroll effects

## 🔐 Security Considerations

- No sensitive data stored locally
- Form submissions should be encrypted in production
- Use HTTPS when deployed

## 📞 Adding New Features

To add features or modify the website:

1. **Adding sections**: Copy existing section structure and update CSS
2. **Adding animations**: Use CSS keyframes or Three.js
3. **Mobile optimization**: Test with Chrome DevTools device emulation

## 🎓 Learning Resources

- Three.js: https://threejs.org/docs/
- CSS Animations: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations
- JavaScript: https://developer.mozilla.org/en-US/docs/Web/JavaScript/

---

**Made with ❤️ for creative developers**
