import mongoose from 'mongoose';

const DestinationSchema = new mongoose.Schema(
  {
    location: {
      type: String,
      required: [true, 'required field'],
      minlength: [2, '{MINLENGTH} characters required'],
    },
    description: {
      type: String,
      required: [true, 'required field'],
      minlength: [5, '{MINLENGTH} characters required'],
    },
    src: {
      type: String,
      required: [true, 'required field'],
    },
    srcType: {
      type: String,
      required: [true, 'required field'],
    },
    // Checkboxes for the season's you'd like to travel to this destination

    summer: {
      type: Boolean,
      default: false,
    },

    winter: {
      type: Boolean,
      default: false,
    },

    spring: {
      type: Boolean,
      default: false,
    },

    fall: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Destination = mongoose.model('Destination', DestinationSchema);
