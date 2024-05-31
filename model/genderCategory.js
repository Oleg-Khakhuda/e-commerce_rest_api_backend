import mongoose from "mongoose";
const { Schema, model } = mongoose;

const GenderCategorySchema = new Schema({
    title: {
        type: String,
        require: true,
    },
    slug: {
        type: String,
        require: true,
        unique: true,
    },
    image: { type: String },
},
{
    versionKey: false,
    timestamps: true,
    toJSON: {
    virtuals: true,
    transform: function (doc, ret) {
        delete ret._id;
        return ret;
    },
    },
    toObject: { virtuals: true },
}
);
  
const GenderCategory = model("genderCategory", GenderCategorySchema);

export default GenderCategory;