const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema(
    {
        products: [
            {
                type: mongoose.ObjectId,
                ref: "product",
            },
        ],
        payment: {},
        buyers: {
            type: mongoose.ObjectId,
            ref: "Users",
        },
        status: {
            type: String,
            default: "Not Process",
            enum: ["Not Process", "Processing", "Shipped", "Deliverd", "Cancel"]
        },
    },
    {timestamps:true}
)
/*
{product :
    payment:
    buyers:
    status:
}
 */

const Orders = mongoose.model("order", orderSchema)
module.exports = Orders