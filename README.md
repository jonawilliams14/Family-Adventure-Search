# South Bay Family Adventure Agent

Mobile-first static dashboard for toddler-friendly weekend family adventure picks around San Jose and the South Bay.

## Branch

This version lives on `codex/san-jose-events` so the Sacramento dashboard on `main` stays untouched.

## Run locally

```powershell
python -m http.server 8787
```

Then open `http://localhost:8787` on this machine. For a phone on the same Wi-Fi, use this machine's local IP address with port `8787`.

## Weekly refresh flow

Open the source links at the bottom of the dashboard each Thursday night or Friday morning:

- Visit San Jose family events
- San Jose Public Library storytimes
- Santa Clara City Library kids events
- Children's Discovery Museum of San Jose
- Happy Hollow Park & Zoo
- History San Jose / History Park
- South Bay farmers markets
- Eventbrite and Fever family events

Update the `events` array in `index.html` with the best five matches for the coming weekend.
