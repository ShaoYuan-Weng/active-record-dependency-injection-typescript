import { ActiveRecord } from "../activeRecord";
import { Scheme } from "./scheme";
import { Injectable } from "../container/decorators/injectable";

class Database extends ActiveRecord<Database>("id", "datashop.databases") {
  id: number;
  name: string;
  schema: Scheme[];
}

@Injectable
export class DatabaseService {
  getAllDatabases = async () => {
    return await Database.findAll();
  }

  getDatabase = async (id: number) => {
    return await Database.findById(id);
  }

  createDatabase = async (name: string) => {
    const newDatabase = new Database();
    newDatabase.name = name;
    return await newDatabase.save();
  }

  updateDatabase = async (name: string, id: number) => {
    const database = await Database.findById(id);
    database.name = name;
    return await database.update();
  }

  deleteDatabase = async (id: number) => {
    const database = await Database.findById(id);
    await database.delete();
    return;
  }
}
