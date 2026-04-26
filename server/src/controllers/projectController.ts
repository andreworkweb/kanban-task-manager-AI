import { Response } from 'express';
import { query } from '../config/database';
import { AuthRequest } from '../types';

// Get all projects for the authenticated user
export const getProjects = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const result = await query(
      'SELECT * FROM projects WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new project
export const createProject = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const { name, description, color } = req.body;

    const result = await query(
      'INSERT INTO projects (user_id, name, description, color) VALUES ($1, $2, $3, $4) RETURNING *',
      [userId, name, description, color]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a project
export const deleteProject = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const { id } = req.params;

    const result = await query(
      'DELETE FROM projects WHERE id = $1 AND user_id = $2 RETURNING *',
      [id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
