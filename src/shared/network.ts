import { Networking } from "@flamework/networking";
import { PlayerData, Settings } from "./types/PlayerData";
import type { PointsRequestResponse } from "server/services/PointsService"

interface ServerEvents {
    tap (): void

    changeSetting ( setting: keyof Settings, value: Settings[keyof Settings] ): void
}

interface ServerFunctions {
    getData: <k extends keyof PlayerData>( data: k ) => PlayerData[k]
    addPoints: () => PointsRequestResponse | false
}

interface ClientEvents {
    rewardedTaps ( amount: number ): void

    modifiedTaps ( amount: number ): void
    modifiedGems ( amount: number ): void
}

interface ClientFunctions {
    getData: <k extends keyof PlayerData>( data: k ) => PlayerData[k]
}

export const GlobalEvents = Networking.createEvent<ServerEvents, ClientEvents>();
export const GlobalFunctions = Networking.createFunction<ServerFunctions, ClientFunctions>();
