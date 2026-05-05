# Autofix — AI Damage Intelligence

A web demo that analyzes crashed vehicle photos using AI and returns a detailed damage report with parts and cost estimates.

## What's inside

- `index.html` — the full website (frontend), no build step needed
- `netlify/functions/analyze.js` — serverless function that safely calls the Anthropic API
- `netlify.toml` — Netlify configuration

## How to deploy (5 minutes)

### Step 1 — Get an Anthropic API key

1. Go to https://console.anthropic.com/
2. Sign up or log in
3. Go to **Settings → API Keys**
4. Click **Create Key**, copy the key (starts with `sk-ant-...`)
5. **Add some credits** (Settings → Billing) — even $5 is plenty for a demo, each analysis costs less than a penny

### Step 2 — Push this folder to GitHub

If you don't already have a repo:

```bash
cd autofix-netlify
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

If you already have a GitHub repo, just replace its contents with these files and push.

### Step 3 — Deploy on Netlify

1. Go to https://app.netlify.com/
2. Sign up (free) — you can sign in with GitHub
3. Click **Add new site → Import an existing project**
4. Choose **GitHub**, authorize, and select your repo
5. **Build settings** — leave everything as default (the `netlify.toml` handles it). Click **Deploy site**.
6. Wait 30 seconds — your site is live at something like `https://random-name-123.netlify.app`

### Step 4 — Add your API key to Netlify

This is the critical step — without this, the AI analysis won't work.

1. In your Netlify site dashboard, go to **Site configuration → Environment variables**
2. Click **Add a variable**
3. **Key:** `ANTHROPIC_API_KEY`
4. **Value:** paste your `sk-ant-...` key
5. Click **Save**
6. Go to **Deploys** tab → click **Trigger deploy → Deploy site** (this rebuilds with the new variable)

### Step 5 — Test it

Open your Netlify URL in a browser, upload a photo of a damaged car, click "Begin analysis", and you should see real AI results in 5–15 seconds.

## Optional — change the site name

In Netlify: **Site configuration → Change site name** → make it `autofix-demo` or whatever you want. Now your URL is `https://autofix-demo.netlify.app`.

## Cost

- Netlify hosting: **free** (very generous free tier)
- Anthropic API: roughly **$0.005 – $0.02 per analysis** depending on image size. $5 of credit ≈ 250–1000 analyses.

## Troubleshooting

**"API key not configured on server"** — You forgot Step 4, or didn't redeploy after adding the variable.

**"Server error: 401"** — API key is wrong or doesn't have credits.

**"Could not parse AI response"** — Try a clearer image, or one that actually shows a vehicle.

**Function times out** — Increase `timeout` in `netlify.toml` (max 26 seconds on free tier).

## Customizing

- **Colors / branding:** edit the Tailwind classes in `index.html` (search for `stone-` and replace with another color name)
- **Logo / company name:** search for "Autofix" in `index.html`
- **AI behavior:** edit the `prompt` variable in `netlify/functions/analyze.js`
