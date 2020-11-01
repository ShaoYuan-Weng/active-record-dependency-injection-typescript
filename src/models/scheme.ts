import { ActiveRecord } from "../activeRecord";
import { Injectable } from "../container/decorators/injectable";

export class Scheme extends ActiveRecord<Scheme>("id", "datashop.schema") {
  id: number;
  name: string;
  database_id: number;
}

@Injectable
export class SchemeService {
  getAllSchema = async () => {
    return await Scheme.findAll();
  }

  getScheme = async (id: number) => {
    return await Scheme.findById(id);
  }

  createScheme = async (name: string, database_id: number) => {
    const newScheme = new Scheme();
    newScheme.name = name;
    newScheme.database_id = database_id;
    return await newScheme.save();
  }

  updateScheme = async (id: number, name: string, database_id: number) => {
    const scheme = await Scheme.findById(id);
    scheme.name = name;
    scheme.database_id = database_id;
    return await scheme.update();
  }

  deleteScheme = async (id: number) => {
    const scheme = await Scheme.findById(id);
    await scheme.delete();
    return;
  }
}


