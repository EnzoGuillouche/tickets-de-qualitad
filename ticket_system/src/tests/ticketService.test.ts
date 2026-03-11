import { describe, it, expect, beforeEach } from 'vitest';
import { ticketService } from '../services/ticketService';
import type { Ticket } from '../models/Ticket';

describe('ticketService', () => {
  beforeEach(() => {
    ticketService.reset();
  });

  describe('getAll', () => {
    it('should return initial tickets', async () => {
      const all = await ticketService.getAll();
      expect(all.length).toBeGreaterThan(0);
    });

    it('should return a copy of tickets, not the original', async () => {
      const tickets1 = await ticketService.getAll();
      const tickets2 = await ticketService.getAll();
      expect(tickets1).not.toBe(tickets2);
    });
  });

  describe('getById', () => {
    it('should retrieve a ticket by id', async () => {
      const all = await ticketService.getAll();
      const firstTicket = all[0];
      const fetched = await ticketService.getById(firstTicket.id);
      expect(fetched).toEqual(firstTicket);
    });

    it('should return undefined for non-existent ticket', async () => {
      const fetched = await ticketService.getById(99999);
      expect(fetched).toBeUndefined();
    });

    it('should return a copy of the ticket', async () => {
      const all = await ticketService.getAll();
      const id = all[0].id;
      const ticket1 = await ticketService.getById(id);
      const ticket2 = await ticketService.getById(id);
      expect(ticket1).not.toBe(ticket2);
      expect(ticket1).toEqual(ticket2);
    });
  });

  describe('create', () => {
    it('should create a new ticket with an id', async () => {
      const newTicket = await ticketService.create({
        title: 'Test Ticket',
        description: 'This is a test',
        author: 'testuser',
        priority: 'low',
        status: 'open',
      });
      expect(newTicket.id).toBeDefined();
      expect(newTicket.title).toBe('Test Ticket');
      expect(newTicket.responses).toEqual([]);
    });

    it('should auto-increment ticket ids', async () => {
      const ticket1 = await ticketService.create({
        title: 'First',
        description: 'desc',
        author: 'user1',
        priority: 'low',
        status: 'open',
      });
      const ticket2 = await ticketService.create({
        title: 'Second',
        description: 'desc',
        author: 'user1',
        priority: 'low',
        status: 'open',
      });
      expect(ticket2.id).toBeGreaterThan(ticket1.id);
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

    it('should initialize responses as empty array', async () => {
      const newTicket = await ticketService.create({
        title: 'Test',
        description: 'desc',
        author: 'user1',
        priority: 'medium',
        status: 'open',
      });
      expect(Array.isArray(newTicket.responses)).toBe(true);
      expect(newTicket.responses.length).toBe(0);
    });

    it('should not include optional assigned_to if not provided', async () => {
      const newTicket = await ticketService.create({
        title: 'Test',
        description: 'desc',
        author: 'user1',
        priority: 'low',
        status: 'open',
      });
      expect(newTicket.assigned_to).toBeUndefined();
    });
  });

  describe('update', () => {
    it('should update an existing ticket', async () => {
      const created = await ticketService.create({
        title: 'Original',
        description: 'desc',
        author: 'user1',
        priority: 'low',
        status: 'open',
      });

      const updated = await ticketService.update(created.id, {
        title: 'Updated Title',
        status: 'in_progress',
      });

      expect(updated?.title).toBe('Updated Title');
      expect(updated?.status).toBe('in_progress');
      expect(updated?.author).toBe('user1');
    });

    it('should return undefined for non-existent ticket', async () => {
      const result = await ticketService.update(99999, {
        title: 'New title',
      });
      expect(result).toBeUndefined();
    });

    it('should update status', async () => {
      const created = await ticketService.create({
        title: 'Test',
        description: 'desc',
        author: 'user1',
        priority: 'low',
        status: 'open',
      });

      const updated = await ticketService.update(created.id, {
        status: 'resolved',
      });

      expect(updated?.status).toBe('resolved');
    });

    it('should update priority', async () => {
      const created = await ticketService.create({
        title: 'Test',
        description: 'desc',
        author: 'user1',
        priority: 'low',
        status: 'open',
      });

      const updated = await ticketService.update(created.id, {
        priority: 'high',
      });

      expect(updated?.priority).toBe('high');
    });

    it('should update assigned_to', async () => {
      const created = await ticketService.create({
        title: 'Test',
        description: 'desc',
        author: 'user1',
        priority: 'low',
        status: 'open',
      });

      const updated = await ticketService.update(created.id, {
        assigned_to: 'admin1',
      });

      expect(updated?.assigned_to).toBe('admin1');
    });

    it('should update responses', async () => {
      const created = await ticketService.create({
        title: 'Test',
        description: 'desc',
        author: 'user1',
        priority: 'low',
        status: 'open',
      });

      const updated = await ticketService.update(created.id, {
        responses: ['Response 1', 'Response 2'],
      });

      expect(updated?.responses).toEqual(['Response 1', 'Response 2']);
    });

    it('should preserve other fields when updating', async () => {
      const created = await ticketService.create({
        title: 'Test',
        description: 'Original description',
        author: 'user1',
        priority: 'low',
        status: 'open',
      });

      const updated = await ticketService.update(created.id, {
        title: 'New Title',
      });

      expect(updated?.description).toBe('Original description');
      expect(updated?.author).toBe('user1');
    });
  });

  describe('filterByUser', () => {
    it('should filter by author', async () => {
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

    it('should filter by assigned_to', async () => {
      const created = await ticketService.create({
        title: 'Test',
        description: 'desc',
        author: 'alice',
        priority: 'low',
        status: 'open',
      });

      await ticketService.update(created.id, {
        assigned_to: 'bob',
      });

      const list = await ticketService.filterByUser('bob');
      expect(list.some(t => t.id === created.id)).toBe(true);
    });

    it('should return empty array for user with no tickets', async () => {
      const list = await ticketService.filterByUser('nonexistentuser');
      expect(list).toEqual([]);
    });

    it('should include tickets authored or assigned to user', async () => {
      const ticket1 = await ticketService.create({
        title: 'Authored',
        description: 'desc',
        author: 'charlie',
        priority: 'low',
        status: 'open',
      });

      const ticket2 = await ticketService.create({
        title: 'Other',
        description: 'desc',
        author: 'dave',
        priority: 'low',
        status: 'open',
      });

      await ticketService.update(ticket2.id, {
        assigned_to: 'charlie',
      });

      const list = await ticketService.filterByUser('charlie');
      expect(list.map(t => t.id)).toContain(ticket1.id);
      expect(list.map(t => t.id)).toContain(ticket2.id);
    });

    it('should return a copy, not reference to internal data', async () => {
      await ticketService.create({
        title: 'Test',
        description: 'desc',
        author: 'eve',
        priority: 'low',
        status: 'open',
      });

      const list1 = await ticketService.filterByUser('eve');
      const list2 = await ticketService.filterByUser('eve');
      expect(list1).not.toBe(list2);
    });
  });

  describe('reset', () => {
    it('should reset to initial state', async () => {
      const initialCount = (await ticketService.getAll()).length;

      await ticketService.create({
        title: 'New',
        description: 'desc',
        author: 'user1',
        priority: 'low',
        status: 'open',
      });

      expect((await ticketService.getAll()).length).toBeGreaterThan(initialCount);

      ticketService.reset();
      expect((await ticketService.getAll()).length).toBe(initialCount);
    });
  });
});
