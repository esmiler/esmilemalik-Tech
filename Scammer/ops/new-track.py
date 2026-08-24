#!/usr/bin/env python3
"""Scaffold a new track: brief file + rights-ledger stub row.

    python3 ops/new-track.py "Evening Release 01"
"""
import csv
import datetime
import pathlib
import re
import sys

OPS = pathlib.Path(__file__).parent
ROOT = OPS.parent
LEDGER = OPS / "rights-ledger.csv"
TEMPLATE = OPS / "track-brief-template.md"


def slugify(name):
    return re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")


def main():
    if len(sys.argv) < 2:
        sys.exit('usage: new-track.py "Working Title"')

    title = " ".join(sys.argv[1:])
    track_id = slugify(title)
    today = datetime.date.today().isoformat()

    folder = ROOT / "tracks" / track_id
    if folder.exists():
        sys.exit(f"{folder} already exists")
    folder.mkdir(parents=True)

    brief = TEMPLATE.read_text(encoding="utf-8").replace("<TRACK_ID>", track_id)
    (folder / "brief.md").write_text(brief, encoding="utf-8")

    with LEDGER.open("r", newline="", encoding="utf-8") as fh:
        header = next(csv.reader(fh))
    row = {k: "" for k in header}
    row.update({
        "track_id": track_id,
        "working_title": title,
        "creation_date": today,
        "commercial_status": "needs-review",
    })
    with LEDGER.open("a", newline="", encoding="utf-8") as fh:
        csv.DictWriter(fh, fieldnames=header).writerow(row)

    print(f"created  tracks/{track_id}/brief.md")
    print(f"ledger   stub row added — set suno_plan BEFORE you generate")


if __name__ == "__main__":
    main()
