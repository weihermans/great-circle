# @flyvolo/great-circle

[![license](https://img.shields.io/badge/license-MIT-blue)](./LICENSE)

Great-circle **distance**, **bearing** and **midpoint** between coordinates — the haversine math behind every flight-distance estimate. Zero dependencies.

Part of [**VOLO**](https://www.flyvolo.ai)'s open aviation toolkit.

```js
const { distance, bearing } = require("@flyvolo/great-circle");

const JFK = { lat: 40.6413, lon: -73.7781 };
const LHR = { lat: 51.4700, lon: -0.4543 };

distance(JFK, LHR, "nm"); // → 2991  (nautical miles)
distance(JFK, LHR, "km"); // → 5540
bearing(JFK, LHR);        // → 51    (degrees, initial bearing)
```

## API

| Function | Returns |
|---|---|
| `distance(a, b, unit?)` | great-circle distance — `unit` ∈ `"nm" \| "km" \| "mi" \| "m"` (default `nm`) |
| `bearing(a, b)` | initial bearing in degrees (0–360) |
| `midpoint(a, b)` | `{ lat, lon }` of the great-circle midpoint |

Points are `{ lat, lon }` in decimal degrees.

## About

Built by [VOLO](https://www.flyvolo.ai) — the world's first agent-native private aviation platform. See more open tools and the live charter API at [flyvolo.ai/open-source](https://www.flyvolo.ai/open-source).

## License

MIT © [VOLO Technologies Pte. Ltd.](https://www.flyvolo.ai)
