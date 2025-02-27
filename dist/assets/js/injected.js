import { e as exampleThemeStorage } from "./exampleThemeStorage.js";
async function toggleTheme() {
  console.log("initial theme", await exampleThemeStorage.get());
  exampleThemeStorage.toggle();
  console.log("toggled theme", await exampleThemeStorage.get());
}
void toggleTheme();
//# sourceMappingURL=injected.js.map
