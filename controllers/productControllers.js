import Product from '../models/products.js';

const getAllProductStatic = async (req, res) => {
  const products = await Product.find();
  res.status(200).json({ nbHits: products.length, products });
};

// const getAllProducts = (req, res) => {
//   res.json({ msg: 'Products route' })
// }

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields, tags, numericFilters } =
    req.query;
  const queryObject = {};

  if (featured) {
    queryObject.featured = featured === 'true' ? true : false;
  }
  if (company) {
    queryObject.company = company.toUpperCase();
  }
  if (name) {
    queryObject.name = { $regex: name, $options: 'i' };
  }

  // Tags functionality
  if (tags) {
    queryObject.tags = { $regex: tags, $options: 'i' };
  }

  // Numeric Filters for prices, rating e.t.c
  if (numericFilters) {
    const filterOperator = {
      '>': '$gt',
      '>=': '$gte',
      '=': '$eq',
      '<': '$lt',
      '<=': '$lte',
    };
    const regEx = /\b(<|>|>=|=|<=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${filterOperator[match]}-`
    );
    const options = ['price', 'rating']
    filters = filters.split(',').forEach((item) => {
      const [fields, operator, value] = item.split('-')
      if (options.includes(fields)) {
        queryObject[fields] = { [operator]: Number(value) }
      }
    })
  }
  console.log(queryObject);
  let result = Product.find(queryObject);

  // Sort functionality
  if (sort) {
    const sortList = sort.split(',').join(' ');
    result = result.sort(sortList);
  } else {
    result = result.sort('createdAt');
  }

  // Fields functionality
  if (fields) {
    const fieldsList = fields.split(',').join(' ');
    result = result.select(fieldsList);
  }

  // Limit and Pagination functionality
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  // console.log(result);
  const products = await result;
  res.status(200).json({ nbHits: products.length, products });
};
export { getAllProducts, getAllProductStatic };
