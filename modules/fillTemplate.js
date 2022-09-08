module.exports = function (temp, data) {
  let output = temp.replace(/{% PRODUCT_TITLE %}/g, data.productName);
  output = output.replace(/{% PRODUCT_IMAGE %}/g, data.image);
  output = output.replace(/{% PRODUCT_FROM %}/g, data.from);
  output = output.replace(/{% PRODUCT_NUTR %}/g, data.nutrients);
  output = output.replace(/{% PRODUCT_QTY %}/g, data.quantity);
  output = output.replace(/{% PRODUCT_PRICE %}/g, data.price);
  output = output.replace(/{% PRODUCT_DESC %}/g, data.description);
  output = output.replace(/{% PRODUCT_ID %}/g, data.id);
  output = data.organic
    ? output
    : output.replace(/{% NOT_ORGANIC %}/g, "not-organic");
  return output;
};
