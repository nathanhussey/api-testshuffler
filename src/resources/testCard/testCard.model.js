import mongoose from "mongoose";

const testCardSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  testTitle: {
    type: String,
    required: true
  },
  testCard: [
    {
      _id: false,
      mcId: String,
      question: String,
      answers: [
        {
          _id: false,
          id: String,
          answer: String,
          checked: Boolean
        }
      ]
    }
  ],
  userId: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model("TestCard", testCardSchema);
