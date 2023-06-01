## Store API

### Features
- Sorting: The API allows sorting of results based on specified fields.
- Fields selection: Users can select specific fields to be returned in the API response.
- Numeric filters: Filtering based on numeric values is supported.
- Limit and skip functionality: The API allows users to set limits on the number of results and skip a specified number of results.

### Installation
-->git clone
-->npm install
-->create env


### API Documentation

with the help of populate.js file we have exported all the static data in the atlas server
In this project we have added sort,fileds(select), numeric fielters,limit, skip functinality in our API


model.find({query})
.sort("parameter")  --> to sort based on value (-ve for descending)
.select("fields")  --> to select the fields to be displayed (only selected fields will be displayed)
.limit(number)  --> to limit the number of results
.skip(number)  --> to skip the number of results


$gt:30 --> greater than 30
$gte:30 --> greater than or equal to 30
$lt:30 --> less than 30
$lte:30 --> less than or equal to 30
$eq:30 --> equal to 30
$ne:30 --> not equal to 30
$in:[30,40] --> in the array
$nin:[30,40] --> not in the array
$or:[{price:30},{price:40}] --> or condition
$and:[{price:30},{price:40}] --> and condition
$regex:/^pattern/ --> regex pattern

### Product API
http://localhost:@000/api/v1/products/
Retrieves a list of products.

**Parameters:**
- `sort`: Sorts the results based on specified fields. Example: `sort=name` or `sort=-price` for descending order.
- `fields`: Selects specific fields to be returned in the response. Example: `fields=name,price`.
- `minPrice` and `maxPrice`: Filters products based on the price range. Example: `minPrice=10&maxPrice=50`.
- `limit`: Limits the number of results returned. Example: `limit=10`.
- `skip`: Skips a specified number of results. Example: `skip=20`.

**Response:**
The API responds with a JSON array of product objects.

