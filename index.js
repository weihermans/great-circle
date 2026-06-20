// @flyvolo/great-circle — great-circle distance, bearing and midpoint.
// Zero dependencies. Built by VOLO (https://www.flyvolo.ai).

const R_KM = 6371.0088; // mean Earth radius (km)
const toRad = (d) => (d * Math.PI) / 180;
const toDeg = (r) => (r * 180) / Math.PI;

const UNITS = { km: 1, nm: 0.539956803, mi: 0.621371192, m: 1000 };

/**
 * Great-circle distance between two {lat, lon} points (haversine).
 * @param {{lat:number, lon:number}} a
 * @param {{lat:number, lon:number}} b
 * @param {"km"|"nm"|"mi"|"m"} [unit="nm"]
 * @returns {number}
 */
function distance(a, b, unit = "nm") {
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lon - a.lon);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  const km = 2 * R_KM * Math.asin(Math.min(1, Math.sqrt(h)));
  return km * (UNITS[unit] ?? UNITS.nm);
}

/** Initial bearing (degrees, 0–360) from a to b. */
function bearing(a, b) {
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const dLon = toRad(b.lon - a.lon);
  const y = Math.sin(dLon) * Math.cos(lat2);
  const x =
    Math.cos(lat1) * Math.sin(lat2) -
    Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
  return (toDeg(Math.atan2(y, x)) + 360) % 360;
}

/** Midpoint {lat, lon} along the great circle from a to b. */
function midpoint(a, b) {
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const dLon = toRad(b.lon - a.lon);
  const bx = Math.cos(lat2) * Math.cos(dLon);
  const by = Math.cos(lat2) * Math.sin(dLon);
  const lat3 = Math.atan2(
    Math.sin(lat1) + Math.sin(lat2),
    Math.sqrt((Math.cos(lat1) + bx) ** 2 + by ** 2),
  );
  const lon3 = toRad(a.lon) + Math.atan2(by, Math.cos(lat1) + bx);
  return { lat: toDeg(lat3), lon: ((toDeg(lon3) + 540) % 360) - 180 };
}

module.exports = { distance, bearing, midpoint };
