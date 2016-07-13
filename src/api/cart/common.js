
// reduce SKU list
function collectLineItems(skus) {
  const uniqueSkus = Object.create(null);
  return _.reduce(skus, (result, lineItem) => {
    const sku = lineItem.sku;

    if (sku in uniqueSkus) {
      const qty = result[uniqueSkus[sku]].quantity += lineItem.quantity;
      result[uniqueSkus[sku]].totalPrice = lineItem.price * qty;
    } else {
      uniqueSkus[sku] = result.length;
      result.push(lineItem);
    }

    return result;
  }, []);
}

export function normalizeResponse(payload) {
  if (payload.lineItems) {
    payload.lineItems.skus = collectLineItems(payload.lineItems.skus);
  }
  return payload;
}
