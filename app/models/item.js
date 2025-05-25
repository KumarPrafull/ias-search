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
  father_name: {
    type: String,
    required: false,
  },
  father_occupation: {
    type: String,
    required: false,
  },
  mother_name: {
    type: String,
    required: false,
  },
  mother_occupation: {
    type: String,
    required: false,
  },
  dob: {
    type: String,
    required: false,
  },
  hometown: {
    type: String,
    required: false,  
  },
  home_state: {
    type: String,
    required: false,  
  },
  cadre: {
    type: String,
    required: false,
  },
  roll_number: {
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
  optional_subject: {
    type: String,
    required: false,
  },
  total_marks: {
    type: String,
    required: false,
  },
  optional_subject_marks: {
    type: String,
    required: false,
  },
  prelims_marks: {
    type: String,
    required: false,
  },
  essay_marks: {
    type: String,
    required: false,
  },
  gs_paper_1_marks: {
    type: String,
    required: false,
  },
  gs_paper_2_marks: {
    type: String,
    required: false,
  },
  gs_paper_3_marks: {
    type: String,
    required: false,
  },
  gs_paper_4_marks: {
    type: String,
    required: false,
  },
  optional_paper_1_marks: {
    type: String,
    required: false,
  },
  optional_paper_2_marks: {
    type: String,
    required: false,
  },
  interview_marks: {
    type: String,
    required: false,
  },
  tenth_school_name: {
    type: String,
    required: false,
  },
  tenth_marks: {
    type: String,
    required: false,
  },
  twelfth_school_name: {
    type: String,
    required: false,
  },
  twelfth_marks: {
    type: String,
    required: false,
  },
  twelfth_stream: {
    type: String,
    required: false,
  },
  graduation_college_name: {
    type: String,
    required: false,
  },
  graduation_marks: {
    type: String,
    required: false,
  },
  graduation_year: {
    type: String,
    required: false,
  },
  graduation_degree: {
    type: String,
    required: false,
  },
  post_graduation_college_name: {
    type: String,
    required: false,
  },
  post_graduation_marks: {
    type: String,
    required: false,
  },
  post_graduation_year: {
    type: String,
    required: false,
  },
  post_graduation_degree: {
    type: String,
    required: false,
  },
  hobbies: {
    type: String,
    required: false,
  },
  achievements: {
    type: String,
    required: false,
  },
  struggles: {
    type: String,
    required: false,
  },
  work_experience: {
    type: String,
    required: false,
  },
  results: {
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