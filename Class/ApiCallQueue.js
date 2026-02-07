/**
 * ApiCallQueue
 * Singleton qui gère une file d'attente pour les appels API.
 * Permet de limiter le nombre d'appels simultanés et d'ajouter un délai entre les appels.
 */
class ApiCallQueue {
    /**
     * @param {number} [delay=300] - Délai en ms entre le DEBUT des appels.
     * @param {number} [concurrency=1] - Nombre d'appels simultanés maximum.
     */
    constructor(delay = 300, concurrency = 1) {
        // if (ApiCallQueue.instance) {
        //     return ApiCallQueue.instance;
        // }

        this.queue = [];
        this.activeCount = 0;
        this.isProcessing = false;

        // Configuration
        this.concurrency = concurrency;
        this.delay = delay;

        this.lastCallTime = 0;

        ApiCallQueue.instance = this;
    }

    /**
     * Ajoute un appel à la file d'attente.
     * @param {Function} callFn - Une fonction qui retourne une Promesse (l'appel API).
     * @returns {Promise<any>} Une promesse qui se résout avec le résultat de l'appel.
     */
    add(callFn) {
        return new Promise((resolve, reject) => {
            this.queue.push({
                callFn,
                resolve,
                reject
            });
            this.process();
        });
    }

    /**
     * Traite la file d'attente.
     * Cette méthode tente de lancer autant de requêtes que possible
     * en respectant la concurrency et le délai.
     */
    async process() {
        if (this.isProcessing) return;
        this.isProcessing = true;

        try {
            while (this.queue.length > 0 && this.activeCount < this.concurrency) {
                const now = Date.now();
                const timeSinceLastCall = now - this.lastCallTime;

                // Si on doit attendre pour respecter le délai
                if (timeSinceLastCall < this.delay) {
                    // On attend, mais on bloque la boucle de lancement
                    // Note: Cela signifie que même si on a de la place en concurrency,
                    // on attend que le délai soit passé pour lancer la suivante.
                    await new Promise(resolve => setTimeout(resolve, this.delay - timeSinceLastCall));
                }

                // Vérification après l'attente (juste au cas où)
                if (this.queue.length === 0 || this.activeCount >= this.concurrency) {
                    break;
                }

                const { callFn, resolve, reject } = this.queue.shift();

                this.activeCount++;
                this.lastCallTime = Date.now();

                // On lance l'appel SANS await ici pour ne pas bloquer la boucle
                // et permettre le lancement d'autres requêtes si la concurrency le permet
                callFn()
                    .then(resolve)
                    .catch(reject)
                    .finally(() => {
                        this.activeCount--;
                        // Quand une requête termine, on relance le process
                        // pour voir si on peut en dépiler une autre
                        this.process();
                    });
            }
        } finally {
            this.isProcessing = false;
        }
    }
}

module.exports = ApiCallQueue;
