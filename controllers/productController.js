const { Product } = require("../models/product");

module.exports.allProducts = async (req, res) => {
	const products = await Product.find()
		.limit(20)
		.populate("category", "name")
		.populate("brand", "name");

	return res.status(200).send({ data: products });
};

module.exports.getPageCount = async (req, res) => {
	const pageCount = await Product.countDocuments();

	return res.status(200).send({ data: Math.ceil(pageCount / 20) });
};

module.exports.searchProducts = async (req, res) => {
	const products = await Product.find({
		name: { $regex: req.params.key, $options: "i" },
	})
		.select({ name: 1, _id: 1 })
		.limit(10);

	return res.status(200).send({ data: products });
};

module.exports.productDetails = async (req, res) => {
	const product = await Product.find({ _id: req.params.id })
		.populate("category", "name")
		.populate("brand", "name");

	return res.status(200).send({ data: product });
};

module.exports.filterProducts = async (req, res) => {
	// Collecting the request body
	let { order, sortBy, limit, skip, filters } = req.body;
	// Object of filter of keys [price & category]
	let args = {};

	// Setting the default values of request body
	order = order === "desc" ? -1 : 1;
	sortBy = sortBy ? sortBy : "_id";
	limit = 20;
	skip = skip ? parseInt(skip) : 0;

	// Setting up the filter constraints
	for (let key in filters) {
		if (filters[key].length > 0) {
			args[key] = {
				$in: filters[key],
			};
		}
	}

	// Fatching the data from the database using the request body
	const pages = await Product.find({ ...args }).countDocuments();

	const products = await Product.find({ ...args })
		.sort({ [sortBy]: order })
		.skip(skip * limit)
		.limit(limit)
		.populate("category")
		.populate("brand");

	// Sending back the results
	return res.status(200).send({ data: products, pages: Math.ceil(pages / 20) });
};
