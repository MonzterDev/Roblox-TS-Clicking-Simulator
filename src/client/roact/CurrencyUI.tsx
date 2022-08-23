import Roact from '@rbxts/roact';
import RoactRodux from '@rbxts/roact-rodux';
import { CombinedState } from 'client/rodux/store';
import { StatDisplay } from './stat/components/StatDisplay';
import { StaticScreenGui } from './util/components/StaticScreenGui';
import { TransparentGrid } from './util/components/TransparentGrid';
import { connectComponent } from './util/functions/connectComponent';

interface CurrencyUIProps {
	taps: number;
	gems: number;
}

export class CurrencyUI extends Roact.Component<CurrencyUIProps> {
	public render() {
		return (
			<StaticScreenGui name="Stats" order={1}>
				<StatDisplay
					name="Gems"
					displayedAmount={this.props.taps}
					imageId={""}
					position={UDim2.fromScale(0, 0.35)}
				/>
				<StatDisplay
					name="Taps"
					displayedAmount={this.props.gems}
					imageId={""}
					position={UDim2.fromScale(0, 0.425)}
				/>
			</StaticScreenGui>
		);
	}
}

export const connectedStatsUI = connectComponent(CurrencyUI, (state: CombinedState) => {
	const { taps, gems } = state.data;

	return {
		taps,
		gems,
	};
});
