import mongoose from "mongoose";

const openSchema = new mongoose.Schema({
  _id: String,
  day: String,
  hours: String,
});

const openHour =
  mongoose.models?.openHour || mongoose.model("openHour", openSchema);

export { openHour };
