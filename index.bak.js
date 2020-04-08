const t = "http://localhost:3000/orders",
  e = "http://localhost:3000/products",
  n = () => fetch(t).then(t => t.json()),
  o = e =>
    fetch(t, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(e)
    }).then(t => t.json()),
  c = () => fetch(e).then(t => t.json());
let r = { items: [] },
  d = [];
const i = (t, e) => {
  let n = r.items.find(e => e.productId === t.id);
  n || ((n = { productId: t.id }), r.items.push(n)),
    0 === e
      ? (r.items = r.items.filter(e => e.productId !== t.id))
      : (n.quantity = e);
  const o = p(r);
  document.querySelector("#total").innerText = `Total: £${o.total}`;
};
Promise.all([n(), c()]).then(([t, e]) => {
  l((d = e)),
    t.forEach(t => {
      u(p(t));
    }),
    m.addEventListener("click", () => {
      o(r).then(t => {
        u(p(t)), (r.items = []);
      });
    });
});
const a = document.querySelector("#previous-orders"),
  s = document.querySelector("#products"),
  m = document.querySelector("#cart > button"),
  p = t => {
    const e = t.items.map(t => ({
      ...t,
      product: d.find(e => e.id === t.productId)
    }));
    return {
      ...t,
      items: e,
      total: e.reduce((t, e) => t + e.quantity * e.product.price, 0).toFixed(2)
    };
  },
  u = t => {
    const e = document.createElement("div");
    e.innerText = t.items
      .map(t => `${t.quantity} ${t.product.name}${1 === t.quantity ? "" : "s"}`)
      .join(", ");
    const n = document.createElement("span");
    (n.innerText = `£${t.total}`), e.append(n), a.append(e);
  },
  l = t => {
    t.forEach(t => {
      const e = document.createElement("div"),
        n = document.createElement("img");
      n.src = t.img;
      const o = document.createElement("h3");
      o.innerText = t.name;
      const c = document.createElement("p");
      c.innerText = `£${t.price}`;
      const r = document.createElement("select");
      for (let e = 0; e <= t.max_quantity; e++) {
        const t = document.createElement("option");
        (t.innerText = e), r.append(t);
      }
      r.addEventListener("change", e => {
        const n = parseInt(e.target.value);
        i(t, n);
      }),
        e.append(n, o, c, r),
        s.append(e);
    });
  };
