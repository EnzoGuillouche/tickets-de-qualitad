export type TicketStatus = 'open' | 'in_progress' | 'resolved' | 'closed';
export type TicketPriority = 'low' | 'medium' | 'high';

export interface Ticket {
  id: number;
  title: string;
  description: string;
  author: string;
  assigned_to?: string;
  priority: TicketPriority;
  status: TicketStatus;
  responses: string[];
}
