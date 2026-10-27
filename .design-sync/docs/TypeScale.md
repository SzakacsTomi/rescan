---
category: Foundations
---

# TypeScale

The 26-step size ramp, each row labelled with its utility class and its computed size.
Documentation, not UI.

The ramp is finer than a stock t-shirt scale because headings move across three steps
between `sm` and `lg`. A dashboard lives in the `text-micro` → `text-body-lg` band; the
display and hero steps exist for marketing pages and will look wrong in a data view.

## Props

| Prop | Type | Default | Meaning |
|---|---|---|---|
| `upTo` | `string` | full ramp | Cap the ramp at this step, e.g. `"body-lg"`. |
| `sample` | `string` | brand sentence | Specimen text. |

```jsx
<TypeScale upTo="body-lg" sample="Sites under survey" />
```
