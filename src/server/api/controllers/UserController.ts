import { Request, Response } from 'express';
import { UserService } from '../../services/UserService';

export class UserController {
    static async getAll(req: Request, res: Response) {
        try {
            const username = req.query.username as string;
            if (username) {
                const user = await UserService.getByUsername(username);
                return res.json(user ? [user] : []);
            }
            const users = await UserService.getAll();
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    static async getOnline(req: Request, res: Response) {
        try {
            const players = await UserService.getOnlinePlayers();
            res.json(players);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    static async getOnlinePlayerById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            // Assuming mp is available globally as it is in RAGE MP server environment
            const target = mp.players.at(id);

            if (!target) {
                return res.status(404).json({ error: "Jucătorul nu este online" });
            }

            // Using 'any' cast here because we don't have the full Player extension type definition handy right now,
            // but in a real scenario we should extend the Player interface.
            const db = (target as any).dbData;

            if (!db) {
                return res.status(404).json({ error: "Jucătorul nu este autentificat" });
            }

            res.json(db);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    static async getTop(req: Request, res: Response) {
        try {
            const limit = parseInt(req.query.limit as string) || 10;
            const top = await UserService.getTopPlayers(limit);
            res.json(top);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    static async getById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const user = await UserService.getById(id);
            if (!user) {
                return res.status(404).json({ error: "Utilizatorul nu a fost găsit" });
            }
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const user = await UserService.update(id, req.body);
            if (!user) {
                return res.status(404).json({
                    error: "Eroare la actualizare sau utilizatorul nu a fost găsit",
                });
            }
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const success = await UserService.delete(id);
            if (!success) {
                return res.status(404).json({ error: "Utilizatorul nu a fost găsit" });
            }
            res.json({ success: true });
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}
