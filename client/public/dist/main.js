var global$1 = typeof global !== "undefined"
  ? global
  : typeof self !== "undefined"
  ? self
  : typeof window !== "undefined"
  ? window
  : {};
var global5c50bad9 = null;

function noop() {
}
const identity = (x) => x;
function assign(tar, src) {
  for (const k in src) {
    tar[k] = src[k];
  }
  return tar;
}
function is_promise(value) {
  return value && typeof value === "object" && typeof value.then === "function";
}
function add_location(element2, file, line, column, char) {
  element2.__svelte_meta = {
    loc: { file, line, column, char },
  };
}
function run(fn) {
  return fn();
}
function blank_object() {
  return Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function is_function(thing) {
  return typeof thing === "function";
}
function safe_not_equal(a, b) {
  return a != a
    ? b == b
    : a !== b || (a && typeof a === "object" || typeof a === "function");
}
let src_url_equal_anchor;
function src_url_equal(element_src, url) {
  if (!src_url_equal_anchor) {
    src_url_equal_anchor = document.createElement("a");
  }
  src_url_equal_anchor.href = url;
  return element_src === src_url_equal_anchor.href;
}
function not_equal(a, b) {
  return a != a ? b == b : a !== b;
}
function is_empty(obj) {
  return Object.keys(obj).length === 0;
}
function validate_store(store, name) {
  if (store != null && typeof store.subscribe !== "function") {
    throw new Error(`'${name}' is not a store with a 'subscribe' method`);
  }
}
function subscribe(store, ...callbacks) {
  if (store == null) {
    return noop;
  }
  const unsub = store.subscribe(...callbacks);
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function get_store_value(store) {
  let value;
  subscribe(store, (_) => value = _)();
  return value;
}
function component_subscribe(component, store, callback) {
  component.$$.on_destroy.push(subscribe(store, callback));
}
function create_slot(definition, ctx, $$scope, fn) {
  if (definition) {
    const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
    return definition[0](slot_ctx);
  }
}
function get_slot_context(definition, ctx, $$scope, fn) {
  return definition[1] && fn
    ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
    : $$scope.ctx;
}
function get_slot_changes(definition, $$scope, dirty, fn) {
  if (definition[2] && fn) {
    const lets = definition[2](fn(dirty));
    if ($$scope.dirty === void 0) {
      return lets;
    }
    if (typeof lets === "object") {
      const merged = [];
      const len = Math.max($$scope.dirty.length, lets.length);
      for (let i = 0; i < len; i += 1) {
        merged[i] = $$scope.dirty[i] | lets[i];
      }
      return merged;
    }
    return $$scope.dirty | lets;
  }
  return $$scope.dirty;
}
function update_slot_base(
  slot,
  slot_definition,
  ctx,
  $$scope,
  slot_changes,
  get_slot_context_fn,
) {
  if (slot_changes) {
    const slot_context = get_slot_context(
      slot_definition,
      ctx,
      $$scope,
      get_slot_context_fn,
    );
    slot.p(slot_context, slot_changes);
  }
}
function update_slot(
  slot,
  slot_definition,
  ctx,
  $$scope,
  dirty,
  get_slot_changes_fn,
  get_slot_context_fn,
) {
  const slot_changes = get_slot_changes(
    slot_definition,
    $$scope,
    dirty,
    get_slot_changes_fn,
  );
  update_slot_base(
    slot,
    slot_definition,
    ctx,
    $$scope,
    slot_changes,
    get_slot_context_fn,
  );
}
function get_all_dirty_from_scope($$scope) {
  if ($$scope.ctx.length > 32) {
    const dirty = [];
    const length = $$scope.ctx.length / 32;
    for (let i = 0; i < length; i++) {
      dirty[i] = -1;
    }
    return dirty;
  }
  return -1;
}
function exclude_internal_props(props) {
  const result = {};
  for (const k in props) {
    if (k[0] !== "$") {
      result[k] = props[k];
    }
  }
  return result;
}
function compute_rest_props(props, keys) {
  const rest = {};
  keys = new Set(keys);
  for (const k in props) {
    if (!keys.has(k) && k[0] !== "$") {
      rest[k] = props[k];
    }
  }
  return rest;
}
function compute_slots(slots) {
  const result = {};
  for (const key in slots) {
    result[key] = true;
  }
  return result;
}
function once(fn) {
  let ran = false;
  return function (...args) {
    if (ran) {
      return;
    }
    ran = true;
    fn.call(this, ...args);
  };
}
function null_to_empty(value) {
  return value == null ? "" : value;
}
function set_store_value(store, ret, value) {
  store.set(value);
  return ret;
}
const has_prop = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
function action_destroyer(action_result) {
  return action_result && is_function(action_result.destroy)
    ? action_result.destroy
    : noop;
}
const is_client = typeof window !== "undefined";
let now = is_client ? () => window.performance.now() : () => Date.now();
let raf = is_client ? (cb) => requestAnimationFrame(cb) : noop;
function set_now(fn) {
  now = fn;
}
function set_raf(fn) {
  raf = fn;
}
const tasks = new Set();
function run_tasks(now2) {
  tasks.forEach((task) => {
    if (!task.c(now2)) {
      tasks.delete(task);
      task.f();
    }
  });
  if (tasks.size !== 0) {
    raf(run_tasks);
  }
}
function clear_loops() {
  tasks.clear();
}
function loop(callback) {
  let task;
  if (tasks.size === 0) {
    raf(run_tasks);
  }
  return {
    promise: new Promise((fulfill) => {
      tasks.add(task = { c: callback, f: fulfill });
    }),
    abort() {
      tasks.delete(task);
    },
  };
}
let is_hydrating = false;
function start_hydrating() {
  is_hydrating = true;
}
function end_hydrating() {
  is_hydrating = false;
}
function upper_bound(low, high, key, value) {
  while (low < high) {
    const mid = low + (high - low >> 1);
    if (key(mid) <= value) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }
  return low;
}
function init_hydrate(target) {
  if (target.hydrate_init) {
    return;
  }
  target.hydrate_init = true;
  let children2 = target.childNodes;
  if (target.nodeName === "HEAD") {
    const myChildren = [];
    for (let i = 0; i < children2.length; i++) {
      const node = children2[i];
      if (node.claim_order !== void 0) {
        myChildren.push(node);
      }
    }
    children2 = myChildren;
  }
  const m = new Int32Array(children2.length + 1);
  const p = new Int32Array(children2.length);
  m[0] = -1;
  let longest = 0;
  for (let i = 0; i < children2.length; i++) {
    const current = children2[i].claim_order;
    const seqLen = (longest > 0 && children2[m[longest]].claim_order <= current
      ? longest + 1
      : upper_bound(1, longest, (idx) =>
        children2[m[idx]].claim_order, current)) - 1;
    p[i] = m[seqLen] + 1;
    const newLen = seqLen + 1;
    m[newLen] = i;
    longest = Math.max(newLen, longest);
  }
  const lis = [];
  const toMove = [];
  let last = children2.length - 1;
  for (let cur = m[longest] + 1; cur != 0; cur = p[cur - 1]) {
    lis.push(children2[cur - 1]);
    for (; last >= cur; last--) {
      toMove.push(children2[last]);
    }
    last--;
  }
  for (; last >= 0; last--) {
    toMove.push(children2[last]);
  }
  lis.reverse();
  toMove.sort((a, b) => a.claim_order - b.claim_order);
  for (let i = 0, j = 0; i < toMove.length; i++) {
    while (j < lis.length && toMove[i].claim_order >= lis[j].claim_order) {
      j++;
    }
    const anchor = j < lis.length ? lis[j] : null;
    target.insertBefore(toMove[i], anchor);
  }
}
function append(target, node) {
  target.appendChild(node);
}
function append_styles(target, style_sheet_id, styles) {
  const append_styles_to = get_root_for_style(target);
  if (!append_styles_to.getElementById(style_sheet_id)) {
    const style = element("style");
    style.id = style_sheet_id;
    style.textContent = styles;
    append_stylesheet(append_styles_to, style);
  }
}
function get_root_for_style(node) {
  if (!node) {
    return document;
  }
  const root = node.getRootNode ? node.getRootNode() : node.ownerDocument;
  if (root.host) {
    return root;
  }
  return document;
}
function append_empty_stylesheet(node) {
  const style_element = element("style");
  append_stylesheet(get_root_for_style(node), style_element);
  return style_element;
}
function append_stylesheet(node, style) {
  append(node.head || node, style);
}
function append_hydration(target, node) {
  if (is_hydrating) {
    init_hydrate(target);
    if (
      target.actual_end_child === void 0 ||
      target.actual_end_child !== null &&
        target.actual_end_child.parentElement !== target
    ) {
      target.actual_end_child = target.firstChild;
    }
    while (
      target.actual_end_child !== null &&
      target.actual_end_child.claim_order === void 0
    ) {
      target.actual_end_child = target.actual_end_child.nextSibling;
    }
    if (node !== target.actual_end_child) {
      if (node.claim_order !== void 0 || node.parentNode !== target) {
        target.insertBefore(node, target.actual_end_child);
      }
    } else {
      target.actual_end_child = node.nextSibling;
    }
  } else if (node.parentNode !== target || node.nextSibling !== null) {
    target.appendChild(node);
  }
}
function insert(target, node, anchor) {
  target.insertBefore(node, anchor || null);
}
function insert_hydration(target, node, anchor) {
  if (is_hydrating && !anchor) {
    append_hydration(target, node);
  } else if (node.parentNode !== target || node.nextSibling != anchor) {
    target.insertBefore(node, anchor || null);
  }
}
function detach(node) {
  node.parentNode.removeChild(node);
}
function destroy_each(iterations, detaching) {
  for (let i = 0; i < iterations.length; i += 1) {
    if (iterations[i]) {
      iterations[i].d(detaching);
    }
  }
}
function element(name) {
  return document.createElement(name);
}
function element_is(name, is) {
  return document.createElement(name, { is });
}
function object_without_properties(obj, exclude) {
  const target = {};
  for (const k in obj) {
    if (has_prop(obj, k) && exclude.indexOf(k) === -1) {
      target[k] = obj[k];
    }
  }
  return target;
}
function svg_element(name) {
  return document.createElementNS("http://www.w3.org/2000/svg", name);
}
function text(data) {
  return document.createTextNode(data);
}
function space() {
  return text(" ");
}
function empty() {
  return text("");
}
function listen(node, event, handler, options) {
  node.addEventListener(event, handler, options);
  return () => node.removeEventListener(event, handler, options);
}
function prevent_default(fn) {
  return function (event) {
    event.preventDefault();
    return fn.call(this, event);
  };
}
function stop_propagation(fn) {
  return function (event) {
    event.stopPropagation();
    return fn.call(this, event);
  };
}
function self$1(fn) {
  return function (event) {
    if (event.target === this) {
      fn.call(this, event);
    }
  };
}
function trusted(fn) {
  return function (event) {
    if (event.isTrusted) {
      fn.call(this, event);
    }
  };
}
function attr(node, attribute, value) {
  if (value == null) {
    node.removeAttribute(attribute);
  } else if (node.getAttribute(attribute) !== value) {
    node.setAttribute(attribute, value);
  }
}
function set_attributes(node, attributes) {
  const descriptors = Object.getOwnPropertyDescriptors(node.__proto__);
  for (const key in attributes) {
    if (attributes[key] == null) {
      node.removeAttribute(key);
    } else if (key === "style") {
      node.style.cssText = attributes[key];
    } else if (key === "__value") {
      node.value = node[key] = attributes[key];
    } else if (descriptors[key] && descriptors[key].set) {
      node[key] = attributes[key];
    } else {
      attr(node, key, attributes[key]);
    }
  }
}
function set_svg_attributes(node, attributes) {
  for (const key in attributes) {
    attr(node, key, attributes[key]);
  }
}
function set_custom_element_data(node, prop, value) {
  if (prop in node) {
    node[prop] = typeof node[prop] === "boolean" && value === "" ? true : value;
  } else {
    attr(node, prop, value);
  }
}
function xlink_attr(node, attribute, value) {
  node.setAttributeNS("http://www.w3.org/1999/xlink", attribute, value);
}
function get_binding_group_value(group, __value, checked) {
  const value = new Set();
  for (let i = 0; i < group.length; i += 1) {
    if (group[i].checked) {
      value.add(group[i].__value);
    }
  }
  if (!checked) {
    value.delete(__value);
  }
  return Array.from(value);
}
function to_number(value) {
  return value === "" ? null : +value;
}
function time_ranges_to_array(ranges) {
  const array = [];
  for (let i = 0; i < ranges.length; i += 1) {
    array.push({ start: ranges.start(i), end: ranges.end(i) });
  }
  return array;
}
function children(element2) {
  return Array.from(element2.childNodes);
}
function init_claim_info(nodes) {
  if (nodes.claim_info === void 0) {
    nodes.claim_info = { last_index: 0, total_claimed: 0 };
  }
}
function claim_node(
  nodes,
  predicate,
  processNode,
  createNode,
  dontUpdateLastIndex = false,
) {
  init_claim_info(nodes);
  const resultNode = (() => {
    for (let i = nodes.claim_info.last_index; i < nodes.length; i++) {
      const node = nodes[i];
      if (predicate(node)) {
        const replacement = processNode(node);
        if (replacement === void 0) {
          nodes.splice(i, 1);
        } else {
          nodes[i] = replacement;
        }
        if (!dontUpdateLastIndex) {
          nodes.claim_info.last_index = i;
        }
        return node;
      }
    }
    for (let i = nodes.claim_info.last_index - 1; i >= 0; i--) {
      const node = nodes[i];
      if (predicate(node)) {
        const replacement = processNode(node);
        if (replacement === void 0) {
          nodes.splice(i, 1);
        } else {
          nodes[i] = replacement;
        }
        if (!dontUpdateLastIndex) {
          nodes.claim_info.last_index = i;
        } else if (replacement === void 0) {
          nodes.claim_info.last_index--;
        }
        return node;
      }
    }
    return createNode();
  })();
  resultNode.claim_order = nodes.claim_info.total_claimed;
  nodes.claim_info.total_claimed += 1;
  return resultNode;
}
function claim_element_base(nodes, name, attributes, create_element) {
  return claim_node(nodes, (node) => node.nodeName === name, (node) => {
    const remove = [];
    for (let j = 0; j < node.attributes.length; j++) {
      const attribute = node.attributes[j];
      if (!attributes[attribute.name]) {
        remove.push(attribute.name);
      }
    }
    remove.forEach((v) => node.removeAttribute(v));
    return void 0;
  }, () => create_element(name));
}
function claim_element(nodes, name, attributes) {
  return claim_element_base(nodes, name, attributes, element);
}
function claim_svg_element(nodes, name, attributes) {
  return claim_element_base(nodes, name, attributes, svg_element);
}
function claim_text(nodes, data) {
  return claim_node(
    nodes,
    (node) => node.nodeType === 3,
    (node) => {
      const dataStr = "" + data;
      if (node.data.startsWith(dataStr)) {
        if (node.data.length !== dataStr.length) {
          return node.splitText(dataStr.length);
        }
      } else {
        node.data = dataStr;
      }
    },
    () => text(data),
    true,
  );
}
function claim_space(nodes) {
  return claim_text(nodes, " ");
}
function find_comment(nodes, text2, start) {
  for (let i = start; i < nodes.length; i += 1) {
    const node = nodes[i];
    if (node.nodeType === 8 && node.textContent.trim() === text2) {
      return i;
    }
  }
  return nodes.length;
}
function claim_html_tag(nodes) {
  const start_index = find_comment(nodes, "HTML_TAG_START", 0);
  const end_index = find_comment(nodes, "HTML_TAG_END", start_index);
  if (start_index === end_index) {
    return new HtmlTagHydration();
  }
  init_claim_info(nodes);
  const html_tag_nodes = nodes.splice(start_index, end_index + 1);
  detach(html_tag_nodes[0]);
  detach(html_tag_nodes[html_tag_nodes.length - 1]);
  const claimed_nodes = html_tag_nodes.slice(1, html_tag_nodes.length - 1);
  for (const n of claimed_nodes) {
    n.claim_order = nodes.claim_info.total_claimed;
    nodes.claim_info.total_claimed += 1;
  }
  return new HtmlTagHydration(claimed_nodes);
}
function set_data(text2, data) {
  data = "" + data;
  if (text2.wholeText !== data) {
    text2.data = data;
  }
}
function set_input_value(input, value) {
  input.value = value == null ? "" : value;
}
function set_input_type(input, type) {
  try {
    input.type = type;
  } catch (e) {
  }
}
function set_style(node, key, value, important) {
  node.style.setProperty(key, value, important ? "important" : "");
}
function select_option(select, value) {
  for (let i = 0; i < select.options.length; i += 1) {
    const option = select.options[i];
    if (option.__value === value) {
      option.selected = true;
      return;
    }
  }
  select.selectedIndex = -1;
}
function select_options(select, value) {
  for (let i = 0; i < select.options.length; i += 1) {
    const option = select.options[i];
    option.selected = ~value.indexOf(option.__value);
  }
}
function select_value(select) {
  const selected_option = select.querySelector(":checked") || select.options[0];
  return selected_option && selected_option.__value;
}
function select_multiple_value(select) {
  return [].map.call(
    select.querySelectorAll(":checked"),
    (option) => option.__value,
  );
}
let crossorigin;
function is_crossorigin() {
  if (crossorigin === void 0) {
    crossorigin = false;
    try {
      if (typeof window !== "undefined" && window.parent) {
        void window.parent.document;
      }
    } catch (error) {
      crossorigin = true;
    }
  }
  return crossorigin;
}
function add_resize_listener(node, fn) {
  const computed_style = getComputedStyle(node);
  if (computed_style.position === "static") {
    node.style.position = "relative";
  }
  const iframe = element("iframe");
  iframe.setAttribute(
    "style",
    "display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: -1;",
  );
  iframe.setAttribute("aria-hidden", "true");
  iframe.tabIndex = -1;
  const crossorigin2 = is_crossorigin();
  let unsubscribe;
  if (crossorigin2) {
    iframe.src =
      "data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}</script>";
    unsubscribe = listen(window, "message", (event) => {
      if (event.source === iframe.contentWindow) {
        fn();
      }
    });
  } else {
    iframe.src = "about:blank";
    iframe.onload = () => {
      unsubscribe = listen(iframe.contentWindow, "resize", fn);
    };
  }
  append(node, iframe);
  return () => {
    if (crossorigin2) {
      unsubscribe();
    } else if (unsubscribe && iframe.contentWindow) {
      unsubscribe();
    }
    detach(iframe);
  };
}
function toggle_class(element2, name, toggle) {
  element2.classList[toggle ? "add" : "remove"](name);
}
function custom_event(type, detail, bubbles = false) {
  const e = document.createEvent("CustomEvent");
  e.initCustomEvent(type, bubbles, false, detail);
  return e;
}
function query_selector_all(selector, parent = document.body) {
  return Array.from(parent.querySelectorAll(selector));
}
class HtmlTag {
  constructor() {
    this.e = this.n = null;
  }
  c(html) {
    this.h(html);
  }
  m(html, target, anchor = null) {
    if (!this.e) {
      this.e = element(target.nodeName);
      this.t = target;
      this.c(html);
    }
    this.i(anchor);
  }
  h(html) {
    this.e.innerHTML = html;
    this.n = Array.from(this.e.childNodes);
  }
  i(anchor) {
    for (let i = 0; i < this.n.length; i += 1) {
      insert(this.t, this.n[i], anchor);
    }
  }
  p(html) {
    this.d();
    this.h(html);
    this.i(this.a);
  }
  d() {
    this.n.forEach(detach);
  }
}
class HtmlTagHydration extends HtmlTag {
  constructor(claimed_nodes) {
    super();
    this.e = this.n = null;
    this.l = claimed_nodes;
  }
  c(html) {
    if (this.l) {
      this.n = this.l;
    } else {
      super.c(html);
    }
  }
  i(anchor) {
    for (let i = 0; i < this.n.length; i += 1) {
      insert_hydration(this.t, this.n[i], anchor);
    }
  }
}
function attribute_to_object(attributes) {
  const result = {};
  for (const attribute of attributes) {
    result[attribute.name] = attribute.value;
  }
  return result;
}
function get_custom_elements_slots(element2) {
  const result = {};
  element2.childNodes.forEach((node) => {
    result[node.slot || "default"] = true;
  });
  return result;
}
const active_docs = new Set();
let active = 0;
function hash(str) {
  let hash2 = 5381;
  let i = str.length;
  while (i--) {
    hash2 = (hash2 << 5) - hash2 ^ str.charCodeAt(i);
  }
  return hash2 >>> 0;
}
function create_rule(node, a, b, duration, delay, ease, fn, uid = 0) {
  const step = 16.666 / duration;
  let keyframes = "{\n";
  for (let p = 0; p <= 1; p += step) {
    const t = a + (b - a) * ease(p);
    keyframes += p * 100 + `%{${fn(t, 1 - t)}}
`;
  }
  const rule = keyframes + `100% {${fn(b, 1 - b)}}
}`;
  const name = `__svelte_${hash(rule)}_${uid}`;
  const doc = get_root_for_style(node);
  active_docs.add(doc);
  const stylesheet = doc.__svelte_stylesheet ||
    (doc.__svelte_stylesheet = append_empty_stylesheet(node).sheet);
  const current_rules = doc.__svelte_rules || (doc.__svelte_rules = {});
  if (!current_rules[name]) {
    current_rules[name] = true;
    stylesheet.insertRule(
      `@keyframes ${name} ${rule}`,
      stylesheet.cssRules.length,
    );
  }
  const animation = node.style.animation || "";
  node.style.animation = `${
    animation ? `${animation}, ` : ""
  }${name} ${duration}ms linear ${delay}ms 1 both`;
  active += 1;
  return name;
}
function delete_rule(node, name) {
  const previous = (node.style.animation || "").split(", ");
  const next = previous.filter(
    name
      ? (anim) => anim.indexOf(name) < 0
      : (anim) => anim.indexOf("__svelte") === -1,
  );
  const deleted = previous.length - next.length;
  if (deleted) {
    node.style.animation = next.join(", ");
    active -= deleted;
    if (!active) {
      clear_rules();
    }
  }
}
function clear_rules() {
  raf(() => {
    if (active) {
      return;
    }
    active_docs.forEach((doc) => {
      const stylesheet = doc.__svelte_stylesheet;
      let i = stylesheet.cssRules.length;
      while (i--) {
        stylesheet.deleteRule(i);
      }
      doc.__svelte_rules = {};
    });
    active_docs.clear();
  });
}
function create_animation(node, from, fn, params) {
  if (!from) {
    return noop;
  }
  const to = node.getBoundingClientRect();
  if (
    from.left === to.left && from.right === to.right && from.top === to.top &&
    from.bottom === to.bottom
  ) {
    return noop;
  }
  const {
    delay = 0,
    duration = 300,
    easing = identity,
    start: start_time = now() + delay,
    end = start_time + duration,
    tick: tick2 = noop,
    css,
  } = fn(node, { from, to }, params);
  let running = true;
  let started = false;
  let name;
  function start() {
    if (css) {
      name = create_rule(node, 0, 1, duration, delay, easing, css);
    }
    if (!delay) {
      started = true;
    }
  }
  function stop() {
    if (css) {
      delete_rule(node, name);
    }
    running = false;
  }
  loop((now2) => {
    if (!started && now2 >= start_time) {
      started = true;
    }
    if (started && now2 >= end) {
      tick2(1, 0);
      stop();
    }
    if (!running) {
      return false;
    }
    if (started) {
      const p = now2 - start_time;
      const t = 0 + 1 * easing(p / duration);
      tick2(t, 1 - t);
    }
    return true;
  });
  start();
  tick2(0, 1);
  return stop;
}
function fix_position(node) {
  const style = getComputedStyle(node);
  if (style.position !== "absolute" && style.position !== "fixed") {
    const { width, height } = style;
    const a = node.getBoundingClientRect();
    node.style.position = "absolute";
    node.style.width = width;
    node.style.height = height;
    add_transform(node, a);
  }
}
function add_transform(node, a) {
  const b = node.getBoundingClientRect();
  if (a.left !== b.left || a.top !== b.top) {
    const style = getComputedStyle(node);
    const transform = style.transform === "none" ? "" : style.transform;
    node.style.transform = `${transform} translate(${a.left - b.left}px, ${
      a.top - b.top
    }px)`;
  }
}
let current_component;
function set_current_component(component) {
  current_component = component;
}
function get_current_component() {
  if (!current_component) {
    throw new Error("Function called outside component initialization");
  }
  return current_component;
}
function beforeUpdate(fn) {
  get_current_component().$$.before_update.push(fn);
}
function onMount(fn) {
  get_current_component().$$.on_mount.push(fn);
}
function afterUpdate(fn) {
  get_current_component().$$.after_update.push(fn);
}
function onDestroy(fn) {
  get_current_component().$$.on_destroy.push(fn);
}
function createEventDispatcher() {
  const component = get_current_component();
  return (type, detail) => {
    const callbacks = component.$$.callbacks[type];
    if (callbacks) {
      const event = custom_event(type, detail);
      callbacks.slice().forEach((fn) => {
        fn.call(component, event);
      });
    }
  };
}
function setContext(key, context) {
  get_current_component().$$.context.set(key, context);
}
function getContext(key) {
  return get_current_component().$$.context.get(key);
}
function getAllContexts() {
  return get_current_component().$$.context;
}
function hasContext(key) {
  return get_current_component().$$.context.has(key);
}
function bubble(component, event) {
  const callbacks = component.$$.callbacks[event.type];
  if (callbacks) {
    callbacks.slice().forEach((fn) => fn.call(this, event));
  }
}
const dirty_components = [];
const intros = { enabled: false };
const binding_callbacks = [];
const render_callbacks = [];
const flush_callbacks = [];
const resolved_promise = Promise.resolve();
let update_scheduled = false;
function schedule_update() {
  if (!update_scheduled) {
    update_scheduled = true;
    resolved_promise.then(flush);
  }
}
function tick() {
  schedule_update();
  return resolved_promise;
}
function add_render_callback(fn) {
  render_callbacks.push(fn);
}
function add_flush_callback(fn) {
  flush_callbacks.push(fn);
}
let flushing = false;
const seen_callbacks = new Set();
function flush() {
  if (flushing) {
    return;
  }
  flushing = true;
  do {
    for (let i = 0; i < dirty_components.length; i += 1) {
      const component = dirty_components[i];
      set_current_component(component);
      update(component.$$);
    }
    set_current_component(null);
    dirty_components.length = 0;
    while (binding_callbacks.length) {
      binding_callbacks.pop()();
    }
    for (let i = 0; i < render_callbacks.length; i += 1) {
      const callback = render_callbacks[i];
      if (!seen_callbacks.has(callback)) {
        seen_callbacks.add(callback);
        callback();
      }
    }
    render_callbacks.length = 0;
  } while (dirty_components.length);
  while (flush_callbacks.length) {
    flush_callbacks.pop()();
  }
  update_scheduled = false;
  flushing = false;
  seen_callbacks.clear();
}
function update($$) {
  if ($$.fragment !== null) {
    $$.update();
    run_all($$.before_update);
    const dirty = $$.dirty;
    $$.dirty = [-1];
    $$.fragment && $$.fragment.p($$.ctx, dirty);
    $$.after_update.forEach(add_render_callback);
  }
}
let promise;
function wait() {
  if (!promise) {
    promise = Promise.resolve();
    promise.then(() => {
      promise = null;
    });
  }
  return promise;
}
function dispatch(node, direction, kind) {
  node.dispatchEvent(custom_event(`${direction ? "intro" : "outro"}${kind}`));
}
const outroing = new Set();
let outros;
function group_outros() {
  outros = {
    r: 0,
    c: [],
    p: outros,
  };
}
function check_outros() {
  if (!outros.r) {
    run_all(outros.c);
  }
  outros = outros.p;
}
function transition_in(block, local) {
  if (block && block.i) {
    outroing.delete(block);
    block.i(local);
  }
}
function transition_out(block, local, detach2, callback) {
  if (block && block.o) {
    if (outroing.has(block)) {
      return;
    }
    outroing.add(block);
    outros.c.push(() => {
      outroing.delete(block);
      if (callback) {
        if (detach2) {
          block.d(1);
        }
        callback();
      }
    });
    block.o(local);
  }
}
const null_transition = { duration: 0 };
function create_in_transition(node, fn, params) {
  let config = fn(node, params);
  let running = false;
  let animation_name;
  let task;
  let uid = 0;
  function cleanup() {
    if (animation_name) {
      delete_rule(node, animation_name);
    }
  }
  function go() {
    const {
      delay = 0,
      duration = 300,
      easing = identity,
      tick: tick2 = noop,
      css,
    } = config || null_transition;
    if (css) {
      animation_name = create_rule(
        node,
        0,
        1,
        duration,
        delay,
        easing,
        css,
        uid++,
      );
    }
    tick2(0, 1);
    const start_time = now() + delay;
    const end_time = start_time + duration;
    if (task) {
      task.abort();
    }
    running = true;
    add_render_callback(() => dispatch(node, true, "start"));
    task = loop((now2) => {
      if (running) {
        if (now2 >= end_time) {
          tick2(1, 0);
          dispatch(node, true, "end");
          cleanup();
          return running = false;
        }
        if (now2 >= start_time) {
          const t = easing((now2 - start_time) / duration);
          tick2(t, 1 - t);
        }
      }
      return running;
    });
  }
  let started = false;
  return {
    start() {
      if (started) {
        return;
      }
      started = true;
      delete_rule(node);
      if (is_function(config)) {
        config = config();
        wait().then(go);
      } else {
        go();
      }
    },
    invalidate() {
      started = false;
    },
    end() {
      if (running) {
        cleanup();
        running = false;
      }
    },
  };
}
function create_out_transition(node, fn, params) {
  let config = fn(node, params);
  let running = true;
  let animation_name;
  const group = outros;
  group.r += 1;
  function go() {
    const {
      delay = 0,
      duration = 300,
      easing = identity,
      tick: tick2 = noop,
      css,
    } = config || null_transition;
    if (css) {
      animation_name = create_rule(node, 1, 0, duration, delay, easing, css);
    }
    const start_time = now() + delay;
    const end_time = start_time + duration;
    add_render_callback(() => dispatch(node, false, "start"));
    loop((now2) => {
      if (running) {
        if (now2 >= end_time) {
          tick2(0, 1);
          dispatch(node, false, "end");
          if (!--group.r) {
            run_all(group.c);
          }
          return false;
        }
        if (now2 >= start_time) {
          const t = easing((now2 - start_time) / duration);
          tick2(1 - t, t);
        }
      }
      return running;
    });
  }
  if (is_function(config)) {
    wait().then(() => {
      config = config();
      go();
    });
  } else {
    go();
  }
  return {
    end(reset) {
      if (reset && config.tick) {
        config.tick(1, 0);
      }
      if (running) {
        if (animation_name) {
          delete_rule(node, animation_name);
        }
        running = false;
      }
    },
  };
}
function create_bidirectional_transition(node, fn, params, intro) {
  let config = fn(node, params);
  let t = intro ? 0 : 1;
  let running_program = null;
  let pending_program = null;
  let animation_name = null;
  function clear_animation() {
    if (animation_name) {
      delete_rule(node, animation_name);
    }
  }
  function init2(program, duration) {
    const d = program.b - t;
    duration *= Math.abs(d);
    return {
      a: t,
      b: program.b,
      d,
      duration,
      start: program.start,
      end: program.start + duration,
      group: program.group,
    };
  }
  function go(b) {
    const {
      delay = 0,
      duration = 300,
      easing = identity,
      tick: tick2 = noop,
      css,
    } = config || null_transition;
    const program = {
      start: now() + delay,
      b,
    };
    if (!b) {
      program.group = outros;
      outros.r += 1;
    }
    if (running_program || pending_program) {
      pending_program = program;
    } else {
      if (css) {
        clear_animation();
        animation_name = create_rule(node, t, b, duration, delay, easing, css);
      }
      if (b) {
        tick2(0, 1);
      }
      running_program = init2(program, duration);
      add_render_callback(() => dispatch(node, b, "start"));
      loop((now2) => {
        if (pending_program && now2 > pending_program.start) {
          running_program = init2(pending_program, duration);
          pending_program = null;
          dispatch(node, running_program.b, "start");
          if (css) {
            clear_animation();
            animation_name = create_rule(
              node,
              t,
              running_program.b,
              running_program.duration,
              0,
              easing,
              config.css,
            );
          }
        }
        if (running_program) {
          if (now2 >= running_program.end) {
            tick2(t = running_program.b, 1 - t);
            dispatch(node, running_program.b, "end");
            if (!pending_program) {
              if (running_program.b) {
                clear_animation();
              } else {
                if (!--running_program.group.r) {
                  run_all(running_program.group.c);
                }
              }
            }
            running_program = null;
          } else if (now2 >= running_program.start) {
            const p = now2 - running_program.start;
            t = running_program.a +
              running_program.d * easing(p / running_program.duration);
            tick2(t, 1 - t);
          }
        }
        return !!(running_program || pending_program);
      });
    }
  }
  return {
    run(b) {
      if (is_function(config)) {
        wait().then(() => {
          config = config();
          go(b);
        });
      } else {
        go(b);
      }
    },
    end() {
      clear_animation();
      running_program = pending_program = null;
    },
  };
}
function handle_promise(promise2, info) {
  const token = info.token = {};
  function update2(type, index, key, value) {
    if (info.token !== token) {
      return;
    }
    info.resolved = value;
    let child_ctx = info.ctx;
    if (key !== void 0) {
      child_ctx = child_ctx.slice();
      child_ctx[key] = value;
    }
    const block = type && (info.current = type)(child_ctx);
    let needs_flush = false;
    if (info.block) {
      if (info.blocks) {
        info.blocks.forEach((block2, i) => {
          if (i !== index && block2) {
            group_outros();
            transition_out(block2, 1, 1, () => {
              if (info.blocks[i] === block2) {
                info.blocks[i] = null;
              }
            });
            check_outros();
          }
        });
      } else {
        info.block.d(1);
      }
      block.c();
      transition_in(block, 1);
      block.m(info.mount(), info.anchor);
      needs_flush = true;
    }
    info.block = block;
    if (info.blocks) {
      info.blocks[index] = block;
    }
    if (needs_flush) {
      flush();
    }
  }
  if (is_promise(promise2)) {
    const current_component2 = get_current_component();
    promise2.then((value) => {
      set_current_component(current_component2);
      update2(info.then, 1, info.value, value);
      set_current_component(null);
    }, (error) => {
      set_current_component(current_component2);
      update2(info.catch, 2, info.error, error);
      set_current_component(null);
      if (!info.hasCatch) {
        throw error;
      }
    });
    if (info.current !== info.pending) {
      update2(info.pending, 0);
      return true;
    }
  } else {
    if (info.current !== info.then) {
      update2(info.then, 1, info.value, promise2);
      return true;
    }
    info.resolved = promise2;
  }
}
function update_await_block_branch(info, ctx, dirty) {
  const child_ctx = ctx.slice();
  const { resolved } = info;
  if (info.current === info.then) {
    child_ctx[info.value] = resolved;
  }
  if (info.current === info.catch) {
    child_ctx[info.error] = resolved;
  }
  info.block.p(child_ctx, dirty);
}
const globals = typeof window !== "undefined"
  ? window
  : typeof globalThis !== "undefined"
  ? globalThis
  : global$1;
function destroy_block(block, lookup) {
  block.d(1);
  lookup.delete(block.key);
}
function outro_and_destroy_block(block, lookup) {
  transition_out(block, 1, 1, () => {
    lookup.delete(block.key);
  });
}
function fix_and_destroy_block(block, lookup) {
  block.f();
  destroy_block(block, lookup);
}
function fix_and_outro_and_destroy_block(block, lookup) {
  block.f();
  outro_and_destroy_block(block, lookup);
}
function update_keyed_each(
  old_blocks,
  dirty,
  get_key,
  dynamic,
  ctx,
  list,
  lookup,
  node,
  destroy,
  create_each_block,
  next,
  get_context,
) {
  let o = old_blocks.length;
  let n = list.length;
  let i = o;
  const old_indexes = {};
  while (i--) {
    old_indexes[old_blocks[i].key] = i;
  }
  const new_blocks = [];
  const new_lookup = new Map();
  const deltas = new Map();
  i = n;
  while (i--) {
    const child_ctx = get_context(ctx, list, i);
    const key = get_key(child_ctx);
    let block = lookup.get(key);
    if (!block) {
      block = create_each_block(key, child_ctx);
      block.c();
    } else if (dynamic) {
      block.p(child_ctx, dirty);
    }
    new_lookup.set(key, new_blocks[i] = block);
    if (key in old_indexes) {
      deltas.set(key, Math.abs(i - old_indexes[key]));
    }
  }
  const will_move = new Set();
  const did_move = new Set();
  function insert2(block) {
    transition_in(block, 1);
    block.m(node, next);
    lookup.set(block.key, block);
    next = block.first;
    n--;
  }
  while (o && n) {
    const new_block = new_blocks[n - 1];
    const old_block = old_blocks[o - 1];
    const new_key = new_block.key;
    const old_key = old_block.key;
    if (new_block === old_block) {
      next = new_block.first;
      o--;
      n--;
    } else if (!new_lookup.has(old_key)) {
      destroy(old_block, lookup);
      o--;
    } else if (!lookup.has(new_key) || will_move.has(new_key)) {
      insert2(new_block);
    } else if (did_move.has(old_key)) {
      o--;
    } else if (deltas.get(new_key) > deltas.get(old_key)) {
      did_move.add(new_key);
      insert2(new_block);
    } else {
      will_move.add(old_key);
      o--;
    }
  }
  while (o--) {
    const old_block = old_blocks[o];
    if (!new_lookup.has(old_block.key)) {
      destroy(old_block, lookup);
    }
  }
  while (n) {
    insert2(new_blocks[n - 1]);
  }
  return new_blocks;
}
function validate_each_keys(ctx, list, get_context, get_key) {
  const keys = new Set();
  for (let i = 0; i < list.length; i++) {
    const key = get_key(get_context(ctx, list, i));
    if (keys.has(key)) {
      throw new Error("Cannot have duplicate keys in a keyed each");
    }
    keys.add(key);
  }
}
function get_spread_update(levels, updates) {
  const update2 = {};
  const to_null_out = {};
  const accounted_for = { $$scope: 1 };
  let i = levels.length;
  while (i--) {
    const o = levels[i];
    const n = updates[i];
    if (n) {
      for (const key in o) {
        if (!(key in n)) {
          to_null_out[key] = 1;
        }
      }
      for (const key in n) {
        if (!accounted_for[key]) {
          update2[key] = n[key];
          accounted_for[key] = 1;
        }
      }
      levels[i] = n;
    } else {
      for (const key in o) {
        accounted_for[key] = 1;
      }
    }
  }
  for (const key in to_null_out) {
    if (!(key in update2)) {
      update2[key] = void 0;
    }
  }
  return update2;
}
function get_spread_object(spread_props) {
  return typeof spread_props === "object" && spread_props !== null
    ? spread_props
    : {};
}
const boolean_attributes = new Set([
  "allowfullscreen",
  "allowpaymentrequest",
  "async",
  "autofocus",
  "autoplay",
  "checked",
  "controls",
  "default",
  "defer",
  "disabled",
  "formnovalidate",
  "hidden",
  "ismap",
  "loop",
  "multiple",
  "muted",
  "nomodule",
  "novalidate",
  "open",
  "playsinline",
  "readonly",
  "required",
  "reversed",
  "selected",
]);
const invalid_attribute_name_character =
  /[\s'">/=\u{FDD0}-\u{FDEF}\u{FFFE}\u{FFFF}\u{1FFFE}\u{1FFFF}\u{2FFFE}\u{2FFFF}\u{3FFFE}\u{3FFFF}\u{4FFFE}\u{4FFFF}\u{5FFFE}\u{5FFFF}\u{6FFFE}\u{6FFFF}\u{7FFFE}\u{7FFFF}\u{8FFFE}\u{8FFFF}\u{9FFFE}\u{9FFFF}\u{AFFFE}\u{AFFFF}\u{BFFFE}\u{BFFFF}\u{CFFFE}\u{CFFFF}\u{DFFFE}\u{DFFFF}\u{EFFFE}\u{EFFFF}\u{FFFFE}\u{FFFFF}\u{10FFFE}\u{10FFFF}]/u;
function spread(args, classes_to_add) {
  const attributes = Object.assign({}, ...args);
  if (classes_to_add) {
    if (attributes.class == null) {
      attributes.class = classes_to_add;
    } else {
      attributes.class += " " + classes_to_add;
    }
  }
  let str = "";
  Object.keys(attributes).forEach((name) => {
    if (invalid_attribute_name_character.test(name)) {
      return;
    }
    const value = attributes[name];
    if (value === true) {
      str += " " + name;
    } else if (boolean_attributes.has(name.toLowerCase())) {
      if (value) {
        str += " " + name;
      }
    } else if (value != null) {
      str += ` ${name}="${value}"`;
    }
  });
  return str;
}
const escaped = {
  '"': "&quot;",
  "'": "&#39;",
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
};
function escape(html) {
  return String(html).replace(/["'&<>]/g, (match) => escaped[match]);
}
function escape_attribute_value(value) {
  return typeof value === "string" ? escape(value) : value;
}
function escape_object(obj) {
  const result = {};
  for (const key in obj) {
    result[key] = escape_attribute_value(obj[key]);
  }
  return result;
}
function each(items, fn) {
  let str = "";
  for (let i = 0; i < items.length; i += 1) {
    str += fn(items[i], i);
  }
  return str;
}
const missing_component = {
  $$render: () => "",
};
function validate_component(component, name) {
  if (!component || !component.$$render) {
    if (name === "svelte:component") {
      name += " this={...}";
    }
    throw new Error(
      `<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules`,
    );
  }
  return component;
}
function debug(file, line, column, values) {
  console.log(`{@debug} ${file ? file + " " : ""}(${line}:${column})`);
  console.log(values);
  return "";
}
let on_destroy;
function create_ssr_component(fn) {
  function $$render(result, props, bindings, slots, context) {
    const parent_component = current_component;
    const $$ = {
      on_destroy,
      context: new Map(
        parent_component ? parent_component.$$.context : context || [],
      ),
      on_mount: [],
      before_update: [],
      after_update: [],
      callbacks: blank_object(),
    };
    set_current_component({ $$ });
    const html = fn(result, props, bindings, slots);
    set_current_component(parent_component);
    return html;
  }
  return {
    render: (props = {}, { $$slots = {}, context = new Map() } = {}) => {
      on_destroy = [];
      const result = { title: "", head: "", css: new Set() };
      const html = $$render(result, props, {}, $$slots, context);
      run_all(on_destroy);
      return {
        html,
        css: {
          code: Array.from(result.css).map((css) => css.code).join("\n"),
          map: null,
        },
        head: result.title + result.head,
      };
    },
    $$render,
  };
}
function add_attribute(name, value, boolean) {
  if (value == null || boolean && !value) {
    return "";
  }
  return ` ${name}${
    value === true
      ? ""
      : `=${
        typeof value === "string" ? JSON.stringify(escape(value)) : `"${value}"`
      }`
  }`;
}
function add_classes(classes) {
  return classes ? ` class="${classes}"` : "";
}
function bind(component, name, callback) {
  const index = component.$$.props[name];
  if (index !== void 0) {
    component.$$.bound[index] = callback;
    callback(component.$$.ctx[index]);
  }
}
function create_component(block) {
  block && block.c();
}
function claim_component(block, parent_nodes) {
  block && block.l(parent_nodes);
}
function mount_component(component, target, anchor, customElement) {
  const { fragment, on_mount, on_destroy: on_destroy2, after_update } =
    component.$$;
  fragment && fragment.m(target, anchor);
  if (!customElement) {
    add_render_callback(() => {
      const new_on_destroy = on_mount.map(run).filter(is_function);
      if (on_destroy2) {
        on_destroy2.push(...new_on_destroy);
      } else {
        run_all(new_on_destroy);
      }
      component.$$.on_mount = [];
    });
  }
  after_update.forEach(add_render_callback);
}
function destroy_component(component, detaching) {
  const $$ = component.$$;
  if ($$.fragment !== null) {
    run_all($$.on_destroy);
    $$.fragment && $$.fragment.d(detaching);
    $$.on_destroy = $$.fragment = null;
    $$.ctx = [];
  }
}
function make_dirty(component, i) {
  if (component.$$.dirty[0] === -1) {
    dirty_components.push(component);
    schedule_update();
    component.$$.dirty.fill(0);
  }
  component.$$.dirty[i / 31 | 0] |= 1 << i % 31;
}
function init(
  component,
  options,
  instance,
  create_fragment,
  not_equal2,
  props,
  append_styles2,
  dirty = [-1],
) {
  const parent_component = current_component;
  set_current_component(component);
  const $$ = component.$$ = {
    fragment: null,
    ctx: null,
    props,
    update: noop,
    not_equal: not_equal2,
    bound: blank_object(),
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(
      parent_component ? parent_component.$$.context : options.context || [],
    ),
    callbacks: blank_object(),
    dirty,
    skip_bound: false,
    root: options.target || parent_component.$$.root,
  };
  append_styles2 && append_styles2($$.root);
  let ready = false;
  $$.ctx = instance
    ? instance(component, options.props || {}, (i, ret, ...rest) => {
      const value = rest.length ? rest[0] : ret;
      if ($$.ctx && not_equal2($$.ctx[i], $$.ctx[i] = value)) {
        if (!$$.skip_bound && $$.bound[i]) {
          $$.bound[i](value);
        }
        if (ready) {
          make_dirty(component, i);
        }
      }
      return ret;
    })
    : [];
  $$.update();
  ready = true;
  run_all($$.before_update);
  $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
  if (options.target) {
    if (options.hydrate) {
      start_hydrating();
      const nodes = children(options.target);
      $$.fragment && $$.fragment.l(nodes);
      nodes.forEach(detach);
    } else {
      $$.fragment && $$.fragment.c();
    }
    if (options.intro) {
      transition_in(component.$$.fragment);
    }
    mount_component(
      component,
      options.target,
      options.anchor,
      options.customElement,
    );
    end_hydrating();
    flush();
  }
  set_current_component(parent_component);
}
let SvelteElement;
if (typeof HTMLElement === "function") {
  SvelteElement = class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }
    connectedCallback() {
      const { on_mount } = this.$$;
      this.$$.on_disconnect = on_mount.map(run).filter(is_function);
      for (const key in this.$$.slotted) {
        this.appendChild(this.$$.slotted[key]);
      }
    }
    attributeChangedCallback(attr2, _oldValue, newValue) {
      this[attr2] = newValue;
    }
    disconnectedCallback() {
      run_all(this.$$.on_disconnect);
    }
    $destroy() {
      destroy_component(this, 1);
      this.$destroy = noop;
    }
    $on(type, callback) {
      const callbacks = this.$$.callbacks[type] ||
        (this.$$.callbacks[type] = []);
      callbacks.push(callback);
      return () => {
        const index = callbacks.indexOf(callback);
        if (index !== -1) {
          callbacks.splice(index, 1);
        }
      };
    }
    $set($$props) {
      if (this.$$set && !is_empty($$props)) {
        this.$$.skip_bound = true;
        this.$$set($$props);
        this.$$.skip_bound = false;
      }
    }
  };
}
class SvelteComponent {
  $destroy() {
    destroy_component(this, 1);
    this.$destroy = noop;
  }
  $on(type, callback) {
    const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
    callbacks.push(callback);
    return () => {
      const index = callbacks.indexOf(callback);
      if (index !== -1) {
        callbacks.splice(index, 1);
      }
    };
  }
  $set($$props) {
    if (this.$$set && !is_empty($$props)) {
      this.$$.skip_bound = true;
      this.$$set($$props);
      this.$$.skip_bound = false;
    }
  }
}
function dispatch_dev(type, detail) {
  document.dispatchEvent(
    custom_event(type, Object.assign({ version: "3.42.3" }, detail), true),
  );
}
function append_dev(target, node) {
  dispatch_dev("SvelteDOMInsert", { target, node });
  append(target, node);
}
function append_hydration_dev(target, node) {
  dispatch_dev("SvelteDOMInsert", { target, node });
  append_hydration(target, node);
}
function insert_dev(target, node, anchor) {
  dispatch_dev("SvelteDOMInsert", { target, node, anchor });
  insert(target, node, anchor);
}
function insert_hydration_dev(target, node, anchor) {
  dispatch_dev("SvelteDOMInsert", { target, node, anchor });
  insert_hydration(target, node, anchor);
}
function detach_dev(node) {
  dispatch_dev("SvelteDOMRemove", { node });
  detach(node);
}
function detach_between_dev(before, after) {
  while (before.nextSibling && before.nextSibling !== after) {
    detach_dev(before.nextSibling);
  }
}
function detach_before_dev(after) {
  while (after.previousSibling) {
    detach_dev(after.previousSibling);
  }
}
function detach_after_dev(before) {
  while (before.nextSibling) {
    detach_dev(before.nextSibling);
  }
}
function listen_dev(
  node,
  event,
  handler,
  options,
  has_prevent_default,
  has_stop_propagation,
) {
  const modifiers = options === true
    ? ["capture"]
    : options
    ? Array.from(Object.keys(options))
    : [];
  if (has_prevent_default) {
    modifiers.push("preventDefault");
  }
  if (has_stop_propagation) {
    modifiers.push("stopPropagation");
  }
  dispatch_dev("SvelteDOMAddEventListener", {
    node,
    event,
    handler,
    modifiers,
  });
  const dispose = listen(node, event, handler, options);
  return () => {
    dispatch_dev("SvelteDOMRemoveEventListener", {
      node,
      event,
      handler,
      modifiers,
    });
    dispose();
  };
}
function attr_dev(node, attribute, value) {
  attr(node, attribute, value);
  if (value == null) {
    dispatch_dev("SvelteDOMRemoveAttribute", { node, attribute });
  } else {
    dispatch_dev("SvelteDOMSetAttribute", { node, attribute, value });
  }
}
function prop_dev(node, property, value) {
  node[property] = value;
  dispatch_dev("SvelteDOMSetProperty", { node, property, value });
}
function dataset_dev(node, property, value) {
  node.dataset[property] = value;
  dispatch_dev("SvelteDOMSetDataset", { node, property, value });
}
function set_data_dev(text2, data) {
  data = "" + data;
  if (text2.wholeText === data) {
    return;
  }
  dispatch_dev("SvelteDOMSetData", { node: text2, data });
  text2.data = data;
}
function validate_each_argument(arg) {
  if (
    typeof arg !== "string" &&
    !(arg && typeof arg === "object" && "length" in arg)
  ) {
    let msg = "{#each} only iterates over array-like objects.";
    if (typeof Symbol === "function" && arg && Symbol.iterator in arg) {
      msg += " You can use a spread to convert this iterable into an array.";
    }
    throw new Error(msg);
  }
}
function validate_slots(name, slot, keys) {
  for (const slot_key of Object.keys(slot)) {
    if (!~keys.indexOf(slot_key)) {
      console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
    }
  }
}
class SvelteComponentDev extends SvelteComponent {
  constructor(options) {
    if (!options || !options.target && !options.$$inline) {
      throw new Error("'target' is a required option");
    }
    super();
  }
  $destroy() {
    super.$destroy();
    this.$destroy = () => {
      console.warn("Component was already destroyed");
    };
  }
  $capture_state() {
  }
  $inject_state() {
  }
}
class SvelteComponentTyped extends SvelteComponentDev {
  constructor(options) {
    super(options);
  }
}
function loop_guard(timeout) {
  const start = Date.now();
  return () => {
    if (Date.now() - start > timeout) {
      throw new Error("Infinite loop detected");
    }
  };
}
var internal = null;

/*
 * Skypack CDN - svelte@3.42.3
 *
 * Learn more:
 *   📙 Package Documentation: https://www.skypack.dev/view/svelte
 *   📘 Skypack Documentation: https://www.skypack.dev/docs
 *
 * Pinned URL: (Optimized for Production)
 *   ▶️ Normal: https://cdn.skypack.dev/pin/svelte@v3.42.3-TpBafxZKQ3mTQYqhXp6w/mode=imports/optimized/svelte/internal.js
 *   ⏩ Minified: https://cdn.skypack.dev/pin/svelte@v3.42.3-TpBafxZKQ3mTQYqhXp6w/mode=imports,min/optimized/svelte/internal.js
 *
 */

var svelte = null;

/*
 * Skypack CDN - svelte@3.42.3
 *
 * Learn more:
 *   📙 Package Documentation: https://www.skypack.dev/view/svelte
 *   📘 Skypack Documentation: https://www.skypack.dev/docs
 *
 * Pinned URL: (Optimized for Production)
 *   ▶️ Normal: https://cdn.skypack.dev/pin/svelte@v3.42.3-TpBafxZKQ3mTQYqhXp6w/mode=imports/optimized/svelte.js
 *   ⏩ Minified: https://cdn.skypack.dev/pin/svelte@v3.42.3-TpBafxZKQ3mTQYqhXp6w/mode=imports,min/optimized/svelte.js
 *
 */

/* src\components\ProfileCard.svelte generated by Svelte v3.42.3 */
const file$8 = "src\\components\\ProfileCard.svelte";

function create_fragment$8(ctx) {
  let div6;
  let div5;
  let div4;
  let div0;
  let h2;
  let t0_value = /*userData*/ ctx[0]?.name + "";
  let t0;
  let t1;
  let small;
  let t2_value = /*userData*/ ctx[0]?.location + "";
  let t2;
  let t3;
  let p;
  let t4_value = /*userData*/ ctx[0]?.email + "";
  let t4;
  let t5;
  let div3;
  let div1;
  let span0;
  let t6;
  let t7_value = /*userData*/ ctx[0]?.language + "";
  let t7;
  let t8;
  let div2;
  let span1;
  let t9;
  let t10_value = /*userData*/ ctx[0]?.time_zone + "";
  let t10;

  const block = {
    c: function create() {
      div6 = element("div");
      div5 = element("div");
      div4 = element("div");
      div0 = element("div");
      h2 = element("h2");
      t0 = text(t0_value);
      t1 = space();
      small = element("small");
      t2 = text(t2_value);
      t3 = space();
      p = element("p");
      t4 = text(t4_value);
      t5 = space();
      div3 = element("div");
      div1 = element("div");
      span0 = element("span");
      t6 = text("language: ");
      t7 = text(t7_value);
      t8 = space();
      div2 = element("div");
      span1 = element("span");
      t9 = text("time zone: ");
      t10 = text(t10_value);
      this.h();
    },
    l: function claim(nodes) {
      div6 = claim_element(nodes, "DIV", { class: true });
      var div6_nodes = children(div6);
      div5 = claim_element(div6_nodes, "DIV", { class: true });
      var div5_nodes = children(div5);
      div4 = claim_element(div5_nodes, "DIV", { class: true });
      var div4_nodes = children(div4);
      div0 = claim_element(div4_nodes, "DIV", { class: true });
      var div0_nodes = children(div0);
      h2 = claim_element(div0_nodes, "H2", { class: true });
      var h2_nodes = children(h2);
      t0 = claim_text(h2_nodes, t0_value);
      h2_nodes.forEach(detach_dev);
      t1 = claim_space(div0_nodes);
      small = claim_element(div0_nodes, "SMALL", { class: true });
      var small_nodes = children(small);
      t2 = claim_text(small_nodes, t2_value);
      small_nodes.forEach(detach_dev);
      div0_nodes.forEach(detach_dev);
      t3 = claim_space(div4_nodes);
      p = claim_element(div4_nodes, "P", { class: true });
      var p_nodes = children(p);
      t4 = claim_text(p_nodes, t4_value);
      p_nodes.forEach(detach_dev);
      t5 = claim_space(div4_nodes);
      div3 = claim_element(div4_nodes, "DIV", { class: true });
      var div3_nodes = children(div3);
      div1 = claim_element(div3_nodes, "DIV", { class: true });
      var div1_nodes = children(div1);
      span0 = claim_element(div1_nodes, "SPAN", {});
      var span0_nodes = children(span0);
      t6 = claim_text(span0_nodes, "language: ");
      t7 = claim_text(span0_nodes, t7_value);
      span0_nodes.forEach(detach_dev);
      div1_nodes.forEach(detach_dev);
      t8 = claim_space(div3_nodes);
      div2 = claim_element(div3_nodes, "DIV", { class: true });
      var div2_nodes = children(div2);
      span1 = claim_element(div2_nodes, "SPAN", {});
      var span1_nodes = children(span1);
      t9 = claim_text(span1_nodes, "time zone: ");
      t10 = claim_text(span1_nodes, t10_value);
      span1_nodes.forEach(detach_dev);
      div2_nodes.forEach(detach_dev);
      div3_nodes.forEach(detach_dev);
      div4_nodes.forEach(detach_dev);
      div5_nodes.forEach(detach_dev);
      div6_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(h2, "class", "text-lg font-semibold text-gray-900");
      add_location(h2, file$8, 21, 8, 518);
      attr_dev(small, "class", "text-sm text-gray-700 ml-6");
      add_location(small, file$8, 24, 8, 619);
      attr_dev(div0, "class", "flex items-center justify-between");
      add_location(div0, file$8, 20, 6, 461);
      attr_dev(p, "class", "mt-3 text-gray-700");
      add_location(p, file$8, 26, 6, 711);
      add_location(span0, file$8, 31, 10, 896);
      attr_dev(div1, "class", "flex mr-2 text-gray-700 text-sm mr-3");
      add_location(div1, file$8, 30, 8, 834);
      add_location(span1, file$8, 34, 10, 1027);
      attr_dev(div2, "class", "flex mr-2 text-gray-700 text-sm mr-8");
      add_location(div2, file$8, 33, 8, 965);
      attr_dev(div3, "class", "mt-4 flex items-center");
      add_location(div3, file$8, 29, 6, 788);
      attr_dev(div4, "class", "");
      add_location(div4, file$8, 19, 4, 439);
      attr_dev(div5, "class", "flex items-start px-4 py-2");
      add_location(div5, file$8, 18, 2, 393);
      attr_dev(
        div6,
        "class",
        "flex bg-white shadow-lg rounded-lg mx-4 md:mx-auto my-8 max-w-md md:max-w-2xl ",
      );
      add_location(div6, file$8, 15, 0, 292);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, div6, anchor);
      append_hydration_dev(div6, div5);
      append_hydration_dev(div5, div4);
      append_hydration_dev(div4, div0);
      append_hydration_dev(div0, h2);
      append_hydration_dev(h2, t0);
      append_hydration_dev(div0, t1);
      append_hydration_dev(div0, small);
      append_hydration_dev(small, t2);
      append_hydration_dev(div4, t3);
      append_hydration_dev(div4, p);
      append_hydration_dev(p, t4);
      append_hydration_dev(div4, t5);
      append_hydration_dev(div4, div3);
      append_hydration_dev(div3, div1);
      append_hydration_dev(div1, span0);
      append_hydration_dev(span0, t6);
      append_hydration_dev(span0, t7);
      append_hydration_dev(div3, t8);
      append_hydration_dev(div3, div2);
      append_hydration_dev(div2, span1);
      append_hydration_dev(span1, t9);
      append_hydration_dev(span1, t10);
    },
    p: function update(ctx, [dirty]) {
      if (
        dirty & /*userData*/ 1 &&
        t0_value !== (t0_value = /*userData*/ ctx[0]?.name + "")
      ) {
        set_data_dev(t0, t0_value);
      }
      if (
        dirty & /*userData*/ 1 &&
        t2_value !== (t2_value = /*userData*/ ctx[0]?.location + "")
      ) {
        set_data_dev(t2, t2_value);
      }
      if (
        dirty & /*userData*/ 1 &&
        t4_value !== (t4_value = /*userData*/ ctx[0]?.email + "")
      ) {
        set_data_dev(t4, t4_value);
      }
      if (
        dirty & /*userData*/ 1 &&
        t7_value !== (t7_value = /*userData*/ ctx[0]?.language + "")
      ) {
        set_data_dev(t7, t7_value);
      }
      if (
        dirty & /*userData*/ 1 &&
        t10_value !== (t10_value = /*userData*/ ctx[0]?.time_zone + "")
      ) {
        set_data_dev(t10, t10_value);
      }
    },
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(div6);
    },
  };

  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_fragment$8.name,
    type: "component",
    source: "",
    ctx,
  });

  return block;
}

function instance$8($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  validate_slots("ProfileCard", slots, []);
  let { userId = "" } = $$props;
  let userData = {};

  onMount(async () => {
    const response = await fetch(`http://127.0.0.1:4000/api/users/${userId}`);
    const data = await response.json();
    $$invalidate(0, userData = data);
  });

  const writable_props = ["userId"];

  Object.keys($$props).forEach((key) => {
    if (
      !~writable_props.indexOf(key) && key.slice(0, 2) !== "$$" &&
      key !== "slot"
    ) {
      console.warn(`<ProfileCard> was created with unknown prop '${key}'`);
    }
  });

  $$self.$$set = ($$props) => {
    if ("userId" in $$props) $$invalidate(1, userId = $$props.userId);
  };

  $$self.$capture_state = () => ({ onMount, userId, userData });

  $$self.$inject_state = ($$props) => {
    if ("userId" in $$props) $$invalidate(1, userId = $$props.userId);
    if ("userData" in $$props) $$invalidate(0, userData = $$props.userData);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  return [userData, userId];
}

class ProfileCard extends SvelteComponentDev {
  constructor(options) {
    super(options);
    init(this, options, instance$8, create_fragment$8, safe_not_equal, {
      userId: 1,
    });

    dispatch_dev("SvelteRegisterComponent", {
      component: this,
      tagName: "ProfileCard",
      options,
      id: create_fragment$8.name,
    });
  }

  get userId() {
    throw new Error(
      "<ProfileCard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'",
    );
  }

  set userId(value) {
    throw new Error(
      "<ProfileCard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'",
    );
  }
}

/* src\components\Categories.svelte generated by Svelte v3.42.3 */
const file$7 = "src\\components\\Categories.svelte";

function get_each_context$2(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[1] = list[i];
  return child_ctx;
}

// (29:0) {:else}
function create_else_block$1(ctx) {
  let h1;
  let t;

  const block = {
    c: function create() {
      h1 = element("h1");
      t = text("no categories yet");
      this.h();
    },
    l: function claim(nodes) {
      h1 = claim_element(nodes, "H1", {});
      var h1_nodes = children(h1);
      t = claim_text(h1_nodes, "no categories yet");
      h1_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      add_location(h1, file$7, 29, 2, 708);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, h1, anchor);
      append_hydration_dev(h1, t);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(h1);
    },
  };

  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_else_block$1.name,
    type: "else",
    source: "(29:0) {:else}",
    ctx,
  });

  return block;
}

// (14:0) {#each categories as categorie}
function create_each_block$2(ctx) {
  let div3;
  let div2;
  let div0;
  let t0_value = /*categorie*/ ctx[1]?.name + "";
  let t0;
  let t1;
  let div1;
  let t2_value = /*categorie*/ ctx[1]?.description + "";
  let t2;
  let t3;

  const block = {
    c: function create() {
      div3 = element("div");
      div2 = element("div");
      div0 = element("div");
      t0 = text(t0_value);
      t1 = space();
      div1 = element("div");
      t2 = text(t2_value);
      t3 = space();
      this.h();
    },
    l: function claim(nodes) {
      div3 = claim_element(nodes, "DIV", { class: true });
      var div3_nodes = children(div3);
      div2 = claim_element(div3_nodes, "DIV", { class: true });
      var div2_nodes = children(div2);
      div0 = claim_element(div2_nodes, "DIV", { class: true });
      var div0_nodes = children(div0);
      t0 = claim_text(div0_nodes, t0_value);
      div0_nodes.forEach(detach_dev);
      t1 = claim_space(div2_nodes);
      div1 = claim_element(div2_nodes, "DIV", { class: true });
      var div1_nodes = children(div1);
      t2 = claim_text(div1_nodes, t2_value);
      div1_nodes.forEach(detach_dev);
      div2_nodes.forEach(detach_dev);
      t3 = claim_space(div3_nodes);
      div3_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(
        div0,
        "class",
        "px-6 py-4 bg-white border-b border-gray-200 font-bold uppercase",
      );
      add_location(div0, file$7, 16, 6, 403);
      attr_dev(div1, "class", "p-6 bg-white border-b border-gray-200");
      add_location(div1, file$7, 23, 6, 574);
      attr_dev(div2, "class", "overflow-hidden shadow-md");
      add_location(div2, file$7, 15, 4, 356);
      attr_dev(div3, "class", "max-w-2xl mx-auto sm:px-6 lg:px-8 mt-4");
      add_location(div3, file$7, 14, 2, 298);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, div3, anchor);
      append_hydration_dev(div3, div2);
      append_hydration_dev(div2, div0);
      append_hydration_dev(div0, t0);
      append_hydration_dev(div2, t1);
      append_hydration_dev(div2, div1);
      append_hydration_dev(div1, t2);
      append_hydration_dev(div3, t3);
    },
    p: function update(ctx, dirty) {
      if (
        dirty & /*categories*/ 1 &&
        t0_value !== (t0_value = /*categorie*/ ctx[1]?.name + "")
      ) {
        set_data_dev(t0, t0_value);
      }
      if (
        dirty & /*categories*/ 1 &&
        t2_value !== (t2_value = /*categorie*/ ctx[1]?.description + "")
      ) {
        set_data_dev(t2, t2_value);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div3);
    },
  };

  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_each_block$2.name,
    type: "each",
    source: "(14:0) {#each categories as categorie}",
    ctx,
  });

  return block;
}

function create_fragment$7(ctx) {
  let each_1_anchor;
  let each_value = /*categories*/ ctx[0];
  validate_each_argument(each_value);
  let each_blocks = [];

  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$2(
      get_each_context$2(ctx, each_value, i),
    );
  }

  let each_1_else = null;

  if (!each_value.length) {
    each_1_else = create_else_block$1(ctx);
  }

  const block = {
    c: function create() {
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }

      each_1_anchor = empty();

      if (each_1_else) {
        each_1_else.c();
      }
    },
    l: function claim(nodes) {
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].l(nodes);
      }

      each_1_anchor = empty();

      if (each_1_else) {
        each_1_else.l(nodes);
      }
    },
    m: function mount(target, anchor) {
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(target, anchor);
      }

      insert_hydration_dev(target, each_1_anchor, anchor);

      if (each_1_else) {
        each_1_else.m(target, anchor);
      }
    },
    p: function update(ctx, [dirty]) {
      if (dirty & /*categories*/ 1) {
        each_value = /*categories*/ ctx[0];
        validate_each_argument(each_value);
        let i;

        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context$2(ctx, each_value, i);

          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block$2(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
          }
        }

        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }

        each_blocks.length = each_value.length;

        if (each_value.length) {
          if (each_1_else) {
            each_1_else.d(1);
            each_1_else = null;
          }
        } else if (!each_1_else) {
          each_1_else = create_else_block$1(ctx);
          each_1_else.c();
          each_1_else.m(each_1_anchor.parentNode, each_1_anchor);
        }
      }
    },
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      destroy_each(each_blocks, detaching);
      if (detaching) detach_dev(each_1_anchor);
      if (each_1_else) each_1_else.d(detaching);
    },
  };

  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_fragment$7.name,
    type: "component",
    source: "",
    ctx,
  });

  return block;
}

function instance$7($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  validate_slots("Categories", slots, []);
  let categories = [];

  onMount(async () => {
    const response = await fetch(`http://127.0.0.1:4000/api/categories/`);
    const data = await response.json();
    $$invalidate(0, categories = data);
  });

  const writable_props = [];

  Object.keys($$props).forEach((key) => {
    if (
      !~writable_props.indexOf(key) && key.slice(0, 2) !== "$$" &&
      key !== "slot"
    ) {
      console.warn(`<Categories> was created with unknown prop '${key}'`);
    }
  });

  $$self.$capture_state = () => ({ onMount, categories });

  $$self.$inject_state = ($$props) => {
    if ("categories" in $$props) {
      $$invalidate(0, categories = $$props.categories);
    }
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  return [categories];
}

class Categories extends SvelteComponentDev {
  constructor(options) {
    super(options);
    init(this, options, instance$7, create_fragment$7, safe_not_equal, {});

    dispatch_dev("SvelteRegisterComponent", {
      component: this,
      tagName: "Categories",
      options,
      id: create_fragment$7.name,
    });
  }
}

/* src\components\Card.svelte generated by Svelte v3.42.3 */

const file$6 = "src\\components\\Card.svelte";

function get_each_context$1(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[4] = list[i];
  return child_ctx;
}

// (23:8) {#each characters as character}
function create_each_block$1(ctx) {
  let span;
  let t0_value = /*character*/ ctx[4] + "";
  let t0;
  let t1;

  const block = {
    c: function create() {
      span = element("span");
      t0 = text(t0_value);
      t1 = space();
      this.h();
    },
    l: function claim(nodes) {
      span = claim_element(nodes, "SPAN", { class: true });
      var span_nodes = children(span);
      t0 = claim_text(span_nodes, t0_value);
      t1 = claim_space(span_nodes);
      span_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(span, "class", "bg-red-600 py-1 px-2 text-white rounded-lg");
      add_location(span, file$6, 23, 10, 744);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, span, anchor);
      append_hydration_dev(span, t0);
      append_hydration_dev(span, t1);
    },
    p: function update(ctx, dirty) {
      if (
        dirty & /*characters*/ 8 &&
        t0_value !== (t0_value = /*character*/ ctx[4] + "")
      ) {
        set_data_dev(t0, t0_value);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(span);
    },
  };

  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_each_block$1.name,
    type: "each",
    source: "(23:8) {#each characters as character}",
    ctx,
  });

  return block;
}

function create_fragment$6(ctx) {
  let article;
  let div0;
  let img;
  let img_src_value;
  let t0;
  let div2;
  let h3;
  let span;
  let t1;
  let t2;
  let div1;
  let t3;
  let p;
  let t4;
  let each_value = /*characters*/ ctx[3];
  validate_each_argument(each_value);
  let each_blocks = [];

  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$1(
      get_each_context$1(ctx, each_value, i),
    );
  }

  const block = {
    c: function create() {
      article = element("article");
      div0 = element("div");
      img = element("img");
      t0 = space();
      div2 = element("div");
      h3 = element("h3");
      span = element("span");
      t1 = text(/*name*/ ctx[1]);
      t2 = space();
      div1 = element("div");

      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }

      t3 = space();
      p = element("p");
      t4 = text(/*description*/ ctx[2]);
      this.h();
    },
    l: function claim(nodes) {
      article = claim_element(nodes, "ARTICLE", { class: true });
      var article_nodes = children(article);
      div0 = claim_element(article_nodes, "DIV", { class: true });
      var div0_nodes = children(div0);
      img = claim_element(div0_nodes, "IMG", {
        src: true,
        alt: true,
        class: true,
      });
      div0_nodes.forEach(detach_dev);
      t0 = claim_space(article_nodes);
      div2 = claim_element(article_nodes, "DIV", { class: true });
      var div2_nodes = children(div2);
      h3 = claim_element(div2_nodes, "H3", { class: true });
      var h3_nodes = children(h3);
      span = claim_element(h3_nodes, "SPAN", { class: true });
      var span_nodes = children(span);
      t1 = claim_text(span_nodes, /*name*/ ctx[1]);
      span_nodes.forEach(detach_dev);
      t2 = claim_space(h3_nodes);
      div1 = claim_element(h3_nodes, "DIV", { class: true });
      var div1_nodes = children(div1);

      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].l(div1_nodes);
      }

      div1_nodes.forEach(detach_dev);
      h3_nodes.forEach(detach_dev);
      t3 = claim_space(div2_nodes);
      p = claim_element(div2_nodes, "P", { class: true });
      var p_nodes = children(p);
      t4 = claim_text(p_nodes, /*description*/ ctx[2]);
      p_nodes.forEach(detach_dev);
      div2_nodes.forEach(detach_dev);
      article_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      if (!src_url_equal(img.src, img_src_value = /*src*/ ctx[0])) {
        attr_dev(img, "src", img_src_value);
      }
      attr_dev(
        img,
        "alt",
        "Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.",
      );
      attr_dev(img, "class", "w-full h-full object-center object-cover");
      add_location(img, file$6, 11, 4, 318);
      attr_dev(div0, "class", "relative w-full h-80 md:h-64 lg:h-44");
      add_location(div0, file$6, 10, 2, 262);
      attr_dev(span, "class", "bg-indigo-600 py-1 px-2 text-white");
      add_location(span, file$6, 19, 6, 601);
      attr_dev(div1, "class", "mt-4");
      add_location(div1, file$6, 21, 6, 673);
      attr_dev(h3, "class", "text-sm text-gray-500 pb-2");
      add_location(h3, file$6, 18, 4, 554);
      attr_dev(
        p,
        "class",
        "text-base font-semibold text-gray-900 group-hover:text-indigo-600",
      );
      add_location(p, file$6, 29, 4, 893);
      attr_dev(div2, "class", "px-3 py-4");
      add_location(div2, file$6, 17, 2, 525);
      attr_dev(
        article,
        "class",
        "bg-white group relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform duration-200",
      );
      add_location(article, file$6, 7, 0, 135);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, article, anchor);
      append_hydration_dev(article, div0);
      append_hydration_dev(div0, img);
      append_hydration_dev(article, t0);
      append_hydration_dev(article, div2);
      append_hydration_dev(div2, h3);
      append_hydration_dev(h3, span);
      append_hydration_dev(span, t1);
      append_hydration_dev(h3, t2);
      append_hydration_dev(h3, div1);

      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(div1, null);
      }

      append_hydration_dev(div2, t3);
      append_hydration_dev(div2, p);
      append_hydration_dev(p, t4);
    },
    p: function update(ctx, [dirty]) {
      if (
        dirty & /*src*/ 1 &&
        !src_url_equal(img.src, img_src_value = /*src*/ ctx[0])
      ) {
        attr_dev(img, "src", img_src_value);
      }

      if (dirty & /*name*/ 2) set_data_dev(t1, /*name*/ ctx[1]);

      if (dirty & /*characters*/ 8) {
        each_value = /*characters*/ ctx[3];
        validate_each_argument(each_value);
        let i;

        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context$1(ctx, each_value, i);

          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block$1(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(div1, null);
          }
        }

        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }

        each_blocks.length = each_value.length;
      }

      if (dirty & /*description*/ 4) set_data_dev(t4, /*description*/ ctx[2]);
    },
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(article);
      destroy_each(each_blocks, detaching);
    },
  };

  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_fragment$6.name,
    type: "component",
    source: "",
    ctx,
  });

  return block;
}

function instance$6($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  validate_slots("Card", slots, []);
  let { src = "" } = $$props;
  let { name = "" } = $$props;
  let { description = "" } = $$props;
  let { characters = [] } = $$props;
  const writable_props = ["src", "name", "description", "characters"];

  Object.keys($$props).forEach((key) => {
    if (
      !~writable_props.indexOf(key) && key.slice(0, 2) !== "$$" &&
      key !== "slot"
    ) {
      console.warn(`<Card> was created with unknown prop '${key}'`);
    }
  });

  $$self.$$set = ($$props) => {
    if ("src" in $$props) $$invalidate(0, src = $$props.src);
    if ("name" in $$props) $$invalidate(1, name = $$props.name);
    if ("description" in $$props) {
      $$invalidate(2, description = $$props.description);
    }
    if ("characters" in $$props) {
      $$invalidate(3, characters = $$props.characters);
    }
  };

  $$self.$capture_state = () => ({ src, name, description, characters });

  $$self.$inject_state = ($$props) => {
    if ("src" in $$props) $$invalidate(0, src = $$props.src);
    if ("name" in $$props) $$invalidate(1, name = $$props.name);
    if ("description" in $$props) {
      $$invalidate(2, description = $$props.description);
    }
    if ("characters" in $$props) {
      $$invalidate(3, characters = $$props.characters);
    }
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  return [src, name, description, characters];
}

class Card extends SvelteComponentDev {
  constructor(options) {
    super(options);

    init(this, options, instance$6, create_fragment$6, safe_not_equal, {
      src: 0,
      name: 1,
      description: 2,
      characters: 3,
    });

    dispatch_dev("SvelteRegisterComponent", {
      component: this,
      tagName: "Card",
      options,
      id: create_fragment$6.name,
    });
  }

  get src() {
    throw new Error(
      "<Card>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'",
    );
  }

  set src(value) {
    throw new Error(
      "<Card>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'",
    );
  }

  get name() {
    throw new Error(
      "<Card>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'",
    );
  }

  set name(value) {
    throw new Error(
      "<Card>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'",
    );
  }

  get description() {
    throw new Error(
      "<Card>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'",
    );
  }

  set description(value) {
    throw new Error(
      "<Card>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'",
    );
  }

  get characters() {
    throw new Error(
      "<Card>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'",
    );
  }

  set characters(value) {
    throw new Error(
      "<Card>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'",
    );
  }
}

/* src\components\SeriesCard.svelte generated by Svelte v3.42.3 */
const file$5 = "src\\components\\SeriesCard.svelte";

function get_each_context(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[4] = list[i];
  return child_ctx;
}

// (37:8) {#if !serie.is_deleted}
function create_if_block$1(ctx) {
  let card;
  let current;

  card = new Card({
    props: {
      name: /*serie*/ ctx[4].name,
      description: /*serie*/ ctx[4].description,
      src: /*serie*/ ctx[4].poster,
      characters: /*serie*/ ctx[4].characters,
      id: /*serie*/ ctx[4].id,
    },
    $$inline: true,
  });

  const block = {
    c: function create() {
      create_component(card.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(card.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(card, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      const card_changes = {};
      if (dirty & /*series*/ 1) card_changes.name = /*serie*/ ctx[4].name;
      if (dirty & /*series*/ 1) {
        card_changes.description = /*serie*/ ctx[4].description;
      }
      if (dirty & /*series*/ 1) card_changes.src = /*serie*/ ctx[4].poster;
      if (dirty & /*series*/ 1) {
        card_changes.characters = /*serie*/ ctx[4].characters;
      }
      if (dirty & /*series*/ 1) card_changes.id = /*serie*/ ctx[4].id;
      card.$set(card_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(card.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(card.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(card, detaching);
    },
  };

  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_if_block$1.name,
    type: "if",
    source: "(37:8) {#if !serie.is_deleted}",
    ctx,
  });

  return block;
}

// (36:6) {#each series as serie}
function create_each_block(ctx) {
  let if_block_anchor;
  let current;
  let if_block = !/*serie*/ ctx[4].is_deleted && create_if_block$1(ctx);

  const block = {
    c: function create() {
      if (if_block) if_block.c();
      if_block_anchor = empty();
    },
    l: function claim(nodes) {
      if (if_block) if_block.l(nodes);
      if_block_anchor = empty();
    },
    m: function mount(target, anchor) {
      if (if_block) if_block.m(target, anchor);
      insert_hydration_dev(target, if_block_anchor, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      if (!/*serie*/ ctx[4].is_deleted) {
        if (if_block) {
          if_block.p(ctx, dirty);

          if (dirty & /*series*/ 1) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block$1(ctx);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        group_outros();

        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });

        check_outros();
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(if_block);
      current = true;
    },
    o: function outro(local) {
      transition_out(if_block);
      current = false;
    },
    d: function destroy(detaching) {
      if (if_block) if_block.d(detaching);
      if (detaching) detach_dev(if_block_anchor);
    },
  };

  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_each_block.name,
    type: "each",
    source: "(36:6) {#each series as serie}",
    ctx,
  });

  return block;
}

function create_fragment$5(ctx) {
  let section1;
  let article;
  let h2;
  let t0;
  let t1;
  let section0;
  let current;
  let each_value = /*series*/ ctx[0];
  validate_each_argument(each_value);
  let each_blocks = [];

  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
  }

  const out = (i) =>
    transition_out(each_blocks[i], 1, 1, () => {
      each_blocks[i] = null;
    });

  const block = {
    c: function create() {
      section1 = element("section");
      article = element("article");
      h2 = element("h2");
      t0 = text(/*title*/ ctx[1]);
      t1 = space();
      section0 = element("section");

      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }

      this.h();
    },
    l: function claim(nodes) {
      section1 = claim_element(nodes, "SECTION", { class: true });
      var section1_nodes = children(section1);
      article = claim_element(section1_nodes, "ARTICLE", {});
      var article_nodes = children(article);
      h2 = claim_element(article_nodes, "H2", { class: true });
      var h2_nodes = children(h2);
      t0 = claim_text(h2_nodes, /*title*/ ctx[1]);
      h2_nodes.forEach(detach_dev);
      t1 = claim_space(article_nodes);
      section0 = claim_element(article_nodes, "SECTION", { class: true });
      var section0_nodes = children(section0);

      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].l(section0_nodes);
      }

      section0_nodes.forEach(detach_dev);
      article_nodes.forEach(detach_dev);
      section1_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(h2, "class", "text-2xl font-extrabold text-gray-900");
      add_location(h2, file$5, 33, 4, 895);
      attr_dev(
        section0,
        "class",
        "mt-6 grid md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8",
      );
      add_location(section0, file$5, 34, 4, 963);
      add_location(article, file$5, 32, 2, 880);
      attr_dev(
        section1,
        "class",
        "max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 mt-12 mb-12",
      );
      add_location(section1, file$5, 31, 0, 808);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, section1, anchor);
      append_hydration_dev(section1, article);
      append_hydration_dev(article, h2);
      append_hydration_dev(h2, t0);
      append_hydration_dev(article, t1);
      append_hydration_dev(article, section0);

      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(section0, null);
      }

      current = true;
    },
    p: function update(ctx, [dirty]) {
      if (!current || dirty & /*title*/ 2) set_data_dev(t0, /*title*/ ctx[1]);

      if (dirty & /*series*/ 1) {
        each_value = /*series*/ ctx[0];
        validate_each_argument(each_value);
        let i;

        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context(ctx, each_value, i);

          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
            transition_in(each_blocks[i], 1);
          } else {
            each_blocks[i] = create_each_block(child_ctx);
            each_blocks[i].c();
            transition_in(each_blocks[i], 1);
            each_blocks[i].m(section0, null);
          }
        }

        group_outros();

        for (i = each_value.length; i < each_blocks.length; i += 1) {
          out(i);
        }

        check_outros();
      }
    },
    i: function intro(local) {
      if (current) return;

      for (let i = 0; i < each_value.length; i += 1) {
        transition_in(each_blocks[i]);
      }

      current = true;
    },
    o: function outro(local) {
      each_blocks = each_blocks.filter(Boolean);

      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }

      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(section1);
      destroy_each(each_blocks, detaching);
    },
  };

  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_fragment$5.name,
    type: "component",
    source: "",
    ctx,
  });

  return block;
}

function instance$5($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  validate_slots("SeriesCard", slots, []);
  let { series = [] } = $$props;
  let { custom = false } = $$props;
  let { title = "Series" } = $$props;
  let { id = "" } = $$props;

  if (custom) {
    onMount(async () => {
      const response = await fetch("http://127.0.0.1:4000/api/series/");
      const data = await response.json();
      $$invalidate(0, series = data);
    });
  } else {
    onMount(async () => {
      const response = await fetch(`http://127.0.0.1:4000/api/users/${id}`);
      const data = await response.json();

      data?.series_list.forEach(async (id) => {
        const response = await fetch(`http://127.0.0.1:4000/api/series/${id}`);
        const data = await response.json();
        $$invalidate(0, series = [...series, data]);
      });
    });
  }

  const writable_props = ["series", "custom", "title", "id"];

  Object.keys($$props).forEach((key) => {
    if (
      !~writable_props.indexOf(key) && key.slice(0, 2) !== "$$" &&
      key !== "slot"
    ) {
      console.warn(`<SeriesCard> was created with unknown prop '${key}'`);
    }
  });

  $$self.$$set = ($$props) => {
    if ("series" in $$props) $$invalidate(0, series = $$props.series);
    if ("custom" in $$props) $$invalidate(2, custom = $$props.custom);
    if ("title" in $$props) $$invalidate(1, title = $$props.title);
    if ("id" in $$props) $$invalidate(3, id = $$props.id);
  };

  $$self.$capture_state = () => ({ onMount, Card, series, custom, title, id });

  $$self.$inject_state = ($$props) => {
    if ("series" in $$props) $$invalidate(0, series = $$props.series);
    if ("custom" in $$props) $$invalidate(2, custom = $$props.custom);
    if ("title" in $$props) $$invalidate(1, title = $$props.title);
    if ("id" in $$props) $$invalidate(3, id = $$props.id);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  return [series, title, custom, id];
}

class SeriesCard extends SvelteComponentDev {
  constructor(options) {
    super(options);
    init(this, options, instance$5, create_fragment$5, safe_not_equal, {
      series: 0,
      custom: 2,
      title: 1,
      id: 3,
    });

    dispatch_dev("SvelteRegisterComponent", {
      component: this,
      tagName: "SeriesCard",
      options,
      id: create_fragment$5.name,
    });
  }

  get series() {
    throw new Error(
      "<SeriesCard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'",
    );
  }

  set series(value) {
    throw new Error(
      "<SeriesCard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'",
    );
  }

  get custom() {
    throw new Error(
      "<SeriesCard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'",
    );
  }

  set custom(value) {
    throw new Error(
      "<SeriesCard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'",
    );
  }

  get title() {
    throw new Error(
      "<SeriesCard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'",
    );
  }

  set title(value) {
    throw new Error(
      "<SeriesCard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'",
    );
  }

  get id() {
    throw new Error(
      "<SeriesCard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'",
    );
  }

  set id(value) {
    throw new Error(
      "<SeriesCard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'",
    );
  }
}

/* src\components\Series.svelte generated by Svelte v3.42.3 */
const file$4 = "src\\components\\Series.svelte";

function create_fragment$4(ctx) {
  let seriescard;
  let current;
  const seriescard_spread_levels = [/*props*/ ctx[0]];
  let seriescard_props = {};

  for (let i = 0; i < seriescard_spread_levels.length; i += 1) {
    seriescard_props = assign(seriescard_props, seriescard_spread_levels[i]);
  }

  seriescard = new SeriesCard({ props: seriescard_props, $$inline: true });

  const block = {
    c: function create() {
      create_component(seriescard.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(seriescard.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(seriescard, target, anchor);
      current = true;
    },
    p: function update(ctx, [dirty]) {
      const seriescard_changes = (dirty & /*props*/ 1)
        ? get_spread_update(seriescard_spread_levels, [
          get_spread_object(/*props*/ ctx[0]),
        ])
        : {};

      seriescard.$set(seriescard_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(seriescard.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(seriescard.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(seriescard, detaching);
    },
  };

  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_fragment$4.name,
    type: "component",
    source: "",
    ctx,
  });

  return block;
}

function instance$4($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  validate_slots("Series", slots, []);
  let { title } = $$props;
  let { custom } = $$props;
  let { series = [] } = $$props;
  let { id } = $$props;
  const props = { title, custom, series, id };
  const writable_props = ["title", "custom", "series", "id"];

  Object.keys($$props).forEach((key) => {
    if (
      !~writable_props.indexOf(key) && key.slice(0, 2) !== "$$" &&
      key !== "slot"
    ) {
      console.warn(`<Series> was created with unknown prop '${key}'`);
    }
  });

  $$self.$$set = ($$props) => {
    if ("title" in $$props) $$invalidate(1, title = $$props.title);
    if ("custom" in $$props) $$invalidate(2, custom = $$props.custom);
    if ("series" in $$props) $$invalidate(3, series = $$props.series);
    if ("id" in $$props) $$invalidate(4, id = $$props.id);
  };

  $$self.$capture_state = () => ({
    SeriesCard,
    title,
    custom,
    series,
    id,
    props,
  });

  $$self.$inject_state = ($$props) => {
    if ("title" in $$props) $$invalidate(1, title = $$props.title);
    if ("custom" in $$props) $$invalidate(2, custom = $$props.custom);
    if ("series" in $$props) $$invalidate(3, series = $$props.series);
    if ("id" in $$props) $$invalidate(4, id = $$props.id);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  return [props, title, custom, series, id];
}

class Series extends SvelteComponentDev {
  constructor(options) {
    super(options);
    init(this, options, instance$4, create_fragment$4, safe_not_equal, {
      title: 1,
      custom: 2,
      series: 3,
      id: 4,
    });

    dispatch_dev("SvelteRegisterComponent", {
      component: this,
      tagName: "Series",
      options,
      id: create_fragment$4.name,
    });

    const { ctx } = this.$$;
    const props = options.props || {};

    if (/*title*/ ctx[1] === undefined && !("title" in props)) {
      console.warn("<Series> was created without expected prop 'title'");
    }

    if (/*custom*/ ctx[2] === undefined && !("custom" in props)) {
      console.warn("<Series> was created without expected prop 'custom'");
    }

    if (/*id*/ ctx[4] === undefined && !("id" in props)) {
      console.warn("<Series> was created without expected prop 'id'");
    }
  }

  get title() {
    throw new Error(
      "<Series>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'",
    );
  }

  set title(value) {
    throw new Error(
      "<Series>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'",
    );
  }

  get custom() {
    throw new Error(
      "<Series>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'",
    );
  }

  set custom(value) {
    throw new Error(
      "<Series>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'",
    );
  }

  get series() {
    throw new Error(
      "<Series>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'",
    );
  }

  set series(value) {
    throw new Error(
      "<Series>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'",
    );
  }

  get id() {
    throw new Error(
      "<Series>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'",
    );
  }

  set id(value) {
    throw new Error(
      "<Series>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'",
    );
  }
}

function backInOut(t) {
  const s = 1.70158 * 1.525;
  if ((t *= 2) < 1) {
    return 0.5 * (t * t * ((s + 1) * t - s));
  }
  return 0.5 * ((t -= 2) * t * ((s + 1) * t + s) + 2);
}
function backIn(t) {
  const s = 1.70158;
  return t * t * ((s + 1) * t - s);
}
function backOut(t) {
  const s = 1.70158;
  return --t * t * ((s + 1) * t + s) + 1;
}
function bounceOut(t) {
  const a = 4 / 11;
  const b = 8 / 11;
  const c = 9 / 10;
  const ca = 4356 / 361;
  const cb = 35442 / 1805;
  const cc = 16061 / 1805;
  const t2 = t * t;
  return t < a
    ? 7.5625 * t2
    : t < b
    ? 9.075 * t2 - 9.9 * t + 3.4
    : t < c
    ? ca * t2 - cb * t + cc
    : 10.8 * t * t - 20.52 * t + 10.72;
}
function bounceInOut(t) {
  return t < 0.5
    ? 0.5 * (1 - bounceOut(1 - t * 2))
    : 0.5 * bounceOut(t * 2 - 1) + 0.5;
}
function bounceIn(t) {
  return 1 - bounceOut(1 - t);
}
function circInOut(t) {
  if ((t *= 2) < 1) {
    return -0.5 * (Math.sqrt(1 - t * t) - 1);
  }
  return 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
}
function circIn(t) {
  return 1 - Math.sqrt(1 - t * t);
}
function circOut(t) {
  return Math.sqrt(1 - --t * t);
}
function cubicInOut(t) {
  return t < 0.5 ? 4 * t * t * t : 0.5 * Math.pow(2 * t - 2, 3) + 1;
}
function cubicIn(t) {
  return t * t * t;
}
function cubicOut(t) {
  const f = t - 1;
  return f * f * f + 1;
}
function elasticInOut(t) {
  return t < 0.5
    ? 0.5 * Math.sin(13 * Math.PI / 2 * 2 * t) * Math.pow(2, 10 * (2 * t - 1))
    : 0.5 * Math.sin(-13 * Math.PI / 2 * (2 * t - 1 + 1)) *
        Math.pow(2, -10 * (2 * t - 1)) + 1;
}
function elasticIn(t) {
  return Math.sin(13 * t * Math.PI / 2) * Math.pow(2, 10 * (t - 1));
}
function elasticOut(t) {
  return Math.sin(-13 * (t + 1) * Math.PI / 2) * Math.pow(2, -10 * t) + 1;
}
function expoInOut(t) {
  return t === 0 || t === 1
    ? t
    : t < 0.5
    ? 0.5 * Math.pow(2, 20 * t - 10)
    : -0.5 * Math.pow(2, 10 - t * 20) + 1;
}
function expoIn(t) {
  return t === 0 ? t : Math.pow(2, 10 * (t - 1));
}
function expoOut(t) {
  return t === 1 ? t : 1 - Math.pow(2, -10 * t);
}
function quadInOut(t) {
  t /= 0.5;
  if (t < 1) {
    return 0.5 * t * t;
  }
  t--;
  return -0.5 * (t * (t - 2) - 1);
}
function quadIn(t) {
  return t * t;
}
function quadOut(t) {
  return -t * (t - 2);
}
function quartInOut(t) {
  return t < 0.5 ? 8 * Math.pow(t, 4) : -8 * Math.pow(t - 1, 4) + 1;
}
function quartIn(t) {
  return Math.pow(t, 4);
}
function quartOut(t) {
  return Math.pow(t - 1, 3) * (1 - t) + 1;
}
function quintInOut(t) {
  if ((t *= 2) < 1) {
    return 0.5 * t * t * t * t * t;
  }
  return 0.5 * ((t -= 2) * t * t * t * t + 2);
}
function quintIn(t) {
  return t * t * t * t * t;
}
function quintOut(t) {
  return --t * t * t * t * t + 1;
}
function sineInOut(t) {
  return -0.5 * (Math.cos(Math.PI * t) - 1);
}
function sineIn(t) {
  const v = Math.cos(t * Math.PI * 0.5);
  if (Math.abs(v) < 1e-14) {
    return 1;
  } else {
    return 1 - v;
  }
}
function sineOut(t) {
  return Math.sin(t * Math.PI / 2);
}
var easing = null;

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
function __rest(s, e) {
  var t = {};
  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) {
      t[p] = s[p];
    }
  }
  if (s != null && typeof Object.getOwnPropertySymbols === "function") {
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (
        e.indexOf(p[i]) < 0 &&
        Object.prototype.propertyIsEnumerable.call(s, p[i])
      ) {
        t[p[i]] = s[p[i]];
      }
    }
  }
  return t;
}
function blur(
  node,
  {
    delay = 0,
    duration = 400,
    easing: easing2 = cubicInOut,
    amount = 5,
    opacity = 0,
  } = {},
) {
  const style = getComputedStyle(node);
  const target_opacity = +style.opacity;
  const f = style.filter === "none" ? "" : style.filter;
  const od = target_opacity * (1 - opacity);
  return {
    delay,
    duration,
    easing: easing2,
    css: (_t, u) =>
      `opacity: ${target_opacity - od * u}; filter: ${f} blur(${
        u * amount
      }px);`,
  };
}
function fade(
  node,
  { delay = 0, duration = 400, easing: easing2 = identity } = {},
) {
  const o = +getComputedStyle(node).opacity;
  return {
    delay,
    duration,
    easing: easing2,
    css: (t) => `opacity: ${t * o}`,
  };
}
function fly(
  node,
  {
    delay = 0,
    duration = 400,
    easing: easing2 = cubicOut,
    x = 0,
    y = 0,
    opacity = 0,
  } = {},
) {
  const style = getComputedStyle(node);
  const target_opacity = +style.opacity;
  const transform = style.transform === "none" ? "" : style.transform;
  const od = target_opacity * (1 - opacity);
  return {
    delay,
    duration,
    easing: easing2,
    css: (t, u) => `
			transform: ${transform} translate(${(1 - t) * x}px, ${(1 - t) * y}px);
			opacity: ${target_opacity - od * u}`,
  };
}
function slide(
  node,
  { delay = 0, duration = 400, easing: easing2 = cubicOut } = {},
) {
  const style = getComputedStyle(node);
  const opacity = +style.opacity;
  const height = parseFloat(style.height);
  const padding_top = parseFloat(style.paddingTop);
  const padding_bottom = parseFloat(style.paddingBottom);
  const margin_top = parseFloat(style.marginTop);
  const margin_bottom = parseFloat(style.marginBottom);
  const border_top_width = parseFloat(style.borderTopWidth);
  const border_bottom_width = parseFloat(style.borderBottomWidth);
  return {
    delay,
    duration,
    easing: easing2,
    css: (t) =>
      `overflow: hidden;opacity: ${Math.min(t * 20, 1) * opacity};height: ${
        t * height
      }px;padding-top: ${t * padding_top}px;padding-bottom: ${
        t * padding_bottom
      }px;margin-top: ${t * margin_top}px;margin-bottom: ${
        t * margin_bottom
      }px;border-top-width: ${t * border_top_width}px;border-bottom-width: ${
        t * border_bottom_width
      }px;`,
  };
}
function scale(
  node,
  {
    delay = 0,
    duration = 400,
    easing: easing2 = cubicOut,
    start = 0,
    opacity = 0,
  } = {},
) {
  const style = getComputedStyle(node);
  const target_opacity = +style.opacity;
  const transform = style.transform === "none" ? "" : style.transform;
  const sd = 1 - start;
  const od = target_opacity * (1 - opacity);
  return {
    delay,
    duration,
    easing: easing2,
    css: (_t, u) => `
			transform: ${transform} scale(${1 - sd * u});
			opacity: ${target_opacity - od * u}
		`,
  };
}
function draw(
  node,
  { delay = 0, speed, duration, easing: easing2 = cubicInOut } = {},
) {
  const len = node.getTotalLength();
  if (duration === void 0) {
    if (speed === void 0) {
      duration = 800;
    } else {
      duration = len / speed;
    }
  } else if (typeof duration === "function") {
    duration = duration(len);
  }
  return {
    delay,
    duration,
    easing: easing2,
    css: (t, u) => `stroke-dasharray: ${t * len} ${u * len}`,
  };
}
function crossfade(_a) {
  var { fallback } = _a, defaults = __rest(_a, ["fallback"]);
  const to_receive = new Map();
  const to_send = new Map();
  function crossfade2(from, node, params) {
    const {
      delay = 0,
      duration = (d2) => Math.sqrt(d2) * 30,
      easing: easing2 = cubicOut,
    } = assign(assign({}, defaults), params);
    const to = node.getBoundingClientRect();
    const dx = from.left - to.left;
    const dy = from.top - to.top;
    const dw = from.width / to.width;
    const dh = from.height / to.height;
    const d = Math.sqrt(dx * dx + dy * dy);
    const style = getComputedStyle(node);
    const transform = style.transform === "none" ? "" : style.transform;
    const opacity = +style.opacity;
    return {
      delay,
      duration: is_function(duration) ? duration(d) : duration,
      easing: easing2,
      css: (t, u) => `
				opacity: ${t * opacity};
				transform-origin: top left;
				transform: ${transform} translate(${u * dx}px,${u * dy}px) scale(${
        t + (1 - t) * dw
      }, ${t + (1 - t) * dh});
			`,
    };
  }
  function transition(items, counterparts, intro) {
    return (node, params) => {
      items.set(params.key, {
        rect: node.getBoundingClientRect(),
      });
      return () => {
        if (counterparts.has(params.key)) {
          const { rect } = counterparts.get(params.key);
          counterparts.delete(params.key);
          return crossfade2(rect, node, params);
        }
        items.delete(params.key);
        return fallback && fallback(node, params, intro);
      };
    };
  }
  return [
    transition(to_send, to_receive, false),
    transition(to_receive, to_send, true),
  ];
}
var transition = null;

/*
 * Skypack CDN - svelte@3.42.3
 *
 * Learn more:
 *   📙 Package Documentation: https://www.skypack.dev/view/svelte
 *   📘 Skypack Documentation: https://www.skypack.dev/docs
 *
 * Pinned URL: (Optimized for Production)
 *   ▶️ Normal: https://cdn.skypack.dev/pin/svelte@v3.42.3-TpBafxZKQ3mTQYqhXp6w/mode=imports/optimized/svelte/transition.js
 *   ⏩ Minified: https://cdn.skypack.dev/pin/svelte@v3.42.3-TpBafxZKQ3mTQYqhXp6w/mode=imports,min/optimized/svelte/transition.js
 *
 */

/**
 * Adapted from https://github.com/reach/router/blob/b60e6dd781d5d3a4bdaaf4de665649c0f6a7e78d/src/lib/utils.js
 *
 * https://github.com/reach/router/blob/master/LICENSE
 */

const paramRe = /^:(.+)/;

const SEGMENT_POINTS = 4;
const STATIC_POINTS = 3;
const DYNAMIC_POINTS = 2;
const SPLAT_PENALTY = 1;
const ROOT_POINTS = 1;

/**
 * Check if `string` starts with `search`
 * @param {string} string
 * @param {string} search
 * @return {boolean}
 */
function startsWith(string, search) {
  return string.substr(0, search.length) === search;
}

/**
 * Check if `segment` is a root segment
 * @param {string} segment
 * @return {boolean}
 */
function isRootSegment(segment) {
  return segment === "";
}

/**
 * Check if `segment` is a dynamic segment
 * @param {string} segment
 * @return {boolean}
 */
function isDynamic(segment) {
  return paramRe.test(segment);
}

/**
 * Check if `segment` is a splat
 * @param {string} segment
 * @return {boolean}
 */
function isSplat(segment) {
  return segment[0] === "*";
}

/**
 * Split up the URI into segments delimited by `/`
 * @param {string} uri
 * @return {string[]}
 */
function segmentize(uri) {
  return (
    uri
      // Strip starting/ending `/`
      .replace(/(^\/+|\/+$)/g, "")
      .split("/")
  );
}

/**
 * Strip `str` of potential start and end `/`
 * @param {string} str
 * @return {string}
 */
function stripSlashes(str) {
  return str.replace(/(^\/+|\/+$)/g, "");
}

/**
 * Score a route depending on how its individual segments look
 * @param {object} route
 * @param {number} index
 * @return {object}
 */
function rankRoute(route, index) {
  const score = route.default
    ? 0
    : segmentize(route.path).reduce((score, segment) => {
      score += SEGMENT_POINTS;

      if (isRootSegment(segment)) {
        score += ROOT_POINTS;
      } else if (isDynamic(segment)) {
        score += DYNAMIC_POINTS;
      } else if (isSplat(segment)) {
        score -= SEGMENT_POINTS + SPLAT_PENALTY;
      } else {
        score += STATIC_POINTS;
      }

      return score;
    }, 0);

  return { route, score, index };
}

/**
 * Give a score to all routes and sort them on that
 * @param {object[]} routes
 * @return {object[]}
 */
function rankRoutes(routes) {
  return (
    routes
      .map(rankRoute)
      // If two routes have the exact same score, we go by index instead
      .sort((a, b) =>
        a.score < b.score ? 1 : a.score > b.score ? -1 : a.index - b.index
      )
  );
}

/**
 * Ranks and picks the best route to match. Each segment gets the highest
 * amount of points, then the type of segment gets an additional amount of
 * points where
 *
 *  static > dynamic > splat > root
 *
 * This way we don't have to worry about the order of our routes, let the
 * computers do it.
 *
 * A route looks like this
 *
 *  { path, default, value }
 *
 * And a returned match looks like:
 *
 *  { route, params, uri }
 *
 * @param {object[]} routes
 * @param {string} uri
 * @return {?object}
 */
function pick(routes, uri) {
  let match;
  let default_;

  const [uriPathname] = uri.split("?");
  const uriSegments = segmentize(uriPathname);
  const isRootUri = uriSegments[0] === "";
  const ranked = rankRoutes(routes);

  for (let i = 0, l = ranked.length; i < l; i++) {
    const route = ranked[i].route;
    let missed = false;

    if (route.default) {
      default_ = {
        route,
        params: {},
        uri,
      };
      continue;
    }

    const routeSegments = segmentize(route.path);
    const params = {};
    const max = Math.max(uriSegments.length, routeSegments.length);
    let index = 0;

    for (; index < max; index++) {
      const routeSegment = routeSegments[index];
      const uriSegment = uriSegments[index];

      if (routeSegment !== undefined && isSplat(routeSegment)) {
        // Hit a splat, just grab the rest, and return a match
        // uri:   /files/documents/work
        // route: /files/* or /files/*splatname
        const splatName = routeSegment === "*" ? "*" : routeSegment.slice(1);

        params[splatName] = uriSegments
          .slice(index)
          .map(decodeURIComponent)
          .join("/");
        break;
      }

      if (uriSegment === undefined) {
        // URI is shorter than the route, no match
        // uri:   /users
        // route: /users/:userId
        missed = true;
        break;
      }

      let dynamicMatch = paramRe.exec(routeSegment);

      if (dynamicMatch && !isRootUri) {
        const value = decodeURIComponent(uriSegment);
        params[dynamicMatch[1]] = value;
      } else if (routeSegment !== uriSegment) {
        // Current segments don't match, not dynamic, not splat, so no match
        // uri:   /users/123/settings
        // route: /users/:id/profile
        missed = true;
        break;
      }
    }

    if (!missed) {
      match = {
        route,
        params,
        uri: "/" + uriSegments.slice(0, index).join("/"),
      };
      break;
    }
  }

  return match || default_ || null;
}

/**
 * Check if the `path` matches the `uri`.
 * @param {string} path
 * @param {string} uri
 * @return {?object}
 */
function match(route, uri) {
  return pick([route], uri);
}

/**
 * Add the query to the pathname if a query is given
 * @param {string} pathname
 * @param {string} [query]
 * @return {string}
 */
function addQuery(pathname, query) {
  return pathname + (query ? `?${query}` : "");
}

/**
 * Resolve URIs as though every path is a directory, no files. Relative URIs
 * in the browser can feel awkward because not only can you be "in a directory",
 * you can be "at a file", too. For example:
 *
 *  browserSpecResolve('foo', '/bar/') => /bar/foo
 *  browserSpecResolve('foo', '/bar') => /foo
 *
 * But on the command line of a file system, it's not as complicated. You can't
 * `cd` from a file, only directories. This way, links have to know less about
 * their current path. To go deeper you can do this:
 *
 *  <Link to="deeper"/>
 *  // instead of
 *  <Link to=`{${props.uri}/deeper}`/>
 *
 * Just like `cd`, if you want to go deeper from the command line, you do this:
 *
 *  cd deeper
 *  # not
 *  cd $(pwd)/deeper
 *
 * By treating every path as a directory, linking to relative paths should
 * require less contextual information and (fingers crossed) be more intuitive.
 * @param {string} to
 * @param {string} base
 * @return {string}
 */
function resolve(to, base) {
  // /foo/bar, /baz/qux => /foo/bar
  if (startsWith(to, "/")) {
    return to;
  }

  const [toPathname, toQuery] = to.split("?");
  const [basePathname] = base.split("?");
  const toSegments = segmentize(toPathname);
  const baseSegments = segmentize(basePathname);

  // ?a=b, /users?b=c => /users?a=b
  if (toSegments[0] === "") {
    return addQuery(basePathname, toQuery);
  }

  // profile, /users/789 => /users/789/profile
  if (!startsWith(toSegments[0], ".")) {
    const pathname = baseSegments.concat(toSegments).join("/");

    return addQuery((basePathname === "/" ? "" : "/") + pathname, toQuery);
  }

  // ./       , /users/123 => /users/123
  // ../      , /users/123 => /users
  // ../..    , /users/123 => /
  // ../../one, /a/b/c/d   => /a/b/one
  // .././one , /a/b/c/d   => /a/b/c/one
  const allSegments = baseSegments.concat(toSegments);
  const segments = [];

  allSegments.forEach((segment) => {
    if (segment === "..") {
      segments.pop();
    } else if (segment !== ".") {
      segments.push(segment);
    }
  });

  return addQuery("/" + segments.join("/"), toQuery);
}

/**
 * Combines the `basepath` and the `path` into one path.
 * @param {string} basepath
 * @param {string} path
 */
function combinePaths(basepath, path) {
  return `${
    stripSlashes(
      path === "/"
        ? basepath
        : `${stripSlashes(basepath)}/${stripSlashes(path)}`,
    )
  }/`;
}

/**
 * Decides whether a given `event` should result in a navigation or not.
 * @param {object} event
 */
function shouldNavigate(event) {
  return (
    !event.defaultPrevented &&
    event.button === 0 &&
    !(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)
  );
}

function hostMatches(anchor) {
  const host = location.host;
  return (
    anchor.host == host ||
    // svelte seems to kill anchor.host value in ie11, so fall back to checking href
    anchor.href.indexOf(`https://${host}`) === 0 ||
    anchor.href.indexOf(`http://${host}`) === 0
  );
}

const subscriber_queue = [];
function readable(value, start) {
  return {
    subscribe: writable(value, start).subscribe,
  };
}
function writable(value, start = noop) {
  let stop;
  const subscribers = new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe2(run, invalidate = noop) {
    const subscriber = [run, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || noop;
    }
    run(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe: subscribe2 };
}
function derived(stores, fn, initial_value) {
  const single = !Array.isArray(stores);
  const stores_array = single ? [stores] : stores;
  const auto = fn.length < 2;
  return readable(initial_value, (set) => {
    let inited = false;
    const values = [];
    let pending = 0;
    let cleanup = noop;
    const sync = () => {
      if (pending) {
        return;
      }
      cleanup();
      const result = fn(single ? values[0] : values, set);
      if (auto) {
        set(result);
      } else {
        cleanup = is_function(result) ? result : noop;
      }
    };
    const unsubscribers = stores_array.map((store, i) =>
      subscribe(store, (value) => {
        values[i] = value;
        pending &= ~(1 << i);
        if (inited) {
          sync();
        }
      }, () => {
        pending |= 1 << i;
      })
    );
    inited = true;
    sync();
    return function stop() {
      run_all(unsubscribers);
      cleanup();
    };
  });
}
var store = null;

/*
 * Skypack CDN - svelte@3.42.3
 *
 * Learn more:
 *   📙 Package Documentation: https://www.skypack.dev/view/svelte
 *   📘 Skypack Documentation: https://www.skypack.dev/docs
 *
 * Pinned URL: (Optimized for Production)
 *   ▶️ Normal: https://cdn.skypack.dev/pin/svelte@v3.42.3-TpBafxZKQ3mTQYqhXp6w/mode=imports/optimized/svelte/store.js
 *   ⏩ Minified: https://cdn.skypack.dev/pin/svelte@v3.42.3-TpBafxZKQ3mTQYqhXp6w/mode=imports,min/optimized/svelte/store.js
 *
 */

const LOCATION = {};
const ROUTER = {};

/**
 * Adapted from https://github.com/reach/router/blob/b60e6dd781d5d3a4bdaaf4de665649c0f6a7e78d/src/lib/history.js
 *
 * https://github.com/reach/router/blob/master/LICENSE
 */

function getLocation(source) {
  return {
    ...source.location,
    state: source.history.state,
    key: (source.history.state && source.history.state.key) || "initial",
  };
}

function createHistory(source, options) {
  const listeners = [];
  let location = getLocation(source);

  return {
    get location() {
      return location;
    },

    listen(listener) {
      listeners.push(listener);

      const popstateListener = () => {
        location = getLocation(source);
        listener({ location, action: "POP" });
      };

      source.addEventListener("popstate", popstateListener);

      return () => {
        source.removeEventListener("popstate", popstateListener);

        const index = listeners.indexOf(listener);
        listeners.splice(index, 1);
      };
    },

    navigate(to, { state, replace = false } = {}) {
      state = { ...state, key: Date.now() + "" };
      // try...catch iOS Safari limits to 100 pushState calls
      try {
        if (replace) {
          source.history.replaceState(state, null, to);
        } else {
          source.history.pushState(state, null, to);
        }
      } catch (e) {
        source.location[replace ? "replace" : "assign"](to);
      }

      location = getLocation(source);
      listeners.forEach((listener) => listener({ location, action: "PUSH" }));
    },
  };
}

// Stores history entries in memory for testing or other platforms like Native
function createMemorySource(initialPathname = "/") {
  let index = 0;
  const stack = [{ pathname: initialPathname, search: "" }];
  const states = [];

  return {
    get location() {
      return stack[index];
    },
    addEventListener(name, fn) {},
    removeEventListener(name, fn) {},
    history: {
      get entries() {
        return stack;
      },
      get index() {
        return index;
      },
      get state() {
        return states[index];
      },
      pushState(state, _, uri) {
        const [pathname, search = ""] = uri.split("?");
        index++;
        stack.push({ pathname, search });
        states.push(state);
      },
      replaceState(state, _, uri) {
        const [pathname, search = ""] = uri.split("?");
        stack[index] = { pathname, search };
        states[index] = state;
      },
    },
  };
}

// Global history uses window.history as the source if available,
// otherwise a memory history
const canUseDOM = Boolean(
  typeof window !== "undefined" &&
    window.document &&
    window.document.createElement,
);
const globalHistory = createHistory(canUseDOM ? window : createMemorySource());
const { navigate } = globalHistory;

/* https:\deno.land\x\snel@v0.5.7\core\router\Router.svelte generated by Svelte v3.42.3 */
const file$3 = "https:\\deno.land\\x\\snel@v0.5.7\\core\\router\\Router.svelte";

function create_fragment$3(ctx) {
  let current;
  const default_slot_template = /*#slots*/ ctx[9].default;
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/ ctx[8],
    null,
  );

  const block = {
    c: function create() {
      if (default_slot) default_slot.c();
    },
    l: function claim(nodes) {
      if (default_slot) default_slot.l(nodes);
    },
    m: function mount(target, anchor) {
      if (default_slot) {
        default_slot.m(target, anchor);
      }

      current = true;
    },
    p: function update(ctx, [dirty]) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & /*$$scope*/ 256)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx,
            /*$$scope*/ ctx[8],
            !current
              ? get_all_dirty_from_scope(/*$$scope*/ ctx[8])
              : get_slot_changes(
                default_slot_template,
                /*$$scope*/ ctx[8],
                dirty,
                null,
              ),
            null,
          );
        }
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(default_slot, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (default_slot) default_slot.d(detaching);
    },
  };

  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_fragment$3.name,
    type: "component",
    source: "",
    ctx,
  });

  return block;
}

function instance$3($$self, $$props, $$invalidate) {
  let $location;
  let $routes;
  let $base;
  let { $$slots: slots = {}, $$scope } = $$props;
  validate_slots("Router", slots, ["default"]);
  let { basepath = "/" } = $$props;
  let { url = null } = $$props;
  const locationContext = getContext(LOCATION);
  const routerContext = getContext(ROUTER);
  const routes = writable([]);
  validate_store(routes, "routes");
  component_subscribe(
    $$self,
    routes,
    (value) => $$invalidate(6, $routes = value),
  );
  const activeRoute = writable(null);
  let hasActiveRoute = false; // Used in SSR to synchronously set that a Route is active.

  // If locationContext is not set, this is the topmost Router in the tree.
  // If the `url` prop is given we force the location to it.
  const location = locationContext ||
    writable(url ? { pathname: url } : globalHistory.location);

  validate_store(location, "location");
  component_subscribe(
    $$self,
    location,
    (value) => $$invalidate(5, $location = value),
  );

  // If routerContext is set, the routerBase of the parent Router
  // will be the base for this Router's descendants.
  // If routerContext is not set, the path and resolved uri will both
  // have the value of the basepath prop.
  const base = routerContext
    ? routerContext.routerBase
    : writable({ path: basepath, uri: basepath });

  validate_store(base, "base");
  component_subscribe($$self, base, (value) => $$invalidate(7, $base = value));

  const routerBase = derived([base, activeRoute], ([base, activeRoute]) => {
    // If there is no activeRoute, the routerBase will be identical to the base.
    if (activeRoute === null) {
      return base;
    }

    const { path: basepath } = base;
    const { route, uri } = activeRoute;

    // Remove the potential /* or /*splatname from
    // the end of the child Routes relative paths.
    const path = route.default ? basepath : route.path.replace(/\*.*$/, "");

    return { path, uri };
  });

  function registerRoute(route) {
    const { path: basepath } = $base;
    let { path } = route;

    // We store the original path in the _path property so we can reuse
    // it when the basepath changes. The only thing that matters is that
    // the route reference is intact, so mutation is fine.
    route._path = path;

    route.path = combinePaths(basepath, path);

    if (typeof window === "undefined") {
      // In SSR we should set the activeRoute immediately if it is a match.
      // If there are more Routes being registered after a match is found,
      // we just skip them.
      if (hasActiveRoute) {
        return;
      }

      const matchingRoute = match(route, $location.pathname);

      if (matchingRoute) {
        activeRoute.set(matchingRoute);
        hasActiveRoute = true;
      }
    } else {
      routes.update((rs) => {
        rs.push(route);
        return rs;
      });
    }
  }

  function unregisterRoute(route) {
    routes.update((rs) => {
      const index = rs.indexOf(route);
      rs.splice(index, 1);
      return rs;
    });
  }

  if (!locationContext) {
    // The topmost Router in the tree is responsible for updating
    // the location store and supplying it through context.
    onMount(() => {
      const unlisten = globalHistory.listen((history) => {
        location.set(history.location);
      });

      return unlisten;
    });

    setContext(LOCATION, location);
  }

  setContext(ROUTER, {
    activeRoute,
    base,
    routerBase,
    registerRoute,
    unregisterRoute,
  });

  const writable_props = ["basepath", "url"];

  Object.keys($$props).forEach((key) => {
    if (
      !~writable_props.indexOf(key) && key.slice(0, 2) !== "$$" &&
      key !== "slot"
    ) {
      console.warn(`<Router> was created with unknown prop '${key}'`);
    }
  });

  $$self.$$set = ($$props) => {
    if ("basepath" in $$props) $$invalidate(3, basepath = $$props.basepath);
    if ("url" in $$props) $$invalidate(4, url = $$props.url);
    if ("$$scope" in $$props) $$invalidate(8, $$scope = $$props.$$scope);
  };

  $$self.$capture_state = () => ({
    getContext,
    setContext,
    onMount,
    pick,
    match,
    combinePaths,
    writable,
    derived,
    LOCATION,
    ROUTER,
    globalHistory,
    basepath,
    url,
    locationContext,
    routerContext,
    routes,
    activeRoute,
    hasActiveRoute,
    location,
    base,
    routerBase,
    registerRoute,
    unregisterRoute,
    $location,
    $routes,
    $base,
  });

  $$self.$inject_state = ($$props) => {
    if ("basepath" in $$props) $$invalidate(3, basepath = $$props.basepath);
    if ("url" in $$props) $$invalidate(4, url = $$props.url);
    if ("hasActiveRoute" in $$props) hasActiveRoute = $$props.hasActiveRoute;
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*$base*/ 128) {
      // This reactive statement will update all the Routes' path when
      // the basepath changes.
      $: {
        const { path: basepath } = $base;

        routes.update((rs) => {
          rs.forEach((r) => r.path = combinePaths(basepath, r._path));
          return rs;
        });
      }
    }

    if ($$self.$$.dirty & /*$routes, $location*/ 96) {
      // This reactive statement will be run when the Router is created
      // when there are no Routes and then again the following tick, so it
      // will not find an active Route in SSR and in the browser it will only
      // pick an active Route after all Routes have been registered.
      $: {
        const bestMatch = pick($routes, $location.pathname);
        activeRoute.set(bestMatch);
      }
    }
  };

  return [
    routes,
    location,
    base,
    basepath,
    url,
    $location,
    $routes,
    $base,
    $$scope,
    slots,
  ];
}

class Router extends SvelteComponentDev {
  constructor(options) {
    super(options);
    init(this, options, instance$3, create_fragment$3, safe_not_equal, {
      basepath: 3,
      url: 4,
    });

    dispatch_dev("SvelteRegisterComponent", {
      component: this,
      tagName: "Router",
      options,
      id: create_fragment$3.name,
    });
  }

  get basepath() {
    throw new Error(
      "<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'",
    );
  }

  set basepath(value) {
    throw new Error(
      "<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'",
    );
  }

  get url() {
    throw new Error(
      "<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'",
    );
  }

  set url(value) {
    throw new Error(
      "<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'",
    );
  }
}

/* https:\deno.land\x\snel@v0.5.7\core\router\Route.svelte generated by Svelte v3.42.3 */
const file$2 = "https:\\deno.land\\x\\snel@v0.5.7\\core\\router\\Route.svelte";

const get_default_slot_changes = (dirty) => ({
  params: dirty & /*routeParams*/ 4,
  location: dirty & /*$location*/ 16,
});

const get_default_slot_context = (ctx) => ({
  params: /*routeParams*/ ctx[2],
  location: /*$location*/ ctx[4],
});

// (40:0) {#if $activeRoute !== null && $activeRoute.route === route}
function create_if_block(ctx) {
  let current_block_type_index;
  let if_block;
  let if_block_anchor;
  let current;
  const if_block_creators = [create_if_block_1, create_else_block];
  const if_blocks = [];

  function select_block_type(ctx, dirty) {
    if (/*component*/ ctx[0] !== null) return 0;
    return 1;
  }

  current_block_type_index = select_block_type(ctx, -1);
  if_block = if_blocks[current_block_type_index] = if_block_creators
    [current_block_type_index](ctx);

  const block = {
    c: function create() {
      if_block.c();
      if_block_anchor = empty();
    },
    l: function claim(nodes) {
      if_block.l(nodes);
      if_block_anchor = empty();
    },
    m: function mount(target, anchor) {
      if_blocks[current_block_type_index].m(target, anchor);
      insert_hydration_dev(target, if_block_anchor, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx, dirty);

      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx, dirty);
      } else {
        group_outros();

        transition_out(if_blocks[previous_block_index], 1, 1, () => {
          if_blocks[previous_block_index] = null;
        });

        check_outros();
        if_block = if_blocks[current_block_type_index];

        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators
            [current_block_type_index](ctx);
          if_block.c();
        } else {
          if_block.p(ctx, dirty);
        }

        transition_in(if_block, 1);
        if_block.m(if_block_anchor.parentNode, if_block_anchor);
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(if_block);
      current = true;
    },
    o: function outro(local) {
      transition_out(if_block);
      current = false;
    },
    d: function destroy(detaching) {
      if_blocks[current_block_type_index].d(detaching);
      if (detaching) detach_dev(if_block_anchor);
    },
  };

  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_if_block.name,
    type: "if",
    source:
      "(40:0) {#if $activeRoute !== null && $activeRoute.route === route}",
    ctx,
  });

  return block;
}

// (48:2) {:else}
function create_else_block(ctx) {
  let current;
  const default_slot_template = /*#slots*/ ctx[10].default;
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/ ctx[9],
    get_default_slot_context,
  );

  const block = {
    c: function create() {
      if (default_slot) default_slot.c();
    },
    l: function claim(nodes) {
      if (default_slot) default_slot.l(nodes);
    },
    m: function mount(target, anchor) {
      if (default_slot) {
        default_slot.m(target, anchor);
      }

      current = true;
    },
    p: function update(ctx, dirty) {
      if (default_slot) {
        if (
          default_slot.p &&
          (!current || dirty & /*$$scope, routeParams, $location*/ 532)
        ) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx,
            /*$$scope*/ ctx[9],
            !current
              ? get_all_dirty_from_scope(/*$$scope*/ ctx[9])
              : get_slot_changes(
                default_slot_template,
                /*$$scope*/ ctx[9],
                dirty,
                get_default_slot_changes,
              ),
            get_default_slot_context,
          );
        }
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(default_slot, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (default_slot) default_slot.d(detaching);
    },
  };

  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_else_block.name,
    type: "else",
    source: "(48:2) {:else}",
    ctx,
  });

  return block;
}

// (41:2) {#if component !== null}
function create_if_block_1(ctx) {
  let switch_instance;
  let switch_instance_anchor;
  let current;

  const switch_instance_spread_levels = [
    { location: /*$location*/ ctx[4] },
    /*routeParams*/ ctx[2],
    /*routeProps*/ ctx[3],
  ];

  var switch_value = /*component*/ ctx[0];

  function switch_props(ctx) {
    let switch_instance_props = {};

    for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
      switch_instance_props = assign(
        switch_instance_props,
        switch_instance_spread_levels[i],
      );
    }

    return {
      props: switch_instance_props,
      $$inline: true,
    };
  }

  if (switch_value) {
    switch_instance = new switch_value(switch_props(ctx));
  }

  const block = {
    c: function create() {
      if (switch_instance) create_component(switch_instance.$$.fragment);
      switch_instance_anchor = empty();
    },
    l: function claim(nodes) {
      if (switch_instance) claim_component(switch_instance.$$.fragment, nodes);
      switch_instance_anchor = empty();
    },
    m: function mount(target, anchor) {
      if (switch_instance) {
        mount_component(switch_instance, target, anchor);
      }

      insert_hydration_dev(target, switch_instance_anchor, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      const switch_instance_changes =
        (dirty & /*$location, routeParams, routeProps*/ 28)
          ? get_spread_update(switch_instance_spread_levels, [
            dirty & /*$location*/ 16 && { location: /*$location*/ ctx[4] },
            dirty & /*routeParams*/ 4 &&
            get_spread_object(/*routeParams*/ ctx[2]),
            dirty & /*routeProps*/ 8 &&
            get_spread_object(/*routeProps*/ ctx[3]),
          ])
          : {};

      if (switch_value !== (switch_value = /*component*/ ctx[0])) {
        if (switch_instance) {
          group_outros();
          const old_component = switch_instance;

          transition_out(old_component.$$.fragment, 1, 0, () => {
            destroy_component(old_component, 1);
          });

          check_outros();
        }

        if (switch_value) {
          switch_instance = new switch_value(switch_props(ctx));
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(
            switch_instance,
            switch_instance_anchor.parentNode,
            switch_instance_anchor,
          );
        } else {
          switch_instance = null;
        }
      } else if (switch_value) {
        switch_instance.$set(switch_instance_changes);
      }
    },
    i: function intro(local) {
      if (current) return;
      if (switch_instance) transition_in(switch_instance.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      if (switch_instance) transition_out(switch_instance.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(switch_instance_anchor);
      if (switch_instance) destroy_component(switch_instance, detaching);
    },
  };

  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_if_block_1.name,
    type: "if",
    source: "(41:2) {#if component !== null}",
    ctx,
  });

  return block;
}

function create_fragment$2(ctx) {
  let if_block_anchor;
  let current;
  let if_block = /*$activeRoute*/ ctx[1] !== null && /*$activeRoute*/
    ctx[1].route === /*route*/ ctx[7] && create_if_block(ctx);

  const block = {
    c: function create() {
      if (if_block) if_block.c();
      if_block_anchor = empty();
    },
    l: function claim(nodes) {
      if (if_block) if_block.l(nodes);
      if_block_anchor = empty();
    },
    m: function mount(target, anchor) {
      if (if_block) if_block.m(target, anchor);
      insert_hydration_dev(target, if_block_anchor, anchor);
      current = true;
    },
    p: function update(ctx, [dirty]) {
      if (
        /*$activeRoute*/ ctx[1] !== null && /*$activeRoute*/
          ctx[1].route === /*route*/ ctx[7]
      ) {
        if (if_block) {
          if_block.p(ctx, dirty);

          if (dirty & /*$activeRoute*/ 2) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block(ctx);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        group_outros();

        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });

        check_outros();
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(if_block);
      current = true;
    },
    o: function outro(local) {
      transition_out(if_block);
      current = false;
    },
    d: function destroy(detaching) {
      if (if_block) if_block.d(detaching);
      if (detaching) detach_dev(if_block_anchor);
    },
  };

  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_fragment$2.name,
    type: "component",
    source: "",
    ctx,
  });

  return block;
}

function instance$2($$self, $$props, $$invalidate) {
  let $activeRoute;
  let $location;
  let { $$slots: slots = {}, $$scope } = $$props;
  validate_slots("Route", slots, ["default"]);
  let { path = "" } = $$props;
  let { component = null } = $$props;
  const { registerRoute, unregisterRoute, activeRoute } = getContext(ROUTER);
  validate_store(activeRoute, "activeRoute");
  component_subscribe(
    $$self,
    activeRoute,
    (value) => $$invalidate(1, $activeRoute = value),
  );
  const location = getContext(LOCATION);
  validate_store(location, "location");
  component_subscribe(
    $$self,
    location,
    (value) => $$invalidate(4, $location = value),
  );

  const route = {
    path,
    // If no path prop is given, this Route will act as the default Route
    // that is rendered if no other Route in the Router is a match.
    default: path === "",
  };

  let routeParams = {};
  let routeProps = {};
  registerRoute(route);

  // There is no need to unregister Routes in SSR since it will all be
  // thrown away anyway.
  if (typeof window !== "undefined") {
    onDestroy(() => {
      unregisterRoute(route);
    });
  }

  $$self.$$set = ($$new_props) => {
    $$invalidate(
      13,
      $$props = assign(
        assign({}, $$props),
        exclude_internal_props($$new_props),
      ),
    );
    if ("path" in $$new_props) $$invalidate(8, path = $$new_props.path);
    if ("component" in $$new_props) {
      $$invalidate(0, component = $$new_props.component);
    }
    if ("$$scope" in $$new_props) {
      $$invalidate(9, $$scope = $$new_props.$$scope);
    }
  };

  $$self.$capture_state = () => ({
    ROUTER,
    LOCATION,
    getContext,
    onDestroy,
    path,
    component,
    registerRoute,
    unregisterRoute,
    activeRoute,
    location,
    route,
    routeParams,
    routeProps,
    $activeRoute,
    $location,
  });

  $$self.$inject_state = ($$new_props) => {
    $$invalidate(13, $$props = assign(assign({}, $$props), $$new_props));
    if ("path" in $$props) $$invalidate(8, path = $$new_props.path);
    if ("component" in $$props) {
      $$invalidate(0, component = $$new_props.component);
    }
    if ("routeParams" in $$props) {
      $$invalidate(2, routeParams = $$new_props.routeParams);
    }
    if ("routeProps" in $$props) {
      $$invalidate(3, routeProps = $$new_props.routeProps);
    }
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*$activeRoute*/ 2) {
      $:
      if ($activeRoute && $activeRoute.route === route) {
        $$invalidate(2, routeParams = $activeRoute.params);
      }
    }

    $: {
      const { path, component, ...rest } = $$props;
      $$invalidate(3, routeProps = rest);
    }
  };

  $$props = exclude_internal_props($$props);

  return [
    component,
    $activeRoute,
    routeParams,
    routeProps,
    $location,
    activeRoute,
    location,
    route,
    path,
    $$scope,
    slots,
  ];
}

class Route extends SvelteComponentDev {
  constructor(options) {
    super(options);
    init(this, options, instance$2, create_fragment$2, safe_not_equal, {
      path: 8,
      component: 0,
    });

    dispatch_dev("SvelteRegisterComponent", {
      component: this,
      tagName: "Route",
      options,
      id: create_fragment$2.name,
    });
  }

  get path() {
    throw new Error(
      "<Route>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'",
    );
  }

  set path(value) {
    throw new Error(
      "<Route>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'",
    );
  }

  get component() {
    throw new Error(
      "<Route>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'",
    );
  }

  set component(value) {
    throw new Error(
      "<Route>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'",
    );
  }
}

/* https:\deno.land\x\snel@v0.5.7\core\router\Link.svelte generated by Svelte v3.42.3 */
const file$1 = "https:\\deno.land\\x\\snel@v0.5.7\\core\\router\\Link.svelte";

function create_fragment$1(ctx) {
  let a;
  let current;
  let mounted;
  let dispose;
  const default_slot_template = /*#slots*/ ctx[16].default;
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/ ctx[15],
    null,
  );

  let a_levels = [
    { href: /*href*/ ctx[0] },
    { "aria-current": /*ariaCurrent*/ ctx[2] },
    /*props*/ ctx[1],
    /*$$restProps*/ ctx[6],
  ];

  let a_data = {};

  for (let i = 0; i < a_levels.length; i += 1) {
    a_data = assign(a_data, a_levels[i]);
  }

  const block = {
    c: function create() {
      a = element("a");
      if (default_slot) default_slot.c();
      this.h();
    },
    l: function claim(nodes) {
      a = claim_element(nodes, "A", { href: true, "aria-current": true });
      var a_nodes = children(a);
      if (default_slot) default_slot.l(a_nodes);
      a_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      set_attributes(a, a_data);
      add_location(a, file$1, 40, 0, 1250);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, a, anchor);

      if (default_slot) {
        default_slot.m(a, null);
      }

      current = true;

      if (!mounted) {
        dispose = listen_dev(
          a,
          "click",
          /*onClick*/ ctx[5],
          false,
          false,
          false,
        );
        mounted = true;
      }
    },
    p: function update(ctx, [dirty]) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & /*$$scope*/ 32768)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx,
            /*$$scope*/ ctx[15],
            !current
              ? get_all_dirty_from_scope(/*$$scope*/ ctx[15])
              : get_slot_changes(
                default_slot_template,
                /*$$scope*/ ctx[15],
                dirty,
                null,
              ),
            null,
          );
        }
      }

      set_attributes(
        a,
        a_data = get_spread_update(a_levels, [
          (!current || dirty & /*href*/ 1) && { href: /*href*/ ctx[0] },
          (!current || dirty & /*ariaCurrent*/ 4) &&
          { "aria-current": /*ariaCurrent*/ ctx[2] },
          dirty & /*props*/ 2 && /*props*/ ctx[1],
          dirty & /*$$restProps*/ 64 && /*$$restProps*/ ctx[6],
        ]),
      );
    },
    i: function intro(local) {
      if (current) return;
      transition_in(default_slot, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(a);
      if (default_slot) default_slot.d(detaching);
      mounted = false;
      dispose();
    },
  };

  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_fragment$1.name,
    type: "component",
    source: "",
    ctx,
  });

  return block;
}

function instance$1($$self, $$props, $$invalidate) {
  let ariaCurrent;
  const omit_props_names = ["to", "replace", "state", "getProps"];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let $location;
  let $base;
  let { $$slots: slots = {}, $$scope } = $$props;
  validate_slots("Link", slots, ["default"]);
  let { to = "#" } = $$props;
  let { replace = false } = $$props;
  let { state = {} } = $$props;
  let { getProps = () => ({}) } = $$props;
  const { base } = getContext(ROUTER);
  validate_store(base, "base");
  component_subscribe($$self, base, (value) => $$invalidate(14, $base = value));
  const location = getContext(LOCATION);
  validate_store(location, "location");
  component_subscribe(
    $$self,
    location,
    (value) => $$invalidate(13, $location = value),
  );
  const dispatch = createEventDispatcher();
  let href, isPartiallyCurrent, isCurrent, props;

  function onClick(event) {
    dispatch("click", event);

    if (shouldNavigate(event)) {
      event.preventDefault();

      // Don't push another entry to the history stack when the user
      // clicks on a Link to the page they are currently on.
      const shouldReplace = $location.pathname === href || replace;

      navigate(href, { state, replace: shouldReplace });
    }
  }

  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(
      6,
      $$restProps = compute_rest_props($$props, omit_props_names),
    );
    if ("to" in $$new_props) $$invalidate(7, to = $$new_props.to);
    if ("replace" in $$new_props) {
      $$invalidate(8, replace = $$new_props.replace);
    }
    if ("state" in $$new_props) $$invalidate(9, state = $$new_props.state);
    if ("getProps" in $$new_props) {
      $$invalidate(10, getProps = $$new_props.getProps);
    }
    if ("$$scope" in $$new_props) {
      $$invalidate(15, $$scope = $$new_props.$$scope);
    }
  };

  $$self.$capture_state = () => ({
    startsWith,
    resolve,
    shouldNavigate,
    getContext,
    createEventDispatcher,
    ROUTER,
    LOCATION,
    navigate,
    to,
    replace,
    state,
    getProps,
    base,
    location,
    dispatch,
    href,
    isPartiallyCurrent,
    isCurrent,
    props,
    onClick,
    ariaCurrent,
    $location,
    $base,
  });

  $$self.$inject_state = ($$new_props) => {
    if ("to" in $$props) $$invalidate(7, to = $$new_props.to);
    if ("replace" in $$props) $$invalidate(8, replace = $$new_props.replace);
    if ("state" in $$props) $$invalidate(9, state = $$new_props.state);
    if ("getProps" in $$props) {
      $$invalidate(10, getProps = $$new_props.getProps);
    }
    if ("href" in $$props) $$invalidate(0, href = $$new_props.href);
    if ("isPartiallyCurrent" in $$props) {
      $$invalidate(11, isPartiallyCurrent = $$new_props.isPartiallyCurrent);
    }
    if ("isCurrent" in $$props) {
      $$invalidate(12, isCurrent = $$new_props.isCurrent);
    }
    if ("props" in $$props) $$invalidate(1, props = $$new_props.props);
    if ("ariaCurrent" in $$props) {
      $$invalidate(2, ariaCurrent = $$new_props.ariaCurrent);
    }
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*to, $base*/ 16512) {
      $:
      $$invalidate(0, href = to === "/" ? $base.uri : resolve(to, $base.uri));
    }

    if ($$self.$$.dirty & /*$location, href*/ 8193) {
      $:
      $$invalidate(
        11,
        isPartiallyCurrent = startsWith($location.pathname, href),
      );
    }

    if ($$self.$$.dirty & /*href, $location*/ 8193) {
      $:
      $$invalidate(12, isCurrent = href === $location.pathname);
    }

    if ($$self.$$.dirty & /*isCurrent*/ 4096) {
      $:
      $$invalidate(2, ariaCurrent = isCurrent ? "page" : undefined);
    }

    if (
      $$self.$$
        .dirty & /*getProps, $location, href, isPartiallyCurrent, isCurrent*/
      15361
    ) {
      $:
      $$invalidate(
        1,
        props = getProps({
          location: $location,
          href,
          isPartiallyCurrent,
          isCurrent,
        }),
      );
    }
  };

  return [
    href,
    props,
    ariaCurrent,
    base,
    location,
    onClick,
    $$restProps,
    to,
    replace,
    state,
    getProps,
    isPartiallyCurrent,
    isCurrent,
    $location,
    $base,
    $$scope,
    slots,
  ];
}

class Link extends SvelteComponentDev {
  constructor(options) {
    super(options);

    init(this, options, instance$1, create_fragment$1, safe_not_equal, {
      to: 7,
      replace: 8,
      state: 9,
      getProps: 10,
    });

    dispatch_dev("SvelteRegisterComponent", {
      component: this,
      tagName: "Link",
      options,
      id: create_fragment$1.name,
    });
  }

  get to() {
    throw new Error(
      "<Link>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'",
    );
  }

  set to(value) {
    throw new Error(
      "<Link>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'",
    );
  }

  get replace() {
    throw new Error(
      "<Link>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'",
    );
  }

  set replace(value) {
    throw new Error(
      "<Link>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'",
    );
  }

  get state() {
    throw new Error(
      "<Link>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'",
    );
  }

  set state(value) {
    throw new Error(
      "<Link>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'",
    );
  }

  get getProps() {
    throw new Error(
      "<Link>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'",
    );
  }

  set getProps(value) {
    throw new Error(
      "<Link>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'",
    );
  }
}

/* src\App.svelte generated by Svelte v3.42.3 */
const file = "src\\App.svelte";

function add_css(target) {
  append_styles(
    target,
    "svelte-177t831",
    "main.svelte-177t831{text-align:center;padding:1em;max-width:240px;margin:0 auto}@media(min-width: 640px){main.svelte-177t831{max-width:none}}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBwLnN2ZWx0ZSIsInNvdXJjZXMiOlsiQXBwLnN2ZWx0ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0PlxuICBpbXBvcnQgUHJvZmlsZUNhcmQgZnJvbSBcIkAvY29tcG9uZW50cy9Qcm9maWxlQ2FyZC5zdmVsdGVcIjtcbiAgaW1wb3J0IENhdGVnb3JpZXMgZnJvbSBcIkAvY29tcG9uZW50cy9DYXRlZ29yaWVzLnN2ZWx0ZVwiO1xuICBpbXBvcnQgU2VyaWVzIGZyb20gXCJAL2NvbXBvbmVudHMvU2VyaWVzLnN2ZWx0ZVwiO1xuICBpbXBvcnQgeyBmYWRlIH0gZnJvbSBcInN2ZWx0ZS90cmFuc2l0aW9uXCI7XG5cbiAgaW1wb3J0IFJvdXRlciBmcm9tIFwic3ZlbHRlLXJvdXRpbmcvUm91dGVyLnN2ZWx0ZVwiO1xuICBpbXBvcnQgUm91dGUgZnJvbSBcInN2ZWx0ZS1yb3V0aW5nL1JvdXRlLnN2ZWx0ZVwiO1xuICBpbXBvcnQgTGluayBmcm9tIFwic3ZlbHRlLXJvdXRpbmcvTGluay5zdmVsdGVcIjtcblxuICBpZiAod2luZG93LmxvY2F0aW9uLnBhdGhuYW1lID09PSBcIi9cIikge1xuICAgIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSA9IFwiL3Nlcmllc1wiO1xuICB9XG48L3NjcmlwdD5cblxuPG1haW4gdHJhbnNpdGlvbjpmYWRlPlxuICA8Um91dGVyIHVybD17XCJcIn0+XG4gICAgPG5hdj5cbiAgICAgIDx1bCBjbGFzcz1cImZsZXhcIj5cbiAgICAgICAgPExpbmsgdG89XCJwZXJmaWwvNjE2NmY3MGNlZGExZWQ5NmFmODc3MTczXCI+XG4gICAgICAgICAgPGxpIGNsYXNzPVwibWwtMlwiPnBlcmZpbDwvbGk+XG4gICAgICAgIDwvTGluaz5cblxuICAgICAgICA8TGluayB0bz1cImNhdGVnb3JpZXNcIj5cbiAgICAgICAgICA8bGkgY2xhc3M9XCJtbC0yXCI+Y2F0ZWdvcmllczwvbGk+XG4gICAgICAgIDwvTGluaz5cblxuICAgICAgICA8TGluayB0bz1cInNlcmllc1wiPlxuICAgICAgICAgIDxsaSBjbGFzcz1cIm1sLTJcIj5zZXJpZXM8L2xpPlxuICAgICAgICA8L0xpbms+XG4gICAgICA8L3VsPlxuICAgIDwvbmF2PlxuXG4gICAgPFJvdXRlIHBhdGg9XCJwZXJmaWwvOmlkXCIgbGV0OnBhcmFtcz5cbiAgICAgIDxQcm9maWxlQ2FyZCB1c2VySWQ9e3BhcmFtcy5pZH0gLz5cbiAgICAgIDxTZXJpZXMgdGl0bGU9e1wiZmF2b3JpdGVzXCJ9IGlkPXtwYXJhbXMuaWR9IC8+XG4gICAgPC9Sb3V0ZT5cblxuICAgIDxSb3V0ZSBwYXRoPVwiY2F0ZWdvcmllc1wiPlxuICAgICAgPENhdGVnb3JpZXMgLz5cbiAgICA8L1JvdXRlPlxuXG4gICAgPFJvdXRlIHBhdGg9XCJzZXJpZXNcIj5cbiAgICAgIDxTZXJpZXMgY3VzdG9tPXt0cnVlfSAvPlxuICAgIDwvUm91dGU+XG4gIDwvUm91dGVyPlxuPC9tYWluPlxuXG48c3R5bGU+XG4gIG1haW4ge1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBwYWRkaW5nOiAxZW07XG4gICAgbWF4LXdpZHRoOiAyNDBweDtcbiAgICBtYXJnaW46IDAgYXV0bztcbiAgfVxuXG4gIEBtZWRpYSAobWluLXdpZHRoOiA2NDBweCkge1xuICAgIG1haW4ge1xuICAgICAgbWF4LXdpZHRoOiBub25lO1xuICAgIH1cbiAgfVxuPC9zdHlsZT5cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFpREUsSUFBSSxlQUFDLENBQUMsQUFDSixVQUFVLENBQUUsTUFBTSxDQUNsQixPQUFPLENBQUUsR0FBRyxDQUNaLFNBQVMsQ0FBRSxLQUFLLENBQ2hCLE1BQU0sQ0FBRSxDQUFDLENBQUMsSUFBSSxBQUNoQixDQUFDLEFBRUQsTUFBTSxBQUFDLFlBQVksS0FBSyxDQUFDLEFBQUMsQ0FBQyxBQUN6QixJQUFJLGVBQUMsQ0FBQyxBQUNKLFNBQVMsQ0FBRSxJQUFJLEFBQ2pCLENBQUMsQUFDSCxDQUFDIn0= */",
  );
}

// (20:8) <Link to="perfil/6166f70ceda1ed96af877173">
function create_default_slot_6(ctx) {
  let li;
  let t;

  const block = {
    c: function create() {
      li = element("li");
      t = text("perfil");
      this.h();
    },
    l: function claim(nodes) {
      li = claim_element(nodes, "LI", { class: true });
      var li_nodes = children(li);
      t = claim_text(li_nodes, "perfil");
      li_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(li, "class", "ml-2");
      add_location(li, file, 20, 10, 617);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, li, anchor);
      append_hydration_dev(li, t);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(li);
    },
  };

  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_default_slot_6.name,
    type: "slot",
    source: '(20:8) <Link to=\\"perfil/6166f70ceda1ed96af877173\\">',
    ctx,
  });

  return block;
}

// (24:8) <Link to="categories">
function create_default_slot_5(ctx) {
  let li;
  let t;

  const block = {
    c: function create() {
      li = element("li");
      t = text("categories");
      this.h();
    },
    l: function claim(nodes) {
      li = claim_element(nodes, "LI", { class: true });
      var li_nodes = children(li);
      t = claim_text(li_nodes, "categories");
      li_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(li, "class", "ml-2");
      add_location(li, file, 24, 10, 704);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, li, anchor);
      append_hydration_dev(li, t);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(li);
    },
  };

  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_default_slot_5.name,
    type: "slot",
    source: '(24:8) <Link to=\\"categories\\">',
    ctx,
  });

  return block;
}

// (28:8) <Link to="series">
function create_default_slot_4(ctx) {
  let li;
  let t;

  const block = {
    c: function create() {
      li = element("li");
      t = text("series");
      this.h();
    },
    l: function claim(nodes) {
      li = claim_element(nodes, "LI", { class: true });
      var li_nodes = children(li);
      t = claim_text(li_nodes, "series");
      li_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(li, "class", "ml-2");
      add_location(li, file, 28, 10, 791);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, li, anchor);
      append_hydration_dev(li, t);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(li);
    },
  };

  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_default_slot_4.name,
    type: "slot",
    source: '(28:8) <Link to=\\"series\\">',
    ctx,
  });

  return block;
}

// (34:4) <Route path="perfil/:id" let:params>
function create_default_slot_3(ctx) {
  let profilecard;
  let t;
  let series;
  let current;

  profilecard = new ProfileCard({
    props: { userId: /*params*/ ctx[0].id },
    $$inline: true,
  });

  series = new Series({
    props: {
      title: "favorites",
      id: /*params*/ ctx[0].id,
    },
    $$inline: true,
  });

  const block = {
    c: function create() {
      create_component(profilecard.$$.fragment);
      t = space();
      create_component(series.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(profilecard.$$.fragment, nodes);
      t = claim_space(nodes);
      claim_component(series.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(profilecard, target, anchor);
      insert_hydration_dev(target, t, anchor);
      mount_component(series, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      const profilecard_changes = {};
      if (dirty & /*params*/ 1) {
        profilecard_changes.userId = /*params*/ ctx[0].id;
      }
      profilecard.$set(profilecard_changes);
      const series_changes = {};
      if (dirty & /*params*/ 1) series_changes.id = /*params*/ ctx[0].id;
      series.$set(series_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(profilecard.$$.fragment, local);
      transition_in(series.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(profilecard.$$.fragment, local);
      transition_out(series.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(profilecard, detaching);
      if (detaching) detach_dev(t);
      destroy_component(series, detaching);
    },
  };

  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_default_slot_3.name,
    type: "slot",
    source: '(34:4) <Route path=\\"perfil/:id\\" let:params>',
    ctx,
  });

  return block;
}

// (39:4) <Route path="categories">
function create_default_slot_2(ctx) {
  let categories;
  let current;
  categories = new Categories({ $$inline: true });

  const block = {
    c: function create() {
      create_component(categories.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(categories.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(categories, target, anchor);
      current = true;
    },
    i: function intro(local) {
      if (current) return;
      transition_in(categories.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(categories.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(categories, detaching);
    },
  };

  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_default_slot_2.name,
    type: "slot",
    source: '(39:4) <Route path=\\"categories\\">',
    ctx,
  });

  return block;
}

// (43:4) <Route path="series">
function create_default_slot_1(ctx) {
  let series;
  let current;
  series = new Series({ props: { custom: true }, $$inline: true });

  const block = {
    c: function create() {
      create_component(series.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(series.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(series, target, anchor);
      current = true;
    },
    p: noop,
    i: function intro(local) {
      if (current) return;
      transition_in(series.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(series.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(series, detaching);
    },
  };

  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_default_slot_1.name,
    type: "slot",
    source: '(43:4) <Route path=\\"series\\">',
    ctx,
  });

  return block;
}

// (17:2) <Router url={""}>
function create_default_slot(ctx) {
  let nav;
  let ul;
  let link0;
  let t0;
  let link1;
  let t1;
  let link2;
  let t2;
  let route0;
  let t3;
  let route1;
  let t4;
  let route2;
  let current;

  link0 = new Link({
    props: {
      to: "perfil/6166f70ceda1ed96af877173",
      $$slots: { default: [create_default_slot_6] },
      $$scope: { ctx },
    },
    $$inline: true,
  });

  link1 = new Link({
    props: {
      to: "categories",
      $$slots: { default: [create_default_slot_5] },
      $$scope: { ctx },
    },
    $$inline: true,
  });

  link2 = new Link({
    props: {
      to: "series",
      $$slots: { default: [create_default_slot_4] },
      $$scope: { ctx },
    },
    $$inline: true,
  });

  route0 = new Route({
    props: {
      path: "perfil/:id",
      $$slots: {
        default: [
          create_default_slot_3,
          ({ params }) => ({ 0: params }),
          ({ params }) => params ? 1 : 0,
        ],
      },
      $$scope: { ctx },
    },
    $$inline: true,
  });

  route1 = new Route({
    props: {
      path: "categories",
      $$slots: { default: [create_default_slot_2] },
      $$scope: { ctx },
    },
    $$inline: true,
  });

  route2 = new Route({
    props: {
      path: "series",
      $$slots: { default: [create_default_slot_1] },
      $$scope: { ctx },
    },
    $$inline: true,
  });

  const block = {
    c: function create() {
      nav = element("nav");
      ul = element("ul");
      create_component(link0.$$.fragment);
      t0 = space();
      create_component(link1.$$.fragment);
      t1 = space();
      create_component(link2.$$.fragment);
      t2 = space();
      create_component(route0.$$.fragment);
      t3 = space();
      create_component(route1.$$.fragment);
      t4 = space();
      create_component(route2.$$.fragment);
      this.h();
    },
    l: function claim(nodes) {
      nav = claim_element(nodes, "NAV", {});
      var nav_nodes = children(nav);
      ul = claim_element(nav_nodes, "UL", { class: true });
      var ul_nodes = children(ul);
      claim_component(link0.$$.fragment, ul_nodes);
      t0 = claim_space(ul_nodes);
      claim_component(link1.$$.fragment, ul_nodes);
      t1 = claim_space(ul_nodes);
      claim_component(link2.$$.fragment, ul_nodes);
      ul_nodes.forEach(detach_dev);
      nav_nodes.forEach(detach_dev);
      t2 = claim_space(nodes);
      claim_component(route0.$$.fragment, nodes);
      t3 = claim_space(nodes);
      claim_component(route1.$$.fragment, nodes);
      t4 = claim_space(nodes);
      claim_component(route2.$$.fragment, nodes);
      this.h();
    },
    h: function hydrate() {
      attr_dev(ul, "class", "flex");
      add_location(ul, file, 18, 6, 537);
      add_location(nav, file, 17, 4, 525);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, nav, anchor);
      append_hydration_dev(nav, ul);
      mount_component(link0, ul, null);
      append_hydration_dev(ul, t0);
      mount_component(link1, ul, null);
      append_hydration_dev(ul, t1);
      mount_component(link2, ul, null);
      insert_hydration_dev(target, t2, anchor);
      mount_component(route0, target, anchor);
      insert_hydration_dev(target, t3, anchor);
      mount_component(route1, target, anchor);
      insert_hydration_dev(target, t4, anchor);
      mount_component(route2, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      const link0_changes = {};

      if (dirty & /*$$scope*/ 2) {
        link0_changes.$$scope = { dirty, ctx };
      }

      link0.$set(link0_changes);
      const link1_changes = {};

      if (dirty & /*$$scope*/ 2) {
        link1_changes.$$scope = { dirty, ctx };
      }

      link1.$set(link1_changes);
      const link2_changes = {};

      if (dirty & /*$$scope*/ 2) {
        link2_changes.$$scope = { dirty, ctx };
      }

      link2.$set(link2_changes);
      const route0_changes = {};

      if (dirty & /*$$scope, params*/ 3) {
        route0_changes.$$scope = { dirty, ctx };
      }

      route0.$set(route0_changes);
      const route1_changes = {};

      if (dirty & /*$$scope*/ 2) {
        route1_changes.$$scope = { dirty, ctx };
      }

      route1.$set(route1_changes);
      const route2_changes = {};

      if (dirty & /*$$scope*/ 2) {
        route2_changes.$$scope = { dirty, ctx };
      }

      route2.$set(route2_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(link0.$$.fragment, local);
      transition_in(link1.$$.fragment, local);
      transition_in(link2.$$.fragment, local);
      transition_in(route0.$$.fragment, local);
      transition_in(route1.$$.fragment, local);
      transition_in(route2.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(link0.$$.fragment, local);
      transition_out(link1.$$.fragment, local);
      transition_out(link2.$$.fragment, local);
      transition_out(route0.$$.fragment, local);
      transition_out(route1.$$.fragment, local);
      transition_out(route2.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(nav);
      destroy_component(link0);
      destroy_component(link1);
      destroy_component(link2);
      if (detaching) detach_dev(t2);
      destroy_component(route0, detaching);
      if (detaching) detach_dev(t3);
      destroy_component(route1, detaching);
      if (detaching) detach_dev(t4);
      destroy_component(route2, detaching);
    },
  };

  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_default_slot.name,
    type: "slot",
    source: '(17:2) <Router url={\\"\\"}>',
    ctx,
  });

  return block;
}

function create_fragment(ctx) {
  let main;
  let router;
  let main_transition;
  let current;

  router = new Router({
    props: {
      url: "",
      $$slots: { default: [create_default_slot] },
      $$scope: { ctx },
    },
    $$inline: true,
  });

  const block = {
    c: function create() {
      main = element("main");
      create_component(router.$$.fragment);
      this.h();
    },
    l: function claim(nodes) {
      main = claim_element(nodes, "MAIN", { class: true });
      var main_nodes = children(main);
      claim_component(router.$$.fragment, main_nodes);
      main_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(main, "class", "svelte-177t831");
      add_location(main, file, 15, 0, 478);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, main, anchor);
      mount_component(router, main, null);
      current = true;
    },
    p: function update(ctx, [dirty]) {
      const router_changes = {};

      if (dirty & /*$$scope*/ 2) {
        router_changes.$$scope = { dirty, ctx };
      }

      router.$set(router_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(router.$$.fragment, local);

      add_render_callback(() => {
        if (!main_transition) {
          main_transition = create_bidirectional_transition(
            main,
            fade,
            {},
            true,
          );
        }
        main_transition.run(1);
      });

      current = true;
    },
    o: function outro(local) {
      transition_out(router.$$.fragment, local);
      if (!main_transition) {
        main_transition = create_bidirectional_transition(
          main,
          fade,
          {},
          false,
        );
      }
      main_transition.run(0);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(main);
      destroy_component(router);
      if (detaching && main_transition) main_transition.end();
    },
  };

  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_fragment.name,
    type: "component",
    source: "",
    ctx,
  });

  return block;
}

function instance($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  validate_slots("App", slots, []);

  if (window.location.pathname === "/") {
    window.location.pathname = "/series";
  }

  const writable_props = [];

  Object.keys($$props).forEach((key) => {
    if (
      !~writable_props.indexOf(key) && key.slice(0, 2) !== "$$" &&
      key !== "slot"
    ) {
      console.warn(`<App> was created with unknown prop '${key}'`);
    }
  });

  $$self.$capture_state = () => ({
    ProfileCard,
    Categories,
    Series,
    fade,
    Router,
    Route,
    Link,
  });

  return [];
}

class App extends SvelteComponentDev {
  constructor(options) {
    super(options);
    init(this, options, instance, create_fragment, safe_not_equal, {}, add_css);

    dispatch_dev("SvelteRegisterComponent", {
      component: this,
      tagName: "App",
      options,
      id: create_fragment.name,
    });
  }
}

const app = new App({
  target: document.querySelector("#__snel"),
  props: {},
});
//# sourceMappingURL=main.js.map
