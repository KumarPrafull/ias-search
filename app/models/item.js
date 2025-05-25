import mongoose from 'mongoose';

const IASItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  service: {
    type: String,
    required: true,
  },
  batch: {
    type: String,
    required: true,
  },
  fater_name: {
    type: String,
    required: false,
  },
  rank: {
    type: String,
    required: false,
  },
  attempts: {
    type: String,
    required: false,
  },
  results : {
    type: [
      {
        attempt_count: {
          type: String,
          required: false,
        },
        year: {
          type: String,
          required: false,
        },
        rank: {
          type: String,
          required: false,
        },
        roll_number: {
          type: String,
          required: false,
        },
        prelim_reslut: {
          type: Boolean,
          required: false,
        },
        prelim_marks: {
          type: String,
          required: false,
        },
        mains_result: {
          type: Boolean,
          required: false,
        },
        mains_marks: {
          type: String,
          required: false,
        },
        optional_subject: {
          type: String,
          required: false,
        },
        optional_subject_marks: {
          type: Number,
          required: false,
        },
        interview_marks: {
          type: String,
          required: false,
        },
      },
    ],
    required: false,
  },
  article_url: {
    type: String,
    required: false,
  },

});

export default mongoose.models.IASItem || mongoose.model('IASItem', IASItemSchema);