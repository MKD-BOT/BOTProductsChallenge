import Realm from 'realm';
export const PRODUCTS_SCHEMA = 'Products';

export const ProductSchema = {
  name: PRODUCTS_SCHEMA,
  primarykey: 'id',
  properties: {
    id: 'int',
    product_category: {type: 'string', indexed: true},
    product_name: {type: 'string', indexed: true},
    product_weight: {type: 'string', indexed: true},
    product_price: {type: 'double'},
    product_currency: {type: 'string', indexed: true},
  },
};
const databaseOptions = {
  path: 'storeProducts.realm',
  schema: [ProductSchema],
  schemaVersion: 0,
};
export const insertNewProduct = newProduct =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          realm.create(PRODUCTS_SCHEMA, newProduct);
          resolve(newProduct);
        });
      })
      .catch(error => reject(error));
  });
export const updateProduct = product =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          let updatingProduct = realm.objectForPrimaryKey(
            PRODUCTS_SCHEMA,
            product.id,
          );
          updatingProduct.product_category = product.product_category;
          updatingProduct.product_name = product.product_name;
          updatingProduct.product_weight = product.product_weight;
          updatingProduct.product_price = product.product_price;
          updatingProduct.product_currency = product.product_currency;
          resolve();
        });
      })
      .catch(error => reject(error));
  });

export const deleteProduct = productId =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          let deletingProduct = realm.objectForPrimaryKey(
            PRODUCTS_SCHEMA,
            productId,
          );
          realm.delete(deletingProduct);
          resolve();
        });
      })
      .catch(error => reject(error));
  });

export const deleteAllProducts = () =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          let allProducts = realm.objects(PRODUCTS_SCHEMA);
          realm.delete(allProducts);
          resolve();
        });
      })
      .catch(error => reject(error));
  });
export const getAllProducts = () =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          let allProducts = realm.objects(PRODUCTS_SCHEMA);
          resolve(allProducts);
        });
      })
      .catch(error => reject(error));
  });

export default new Realm(databaseOptions);
