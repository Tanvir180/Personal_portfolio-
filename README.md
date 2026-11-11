# Tanvir Ahammed Hridoy — Portfolio Website

A complete, responsive static portfolio website inspired by the supplied reference layout but rebuilt with a custom charcoal / sea-glass green design and the details from your CV and LaTeX résumé.

## Quick start

1. Extract the ZIP archive.
2. Open `index.html` in Chrome, Safari, Firefox or Edge. It works without a build step.
3. For hosting, upload everything in the extracted folder to your website's public root (including `assets/`, `files/`, `styles.css`, and `script.js`).
4. The **Download CV** buttons serve `files/Tanvir_Ahammed_Hridoy_CV.pdf`. Keep that relative location unless you also update the links in `index.html`.

For development, you can optionally run `python3 -m http.server 8000` in this folder and visit `http://localhost:8000`.

## Included files

- `index.html` — profile, About, Resume, Projects, Research, Contact; semantic and accessible page structure.
- `styles.css` — typography, desktop/mobile layouts, reusable components, dark and light themes.
- `script.js` — tab navigation, keyboard controls, project filters, theme toggle, clipboard helper and contact email composition.
- `assets/tanvir-headshot.png` — portrait extracted from the supplied CV.
- `assets/favicon.svg` — editable initial-based browser icon.
- `assets/preview.png` — social preview graphic.
- `files/Tanvir_Ahammed_Hridoy_CV.pdf` — downloadable public-facing professional CV.
- `files/Tanvir_Ahammed_Hridoy_CV.tex` — editable LaTeX source for that CV; compile with `xelatex` (twice), with the usual LaTeX packages and DejaVu Sans fonts installed.

## Customization

**Name, bio, contact and links:** edit `index.html`. Search for `tanvir.ahammed.cse@gmail.com`, `Tanvir180`, and `tanvir-headshot` to find key references. Keep the structured-data JSON and site metadata aligned when changing details.

**Colors:** edit the CSS variables under `:root` (dark mode) and `html[data-theme="light"]` (light mode) in `styles.css`.

**Projects:** edit the project cards in the `#portfolio` section. Every card uses `data-categories` so the filters remain functional. The portfolio includes only projects supported by the CV / LaTeX files, not invented projects.

**CV:** update `files/Tanvir_Ahammed_Hridoy_CV.tex`, compile with XeLaTeX, and replace the PDF of the same name. The download button will then serve your newest CV. You can also replace the PDF with your own provided CV using the same filename, but read the privacy notice below.

**Contact form:** this is a safe frontend-only form that opens the visitor's default email program using `mailto:`. It does not directly send messages, store visitors' data, or require an API key. For server delivery later, integrate a form endpoint of your choice.

## Important content checks before going live

- The provided LaTeX résumé listed **M.Sc. in Computer Science, Jagannath University, expected October 2026 / in progress**. The live site currently avoids asserting a graduation date or completion; the PDF summarizes the program as 2024–2026. Confirm current status and adjust the copy if needed.
- The two supplied CV sources contain **different email addresses**. The website uses `tanvir.ahammed.cse@gmail.com` from the LaTeX source. Confirm this is the preferred public address, and adjust if necessary.
- Your supplied Europass CV includes a passport number, birth date and precise residential address. To avoid publishing those sensitive identifiers, this package includes a **new public-facing PDF** rather than a copy of the original Europass PDF. The phone number is public in the new version, as it was in the source LaTeX; remove it if you prefer email-only contact.
- Confirm external project links and achievement dates before deployment. The website references URLs provided in your source files.
- No analytics or third-party tracking has been added.

## Hosting options

This is a static website. It is suitable for GitHub Pages, Netlify, Vercel static hosting, Firebase Hosting, shared hosting, or any HTTPS web server. No Node, npm, backend, database or build tools are required to run it.

## Browser support and accessibility

Responsive layout for desktop, tablet and mobile. Tab navigation supports click, keyboard arrows, Home and End; project filters expose button state. Reduced-motion preferences are respected. Light/dark theme is optional and stored locally where permitted.
