# Nutritionist Quiz

A static, Vercel-deployable version of the Bio-Forge nutrition quiz.

## Deploy on Vercel

1. Push this repository to GitHub.
2. Import the repository into Vercel.
3. Keep the project root as the Vercel root.
4. Use the included `vercel.json` rewrites so these routes work:
   - `/` -> `streamlit_app/static/index.html`
   - `/game.html` -> `streamlit_app/static/game.html`
   - `/dashboard.html` -> `streamlit_app/static/dashboard.html`
   - `/vault.html` -> `streamlit_app/static/vault.html`
   - `/analytics.html` -> `streamlit_app/static/analytics.html`
5. Deploy.

## Local preview

Open the HTML files under `streamlit_app/static/` in a browser, or run a simple local static server from the repository root if you want to test the route rewrites.

## Project structure

- `streamlit_app/static/` - static game pages, styles, scripts, and assets
- `vercel.json` - Vercel rewrite rules
- `streamlit_app/app.py` - legacy Streamlit entrypoint kept for reference
- `streamlit_app/requirements.txt` - legacy Streamlit dependencies kept for reference

## Notes

The app no longer depends on Streamlit for the Vercel deployment path.
