import css, { SerializedStyles } from '@emotion/css';

export const transition = (...rules: string[]): SerializedStyles => css`
	transition: ${rules.map(rule => `${rule} linear .15s `).join(', ')};
`;

export const buttonReset = css`
	background: none;
	border: none;
	padding: 0;
`;

export const linkReset = css`
	&,
	&:hover,
	&:active,
	&:visited {
    text-decoration: none;
    cursor: pointer;
	}
`;

export const inputReset = css`
	background: none;
	border: none;
	border-radius: 0;
	padding: 0;
`;

export const linkColor = (color: string): SerializedStyles => css`
	&,
	&:hover,
	&:active,
	&:visited {
		color: ${color};
	}
`;

export const globalStyles = css`

`;


export const mediaMd = '@media (min-width: 640px)';
export const mediaMdX = '@media (min-width: 820px)';
export const mediaLg = '@media (min-width: 1280px)';