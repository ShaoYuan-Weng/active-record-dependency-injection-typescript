import express, {Request, Response, Router} from "express";
import {SchemeService} from "../models/scheme";
import {Inject} from "../container/decorators/inject";

export class SchemeRouter {
  private router = express.Router();

  @Inject
  private schemeService:SchemeService;

  setUp (): Router {
    this.router.get('/', async (req: Request, res: Response) => {
      const schema = await this.schemeService.getAllSchema();
      res.send(schema);
    });

    this.router.get('/:id', async (req: Request, res: Response) => {
      const id = Number(req.params.id);
      const scheme = await this.schemeService.getScheme(id);
      res.send(scheme);
    });

    this.router.post('/', async (req: Request, res: Response) => {
      const name = req.body.name;
      const database_id = req.body.database_id;
      const insertedId = await this.schemeService.createScheme(name, database_id);
      res.send(insertedId);
    });

    this.router.put('/:id', async (req: Request, res: Response) => {
      const id = Number(req.params.id);
      const name = req.body.name;
      const database_id = req.body.database_id;
      const updatedScheme = await this.schemeService.updateScheme(id, name, database_id);
      res.send(updatedScheme);
    });

    this.router.delete('/:id', async (req: Request, res: Response) => {
      const id = Number(req.params.id);
      await this.schemeService.deleteScheme(id);
      res.sendStatus(204);
    })
    return this.router;
  }
}
