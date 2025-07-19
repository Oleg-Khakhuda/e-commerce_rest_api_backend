import mongoose from 'mongoose';
const { Schema, SchemaTypes, model } = mongoose;

const productsSchema = new Schema(
  {
    article: {
      type: String,
      required: [true, 'Set article for product'],
      default: Math.random().toString().substr(2, 7),
      trim: true,
      unique: true,
    },
    name: {
      type: String,
      required: [true, 'Set name for product'],
    },
    quantity: {
      type: Number,
      default: null,
    },
    color: {
      type: String,
    },
    price: {
      type: Number,
    },
    description: {
      type: String,
    },
    sizeList: [{ type: String }],
    image: [
      {
        url: {
          type: String,
        },
        idFileCloud: {
          type: String,
          default: null,
        },
      },
    ],
    category: {
      type: SchemaTypes.ObjectId,
      ref: 'category',
      required: true,
    },
    genderCategory: {
      type: SchemaTypes.ObjectId,
      ref: 'genderCategory',
      required: true,
    },
    slug: {
      type: String,
      require: true,
      unique: true,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
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
  },
);

productsSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

productsSchema.virtual('status').get(function () {
  if (this.quantity <= 5) {
    return 'Закінчення товару';
  }
  return 'Є в наявності';
});

const Product = model('product', productsSchema);

export default Product;
