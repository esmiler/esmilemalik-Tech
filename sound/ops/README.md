# Operations

Three things live here, and all three are load-bearing rather than nice-to-have.

## `rights-ledger.csv`

One row per track, filled in **as the track is made** — not retroactively.

| Column | What goes in it |
|---|---|
| `track_id` | Unique code. Use the same code in filenames, artwork and the landing page URL. |
| `working_title` / `final_title` | Both, because they diverge and the paperwork needs to survive that. |
| `creation_date` | The date the audio was generated. |
| `suno_plan` | The plan **active at the moment of generation** — `free`, `pro`, `premier`. |
| `final_prompt` | The prompt as actually used. |
| `prompt_iterations` | Major variants tried on the way there. |
| `human_materials` | Original lyrics, melodies, field recordings, spoken words — **including anything a Story Into Sound client supplied.** |
| `ai_output_ids` | Links or IDs for the source generations. |
| `editing_log` | Arrangement, mixing, mastering, every human change made. |
| `contributors` | Names and what they permitted. |
| `commercial_status` | `personal-only`, `commercial-eligible`, or `needs-review`. |
| `client_license` | Media, duration, territory, exclusivity, permitted edits. |

**The rule that catches people out:** a track generated on the free plan is personal-use only,
and subscribing later does **not** retroactively license it. If `suno_plan` says `free`, then
`commercial_status` is `personal-only` — permanently. Regenerate it on a paid plan if you need
it commercially.

Distributors now fingerprint AI-generated audio and can ask for proof of a commercial licence.
This file plus your plan receipts is that proof.

## `track-brief-template.md`

Copy per track. The first line — the one-sentence human intention — gets written before any
software is opened. That is the point of it.

## `new-track.py`

```bash
python3 ops/new-track.py "Evening Release 01"
```

Creates `tracks/<track_id>/` with a brief from the template, and appends a stub row to the
ledger for you to fill in as you go.
