import mongoose from 'mongoose';

const UserBookSchema = new mongoose.Schema({
  googleId: String,
  title: String,
  authors: [String],
  thumbnail: String,
  startDate: Date,
  endDate: Date,
  rating: Number,
  review: String,
});

export default mongoose.model('UserBook', UserBookSchema);
