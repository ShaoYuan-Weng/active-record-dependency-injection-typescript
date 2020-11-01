import express, {Request, Response, Router} from "express";
import {DatabaseService} from "../models/database";
import {Inject} from "../container/decorators/inject";

export class DatabaseRouter {
  private router = express.Router();

  @Inject
  private databaseService: DatabaseService;

  setUp (): Router {
    this.router.get('/', async (req: Request, res: Response) => {
      const databases = await this.databaseService.getAllDatabases();
      res.send(databases);
    });

    this.router.get('/:id', async (req: Request, res: Response) => {
      const id = Number(req.params.id);
      const database = await this.databaseService.getDatabase(id);
      res.send(database);
    });

    this.router.post('/', async (req: Request, res: Response) => {
      const name = req.body.name;
      const insertedId = await this.databaseService.createDatabase(name);
      res.send(insertedId);
    });

    this.router.put('/:id', async (req: Request, res: Response) => {
      const id = Number(req.params.id);
      const name = req.body.name;
      const updatedDatabase = await this.databaseService.updateDatabase(name, id);
      res.send(updatedDatabase);
    });

    this.router.delete('/:id', async (req: Request, res: Response) => {
      const id = Number(req.params.id);
      await this.databaseService.deleteDatabase(id);
      res.sendStatus(204);
    })
    return this.router;
  }
}
