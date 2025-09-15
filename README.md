# Shoply — Static HTML/CSS E‑commerce Demo

A small, beautiful e‑commerce UI built with only HTML and CSS. No JavaScript needed.

## Pages
- `index.html` — Landing page with hero, features, categories, and featured products
- `login.html` — User login (static demo; submits to `user.html`)
- `user.html` — User dashboard (orders, saved items)
- `admin.html` — Static admin dashboard with KPIs, recent orders, and top products

## Run / Preview
You can open the `index.html` directly in your browser. If you prefer using Vite's dev server:

```powershell
npm install
npm run dev
```

Then open the URL Vite prints in the terminal. Alternatively, right‑click `index.html` in VS Code and select "Open with Live Server" if you have that extension.

## Notes
- All interactions are purely navigational — there is no JS logic.
- Image tiles use Unsplash URLs; replace with your own assets as needed.
- Styles are in `styles.css` and shared across all pages.
