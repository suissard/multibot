import { describe, it, expect, vi, beforeEach } from 'vitest';
import Secretary from '../../Modules/Secretary/Secretary.js';

const { ChannelType, Colors } = require('discord.js');

// Mock Event class
class MockEvent {
    constructor(bot) {
        this.bot = bot;
    }
}

// Extend Secretary with the mock, so we can instantiate it
class TestableSecretary extends Secretary {
    constructor(bot) {
        super(bot);
    }
}
// Mock the require to replace Event with our mock
vi.mock('../../Class/Event.js', () => ({
    default: MockEvent
}));


describe('Secretary', () => {
    let secretary;
    let mockBot;

    beforeEach(() => {
        mockBot = {
            olympe: {
                api: {
                    xDomain: 'https://example.com'
                },
                users: {
                    '12345': {
                        id: '12345',
                        username: 'TestUser',
                        'Team A': {
                            roles: ['Player', 'Captain'],
                            segmentName: 'Gold',
                            poolName: 'Pool 1'
                        },
                        'Team B': {
                            roles: ['Sub'],
                            segmentName: 'Silver'
                        }
                    },
                    '67890': {
                        id: '67890',
                        username: 'NoRoleUser',
                        'Team C': {
                            roles: [],
                            segmentName: 'Bronze'
                        }
                    },
                    '11111': {
                        id: '11111',
                        username: 'NoTeamDataUser',
                    }
                }
            }
        };
        secretary = new TestableSecretary(mockBot);
    });

    it('should be a class', () => {
        expect(typeof Secretary).toBe('function');
    });

    describe('getMessageFooterFromUser', () => {
        it('should return a formatted footer for a user with multiple teams and roles', () => {
            const user = { id: '12345' };
            const footer = secretary.getMessageFooterFromUser(mockBot, user);
            expect(footer).toContain('AFO : TestUser');
            expect(footer).toContain('+ Team A (Player, Captain - Gold');
            expect(footer).toContain('+ Team B (Sub - Silver)');
            expect(footer).toContain('https://example.com/profile/TestUser');
        });

        it('should handle users with no roles in a team', () => {
            const user = { id: '67890' };
            const footer = secretary.getMessageFooterFromUser(mockBot, user);
            expect(footer).toContain('AFO : NoRoleUser');
            expect(footer).toContain('+ Team C (NoRole - Bronze)');
        });

        it('should return undefined if the user is not in the olympe data', () => {
            const user = { id: 'nonexistent' };
            const footer = secretary.getMessageFooterFromUser(mockBot, user);
            expect(footer).toBeUndefined();
        });

        it('should handle users with no specific team data gracefully', () => {
            const user = { id: '11111' };
            const footer = secretary.getMessageFooterFromUser(mockBot, user);
            expect(footer).toContain('AFO : NoTeamDataUser');
            expect(footer).not.toContain('+'); // No team lines should be added
        });

        it('should handle errors gracefully and return an error message', () => {
            const user = { id: '12345' };
            // Break the mock data to cause a TypeError
            delete mockBot.olympe.users['12345']['Team A'].roles;
            const footer = secretary.getMessageFooterFromUser(mockBot, user);
            expect(footer).toContain('Données irrécupérables');
            expect(footer).toContain('Cannot read properties of undefined');
        });
    });
});
