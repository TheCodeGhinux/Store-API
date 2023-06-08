import Product from '../models/products.js'

const getAllProductStatic = async (req, res) => {
  const products = await Product.find()
  res.status(200).json({products})
}

// const getAllProducts = (req, res) => {
//   res.json({ msg: 'Products route' })
// }

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort } = req.query;
  const queryObject ={};

  if(featured) {
    queryObject.featured = featured === 'true' ? true : false
  }
  if(company) {
    queryObject.company = company.toUpperCase();
  }
  if(name) {
    queryObject.name = { $regex: name, $options: 'i' }
  }
  console.log(queryObject);
  let result = Product.find(queryObject);

  // Sort funct
  if(sort) {
    const sortList = sort.split(',').join(' ')
    result = result.sort(sortList); 
  } else {
    result = result.sort('createdAt')
  }
  // console.log(result);
  const products = await result;
  res.status(200).json({ nbHits: products.length, products });
}
export {getAllProducts, getAllProductStatic}