import { Dependency, OnInit, Service } from "@flamework/core";
import { Events, Functions } from "server/network";
import { PlayerDataService } from "./PlayerDataService";

export interface PointsRequestResponse {
    pointsAdded: number
    wasCritical: boolean
}

const CRITICAL_CHANCE = 5; // 5%
const CRITICAL_MULTIPLIER = 5;

@Service()
export class PointsService implements OnInit {
    private readonly playerDataService = Dependency<PlayerDataService>()

    onInit () {
        Events.tap.connect( ( player ) => this.processPointsRequest( player ) )
    }

    private processPointsRequest ( player: Player ): PointsRequestResponse | false {
        const profile = this.playerDataService.getProfile( player )
        if ( !profile ) return false;

        const wasCritical = math.random( 0, 100 ) < CRITICAL_CHANCE
        const tapsAdded = 1 * ( wasCritical ? CRITICAL_MULTIPLIER : 1 )

        profile.modifyTaps( profile.data.taps + tapsAdded )

        return {
            pointsAdded: tapsAdded,
            wasCritical
        }
    }

}