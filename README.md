# Makarius's 1st Birthday Invitation

Interactive digital invitation built with Next.js + Tailwind CSS.

```
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
```

## Adding photos
Drop images into `public/photos/` (jpg, jpeg, png or webp). Missing photos show a soft placeholder.

| File | Where it appears |
| --- | --- |
| `hero.*` | Hero portrait |
| `timeline-1..5.*` | A Year of Blessings |
| `month-1..12.*` | 12 Months of Blessings (Month 1 ? Month 12) |
| `journey-1..6.*` | Photo Journey (Beginning ? Today) |

Photos are detected at build time, so rebuild/redeploy after adding them.

## Notes
- Event details live in `src/lib/event.ts` (countdown targets Nov 7, 2026, 3:00 PM, UTC+8).
- Music never autoplays. To use your own licensed instrumental, put it at `public/music/celebration.mp3` (or .m4a/.ogg/.wav) and rebuild. Without a file, a gentle built-in tune is generated with the Web Audio API.
- RSVPs and blessings are saved in the visitor's browser (localStorage). To collect RSVPs yourself, set `NEXT_PUBLIC_RSVP_ENDPOINT` (e.g. a Formspree URL) and each RSVP is also POSTed there as JSON.
