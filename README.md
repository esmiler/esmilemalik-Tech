# esmilemalik.tech

Two sites, one repo, one domain.

> **Folder names:** `esmilemalik/` holds the main site and `Scammer/` holds the sound
> subdomain — named as requested. Neither name appears anywhere in the deployed output;
> they are directory names only. Rename freely with `git mv`.

| Directory | Deploys to | What it is |
|---|---|---|
| [`esmilemalik/`](esmilemalik) | `esmilemalik.tech` | **PromptEdge** — prompt engineering and AI integration, under Vektor Matrix |
| [`Scammer/`](Scammer) | `sound.esmilemalik.tech` | **The Peaceful Sound Method** — AI-assisted soundscapes, powered by Esmilemalik |

Both are plain static sites: no framework, no dependencies beyond Python 3, no build step
heavier than string substitution. Each has its own `build.py`, its own stylesheet, and its own
README with the rules that govern it.

---

## Build both

```bash
python3 esmilemalik/build.py && python3 Scammer/build.py
```

## Preview

```bash
python3 esmilemalik/serve.py
```

```bash
python3 Scammer/serve.py
```

`esmilemalik/` serves on :8787, `Scammer/` on :8788.

---

## Deploying

Each directory is an independent static site rooted at its own directory. Links inside each are
root-relative, so **each must be served from its own domain root** — `esmilemalik/` at
`esmilemalik.tech`, `Scammer/` at `sound.esmilemalik.tech`. Do not serve either from a
subdirectory.

On Netlify, Vercel or Cloudflare Pages, create **two projects from this one repo**:

| Project | Base directory | Build command | Publish directory |
|---|---|---|---|
| esmilemalik.tech | `esmilemalik` | `python3 build.py` | `esmilemalik` |
| sound.esmilemalik.tech | `Scammer` | `python3 build.py` | `Scammer` |

Then point the apex/`www` DNS at the first and a `sound` CNAME at the second.

---

## The two rules that matter

1. **`esmilemalik/` must never name Dream Glare or Kahioja.** Not as a case study, not in any form.
   There is a grep check in [`esmilemalik/README.md`](esmilemalik/README.md) — keep it passing.
2. **`Scammer/` must never make a health claim.** "Supports calm", never "cures" or "therapy",
   and AI-assisted production is always disclosed. See [`Scammer/README.md`](Scammer/README.md).

## Editing

Edit `src/` in either site — the `.html` files at each site root are **build output** and get
overwritten.
