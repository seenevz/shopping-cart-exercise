// Constants
const BASE_URL = "http://localhost:3000";
const PRODUCTS_URL = `${BASE_URL}/products`;
const ORDERS_URL = `${BASE_URL}/orders`;

//Tools

const parseJSON = resp => resp.json();

const $ = tag => {
  const results = document.querySelectorAll(tag);
  return results.length === 1 ? results[0] : results;
};

const createElems = (...tags) => {
  const elems = tags.map(t => document.createElement(t));
  return elems.length === 1 ? elems[0] : elems;
};

const configObj = (method, payload) => ({
  method,
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(payload),
});

//API Calls

const getAllProducts = () => fetch(PRODUCTS_URL).then(parseJSON);
const getAllOrders = () => fetch(ORDERS_URL).then(parseJSON);

const postOrder = newOrder =>
  fetch(ORDERS_URL, configObj("POST", newOrder)).then(parseJSON);

//Event handlers

const handleQuantitySelect = (event, productId, addToBasket) => {
  const item = {
    productId,
    quantity: parseInt(event.target.value),
  };
  addToBasket(item);
};

const handleSubmitOrder = (totalBasket, findItem, calculateTotal) => {
  const ordersContainer = $("#previous-orders");

  if (totalBasket.length > 0) {
    postOrder({ items: totalBasket }).then(o =>
      renderOrderItem(ordersContainer, o, findItem, calculateTotal)
    );
  }
};

//Page render

const renderProductsPage = (productsArr, ordersArr) => {
  const orderBtn = $("main button");

  let totalBasket = [];

  const findItem = id => productsArr.find(i => i.id === id);

  const calculateTotal = totalBasket => {
    const totalBasketItems = totalBasket.map(i => ({
      quantity: i.quantity,
      price: findItem(i.productId).price,
    }));
    const result = totalBasketItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    return result.toFixed(2);
  };

  const addToBasket = item => {
    const newBasket = totalBasket.filter(i => item.productId !== i.productId);

    if (item.quantity > 0) {
      newBasket.push(item);
    }
    totalBasket = newBasket;
    renderTotal(totalBasket, calculateTotal);
  };

  orderBtn.addEventListener("click", () =>
    handleSubmitOrder(totalBasket, findItem, calculateTotal)
  );

  renderProductsList(productsArr, addToBasket);
  renderOrderList(ordersArr, findItem, calculateTotal);
};

//Components Render

const renderProduct = (
  anchorElm,
  { id, img, name, price, max_quantity },
  addToBasket
) => {
  const [div, imgTag, h3, p, select] = createElems(
    "div",
    "img",
    "h3",
    "p",
    "select"
  );

  imgTag.src = img;
  h3.innerText = name;
  p.innerText = price;

  for (let quantity = 0; quantity <= max_quantity; quantity++) {
    const option = createElems("option");
    option.innerText = quantity;
    option.value = quantity;
    select.append(option);
  }

  select.addEventListener("change", e =>
    handleQuantitySelect(e, id, addToBasket)
  );

  div.append(imgTag, h3, p, select);
  anchorElm.append(div);
};

const renderOrderItem = (parentElem, { items }, findItem, calculateTotal) => {
  const [textDiv, amountSpan] = createElems("div", "span");

  textDiv.innerText = items
    .map(
      ({ productId, quantity }) => `${quantity} x ${findItem(productId).name}`
    )
    .join(", ");

  amountSpan.innerText = `£${calculateTotal(items)}`;

  textDiv.append(amountSpan);
  parentElem.append(textDiv);
};

const renderProductsList = (productsArr, addToBasket) => {
  const productsContainer = $("#products");
  productsArr.forEach(p => renderProduct(productsContainer, p, addToBasket));
};

const renderOrderList = (ordersArr, findItem, calculateTotal) => {
  const ordersContainer = $("#previous-orders");

  ordersArr.forEach(o =>
    renderOrderItem(ordersContainer, o, findItem, calculateTotal)
  );
};

const renderTotal = (totalBasket, calculateTotal) => {
  const totalSpan = $("#total > span");
  const totalAmnt = calculateTotal(totalBasket);

  totalSpan.innerText = `£${totalAmnt}`;
};

//On Load
const run = () => {
  Promise.all([getAllProducts(), getAllOrders()]).then(
    ([productsArr, ordersArr]) => {
      renderProductsPage(productsArr, ordersArr);
    }
  );
};

document.addEventListener("DOMContentLoaded", run);
