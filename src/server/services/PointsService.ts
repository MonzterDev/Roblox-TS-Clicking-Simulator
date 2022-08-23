import { Dependency, OnInit, Service } from "@flamework/core";
import { Events, Functions } from "server/network";
import { PlayerDataService } from "./PlayerDataService";
import { RewardsService } from "./RewardsService";

export interface PointsRequestResponse {
    pointsAdded: number
    wasCritical: boolean
}

const CRITICAL_CHANCE = 5; // 5%
const CRITICAL_MULTIPLIER = 5;

const GEM_CHANCE = 10; // 10%

@Service()
export class PointsService implements OnInit {
    private readonly playerDataService = Dependency<PlayerDataService>()
    private readonly rewardService = Dependency<RewardsService>()

    onInit () {
        Events.tap.connect( ( player ) => this.processPointsRequest( player ) )
    }

    private processPointsRequest ( player: Player ) {
        const profile = this.playerDataService.getProfile( player )
        if ( !profile ) return false;

        const wasCritical = math.random( 0, 100 ) < CRITICAL_CHANCE
        const tapsAdded = 1 * ( wasCritical ? CRITICAL_MULTIPLIER : 1 )

        const rewardGems = math.random( 0, 100 ) < GEM_CHANCE

        this.rewardService.rewardTaps( player, tapsAdded )

        if ( rewardGems ) {
            this.rewardService.rewardGems( player, 1 )
        }
    }

}