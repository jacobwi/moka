import "webextension-polyfill";

declare global {
  const browser: typeof import("webextension-polyfill");
}
