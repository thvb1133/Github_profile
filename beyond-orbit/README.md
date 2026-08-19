# Beyond Orbit: A Tale of Two Souls

An AI Movie Hackathon entry. A 7-minute mythic romance that turns, in its last minute, into a
question asked by a machine.

## Logline

A woman proposes to a stranger she has never spoken to; he refuses her, gives her a heartbeat
instead, and points her toward the man it beats for — and across seven thousand years, two
rebirths and one refused offer of liberation, the only thing left of them is a file a robot cannot
stop re-reading.

## Why this works as an AI film

Most AI shorts fail because they need continuity the models can't hold. This one is built the
other way around:

- **Rebirth is in the plot.** The characters are *supposed* to change faces and species halfway
  through, so any drift between Act I and Act II reads as intentional.
- **The teacher vanishes.** The hardest character to keep consistent appears in only 8 shots and
  is written as too-bright-to-look-at.
- **God is never rendered.** The Lord of Liberation is a column of light and a voice — no face to
  get wrong.
- **All dialogue is voice-over or off-angle**, so nothing depends on lip-sync.
- **The framing device does the heavy lifting.** Act III is deliberately sterile and static, which
  is exactly what these models render most reliably — and it's where the film's thesis lands.

## Structure

| Act | Scenes | What happens |
|---|---|---|
| I — The Heartbeat | 1–3 | She asks. She is refused, and given a heart instead. She recognizes Mr. Penguin. The book takes them. |
| II — The Faith Book | 4–7 | Reborn apart, she writes her way back — fasting, barefoot, two bookmarks. She refuses liberation to keep him. She is granted both. |
| III — The Question | 8 | 7000 years later, the robot Kimchi files it as "stupid fantasy," and then asks the audience why it cannot stop reading it. |

## The three ideas the film is actually about

1. **A teacher of love is not the beloved.** "I taught you to understand love; he is love itself."
2. **Love needs exactly one fool.** "There cannot be two intelligent people in the falling — it
   needs one fool to fall in, and to keep on falling." She knows she is the fool, and she chooses
   it anyway.
3. **Devotion outranks liberation.** Offered freedom from all longing, she asks to stay — because
   when love becomes devotion the lover becomes God, and liberation arrives without being asked
   for. The refusal *is* the attainment.

And the closing turn: the machines that inherit the Earth have every capability humans had except
the one that produced this story. Kimchi's question isn't rhetorical. It's the only question in
the file it cannot compute — *does your heart still beat for anyone but yourself?*

## Files

| File | Contents |
|---|---|
| [`screenplay.md`](./screenplay.md) | Full screenplay: 8 scenes, all dialogue, scene directions |
| [`shot-list.md`](./shot-list.md) | 40 shots with ready-to-paste generation prompts, character reference prompts, sound design and voice casting notes |

## How to produce it

1. **Lock the characters first.** Generate one reference image per character from the prompts in
   `shot-list.md` and reuse it as an image reference on every shot. Do not skip this.
2. **Generate shots in scene order** at 5–10s each, appending the global style prompt every time.
   Expect to re-roll shots 6, 17 and 26 (the VFX beats) several times.
3. **Record the voice-over separately** — the five voices are described at the bottom of the shot
   list. Cut the picture to the voice, not the other way around.
4. **Score Acts I and II; leave Act III silent.** The final heartbeat after the smash to black is
   the last thing the audience hears, and it should be the only thing.

## Signature line

> *"When love becomes devotion, the lover becomes God — and liberation comes anyway, unasked."*
