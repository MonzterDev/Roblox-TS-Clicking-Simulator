import Roact from "@rbxts/roact";
import { TweenableBinding } from "./util/classes/TweenableBinding";

interface PointNotificationUIProps {
    finishCallback: () => void

    points: number
    position: UDim2
}

export class PointNotificationUI extends Roact.Component<PointNotificationUIProps> {
    private yPosition = new TweenableBinding({type: "Number", originalValue: this.props.position.Y.Scale})

    public render() {
        return (
            <frame
                Key={"Point"}
                BackgroundTransparency={1}
                Position={this.yPosition.obj.map(value => UDim2.fromOffset(this.props.position.X.Offset, value))}
                Size={UDim2.fromScale( .2, .2 )}
            >
                <textlabel
                    Key={"Point"}
                    Text={`+ ${this.props.points}`}
                    TextScaled={true}
                    Size={UDim2.fromScale( 1, 1 )}
                    Position={UDim2.fromScale( 0, 0 )}
                    BackgroundTransparency={1}
                    Font={"Gotham"}
                    TextColor3={Color3.fromRGB(255,255,255)}
                >
                </textlabel>
            </frame>
        )
    }

    protected didMount (): void {
        const tween = this.yPosition.tween( {
            Time: 4,
            Goal: {
                Value: 500
            }
        } )

        tween.Play()
        tween.Completed.Connect(() => this.props.finishCallback())
    }
}