import { Networking } from "@flamework/networking";
import { PlayerData } from "./types/PlayerData";
import type { PointsRequestResponse } from "server/services/PointsService"

interface ServerEvents {
    tap (): void
}

interface ServerFunctions {
    getData: ( data: keyof PlayerData ) => PlayerData[keyof PlayerData] | false
    addPoints: () => PointsRequestResponse | false
}

interface ClientEvents {
    rewardedTaps ( amount: number ): void

    modifiedTaps ( amount: number ): void
    modifiedGems ( amount: number ): void
}

interface ClientFunctions { }

export const GlobalEvents = Networking.createEvent<ServerEvents, ClientEvents>();
export const GlobalFunctions = Networking.createFunction<ServerFunctions, ClientFunctions>();
