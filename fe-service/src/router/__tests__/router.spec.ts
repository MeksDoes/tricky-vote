import { describe, it, expect } from 'vitest';
import router from '@/router';

describe('Router', () => {
  it('should have all routes defined', () => {
    const routes = router.getRoutes();
    const routeNames = routes.map((route) => route.name);

    expect(routeNames).toContain('home');
    expect(routeNames).toContain('create-poll');
    expect(routeNames).toContain('show-poll');
    expect(routeNames.length).toBe(3);
  });

  it('should load HomeView for /', () => {
    const route = router.getRoutes().find((r) => r.name === 'home');
    expect(route).toBeDefined();
    expect(route?.path).toBe('/');
    expect(route?.components?.default).toBeDefined();
    expect(typeof route?.components?.default).toBe('object');
  });

  it('should load CreatePoll for /create-poll', () => {
    const route = router.getRoutes().find((r) => r.name === 'create-poll');
    expect(route).toBeDefined();
    expect(route?.path).toBe('/create-poll');
    expect(route?.components?.default).toBeDefined();
    expect(typeof route?.components?.default).toBe('object');
  });

  describe('ShowPoll', () => {
    it('should load ShowPoll component for /poll/:pollId', async () => {
      const route = router.getRoutes().find((r) => r.name === 'show-poll');
      expect(route).toBeDefined();
      expect(route?.path).toBe('/poll/:pollId');
      expect(route?.components?.default).toBeInstanceOf(Function);
    });

    it('should navigate to ShowPoll with dynamic pollId', async () => {
      const pollId = 'anyId';
      await router.push(`/poll/${pollId}`);
      await router.isReady();

      expect(router.currentRoute.value.name).toBe('show-poll');
      expect(router.currentRoute.value.params.pollId).toBe(pollId);
    });
  });
});
