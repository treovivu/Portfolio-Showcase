# Portfolio soundtrack

The hero's waveform card doubles as a small music player (direction: **Cozy Lo-fi × Soft Piano**).
It never autoplays: nothing is downloaded until a visitor presses the vinyl button. Once they do,
a compact dock keeps the pause button in reach after they scroll past the hero.

Until a track is configured, the player is **hidden on the live site** (the card shows "Now exploring"
as before). In local development it appears with the button disabled and the hint "Add a track".

## Adding a track

1. **Pick a track you're allowed to use.** Good sources for licensed lo-fi / soft piano instrumentals:
   - [Pixabay Music](https://pixabay.com/music/search/lofi%20piano/): free under the Pixabay Content License, no credit required.
   - [YouTube Audio Library](https://studio.youtube.com/): check each track's license; some require attribution.
   - [Free Music Archive](https://freemusicarchive.org/): filter by Creative Commons license (CC BY needs a credit).
   - A track you made or commissioned yourself.

   Read the license on the track's own page before using it, and keep a copy of it.

2. **Keep it light.** MP3 at 128–160 kbps, ideally 2–3 minutes (it loops) and under ~5 MB.

3. **Add the file** to `public/audio/`, for example:

   ```
   artifacts/vy-vu-portfolio/public/audio/cozy-lofi-soft-piano.mp3
   ```

4. **Point the player at it** in `src/lib/site.ts`:

   ```ts
   export const soundtrack = {
     src: `${import.meta.env.BASE_URL}audio/cozy-lofi-soft-piano.mp3`,
     title: 'Cozy Lo-fi × Soft Piano',   // or the track's real title
     artist: 'Artist name',              // shown next to the title; leave '' to hide
     credit: '“Track” by Artist · CC BY 4.0', // shown under the player when the license asks for attribution
   };
   ```

That's it. The waveform only animates while the music is playing, the vinyl spins while it plays, and
both stay still for visitors who prefer reduced motion. If the file fails to load, the button disables
itself instead of breaking the page.
