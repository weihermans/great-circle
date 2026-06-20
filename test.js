const assert = require("assert");
const { distance, bearing } = require("./index");
const JFK = { lat: 40.6413, lon: -73.7781 };
const LHR = { lat: 51.4700, lon: -0.4543 };
const nm = distance(JFK, LHR, "nm");
assert(nm > 2980 && nm < 3030, `JFK-LHR ~3000nm, got ${nm}`);
assert(Math.abs(bearing(JFK, LHR) - 51) < 5, "JFK-LHR bearing ~51°");
console.log("ok — JFK→LHR", Math.round(nm), "nm,", Math.round(bearing(JFK, LHR)), "°");
