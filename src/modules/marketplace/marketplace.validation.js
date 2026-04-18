
export const validateMarketplaceQuery = (req, res, next) => {
  const { minPrice, maxPrice } = req.query;

  if (minPrice && isNaN(minPrice)) {
    return res.status(400).json({
      message: "minPrice must be a number"
    });
  }

  if (maxPrice && isNaN(maxPrice)) {
    return res.status(400).json({
      message: "maxPrice must be a number"
    });
  }

  next();
};