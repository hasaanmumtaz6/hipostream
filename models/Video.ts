import mongoose, { Document, Schema } from 'mongoose';

interface IVideo extends Document {
  url: string;
}

const videoSchema: Schema = new Schema({
  url: { type: String, required: true },
});

const Video = mongoose.models.Video || mongoose.model<IVideo>('Video', videoSchema);

export default Video;
