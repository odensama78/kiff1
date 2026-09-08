# Vela product spec — v0.1

## Thesis
Messaging systems convert affection into obligations. Vela separates *presence* from *conversation*.

## Core loop
1. Open Vela and see people, not messages.
2. Understand someone's current bandwidth without asking.
3. Send a `touch` if you simply thought of them.
4. Leave a `drop` if you want to share something.
5. Open your `door` when a real-time conversation is welcome.
6. Use `need` only when a response is genuinely requested.

## Notification rules
- Touch: no banner, no sound, no badge. Appears passively in-app/widget.
- Drop: no banner by default; appears in ambient recap/widget.
- Door opened: never pushes everybody. It changes passive availability.
- Need: one conventional push notification.
- System never says "unread", "missed", "catch up", "seen", or "last active".

## MVP entities
- users
- circles
- circle_members
- presence
- moments
- touches
- needs
- devices

## Success metrics
- weekly reciprocal presence between pairs
- touches sent per active pair
- drops consumed without a reply
- percentage of drops that create guilt-driven follow-up (qualitative; target down)
- Open Door → real conversation conversion
- 4-week circle retention

## Anti-metrics
Do not optimize notification opens, daily streaks, time in app, infinite sessions, or message volume.
