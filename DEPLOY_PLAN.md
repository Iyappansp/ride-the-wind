# Deployment Plan for Ride The Wind

I have successfully rearranged your project files to align with standard web hosting practices. Your `index.html` (Home Page) is now in the root directory, making it ready for instant deployment.

## 📂 New File Structure

```
/students
├── index.html          (Main Home Page)
├── about.html
├── booking.html
├── contact.html
├── login.html
├── ... (other pages)
├── assets/             (CSS, JS, Images)
├── dashboard/          (Admin & Student Dashboards)
└── directory.html      (Old index page, list of links)
```

## 🚀 Deployment Options

### Option 1: GitHub Pages (Recommended)

Since you already have a GitHub repository (`ride-the-wind`), this is the easiest method.

1.  **Commit the Changes**:
    Open your terminal in `students/` folder and run:
    ```bash
    git add .
    git commit -m "Rearrange project structure for deployment"
    git push origin main
    ```

2.  **Enable GitHub Pages**:
    -   Go to your repository on GitHub: `https://github.com/Iyappansp/ride-the-wind`
    -   Click on **Settings** > **Pages** (in the sidebar).
    -   Under **Source**, select `Deploy from a branch`.
    -   Select `main` branch and `/ (root)` folder.
    -   Click **Save**.

Your site will be live at: `https://Iyappansp.github.io/ride-the-wind/` within a few minutes.

### Option 2: Netlify (Drag & Drop)

1.  Go to [Netlify Drop](https://app.netlify.com/drop).
2.  Drag and drop your `students` folder onto the page.
3.  Your site will be deployed instantly with a random URL (e.g., `silly-wind.netlify.app`).

### Option 3: Vercel

1.  Install Vercel CLI: `npm i -g vercel`
2.  Run `vercel` in your project folder.
3.  Follow the prompts (defaults are usually fine).

## ✅ Verification Checklist

After deployment, check the following:
-   [ ] **Home Page**: Does `index.html` load correctly?
-   [ ] **Assets**: Do styles and scripts load? (Check console for 404s).
-   [ ] **Navigation**: Do links to `About`, `Programs`, etc., work?
-   [ ] **Dashboards**: Can you access the Admin/Student dashboards?
-   [ ] **Login**: Does the login page redirect correctly?

## ⚠️ Important Note

If you deploy to a subdirectory (like GitHub Pages often does, e.g., `/ride-the-wind/`), ensure your absolute paths (if any) are correct. Relative paths like `assets/css/style.css` (which we used) should work fine.
