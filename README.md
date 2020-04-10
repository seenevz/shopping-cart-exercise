# emergency online shopping

`json-server --watch db.json`

1. get products
2. render products into `#products`
3. dropdowns in each product should allow user to choose `0` to `product.max_quantity`
4. total should update when user selects new quantity
5. clicking place order should send order to API. **LOOK IN db.json FOR CORRECT FORMAT OF AN ORDER**
6. newly placed order should appear in `#previous-orders`
7. get all orders
8. display all orders in `#previous-orders`

## product HTML

```HTML
<div>
    <img src="https://i5.walmartimages.com/asr/f1728857-3120-4a4e-b474-d66f8ad1bc77_1.7e41f79bcada186bbbc136d1094be906.jpeg?odnWidth=450&amp;odnHeight=450&amp;odnBg=ffffff" />
    <h3>Hand sanitiser</h3>
    <p>£12.99</p>
    <select>
        <option>0</option>
        <option>1</option>
        <option>2</option>
    </select>
</div>
```

## previous order HTML

```HTML
<div>2 Hand sanitisers, 2 Pastas<span>£35.96</span></div>
```
