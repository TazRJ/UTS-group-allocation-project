import mongoose from "mongoose";
import subjectSchema from "./subjectSchema";

const Subject = mongoose.model('Subject', subjectSchema);
export default Subject;
