# The Sound Branch

A separate branch of the business from **esmilemalik.tech**, which stays singularly about
PromptEdge and AI integration. This is the soundscape mission: *peace of mind through sound*.

Different audience, different voice, different site. Nothing here links to the tech practice by
name, and nothing there links here — the About page refers to it only as "another practice with
its own home."

---

## ⚠ Three decisions still open

These are yours, and none of them is baked in deeper than one file.

### 1. The branch name

Currently **"The Peaceful Sound Method"** — the blueprint's own recommendation, on the grounds
that it is the most ownable phrase in the plan. It is defined in exactly one place:

```python
# build.py
CONFIG = {
    "brand": "The Peaceful Sound Method",
    "brand_short": "Peaceful Sound",
    ...
}
```

Change those values, run `python3 build.py`, and the whole site is renamed. The other
candidates on the table are **Esmilemalik Sound** and **Sound Mission**.

### 2. Was "binaural" meant literally?

**The site assumes not**, and says nothing about binaural beats anywhere. That is the safe
default, because true binaural beats are calibrated dual-tone entrainment audio — a different
technique from what Suno produces, which is ambient and musical.

If you meant it literally, genuine binaural content needs a dedicated tone generator layered
under the ambient bed, and any entrainment claim needs the same non-medical caution as
everything else here. Tell me and I will add the tooling and the page.

If you meant it loosely — immersive, spatial, enveloping — the site already covers that and
nothing needs to change.

### 3. Own domain, or a section of esmilemalik.tech?

Built standalone so both stay possible. `CONFIG["domain"]` is a placeholder, and `sitemap.xml`
says `DOMAIN_TBD`. Set both when you decide.

---

## The language rules this site follows

Non-negotiable, and worth knowing before you edit any copy.

- **Say:** "supports calm", "creates a peaceful atmosphere", "designed for reflection".
- **Never say:** "cures anxiety", "sleep therapy", "heals trauma" — or any therapeutic claim,
  unless licensed clinicians are standing behind it and the page says who they are.
- **Always disclose:** the credit is *"{ARTIST} — AI-assisted production and curation."*
  Spotify's Aug 2026 "AI Persona" badges target fake AI *identities*, not honest production
  disclosure, so this framing is safe and now officially supported.
- **Never imply stream tactics.** No clip-looping, no artificial streaming. The homepage says
  so outright, deliberately.

## Structure

```
build.py                 assembles src/ into static HTML; holds the brand name
src/layout.html          shared shell
src/pages/*.html         one body fragment per page
assets/css/sound.css     the whole stylesheet (light + dark)
assets/js/sound.js       nav, brief-form mail composer, ownership gate
ops/                     rights ledger, track brief template, scaffolding script
*.html                   BUILD OUTPUT — do not edit, it gets overwritten
```

## Build & preview

```bash
python3 build.py
```

```bash
python3 serve.py
```

## Starting a new track

```bash
python3 ops/new-track.py "Evening Release 01"
```

Creates `tracks/<id>/brief.md` from the template and appends a ledger stub. See
[ops/README.md](ops/README.md) — particularly the free-plan rule, which is the one that
catches people out.

---

## Pages

| Page | Purpose |
|---|---|
| `index.html` | Mission, the five moments, the method, Story Into Sound, the honesty section |
| `sound-journeys.html` | The five collections in depth, with pacing and intent per collection |
| `method.html` | Arrive / Release / Reconnect, the six-step production workflow, the prompt template |
| `story-into-sound.html` | The commission service and its intake brief, with the ownership warranty |
| `licensing.html` | Five licensing use cases, plus the For Organizations section |
| `about.html` | The mission and the six governing principles |
| `contact.html` | General enquiry |

**Deferred deliberately:** *Listen* and *Journal* from the blueprint's structure. Both need
content that does not exist yet — a Listen page with no catalogue is worse than a homepage
section that says the catalogue is coming, which is what is there now. Add them when the first
collection ships.

## Open items before launch

1. **Neither form has a backend.** Both compose a pre-filled email via `mailto:`. The
   ownership warranty is enforced client-side only — when you add a real endpoint, enforce it
   server-side too, since that checkbox is the thing protecting you.
2. **Email is the Gmail address.** A branded address on whichever domain you choose reads
   better.
3. **No pricing.** Deliberate — the blueprint says tier by complexity but sets no numbers, and
   inventing them would be worse than the honest "quoted per brief" the site says now.
4. **No logo or OG image.** The tech brand's orange circuit mark is wrong for this, so nothing
   was reused. The wordmark is currently set type.
5. **Distribution not set up.** RouteNote is the best-documented Payoneer fit for your stack;
   Bandcamp payout availability for Nigeria still needs confirming with their support directly.
