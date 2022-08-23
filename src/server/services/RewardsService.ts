import { Dependency, OnInit, Service } from "@flamework/core";
import { Events } from "server/network";
import { PlayerDataService } from "./PlayerDataService";

@Service()
export class RewardsService {
    private readonly playerDataService = Dependency<PlayerDataService>()

    public rewardTaps ( player: Player, amount: number ) {
        const profile = this.playerDataService.getProfile( player )
        if ( !profile ) return

        print( amount, profile.data.taps )
        amount += profile.data.taps
        print( amount )
        profile.modifyTaps( amount )
        Events.rewardedTaps.fire( player, amount )
    }

    public rewardGems ( player: Player, amount: number ) {
        const profile = this.playerDataService.getProfile( player )
        if ( !profile ) return

        amount += profile.data.gems
        profile.modifyGems( amount )
    }
}