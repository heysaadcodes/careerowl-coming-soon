import mongoose from 'mongoose';

const EarlyAccessSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    company: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please enter a valid email',
      ],
    },
    focusIndustry: {
      type: String,
      required: [true, 'Focus industry is required'],
      trim: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Prevent model recompilation in development
export default mongoose.models.EarlyAccess || mongoose.model('EarlyAccess', EarlyAccessSchema);