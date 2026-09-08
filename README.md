# Vela — quiet social prototype

Vela is a mobile-first installable PWA that tests a social primitive: staying close without creating reply debt.

## What works
- Onboarding around the “nothing waits for you” contract
- Room-style circle of up to 8 close people (not an inbox)
- Presence states: around / in my bubble / open to talk / busy / offline
- Open Door state
- Quiet Touch interaction
- Drop composer with persisted local moments
- Explicit Need action for the only interruption-worthy message class
- Moments view with no unread counts or backlog language
- Local persistence with `localStorage`
- Installable PWA + offline shell service worker

## Run
Any static server works:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Product contract
1. No unread counts
2. No read receipts
3. No typing indicators
4. No streaks
5. No follower/following numbers
6. No algorithmic feed
7. Silence never requires an apology
8. Only `Need` is allowed to interrupt

## Next production wiring
The UI is deliberately backend-agnostic. For a real multi-user build, wire auth + circles + presence + moments + device tokens to Supabase, then use Expo/WidgetKit for native lock/home-screen presence.
