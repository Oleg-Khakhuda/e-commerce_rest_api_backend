import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import gravatar from 'gravatar';
import { randomUUID } from 'crypto';
import { Role } from '../lib/constants.js';

const { Schema, SchemaTypes, model } = mongoose;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      default: 'Guest',
    },
    lastName: {
      type: String,
    },
    phone: {
      type: String,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      trim: true,
      index: true,
      sparse: true,
      required: [true, 'Email is required'],
      unique: true,
      validate: {
        validator: function (v) {
          return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
        },
        message: props => `${props.value} is not a valid email!`,
      },
    },
    // orders: [{ type: SchemaTypes.ObjectId, ref: 'order' }],
    role: {
      type: String,
      enum: {
        values: Object.values(Role),
        message: 'Role is not allowed',
      },
      default: Role.USER,
    },
    token: {
      type: String,
      default: null,
    },
    avatarUrl: {
      type: String,
      default: function () {
        return gravatar.url(this.email, { s: '250', d: '404' }, true);
      },
    },
    idAvatarCloud: {
      type: String,
      default: null,
    },
    // isSendEmailVerify: {
    //   type: Boolean,
    //   default: false,
    // },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, 'Verify token is required'],
      default: function () {
        return randomUUID();
      },
    },
    createdAt: {
      type: Date,
      default: Date.now,
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

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(6);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

userSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = model('user', userSchema);

export default User;
