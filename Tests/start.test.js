import { describe, expect, test } from 'vitest';

describe('Test d\'exemple', () => {
    test('voici un des test', () => {
        let result = 4;
        expect(result).toBe(4);
    });
    test('En voici un autre', () => {
        let result = 4;
        expect(result).toBe(4);
    });
});
