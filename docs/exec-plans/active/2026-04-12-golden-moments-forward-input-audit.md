# Golden Moments-Forward Input Audit

## Summary

Refactor the Golden Compass flow from `past-golden-moments` onward so prompt structure drives input choice: enumerations and brainstorms use the add-item list flow, concise single answers use `short-text`, and only reflective long-form prompts remain `textarea`. Keep saved-session compatibility by normalizing legacy textarea and keyed multi-field answers into the canonical list format.

## Key Changes

- Add list metadata to screens so the shared add-item control can enforce exact-count and bounded list prompts.
- Convert post–Golden Moments list-style prompts from `textarea` or `multi-short-text` to `multi-input`.
- Add normalization helpers so list screens can read legacy `main` text or historical keyed values like `goal1/goal2/goal3`.
- Update prefill, forgiveness, and PDF export logic to use normalized list values.
- Verify the refactor with build, lint awareness, and a manual walkthrough from Golden Moments to the end of the flow.

## Validation

- `npm run build`
- `npm run lint` with no new lint regressions in touched files
- Manual check of list caps, save/resume behavior, and PDF output for converted screens
