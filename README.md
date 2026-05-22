# Family Adventure Agent

Mobile-first static dashboard for weekend family adventure picks around Sacramento.

## Features

- Loads weekend activities from `data/events.json` so the site can update without changing the HTML.
- Searches Sacramento plus roughly a 45-minute driving radius from Fruitdale.
- Supports up to 50 weekend events in the data file, shown five at a time.
- Prioritizes toddler-friendly family activities, festivals, new markets, farmers markets, food pop-ups, and food tasting events.
- Includes a `Refresh ideas` button that cycles through the larger pool when the current picks do not match the family's mood, nap window, budget, or weather tolerance.
- Keeps quick filters for free, morning, indoor backup, festivals, markets / food, and tastings.
- Provides direct event/source links and map links for each idea.

## Dynamic weekend refresh

The weekly Codex automation refreshes `data/events.json` every Friday morning for the coming weekend. It searches Sacramento-area and nearby regional sources, scores toddler-friendly options, commits the updated JSON to `main`, and GitHub Pages redeploys the site.

Primary search categories:

- Kids and family events
- Festivals and cultural fairs
- Farmers markets and new markets
- Food truck events and pop-ups
- Food, drink, and tasting events that are reasonable for families
- Library storytimes and early learning events
- Museums, parks, zoos, nature centers, and hands-on activities

Primary sources:

- Eventbrite family, festival, and food/drink events
- Fever Sacramento
- Sacramento365 kids, festivals, and food/wine
- Sacramento Public Library events
- Fairytale Town events
- Museum and zoo calendars
- Parks department calendars
- Farmers market calendars
- Downtown Grid food/drink and family listings
- Nearby city calendars within about 45 minutes, including Davis, Elk Grove, Folsom, Roseville, Rancho Cordova, Carmichael, Woodland, and West Sacramento

## Run locally

```powershell
python -m http.server 8787
```

Then open `http://localhost:8787` on this machine. For a phone on the same Wi-Fi, use this machine's local IP address with port `8787`.

## Manual refresh

If the automation needs a manual override, update `data/events.json` with the best matches for the upcoming weekend. Keep the same field names so `index.html` can render the page without code changes. Use tags such as `free`, `morning`, `indoor`, `outdoor`, `festival`, `market`, `food`, and `tasting` so filters work correctly.
