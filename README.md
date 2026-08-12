# Family Adventure Agent

Mobile-first static dashboard for weekend family adventure picks around Sunnyvale, the South Bay, and select bigger Bay Area events.

## Features

- Loads weekend activities from `data/events.json` so the site can update without changing the HTML.
- Searches Sunnyvale, Cupertino, San Jose, Milpitas, Mountain View, and larger Bay Area events worth the drive.
- Supports up to 50 weekend events in the data file, shown five at a time.
- Shows the last refresh time, loaded event count, and distinct source count so a Friday update is easy to verify.
- Prioritizes toddler-friendly family activities, festivals, new markets, farmers markets, food pop-ups, and food tasting events.
- Includes a `Refresh ideas` button that cycles through the larger pool when the current picks do not match the family's mood, nap window, budget, or weather tolerance.
- Keeps quick filters for free, morning, indoor backup, festivals, markets / food, and tastings.
- Provides direct event/source links, map links, source quality, score breakdowns, and planning cautions for each idea.

## Dynamic weekend refresh

The weekly Codex automation refreshes `data/events.json` every Friday morning for the coming weekend. It searches South Bay and Bay Area sources, scores toddler-friendly options, commits the updated JSON to `main`, and GitHub Pages redeploys the site.

The page should make a refresh verifiable at a glance:

- `generated_at` drives the visible last-updated timestamp.
- The number of loaded events is counted from `events`.
- `source_count` is shown when present; otherwise the page counts distinct `sourceName` values.

Each event should include source quality and planning metadata:

- `sourceName`: human-readable source, such as `San Jose Public Library`.
- `sourceType`: source category, such as `official`, `official calendar`, `curated calendar`, or `search result`.
- `confidence`: decimal from `0` to `1` for how reliable/specific the source match is.
- `startDateTime` and `endDateTime`: ISO timestamps with timezone offset for sorting and stale-event checks.
- `scoreBreakdown`: numeric component scores for `distance`, `toddlerFit`, `cost`, `weather`, `food`, and `timing`.
- `cautions`: short tags such as `crowded`, `parking-hard`, `needs-ticket`, `loud`, `late`, or `heat-risk`.

Primary search categories:

- Kids and family events
- Festivals and cultural fairs
- Farmers markets and new markets
- Food truck events and pop-ups
- Food, drink, and tasting events that are reasonable for families
- Library storytimes and early learning events
- Museums, parks, zoos, nature centers, and hands-on activities

Primary sources:

- City of Sunnyvale events calendar
- Cupertino Parks and Recreation events calendar
- Mountain View events and library calendars
- Milpitas events calendar
- Visit San Jose family-friendly listings
- San Jose Public Library events
- Bay Area Kids GO
- BayAreaKidsGuide.com calendar
- Eventbrite South Bay family, festival, and food/drink events
- Ticketmaster San Jose family events and children's shows
- AllEvents Sunnyvale and South Bay kids event discovery pages
- StubHub San Jose / Bay Area family, theatre, and show listings, cross-checked against primary sources when possible
- SF Station Bay Area family and children calendar
- Museum and zoo calendars
- Parks department calendars
- Farmers market calendars
- Larger Bay Area event calendars when an event is unusually strong for families

## Tests

Run the link checker before publishing event updates:

```powershell
npm test
```

The test reads `index.html` and `data/events.json`, extracts all HTTP(S) links, and verifies that each one resolves to an active webpage. It also runs automatically in GitHub Actions on pushes, pull requests, and manual workflow runs.

## Run locally

```powershell
python -m http.server 8787
```

Then open `http://localhost:8787` on this machine. For a phone on the same Wi-Fi, use this machine's local IP address with port `8787`.

## Manual refresh

If the automation needs a manual override, update `data/events.json` with the best matches for the upcoming weekend. Keep the same field names so `index.html` can render the page without code changes. Use tags such as `free`, `morning`, `indoor`, `outdoor`, `festival`, `market`, `food`, and `tasting` so filters work correctly. Include `startDateTime`, `endDateTime`, `sourceName`, `sourceType`, `confidence`, `scoreBreakdown`, and `cautions` whenever possible; the page still falls back to older fields if one item is incomplete.
