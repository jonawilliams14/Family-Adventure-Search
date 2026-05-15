# Family Adventure Agent

Mobile-first static dashboard for weekend family adventure picks around Sacramento.

## Features

- Shows five toddler-friendly family adventure ideas at a time.
- Includes a `Refresh ideas` button that cycles through a larger pool when the current picks do not match the family's mood, nap window, budget, or weather tolerance.
- Keeps quick filters for free, morning, indoor backup, and market / food options.
- Provides direct event/source links and map links for each idea.

## Run locally

```powershell
python -m http.server 8787
```

Then open `http://localhost:8787` on this machine. For a phone on the same Wi-Fi, use this machine's local IP address with port `8787`.

## Weekly refresh flow

Open the source links at the bottom of the dashboard each Thursday night or Friday morning:

- Eventbrite family events
- Fever Sacramento
- Sacramento365 kids
- Sacramento Public Library events
- Fairytale Town events
- Sacramento museum calendars
- Sacramento parks departments
- Farmers markets and Downtown Grid listings

Update the `events` array in `index.html` with the best matches for the coming weekend.
