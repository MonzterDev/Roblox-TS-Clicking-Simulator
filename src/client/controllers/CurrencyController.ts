import { Controller, Dependency, OnInit } from "@flamework/core";
import { Players, UserInputService } from "@rbxts/services";
import { Events, Functions } from "client/network";

@Controller()
export class PointsController implements OnInit {
    private currencyHolder = Players.LocalPlayer.WaitForChild( "PlayerGui" ).WaitForChild( "Currency" )?.WaitForChild( "Holder" )
    private tapsLabel = <TextLabel>this.currencyHolder?.WaitForChild( "Taps" )
    private tapsNotification = <TextLabel>this.tapsLabel.WaitForChild( "Notification" )
    private gemsLabel = <TextLabel>this.currencyHolder?.WaitForChild( "Gems" )

    onInit () {
        Functions.getData( "taps" ).andThen( ( value ) => typeIs( value, "number" ) ? this.updateTapsLabel( value ) : undefined )
        Functions.getData( "gems" ).andThen( ( value ) => typeIs( value, "number" ) ? this.updateGemsLabel( value ) : undefined )

        UserInputService.InputBegan.Connect( ( input, processed ) => {
            if ( processed ) return;

            if ( input.UserInputType === Enum.UserInputType.MouseButton1 ) {
                Events.tap.fire()
            }
        } )

        Events.modifiedTaps.connect( ( amount ) => this.updateTapsLabel( amount ) )
        Events.modifiedGems.connect( ( amount ) => this.updateGemsLabel( amount ) )
    }

    private updateTapsLabel ( amount: number ) {
        this.tapsLabel.Text = `💸 ${amount}`
    }

    private updateGemsLabel ( amount: number ) {
        this.gemsLabel.Text = `💎 ${amount}`
    }
}