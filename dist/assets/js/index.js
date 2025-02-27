import { r as reactExports, j as jsxRuntimeExports, c as createRoot } from "./client.js";
import "./_commonjsHelpers.js";
function App() {
  reactExports.useEffect(() => {
    console.log("content view loaded");
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "", children: "content view" });
}
const root = document.createElement("div");
root.id = "jsguru_board-content-view-root";
document.body.append(root);
const rootIntoShadow = document.createElement("div");
rootIntoShadow.id = "shadow-root";
const shadowRoot = root.attachShadow({ mode: "open" });
shadowRoot.appendChild(rootIntoShadow);
createRoot(rootIntoShadow).render(/* @__PURE__ */ jsxRuntimeExports.jsx(App, {}));
//# sourceMappingURL=index.js.map
