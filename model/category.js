import mongoose from "mongoose";
const { Schema, SchemaTypes, model } = mongoose;

const CategorySchema = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    image: {
       imgUrl: { type: String },
       idFileCloud: {
        type: String, 
        default: null,
    },
    },
    slug: {
      type: String,
      require: true,
      unique: true,
    },
    genderCategory: {
      type: SchemaTypes.ObjectId,
      ref: "genderCategory",
    },
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

const Category = model("category", CategorySchema);

export default Category;
