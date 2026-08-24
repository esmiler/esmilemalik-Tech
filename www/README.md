# esmilemalik.tech

Static site for **Esmilemalik** — PromptEdge, a Vektor Matrix studio.
Prompt engineering and AI integration. No framework, no build dependencies beyond Python 3.

---

## The rule that governs this site

**No Dream Glare or Kahioja project — named or implied — ever appears on esmilemalik.tech.**
Not as a case study, not with permission, not in any form. Bio credibility stays generic:
roles, years and sectors, never company names or project specifics. LinkedIn may list the
employer roles normally; that is a separate context.

Approved bio line, used verbatim on the site:

> a decade of experience as a systems architect and CTO across African enterprise,
> e-commerce and security-technology sectors

A grep check for employer terms is part of the pre-deploy checklist below. Keep it passing.

---

## Structure

```
build.py              assembles src/ into static HTML at the root
src/layout.html       shared shell: <head>, header, nav, footer
src/pages/*.html      one body fragment per page, with a front-matter comment
assets/css/site.css   the entire stylesheet
assets/js/site.js     nav drawer, two-path chooser, contact mail composer
assets/img/           logo, favicon, Open Graph image
*.html                BUILD OUTPUT — do not edit by hand, it gets overwritten
robots.txt sitemap.xml
```

**Edit `src/`, never the root `.html` files.** They are generated.

## Build

```bash
python3 build.py
```

Each page in `src/pages/` starts with a small comment block that drives the layout:

```html
<!--
title: Page title shown in the tab and search results
desc:  Meta description, ~155 characters
nav:   library|orgs|method|about|contact   (omit on the homepage and 404)
slug:  output-filename.html
-->
```

## Preview locally

```bash
python3 serve.py
```

Then open http://localhost:8787.

## Deploy

The root of this folder is the whole site. Any static host works — Netlify, Vercel,
Cloudflare Pages, GitHub Pages, or plain nginx.

- Publish directory: the repo root
- Build command: `python3 build.py`
- 404 page: `404.html`
- Point `esmilemalik.tech` at the host and force HTTPS

Links are root-relative (`/prompt-library.html`), so the site must be served from a
domain root, not a subdirectory.

---

## Open items before launch

1. **Contact form has no backend.** It currently composes a pre-filled email via `mailto:`
   and opens the visitor's mail client. It works, but it leaks the address to scrapers and
   loses anyone without a configured mail app. Swap in Formspree, Netlify Forms or a small
   endpoint — the handler lives at the bottom of `assets/js/site.js`.
2. **Set up `hello@esmilemalik.tech`.** The site currently publishes a Gmail address because
   that is the address that exists. A domain address reads considerably better on a
   commercial site.
3. **No pricing anywhere.** Deliberate — none was specified, and inventing numbers would be
   worse than omitting them. Pack pricing is described as "set per pack at release".
4. **Placeholders are labelled as pending**, not dressed up as delivered work: demo builds,
   prompt-to-output pairs, the write-up series, and the Open For Business archive link.
   Replace each `.pending` block as the real thing ships.
5. **Open Graph image** is the logo on black. A purpose-made 1200×630 card would be better.

## Pre-deploy checklist

```bash
python3 build.py
grep -riE 'dream glare|kahioja|kahoja|absula|offender|biometric|criminal' *.html   # must return nothing
grep -riE 'ismailmalik|essmilemalik' *.html                                        # must return nothing
```
