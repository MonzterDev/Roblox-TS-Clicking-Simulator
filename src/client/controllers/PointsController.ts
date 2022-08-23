import { Controller, Dependency, OnInit } from "@flamework/core";
import Make from "@rbxts/make";
import Roact from "@rbxts/roact";
import { Players, UserInputService } from "@rbxts/services";
import { connectedStatsUI, CurrencyUI } from "client/roact/CurrencyUI";
import { Events, Functions } from "client/network";
import { renderConnectedComponent } from "client/roact/util/functions/renderConnectedComponent";
import { clientStore } from "client/rodux/store";
import { PlayerData } from "shared/types/PlayerData";
import { PointNotificationUI } from "client/roact/PointNotificationUI";

const currencyHolder = Players.LocalPlayer.WaitForChild( "PlayerGui" ).WaitForChild( "Currency" )?.WaitForChild( "Holder" )
const moneyLabel = <TextLabel>currencyHolder?.WaitForChild( "Money" )
const moneyNotification = <TextLabel>moneyLabel.WaitForChild( "Notification" )
const gemsLabel = <TextLabel>currencyHolder?.WaitForChild( "Gems" )


@Controller()
export class PointsController implements OnInit {
    private pointIndicatorUI = Make( "ScreenGui", {
        Name: "PointIndicator",
        DisplayOrder: 3,
        ResetOnSpawn: false,
        Parent: Players.LocalPlayer.WaitForChild( "PlayerGui" ),
    } )

    onInit () {
        // this.updateMoneyLabel()
        UserInputService.InputBegan.Connect( ( input, processed ) => {
            if ( processed ) return;

            if ( input.UserInputType === Enum.UserInputType.MouseButton1 ) {
                Events.tap.fire()

                const element = Roact.createElement(
                    PointNotificationUI,
                    {
                        points: 1,
                        position: UDim2.fromOffset( UserInputService.GetMouseLocation().X, UserInputService.GetMouseLocation().Y ),
                        finishCallback: () => Roact.unmount( tree )
                    }
                )
                const tree = Roact.mount( element, this.pointIndicatorUI )
            }
        } )

        Events.modifiedTaps.connect( ( amount ) => this.updateMoneyLabel( amount ) )

        renderConnectedComponent( connectedStatsUI, {
            taps: 0,
            gems: 0
        } )
    }

    private updateMoneyLabel ( amount: number ) {
        print( amount )
        const newData: PlayerData = { taps: amount, gems: 0 }
        clientStore.dispatch( { type: "updatePlayerData", newData } )
        moneyLabel.Text = `💸 ${amount}`


    }

}