/*
Copyright 2016 Google Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
var idbApp = (function() {
  'use strict';

  // TODO 2 - check for support
  if (!('indexedDB' in window)) {
console.log('This browser doesn\'t support IndexedDB');
return;
}

  //var dbPromise;
  //var dbPromise = idb.open('couches-n-things', 1);
  var dbPromise = idb.open('couches-n-things', 3, function(upgradeDb) {
switch (upgradeDb.oldVersion) {
case 0:
// a placeholder case so that the switch block will
// execute when the database is first created
// (oldVersion is 0)
case 1:
console.log('Creating the products object store');
upgradeDb.createObjectStore('products', {keyPath: 'id'});
// TODO 4.1 - create 'name' index
  case 2:
console.log('Creating a name index');
var store = upgradeDb.transaction.objectStore('products');
store.createIndex('name', 'name', {unique: true});
// TODO 4.2 - create 'price' and 'description' indexes
store.createIndex('price', 'price', {unique: false});
store.createIndex('description', 'description', {unique: false});

// TODO 5.1 - create an 'orders' object store
}
});

  function addProducts() {

    // TODO 3.3 - add objects to the products store
    dbPromise.then(function(db) {
var tx = db.transaction('products', 'readwrite');
var store = tx.objectStore('products');
var items = [
{
name: 'gudeg',
id: 'gudeg',
price: 15000
},
{
name: 'gado-gado',
id: 'gado',
price: 10000
},
{
name: 'sate',
id: 'sate',
price: 12000,
}
];
return Promise.all(items.map(function(item) {
console.log('Adding item: ', item);
return store.add(item);
})
).catch(function(e) {
tx.abort();
console.log(e);
}).then(function() {
console.log('All items added successfully!');
});
});
  }


  function updateProductsStore(products) {
    dbPromise.then(function(db) {

      // TODO 5.7 - update the items in the 'products' object store

    }).then(function() {
      console.log('Orders processed successfully!');
      document.getElementById('receipt').innerHTML =
      '<h3>Order processed successfully!</h3>';
    });
  }

  return {
    dbPromise: (dbPromise),
    addProducts: (addProducts),
    displayByName: (displayByName),
    updateProductsStore: (updateProductsStore)
  };
})();
