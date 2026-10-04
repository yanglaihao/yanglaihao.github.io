const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");
const source = fs.readFileSync(path.join(root, "script.js"), "utf8");
const start = source.indexOf("const visitorBaselineUrl");
const end = source.indexOf('themeButton?.addEventListener("click"', start);
assert.ok(start >= 0 && end > start, "the visitor statistics code must be available for behavioral checks");
const visitorCode = source.slice(start, end);

async function runScenario({ protocol = "https:", hostname = "yanglaihao.github.io", stored = {}, fetcher, storageBlocked = false, fastTimeouts = false } = {}) {
  const elements = {
    busuanzi_value_site_pv: { textContent: "1,163" },
    busuanzi_value_site_uv: { textContent: "830" },
  };
  const container = { dataset: {}, setAttribute(key, value) { this[key] = value; } };
  const requests = [];
  const storage = new Map(Object.entries(stored));
  const context = vm.createContext({
    currentLanguage: "zh", Intl, URL, URLSearchParams, AbortController, console,
    window: { location: { protocol, hostname, search: "" }, setTimeout: fastTimeouts ? (callback) => setTimeout(callback, 5) : setTimeout, clearTimeout },
    document: {
      getElementById: (id) => elements[id],
      querySelector: () => container,
      createElement: () => ({ remove() {} }),
      head: { appendChild() { throw new Error("a blocked legacy JSONP service must not be needed to display saved totals"); } },
    },
    localStorage: {
      getItem: (key) => { if (storageBlocked) throw new Error("storage blocked"); return storage.get(key) || null; },
      setItem: (key, value) => { if (storageBlocked) throw new Error("storage blocked"); storage.set(key, value); },
    },
    fetch: async (url, options) => {
      requests.push(String(url));
      return fetcher(String(url), options);
    },
  });
  vm.runInContext(visitorCode, context);
  await vm.runInContext("updateVisitorStats()", context);
  return { elements, requests, storage, context, container };
}

async function check() {
  const result = await runScenario({ fetcher: async (url) => {
    if (url.startsWith("visitor-baseline.json")) {
      return { ok: true, json: async () => ({ status: "recovered", pageViews: 1163, visitors: 830 }) };
    }
    throw new Error("counter service offline");
  } });
  assert.equal(result.elements.busuanzi_value_site_pv.textContent, "1,163", "a counter outage must keep the verified historical page views visible");
  assert.equal(result.elements.busuanzi_value_site_uv.textContent, "830", "a counter outage must keep the verified historical visitors visible");

  const offline = await runScenario({ protocol: "file:", fetcher: async () => { throw new Error("file previews must not request counters"); } });
  assert.equal(offline.elements.busuanzi_value_site_pv.textContent, "1,163");
  assert.equal(offline.requests.length, 0, "opening the local file must not create production visits");

  const cached = JSON.stringify({ schema: 4, source: "busuanzi-history+busuanzi.cc-20261004", pageViews: 1200, visitors: 840 });
  const regression = await runScenario({ stored: { "feigong-visitor-stats-history-v4": cached }, fetcher: async (url) => {
    if (url.startsWith("visitor-baseline")) throw new Error("baseline offline");
    return { ok: true, json: async () => ({ busuanzi_site_pv: 4, busuanzi_site_uv: 2 }) };
  } });
  assert.equal(regression.elements.busuanzi_value_site_pv.textContent, "1,200", "stale provider responses must not lower a preserved total");
  assert.equal(regression.elements.busuanzi_value_site_uv.textContent, "840");

  const live = await runScenario({ storageBlocked: true, fetcher: async (url, options) => {
    if (url.startsWith("visitor-baseline")) return { ok: true, json: async () => ({ status: "recovered", pageViews: 1163, visitors: 830, counterStart: { pageViews: 3, visitors: 1 } }) };
    assert.equal(options.method, "POST", "a real page load must record exactly one visit");
    assert.equal(JSON.parse(options.body).url, "https://yanglaihao.github.io/", "tracking must stay attached to the production domain");
    return { ok: true, json: async () => ({ busuanzi_site_pv: 10, busuanzi_site_uv: 3 }) };
  } });
  assert.equal(live.elements.busuanzi_value_site_pv.textContent, "1,170", "diagnostic counts must be excluded while preserving historical page views");
  assert.equal(live.elements.busuanzi_value_site_uv.textContent, "832", "blocked storage must not disable live display or server visitor deduplication");
  assert.equal(live.requests.filter((url) => url.includes("api.php")).length, 1);
  vm.runInContext('currentLanguage = "en"; renderVisitorStats(latestVisitorStats)', live.context);
  assert.match(live.container.title, /verified historical totals/, "saved-count explanations must switch language");

  const preview = await runScenario({ hostname: "localhost", fetcher: async (url) => {
    assert.ok(url.startsWith("visitor-baseline"), "a preview must not record a production visit");
    return { ok: true, json: async () => ({ status: "recovered", pageViews: 1163, visitors: 830, snapshot: { pageViews: 1170, visitors: 832 } }) };
  } });
  assert.equal(preview.elements.busuanzi_value_site_pv.textContent, "1,170");

  const missingBaseline = await runScenario({ fetcher: async (url) => {
    if (url.startsWith("visitor-baseline")) return { ok: true, json: async () => ({ status: "recovered", pageViews: null, visitors: null }) };
    return { ok: true, json: async () => ({ busuanzi_site_pv: 11, busuanzi_site_uv: 1 }) };
  } });
  assert.equal(missingBaseline.elements.busuanzi_value_site_pv.textContent, "1,171", "the embedded baseline must support valid live data when the JSON file is invalid");
  assert.equal(missingBaseline.elements.busuanzi_value_site_uv.textContent, "830", "null baseline values must never become zero");

  const invalid = await runScenario({ stored: { "feigong-visitor-stats-history-v4": JSON.stringify({ pageViews: 1, visitors: 1 }) }, fetcher: async () => ({ ok: true, json: async () => ({ value: null }) }) });
  assert.equal(invalid.elements.busuanzi_value_site_pv.textContent, "1,163", "invalid values and the reset cache must not replace historical totals");

  const timedOut = await runScenario({ fastTimeouts: true, fetcher: async (_url, { signal }) => new Promise((_resolve, reject) => {
    signal.addEventListener("abort", () => reject(new Error("request aborted")), { once: true });
  }) });
  assert.equal(timedOut.elements.busuanzi_value_site_uv.textContent, "830", "aborted requests must leave historical counts visible");
  console.log("Visitor statistics behavior checks passed.");
}

check().catch((error) => { console.error(error); process.exitCode = 1; });
