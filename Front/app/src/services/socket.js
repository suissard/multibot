
import { io } from "socket.io-client";

class SocketService {
    constructor() {
        this.socket = null;
    }

    connect() {
        if (this.socket) return;

        // Auto-detect based on current window location or fall back to defaults
        const isDev = process.env.NODE_ENV === 'development';
        // If in dev mode (npm run serve), the API is likely on localhost:3000 (default) or specified
        // In prod, it's served from same origin
        const url = isDev ? 'http://localhost:3000' : window.location.origin;

        const token = localStorage.getItem('api_token');
        this.socket = io(url, {
            path: '/socket.io', // Default path, but explicit is good
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
            auth: {
                token: token
            }
        });

        this.socket.on("connect", () => {
            console.log("Socket connected:", this.socket.id);
        });

        this.socket.on("connect_error", (err) => {
            console.error("Socket connection error:", err);
        });
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }
    }

    on(event, callback) {
        if (!this.socket) this.connect();
        this.socket.on(event, callback);
    }

    off(event) {
        if (this.socket) {
            this.socket.off(event);
        }
    }
}

export default new SocketService();
