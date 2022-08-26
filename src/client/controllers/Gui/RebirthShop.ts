import { Controller, OnInit } from "@flamework/core";
import { Functions } from "client/network";
import { RebirthConfig, RebirthShopConfig } from "shared/configs/rebirthShop";
import { RebirthShopGui } from "./Guis";
import { CloseGui } from "./utils/Close";

const DESCRIPTION_TEXT = `Add _ rebirths button`
type RebirthButtons = Map<number, boolean>

@Controller()
export class RebirthShop implements OnInit {
    private frame = <Frame>RebirthShopGui.WaitForChild( "Frame" )
    private container = <ScrollingFrame>this.frame.WaitForChild( "Container" )
    private template = <Frame>this.container.WaitForChild( "Template" )

    onInit (): void | Promise<void> {
        CloseGui( RebirthShopGui )

        Functions.getData.invoke( "rebirthButtons" ).andThen( ( rebirthMap ) => {
            if ( typeIs( rebirthMap, "table" ) ) {

            }
        } )
        RebirthShopConfig.forEach( ( config, index ) => this.generateShop( index, config ) )
    }

    private generateShop ( index: number, config: RebirthConfig ) {
        const clone = this.template.Clone()
        clone.Parent = this.container
        clone.Name = tostring( index )
        clone.Visible = true

        const description = <TextLabel>clone.FindFirstChild( "Description" )
        description.Text = DESCRIPTION_TEXT.gsub( "_", config.amount )[0]

        const price = <TextLabel>clone.FindFirstChild( "Price" )
        price.Text = `💎${config.amount}`

        const buy = <TextButton>clone.FindFirstChild( "Buy" )
        buy.MouseButton1Click.Connect( () => {

        } )
    }
}