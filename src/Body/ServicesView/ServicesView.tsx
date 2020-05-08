import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import * as Services from '../../Graphs/Services/Services';

const BodyContainer = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
`;

export type Props = {};

// Flex # corresponds to vertical section divider location
const Component: FunctionComponent<Props> = () => {
	const history = useHistory();
	const testServices: Services.Props = {
		onItemSelected(event: Services.itemSelectedEvent): void {
			switch (event.item.type) {
				case 'service':
					history.push('services/' + event.item.id);
					break;
			}
		}
	};

	return (
		<BodyContainer>
			<Services.Component {...testServices} />
		</BodyContainer>
	);
};

export default Component;
