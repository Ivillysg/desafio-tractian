import { Document } from 'mongoose';

class Crud {
  create(model: any, data): Promise<Document> {
    return model.create(data);
  }
  readAll(model: any) {
    return model.find();
  }
  findOne(model: any, id) {
    model.findOne({ _id: id });
  }
  editOne(model: any, data) {
    model.create(data);
  }
  deleteOne(model: any, data) {
    model.create(data);
  }
}

export default new Crud();
