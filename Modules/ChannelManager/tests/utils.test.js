import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { isMatchAlreadyPlayed, isMatchStartedSoon } from '../utils/utils';


describe('Check if match is started soon', () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it('should return false for invalid timestamp', () => {
		const mockNow = new Date('2024-11-28T12:00:00Z');
		vi.setSystemTime(mockNow);

		expect(isMatchStartedSoon(null)).toBe(false);
		expect(isMatchStartedSoon('invalid')).toBe(false);
		expect(isMatchStartedSoon(undefined)).toBe(false);
		expect(isMatchStartedSoon('')).toBe(false);

		const consoleSpy = vi.spyOn(console, 'error');
		isMatchStartedSoon('invalid');
		expect(consoleSpy).toHaveBeenCalledWith('Invalid timestamp provided.');
	});

	it('should return true if the match starts soon (within 2 hours)', () => {
		const mockNow = new Date('2024-11-28T12:00:00Z');
		vi.setSystemTime(mockNow);

		const futureTime = new Date((mockNow.getTime() / 1000) + 60 * 60); // 1 hour ahead
		expect(isMatchStartedSoon(futureTime.getTime())).toBe(true);
	});

	it('should return false if the match starts too late (beyond the 2-hour window)', () => {
		const mockNow = new Date('2024-11-28T12:00:00Z');
		vi.setSystemTime(mockNow);

		const futureTime = new Date((mockNow.getTime() / 1000) + 3 * 60 * 60); // 3 hours ahead
		expect(isMatchStartedSoon(futureTime.getTime())).toBe(false);
	});

	it('should return false if the match is already over', () => {
		const mockNow = new Date('2024-11-28T12:00:00Z');
		vi.setSystemTime(mockNow);

		const pastTime = new Date((mockNow.getTime() / 1000) - 2 * 60 * 60); // 2 hours ago
		expect(isMatchStartedSoon(pastTime.getTime())).toBe(false);
	});
});

describe('Check if match is already played', () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});


	it('should return false for invalid timestamp', () => {
		const mockNow = new Date('2024-11-28T12:00:00Z');
		vi.setSystemTime(mockNow);

		expect(isMatchAlreadyPlayed(null)).toBe(false);
		expect(isMatchAlreadyPlayed('invalid')).toBe(false);
		expect(isMatchAlreadyPlayed(undefined)).toBe(false);
		expect(isMatchAlreadyPlayed('')).toBe(false);

		const consoleSpy = vi.spyOn(console, 'error');
		isMatchAlreadyPlayed('invalid');
		expect(consoleSpy).toHaveBeenCalledWith('Invalid timestamp provided.');
	});

	it('should return true for a timestamp more than MAXIMUM_MATCH_DURATION hours in the past', () => {
		const mockNow = new Date('2024-11-28T12:00:00Z');
		vi.setSystemTime(mockNow);

		const pastTimestamp = Math.floor(new Date('2024-11-28T06:00:00Z').getTime() / 1000);
		expect(isMatchAlreadyPlayed(pastTimestamp)).toBe(true);
	});

	it('should return false for a timestamp within MAXIMUM_MATCH_DURATION hours', () => {
		const mockNow = new Date('2024-11-28T12:00:00Z');
		vi.setSystemTime(mockNow);

		const recentTimestamp = Math.floor(new Date('2024-11-28T11:00:00Z').getTime() / 1000);
		expect(isMatchAlreadyPlayed(recentTimestamp)).toBe(false);
	});

	it('should return false for a future timestamp', () => {
		const mockNow = new Date('2024-11-28T12:00:00Z');
		vi.setSystemTime(mockNow);

		const futureTimestamp = Math.floor(new Date('2024-11-28T13:00:00Z').getTime() / 1000);
		expect(isMatchAlreadyPlayed(futureTimestamp)).toBe(false);
	});
});