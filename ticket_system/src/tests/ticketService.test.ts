import { ticketService } from '../services/ticketService';

describe('ticketService', () => {
  beforeEach(() => {
    ticketService.reset();
  });

  it('should return initial tickets', async () => {
    const all = await ticketService.getAll();
    expect(all.length).toBeGreaterThan(0);
  });

  it('can create and retrieve a ticket', async () => {
    const newTicket = await ticketService.create({
      title: 'Test',
      description: 'desc',
      author: 'tester',
      priority: 'low',
      status: 'open',
    });
    expect(newTicket.id).toBeDefined();

    const fetched = await ticketService.getById(newTicket.id);
    expect(fetched).toEqual(newTicket);
  });

  it('filters by username', async () => {
    await ticketService.create({
      title: 'Filter',
      description: 'desc',
      author: 'alice',
      priority: 'low',
      status: 'open',
    });
    const list = await ticketService.filterByUser('alice');
    expect(list.every(t => t.author === 'alice' || t.assigned_to === 'alice')).toBe(true);
  });
});
