const mongoose = require("mongoose");

const QuestSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    generations: [
      {
        num: {
          type: Number,
          required: true,
        },
        benchmarks: {
          type: [String],
          required: true,
        },
        logs: {
          type: [String],
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Quest = mongoose.model("Quest", QuestSchema);
module.exports = Quest;
