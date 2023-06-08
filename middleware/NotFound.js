const notFoundMiddleware = (req, res) => {
  res.status(500).send('Route not found');
}

export default notFoundMiddleware;