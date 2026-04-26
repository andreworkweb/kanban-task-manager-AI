import { Response } from 'express';
import { query } from '../config/database';
import { AuthRequest } from '../types';

export const getTasks = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const result = await query(
      'SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const createTask = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const { title, description, status, priority, due_date, project_id } = req.body;

    const result = await query(
      `INSERT INTO tasks (user_id, title, description, status, priority, due_date, project_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [userId, title, description, status || 'todo', priority || 'medium', due_date, project_id]
    );

    await query(
      'INSERT INTO activity_logs (user_id, task_id, action) VALUES ($1, $2, $3)',
      [userId, result.rows[0].id, 'created']
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateTask = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const { id } = req.params;
    const { title, description, status, priority, due_date, project_id } = req.body;

    const result = await query(
      `UPDATE tasks
       SET title = COALESCE($1, title),
           description = COALESCE($2, description),
           status = COALESCE($3, status),
           priority = COALESCE($4, priority),
           due_date = COALESCE($5, due_date),
           project_id = COALESCE($6, project_id),
           updated_at = NOW(),
           completed_at = CASE WHEN $3 = 'done' THEN NOW() ELSE completed_at END
       WHERE id = $7 AND user_id = $8 RETURNING *`,
      [title, description, status, priority, due_date, project_id, id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await query(
      'INSERT INTO activity_logs (user_id, task_id, action) VALUES ($1, $2, $3)',
      [userId, id, 'updated']
    );

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteTask = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const { id } = req.params;

    const result = await query(
      'DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *',
      [id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
