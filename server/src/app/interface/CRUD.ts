class Crud {
  create(model, data) {
    return model.create(data);
  }
  readAll(model) {
    return model.find();
  }
  findOne(model, id) {
    return model.findById(id);
  }
  update(model, id, data) {
    return model.updateOne({ _id: id }, data);
  }
  delete(model: any, id) {
    return model.deleteOne({ _id: id });
  }
}

export default new Crud();
