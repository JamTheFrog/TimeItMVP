import mongoose from "mongoose";

export interface TimeBlock {
  id: string;
  title: string;
  duration: number;
  description: string;
}

interface SessionAttrs {
  name: string;
  description: string;
  timeBlocks: TimeBlock[];
  ownerId: string;
}

interface SessionDoc extends mongoose.Document {
  name: string;
  description: string;
  timeBlocks: TimeBlock[];
  ownerId: string;
}

interface SessionModel extends mongoose.Model<SessionDoc> {
  build(attrs: SessionAttrs): SessionDoc;
}

const sessionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    timeBlocks: {
      type: [mongoose.Schema.Types.Mixed],
    },
    ownerId: {
      type: String,
      required: true,
      index: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

sessionSchema.statics.build = (attr: SessionAttrs) => {
  return new Session(attr);
};

const Session = mongoose.model<SessionDoc, SessionModel>(
  "Session",
  sessionSchema
);

export { Session };
