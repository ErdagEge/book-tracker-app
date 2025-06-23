import mongoose from 'mongoose';

const UserBookSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  authors: {
    type: [String],
    required: true,
  },
  thumbnail: String,
  startDate: Date,
  endDate: Date,
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  review: String,
  pageCount: Number,
});

export default mongoose.model('UserBook', UserBookSchema);
