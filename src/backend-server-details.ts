import { BEServerHealth } from "./utils/enums";

export interface IBackendServerDetails {
    url: string;
    serverWeight: number;
    // Status
    getStatus(): BEServerHealth;
    setStatus(status: BEServerHealth): void;
    // Metrics
    incrementRequestsServed(): void;
    resetMetrics(): void;
}

export class BackendServerDetails implements IBackendServerDetails {
    public url : string;
    public serverWeight: number;
    public requestsServedCount = 0;
    private status : BEServerHealth = BEServerHealth.UNHEALTHY;

    //conmstructor>
    constructor(
        url : string,
        serverWeight : number
    ) {
        this.url = url;
        this.serverWeight = serverWeight;
    };

    //getters and setters>

    getStatus(): BEServerHealth {
        return this.status;
    }

    setStatus(status: BEServerHealth): void {
        this.status = status;
    }

    //increment served count by one request>
    incrementRequestsServed(): void {
        this.requestsServedCount += 1; //increase/.
    }

    //reset counter for a new measurement window >
    resetMetrics(): void {
        this.requestsServedCount = 0;
    }
}