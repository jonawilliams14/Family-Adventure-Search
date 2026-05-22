# Family Adventure Agent

Mobile-first static dashboard for weekend family adventure picks around Sacramento.

## Features

- Loads weekend activities from `data/events.json` so the site can update without changing the HTML.
- Shows five toddler-friendly family adventure ideas at a time.
- Includes a `Refresh ideas` button that cycles through a larger pool when the current picks do not match the family's mood, nap window, budget, or weather tolerance.
- Keeps quick filters for free, morning, indoor backup, and market / food options.
- Provides direct event/source links and map links for each idea.

## Dynamic weekend refresh

The weekly Codex automation refreshes `data/events.json` every Friday morning for the coming weekend. It searches Sacramento-area family event sources, scores toddler-friendly options, commits the updated JSON to `main`, and GitHub Pages redeploys the site.

Primary sources:

- Eventbrite family events
- Fever Sacramento
- Sacramento365 kids
- Sacramento Public Library events
- Fairytale Town events
- Sacramento museum calendars
- Sacramento parks departments
- Farmers markets and Downtown Grid listings

## Run locally

```powershell
python -m http.server 8787
```

Then open `http://localhost:8787` on this machine. For a phone on the same Wi-Fi, use this machine's local IP address with port `8787`.

## Manual refresh

If the automation needs a manual override, update `data/events.json` with the best matches for the upcoming weekend. Keep the same field names so `index.html` can render the page without code changes.
