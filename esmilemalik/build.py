#!/usr/bin/env python3
"""Assemble esmilemalik.tech from src/ into plain static HTML at the repo root.

Each file in src/pages/ is a body fragment topped with a small comment block:

    <!--
    title: Page title
    desc: Meta description
    nav: library|orgs|method|about|contact   (omit for the homepage)
    slug: prompt-library.html                (defaults to the filename)
    -->

Run:  python3 build.py
"""
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).parent
LAYOUT = (ROOT / "src" / "layout.html").read_text(encoding="utf-8")
PAGES = sorted((ROOT / "src" / "pages").glob("*.html"))

NAV_KEYS = ["library", "orgs", "method", "about", "contact"]
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


def build():
    if not PAGES:
        sys.exit("no pages found in src/pages/")
    for page in PAGES:
        meta, body = parse(page.read_text(encoding="utf-8"))
        slug = meta.get("slug", page.name)
        html = LAYOUT
        html = html.replace("{{TITLE}}", meta.get("title", "Esmilemalik"))
        html = html.replace("{{DESC}}", meta.get("desc", ""))
        html = html.replace("{{SLUG}}", "" if slug == "index.html" else slug)
        for key in NAV_KEYS:
            token = "{{NAV_" + key.upper() + "}}"
            html = html.replace(token, CURRENT if meta.get("nav") == key else "")
        html = html.replace("{{BODY}}", body)

        left = re.findall(r"\{\{[A-Z_]+\}\}", html)
        if left:
            sys.exit(f"{page.name}: unreplaced tokens {sorted(set(left))}")

        (ROOT / slug).write_text(html + "\n", encoding="utf-8")
        print(f"  built  {slug:<24} {len(html):>6} bytes")


if __name__ == "__main__":
    print("esmilemalik.tech")
    build()
    print("done.")
