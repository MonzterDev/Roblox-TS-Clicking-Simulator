import { Dependency, OnInit, Service } from "@flamework/core";
import { Events } from "server/network";
import { PlayerDataService } from "./PlayerDataService";

@Service()
export class RewardsService {
    private readonly playerDataService = Dependency<PlayerDataService>()

    public rewardTaps ( player: Player, amount: number ) {
        const profile = this.playerDataService.getProfile( player )
        if ( !profile ) return

        amount += profile.data.taps
        profile.modifyTaps( amount )
        Events.rewardedTaps.fire( player, amount )
    }
}