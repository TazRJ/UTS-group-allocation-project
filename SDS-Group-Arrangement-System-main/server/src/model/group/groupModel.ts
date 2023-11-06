import mongoose from "mongoose";
import groupSchema from "./groupSchema";

const Group = mongoose.model('Group', groupSchema);
export default Group;