import Roact from "@rbxts/roact";
import { LONG_BLUE_IMG } from "shared/constants";
import { StaticScreenGui } from "./util/components/StaticScreenGui";

interface ButtonsUIProps {

}

export class ButtonsUI extends Roact.Component<ButtonsUIProps> {
    public render (): Roact.Element | undefined {
        return (
            <StaticScreenGui name="Buttons" order={1}>
                <frame
                    Size={UDim2.fromScale( .225, .15 )}
                    Position={UDim2.fromScale( 0, 0.22 )}
                    BackgroundTransparency={1}
                >
                    <uigridlayout
                        CellSize={UDim2.fromScale( .3, .3 )}
                        CellPadding={UDim2.fromScale(.005, .05)}
                    />

                    <imagebutton
                        Image={LONG_BLUE_IMG}
                        BackgroundTransparency={1}
                        ScaleType={"Tile"}
                    />
                    <imagebutton
                        Image={LONG_BLUE_IMG}
                        BackgroundTransparency={1}
                        ScaleType={"Tile"}
                    />
                    <imagebutton
                        Image={LONG_BLUE_IMG}
                        BackgroundTransparency={1}
                        ScaleType={"Tile"}
                    />

                </frame>
            </StaticScreenGui>
        )
    }
}