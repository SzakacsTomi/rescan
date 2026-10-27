---
category: Foundations
---

# ColorPalette

Reference card for Rescan's two colour families. Documentation, not UI — nothing in
`app/components/` looks like this.

Values are read from the live document at render time, so the card always shows what the
stylesheet actually resolves rather than a copy that can drift.

## Families

**Brand surfaces** are fixed: identical in light and dark. Use for signature moments.
`ink` `ink-soft` `accent-sky` `accent-mid` `fit` `paper` `hairline`

**Semantic roles** flip under `.dark`. Use for dashboard chrome — surfaces, text, borders,
form controls. `background` `foreground` `card` `primary` `muted` `destructive` `border`
`input` `ring` and their `-foreground` pairs.

## Props

| Prop | Type | Default | Meaning |
|---|---|---|---|
| `family` | `'brand' \| 'semantic' \| 'all'` | `'all'` | Which family to show. |

```jsx
<ColorPalette family="brand" />
```

Wrap in an element carrying `class="dark"` to see the semantic roles in their dark values —
dark mode here is a class variant, never a media query.
