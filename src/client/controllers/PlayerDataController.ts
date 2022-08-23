import { Controller, OnInit, OnStart } from "@flamework/core";
import { Events, Functions } from "client/network";
import { DEFAULT_PLAYER_DATA } from "shared/constants";
import { PlayerData } from "shared/types/PlayerData";

@Controller()
export class PlayerDataController implements OnInit, OnStart {
    public data: PlayerData = DEFAULT_PLAYER_DATA

    onInit () {
        // Events.dataUpdated.connect( data => this.updateStoredData( data ) )
    }

    async onStart () {
        const data = await Functions.getData.invoke()

        if ( data ) {
            this.updateStoredData( data )
        }
    }

    private updateStoredData ( newData: PlayerData ) {
        this.data = newData
    }
}