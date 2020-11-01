import { db } from "./connection";

export const ActiveRecord = <T>(primary_key: string, table_name: string) => {
  return class ActiveRecord {

    static async findAll<U>(this: (new () => U)): Promise<U[]> {
      const records = await db.any(`SELECT * FROM ${table_name}`);
      return records.map(record => Object.assign(new this(), record));
    }

    static async findById<U>(this: (new () => U), id: number): Promise<U> {
      const record = await db.one(`SELECT * FROM ${table_name} WHERE ${primary_key} = $1`, id);
      return Object.assign(new this(), record);
    }

    async delete(): Promise<void> {
      const id = Object.entries(this)
        .map(([key, value]) => {
          if (key === primary_key)
            return value
        });
      await db.query(`DELETE FROM ${table_name} WHERE ${primary_key} = $1`, id);
    }

    async save(): Promise<T> {
      const properties = Object.keys(this).join(', ');
      const values = Object.values(this);
      const placeholders = values.map((value, index) => `$${index + 1}`);
      const result = await db.one(`INSERT INTO ${table_name} (${properties}) VALUES (${placeholders.join(', ')}) RETURNING *`, values);
      return Object.assign(this, result);
    }

    async update(): Promise<T> {
      const id = Object.entries(this)
        .map(([key, value]) => {
          if (key === primary_key)
            return value
        });
      const entries = Object.entries(this).filter(([key]) => key !== primary_key);
      const placeholders = entries.map(([key], index) => `${key} = $${index + 2}`);
      const values = entries.map(([key, value]) => value);
      const result = await db.one(
        `UPDATE ${table_name}
                    SET ${placeholders.join(', ')}
                    WHERE ${primary_key} = $1 RETURNING *`, [id.join(''), values.join(', ')]);
      return Object.assign(this, result);
    }
  }
}
