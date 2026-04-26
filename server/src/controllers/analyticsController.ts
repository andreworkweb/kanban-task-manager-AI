import { Response } from 'express';
import { query } from '../config/database';
import { AuthRequest } from '../types';

export const getAnalytics = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;

    // Get completed tasks for the last 30 days
    const tasksCompleted = await query(
      `SELECT COUNT(*) as count, DATE(completed_at) as date
       FROM tasks
       WHERE user_id = $1 AND status = 'done' AND completed_at >= NOW() - INTERVAL '30 days'
       GROUP BY DATE(completed_at)
       ORDER BY date`,
      [userId]
    );

    // Get tasks grouped by priority (excluding completed)
    const tasksByPriority = await query(
      `SELECT priority, COUNT(*) as count
       FROM tasks
       WHERE user_id = $1 AND status != 'done'
       GROUP BY priority`,
      [userId]
    );

    // Get tasks grouped by status
    const tasksByStatus = await query(
      `SELECT status, COUNT(*) as count
       FROM tasks
       WHERE user_id = $1
       GROUP BY status`,
      [userId]
    );

    // Get upcoming deadlines (next 7 days)
    const upcomingDeadlines = await query(
      `SELECT * FROM tasks
       WHERE user_id = $1 AND status != 'done' AND due_date IS NOT NULL
       AND due_date >= NOW() AND due_date <= NOW() + INTERVAL '7 days'
       ORDER BY due_date`,
      [userId]
    );

    res.json({
      tasksCompleted: tasksCompleted.rows,
      tasksByPriority: tasksByPriority.rows,
      tasksByStatus: tasksByStatus.rows,
      upcomingDeadlines: upcomingDeadlines.rows
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
