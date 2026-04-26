export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  created_at: Date;
}

export interface Task {
  id: number;
  user_id: number;
  project_id?: number;
  title: string;
  description?: string;
  status: 'todo' | 'in_progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  due_date?: Date;
  created_at: Date;
  updated_at: Date;
  completed_at?: Date;
}

export interface Project {
  id: number;
  user_id: number;
  name: string;
  description?: string;
  color?: string;
  created_at: Date;
}

export interface ActivityLog {
  id: number;
  user_id: number;
  task_id?: number;
  action: string;
  created_at: Date;
}

export interface AuthRequest extends Express.Request {
  user?: {
    id: number;
    email: string;
  };
}
