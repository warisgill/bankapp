import mongoose from 'mongoose';

const atmSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
        street: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        zip: {
            type: String,
            required: true,
        },
    },
    coordinates: {
        latitude: {
            type: Number,
            required: true,
        },
        longitude: {
            type: Number,
            required: true,
        },
    },    
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('ATM', atmSchema);

export default User;
