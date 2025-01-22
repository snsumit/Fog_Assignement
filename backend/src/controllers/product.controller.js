const getAllProducts = async (req, res) => {
  try {
    const { page = 1, limit = 12 } = req.query;
    const skip = (page - 1) * limit;

    const total = await Product.countDocuments({}); // Get total count
    const products = await Product.find()
      .skip(skip)
      .limit(limit);

    const totalPages = Math.ceil(total / limit);

    res.json({
      products,
      currentPage: parseInt(page),
      totalPages,
      total // Include total count in response
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}; 