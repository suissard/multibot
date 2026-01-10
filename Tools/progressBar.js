/**
 * Class to create a text progress bar with throttling
 */
module.exports = class ProgressBar {
    /**
     * @param {number} total
     * @param {number} [size=20]
     * @param {number} [refreshRate=1000] - Refresh rate in ms
     */
    constructor(total, size = 20, refreshRate = 1000) {
        this.total = total;
        this.current = 0;
        this.size = size;
        this.refreshRate = refreshRate;
        this.lastLogTime = 0;
    }

    /**
     * Updates the progress and returns the bar string if it should be displayed
     * @returns {string|null}
     */
    next() {
        this.current++;
        const now = Date.now();
        if (
            now - this.lastLogTime > this.refreshRate ||
            this.current === this.total ||
            this.current === 1
        ) {
            this.lastLogTime = now;
            return this.toString();
        }
        return null;
    }

    toString() {
        const progress = Math.round((this.size * this.current) / this.total);
        const emptyProgress = this.size - progress;

        const filled = '▓'.repeat(Math.max(0, progress));
        const empty = '░'.repeat(Math.max(0, emptyProgress));

        return `[${filled}${empty}] ${this.current} / ${this.total}`;
    }
};
