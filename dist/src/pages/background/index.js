import { b as browser } from "../../../assets/js/browser-polyfill.js";
import { s as supabase, C as CommandType, A as AuthService } from "../../../assets/js/auth.service.js";
import "../../../assets/js/_commonjsHelpers.js";
import "../../../assets/js/preload-helper.js";
class FetchService {
  constructor() {
  }
  async fetchData() {
    try {
      const countries = supabase.from("countries").select();
      return { data: countries, error: null };
    } catch (ex) {
      return { data: null, error: ex.error };
    }
  }
}
console.log("background loaded");
const newTabUrl = "./src/pages/newtab/index.html";
const authService = new AuthService();
const fetchService = new FetchService();
async function handleMessage({ action, value }, response) {
  switch (action) {
    case CommandType.fetch: {
      response(await fetchService.fetchData());
      return;
    }
    case CommandType.signIn: {
      response(authService.signInUser(value));
      return;
    }
    case CommandType.getSession: {
      response(authService.getSession());
      return;
    }
    case CommandType.signOut: {
      response(authService.signOutUser());
      return;
    }
    default: {
      response({ data: null, error: "Unknown action" });
      return;
    }
  }
}
browser.runtime.onMessage.addListener((msg, sender, response) => {
  handleMessage(msg, response);
  return true;
});
chrome.action.onClicked.addListener(() => {
  chrome.tabs.create({
    url: chrome.runtime.getURL(newTabUrl)
  });
});
//# sourceMappingURL=index.js.map
