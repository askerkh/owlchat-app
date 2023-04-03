import { Schema, model } from "mongoose"

const UserSchema = new Schema(
  {
    gh_id: {
      type: String,
      required: true,
      unique: true,
    },
    rooms: [{ type: String }],
  },
  { collection: "Users" },
)

export default model("User", UserSchema)
