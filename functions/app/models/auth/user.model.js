module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      id: String,
      email: String,
      password: String,
      settings: Array,
      profile: Array
    },
    {
      timestamps: true
    }
  );

  // ! This mongoose model names the collection in the database upon creation.
  const List = mongoose.model("users", schema);
  return List;
};
