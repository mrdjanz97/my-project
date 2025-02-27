import { j as jsxRuntimeExports, c as createRoot } from "../../../assets/js/client.js";
import "../../../assets/js/_commonjsHelpers.js";
const Panel = () => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "", children: "Dev Tools Panel" }) });
};
function init() {
  const appContainer = document.querySelector("#app-container");
  if (!appContainer) {
    throw new Error("Can not find #app-container");
  }
  const root = createRoot(appContainer);
  root.render(/* @__PURE__ */ jsxRuntimeExports.jsx(Panel, {}));
}
init();
//# sourceMappingURL=index.js.map
