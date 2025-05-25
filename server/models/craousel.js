import mongoose from 'mongoose';

const CarouselItemSchema = new mongoose.Schema({
  image: {
    data: Buffer,
    contentType: String,
  },
}, { timestamps: true });

export default mongoose.model("CarouselItem", CarouselItemSchema);
