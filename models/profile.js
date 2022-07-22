const { Schema, model } = require("mongoose");

module.exports.Profile = model(
	"Profile",
	// Schema(
	// 	{
    //         user: {
    //             type: Schema.Types.ObjectId,
    //             ref: "User",
    //         },
	// 		phone: {
	// 			type: String,
	// 			required: true,
	// 		},
	// 		address1: {
	// 			type: String,
	// 			required: true,
	// 		},
	// 		address2: {
	// 			type: String,
	// 			required: true,
	// 		},
	// 		city: {
	// 			type: String,
	// 			required: true,
	// 		},
	// 		state: {
	// 			type: String,
	// 		},
	// 		postalCode: {
	// 			type: String,
	// 			required: true,
	// 		},
	// 		country: {
	// 			type: String,
	// 			required: true,
	// 		},
	// 		photo: String,
	// 	},
	// 	{ timestamps: true }
	// )
	Schema(
		{
            user: {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
			gender: String,
			phone: String,
			birthdate: Date,
			photo: String
		},
		{ timestamps: true }
	)
);
