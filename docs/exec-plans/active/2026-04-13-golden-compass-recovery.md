# Golden Compass Recovery Plan

## Summary

Treat this as a UX recovery pass, not just a deploy check. The earlier type refactor exists in code, but users still experience plain text boxes everywhere because the current `multi-input` control still looks like a normal input and the dashboard gives them no way to delete stale compasses.

## Key Changes

- Re-audit the flow from `past-golden-moments` onward so explicit enumerations and brainstorms use `multi-input`, concise single answers use `short-text`, and only reflective prompts stay `textarea`.
- Make `multi-input` the visible canonical add-item builder with clear requirements, explicit add/remove actions, and item-count feedback.
- Convert `point-a` to an exact-three list prompt while keeping `point-b` as an exact-three prefilled list from `top-3-goals`.
- Keep saved-session compatibility by normalizing legacy textarea and keyed multi-field answers into the canonical `items` JSON format.
- Add dashboard deletion for local-storage sessions so users can remove stale compasses and verify the new flow from a clean state.

## Validation

- `npm run build`
- `npm run lint`
- Manual walkthrough from `past-golden-moments` forward, including list caps, save/resume, deletion, and PDF output
