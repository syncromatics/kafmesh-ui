import { createGlobalStyle } from 'styled-components';
import colors from './Colors';
import cssReset from './CSSReset';

const GlobalStyles = createGlobalStyle`
	${cssReset} /* stylelint-disable-line value-keyword-case */

	* {
		box-sizing: border-box;
	}

	html {
		font-size: 62.5%;
		line-height: 190%;
		scroll-behavior: smooth;
	}

	body {
		background-color: ${colors.background};
	}
`;

export default GlobalStyles;
