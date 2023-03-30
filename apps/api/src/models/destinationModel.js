import mongoose from 'mongoose';

const DestinationSchema = new mongoose.Schema(
  {
    location: {
      type: String,
      required: [true, 'Required field'],
      minlength: [2, 'Minimum length is {MINLENGTH}'],
    },
    description: {
      type: String,
      required: [true, 'Required field'],
      minlength: [5, 'Minimum length is {MINLENGTH}'],
    },
    src: {
      type: String,
      required: [true, 'Required field'],
    },
    srcType: {
      type: String,
      required: [true, 'Required field'],
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
