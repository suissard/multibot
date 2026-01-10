import { describe, it, expect } from 'vitest';
const ApiCallQueue = require('../Class/ApiCallQueue');

describe('ApiCallQueue', () => {

    it('should handle high load with concurrency and delays', async () => {
        // Reset Singleton
        if (ApiCallQueue.instance) {
            ApiCallQueue.instance = null;
        }

        // Config: 15ms délai entre appels, 5 concurrents
        const DELAY = 15;
        const CONCURRENCY = 5;
        const CALL_DURATION = 200; // Chaque appel prend 200ms (demande utilisateur)
        const TOTAL_CALLS = 100;

        const queue = new ApiCallQueue(DELAY, CONCURRENCY);

        const start = Date.now();
        const startTimes = [];
        const endTimes = [];
        let maxConcurrent = 0;
        let currentConcurrent = 0;

        // Mock call
        const mockCall = async (id) => {
            currentConcurrent++;
            maxConcurrent = Math.max(maxConcurrent, currentConcurrent);
            const callStart = Date.now();
            startTimes.push(callStart);

            await new Promise(r => setTimeout(r, CALL_DURATION));

            currentConcurrent--;
            endTimes.push(Date.now());
            return id;
        };

        // Lancer 100 appels
        const promises = [];
        for (let i = 0; i < TOTAL_CALLS; i++) {
            promises.push(queue.add(() => mockCall(i)));
        }

        await Promise.all(promises);
        const totalDuration = Date.now() - start;

        console.log(`Total duration: ${totalDuration}ms`);
        console.log(`Max concurrency reached: ${maxConcurrent}`);

        // Vérifications

        // 1. Concurrency ne doit jamais dépasser la limite
        expect(maxConcurrent).toBeLessThanOrEqual(CONCURRENCY);
        // On s'attend à ce qu'elle atteigne la limite à un moment donné vu la charge
        expect(maxConcurrent).toBe(CONCURRENCY);

        // 2. Délai entre les départs
        // On trie les startTimes
        startTimes.sort((a, b) => a - b);

        let violations = 0;
        for (let i = 1; i < startTimes.length; i++) {
            const diff = startTimes[i] - startTimes[i - 1];
            // On autorise une petite marge d'erreur (ex: 5ms)
            if (diff < DELAY - 10) {
                console.log(`Violation at index ${i}: diff is ${diff}ms`);
                violations++;
            }
        }
        expect(violations).toBe(0);

        // 3. Durée totale estimée
        expect(totalDuration).toBeGreaterThanOrEqual((TOTAL_CALLS - 1) * DELAY);

    }, 20000); // Timeout large pour le test de charge
});
