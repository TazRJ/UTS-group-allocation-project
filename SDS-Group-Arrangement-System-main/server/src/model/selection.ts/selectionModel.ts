import mongoose from "mongoose";
import selectionSchema from "./selectionSchema";

const Selection = mongoose.model('Selection', selectionSchema);
export default Selection;
