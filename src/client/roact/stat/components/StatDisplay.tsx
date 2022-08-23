import Roact from "@rbxts/roact"

interface StatDisplayProps {
    name: string
    displayedAmount: number
    imageId: string
    position: UDim2
}

export class StatDisplay extends Roact.Component<StatDisplayProps> {
    public render(): Roact.Element | undefined {
        return (
            <frame
                Key={this.props.name}
                BackgroundColor3={Color3.fromRGB( 255, 255, 255 )}
                Position={this.props.position}
                Size={UDim2.fromScale( .225, .05 )}
            >
                <uicorner />
                <frame
                    Key="InnerContent"
                    BackgroundTransparency={1}
                    Position={UDim2.fromScale( .2, 0 )}
                    Size={UDim2.fromScale( .8, 1 )}>

                    <textlabel
						BackgroundTransparency={1}
						Font={Enum.Font.SourceSans}
						Size={new UDim2(0.8, 0, 1, 0)}
						Text={tostring(this.props.displayedAmount)}
						TextColor3={Color3.fromRGB(0, 0, 0)}
						TextScaled={true}
						TextSize={14}
						TextWrapped={true}
					/>
					<imagelabel
						BackgroundTransparency={1}
						Image={this.props.imageId}
						Position={new UDim2(0.8, 0, 0.05, 0)}
						ScaleType={Enum.ScaleType.Fit}
						Size={new UDim2(0.2, 0, 0.9, 0)}
					>
						<uicorner CornerRadius={new UDim(0, 5)} />
					</imagelabel>
                </frame>
            </frame>
        )
    }
}