# esmilemalik.tech

Two sites, one repo, one domain.

| Directory | Deploys to | What it is |
|---|---|---|
| [`www/`](www) | `esmilemalik.tech` | **PromptEdge** — prompt engineering and AI integration, under Vektor Matrix |
| [`sound/`](sound) | `sound.esmilemalik.tech` | **The Peaceful Sound Method** — AI-assisted soundscapes, powered by Esmilemalik |

Both are plain static sites: no framework, no dependencies beyond Python 3, no build step
heavier than string substitution. Each has its own `build.py`, its own stylesheet, and its own
README with the rules that govern it.

---

## Build both

```bash
python3 www/build.py && python3 sound/build.py
```

## Preview

```bash
python3 www/serve.py
```

```bash
python3 sound/serve.py
```

`www` serves on :8787, `sound` on :8788.

---

## Deploying

Each directory is an independent static site rooted at its own directory. Links inside each are
root-relative, so **each must be served from its own domain root** — `www/` at
`esmilemalik.tech`, `sound/` at `sound.esmilemalik.tech`. Do not serve either from a
subdirectory.

On Netlify, Vercel or Cloudflare Pages, create **two projects from this one repo**:

| Project | Base directory | Build command | Publish directory |
|---|---|---|---|
| esmilemalik.tech | `www` | `python3 build.py` | `www` |
| sound.esmilemalik.tech | `sound` | `python3 build.py` | `sound` |

Then point the apex/`www` DNS at the first and a `sound` CNAME at the second.

---

## The two rules that matter

1. **`www/` must never name Dream Glare or Kahioja.** Not as a case study, not in any form.
   There is a grep check in [`www/README.md`](www/README.md) — keep it passing.
2. **`sound/` must never make a health claim.** "Supports calm", never "cures" or "therapy",
   and AI-assisted production is always disclosed. See [`sound/README.md`](sound/README.md).

## Editing

Edit `src/` in either site — the `.html` files at each site root are **build output** and get
overwritten.
