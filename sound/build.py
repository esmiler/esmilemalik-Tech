#!/usr/bin/env python3
"""Assemble the Sound Branch site from src/ into plain static HTML at the root.

BRANCH NAME IS NOT YET SETTLED. It lives in CONFIG below and nowhere else —
change these three values and rebuild to rename the entire site.

Each file in src/pages/ is a body fragment topped with a comment block:

    <!--
    title: Page title
    desc:  Meta description
    nav:   journeys|method|story|licensing|about|contact   (omit on home/404)
    slug:  sound-journeys.html                             (defaults to filename)
    -->

Run:  python3 build.py
"""
import pathlib
import re
import sys

# --------------------------------------------------------------------------
# Branch identity — the one place the name is defined.
# Candidates on the table: "The Peaceful Sound Method" · "Esmilemalik Sound"
# · "Sound Mission". Current value follows the blueprint's own recommendation.
# --------------------------------------------------------------------------
CONFIG = {
    "brand": "The Peaceful Sound Method",
    "brand_short": "Peaceful Sound",
    "domain": "sound.esmilemalik.tech",
    "email": "esmailmalik86@gmail.com",
    "artist": "Esmilemalik",
}

ROOT = pathlib.Path(__file__).parent
LAYOUT = (ROOT / "src" / "layout.html").read_text(encoding="utf-8")
PAGES = sorted((ROOT / "src" / "pages").glob("*.html"))

NAV_KEYS = ["journeys", "method", "story", "licensing", "about", "contact"]
CURRENT = ' aria-current="page"'
FRONT = re.compile(r"^\s*<!--(.*?)-->", re.S)


def parse(text):
    m = FRONT.match(text)
    if not m:
        sys.exit("missing front matter comment block")
    meta = {}
    for line in m.group(1).strip().splitlines():
        if ":" in line:
            k, v = line.split(":", 1)
            meta[k.strip().lower()] = v.strip()
    return meta, text[m.end():].strip()


def apply_config(html):
    for key, value in CONFIG.items():
        html = html.replace("{{" + key.upper() + "}}", value)
    return html


def build():
    if not PAGES:
        sys.exit("no pages found in src/pages/")
    for page in PAGES:
        meta, body = parse(page.read_text(encoding="utf-8"))
        slug = meta.get("slug", page.name)

        html = LAYOUT
        html = html.replace("{{BODY}}", body)
        html = apply_config(html)
        html = html.replace("{{TITLE}}", apply_config(meta.get("title", CONFIG["brand"])))
        html = html.replace("{{DESC}}", apply_config(meta.get("desc", "")))
        html = html.replace("{{SLUG}}", "" if slug == "index.html" else slug)
        for key in NAV_KEYS:
            html = html.replace("{{NAV_" + key.upper() + "}}",
                                CURRENT if meta.get("nav") == key else "")

        left = re.findall(r"\{\{[A-Z_]+\}\}", html)
        if left:
            sys.exit(f"{page.name}: unreplaced tokens {sorted(set(left))}")

        (ROOT / slug).write_text(html + "\n", encoding="utf-8")
        print(f"  built  {slug:<26} {len(html):>6} bytes")


if __name__ == "__main__":
    print(f"{CONFIG['brand']} — sound branch")
    build()
    print("done.")
