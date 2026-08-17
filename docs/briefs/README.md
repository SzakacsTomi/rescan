# Client copy-briefs

Verbatim transcriptions of the six copy-briefs the client sent (originally PDFs
generated from ChatGPT Canvas, received 2026-08-16).

These are the **source of truth for page structure and wording**. When building or
reshaping a page, read its brief first — section order, headlines and CTA labels come
from here, not from memory or from what the current page happens to say.

| File | Route |
|---|---|
| [`home.md`](home.md) | `/` |
| [`retail-chains.md`](retail-chains.md) | `/retail-chains` |
| [`logistics-warehouses.md`](logistics-warehouses.md) | `/logistics-warehouses` |
| [`why-rescan.md`](why-rescan.md) | `/why-rescan` |
| [`projects.md`](projects.md) | `/projects` |
| [`contact.md`](contact.md) | `/contact` |

## How to read them

- **Headlines and CTA labels are literal.** Where a brief gives a sentence, use that
  sentence. Where it gives a CTA label ("Discuss my project"), use it exactly — several
  briefs explicitly ban the obvious alternatives.
- **`[Square brackets]` are content the client still owes us.** These become
  `[[TODO: …]]` markers in `messages/*.json` — see the Placeholders section of
  `AGENTS.md`. Never fill them with invented numbers or plausible-sounding filler.
- **"Implementation Note" blocks are constraints, not suggestions.** They are where the
  client says what *not* to do, and they are the most commonly violated part of a brief.

## Context

The client's covering message:

> "kis változás történt és csatolom a különböző copy-kat amiket használhatunk mind
> start. a cél az hogy még jobban leszűkíteni a fókuszt hogy mivel akarunk dolgozni"

Two things follow from it. The briefs are a **starting point**, not final locked copy —
so wording can be adjusted where a brief is silent. And the point of the exercise is
**narrowing the focus**: Retail Chains and Logistics Warehouses are the whole target
market now, which is why no brief mentions the other sectors the site currently sells.

Two current pages have no brief: `/about` (kept as-is) and `/model-production` (removed
from navigation, route retained). See `OPEN-ITEMS.md`.
