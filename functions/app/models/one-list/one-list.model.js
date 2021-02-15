module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      id: String,
      name: String,
      items: Array
    },
    {
      timestamps: true
    }
  );

  // ! This mongoose model names the collection in the database upon creation.
  const List = mongoose.model("one_list", schema);
  return List;
};
