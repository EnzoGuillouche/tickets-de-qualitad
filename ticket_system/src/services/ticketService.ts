import type { Ticket } from '../models/Ticket';
import ticketsData from '../database/tickets.json';

// simple in-memory store; we clone the imported data so modifications don't affect the original
let tickets: Ticket[] = [...(ticketsData as Ticket[])];
let nextId = tickets.length ? Math.max(...tickets.map(t => t.id)) + 1 : 1;

export const ticketService = {
  getAll(): Promise<Ticket[]> {
    // in a real app this would fetch from an API
    return Promise.resolve([...tickets]);
  },

  getById(id: number): Promise<Ticket | undefined> {
    const ticket = tickets.find(t => t.id === id);
    return Promise.resolve(ticket ? { ...ticket } : undefined);
  },

  create(ticket: Omit<Ticket, 'id' | 'responses'>): Promise<Ticket> {
    const newTicket: Ticket = {
      ...ticket,
      id: nextId++,
      responses: [],
    } as Ticket;
    tickets.push(newTicket);
    return Promise.resolve({ ...newTicket });
  },

  update(id: number, updates: Partial<Omit<Ticket, 'id'>>): Promise<Ticket | undefined> {
    const index = tickets.findIndex(t => t.id === id);
    if (index === -1) return Promise.resolve(undefined);
    tickets[index] = { ...tickets[index], ...updates };
    return Promise.resolve({ ...tickets[index] });
  },

  filterByUser(username: string): Promise<Ticket[]> {
    const filtered = tickets.filter(
      t => t.author === username || t.assigned_to === username
    );
    return Promise.resolve([...filtered]);
  },

  reset(): void {
    tickets = [...(ticketsData as Ticket[])];
    nextId = tickets.length ? Math.max(...tickets.map(t => t.id)) + 1 : 1;
  },
};
