# spa
This is a web checkout created using vue js with css style language using the stylus. Inside there are 3 pages, a delivery fill form in which there is a validation to fill in the email form, telephone number and address. On the second page, namely Payment, there is a Courier selection form for Shipping costs and estimates, both of the courier and payment fields must be chosen because if you do not select courier and the payment method cannot proceed to the next page. For the latter is the Success or Finish page in which contains the Order ID, Payment information selected, Courier selected, shipping estimates, shipping costs and total paid. Each page is given local storage cache when refreshed and will not lose the data we last saw. 

> A Vue.js single page application project using vue-router by Ari Wibowo

## Build Setup

``` bash
# install dependencies
npm install

# install stylus-loader
npm install stylus-loader stylus --save-dev

# install vuelidate
npm install vuelidate --save

# install vuelidate
npm install vuelidate-error-extractor

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```
