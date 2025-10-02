import React from 'react';
import { View, Animated, ViewStyle, StyleProp } from 'react-native';
import { responsive, deviceType } from '../../utils/responsive';

interface ResponsiveContainerProps {
	children: React.ReactNode;
	style?: StyleProp<ViewStyle>; // style padrão
	centerContent?: boolean;
	animated?: boolean;
	maxWidth?: number;
	backgroundColor?: string; // ✅ adiciona aqui
}

export const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
	children,
	style,
	centerContent = true,
	animated = false,
	maxWidth,
	backgroundColor
}) => {
	// Container comum (tipo ViewStyle)
	const baseStyle: ViewStyle = {
		width: '100%',
		maxWidth,
		paddingHorizontal: responsive.padding.md,
		...(deviceType.isDesktop && {
			alignSelf: centerContent ? 'center' : 'flex-start',
		}),
		backgroundColor, // ✅ aplica aqui
	};


	// Combina baseStyle + style fornecido
	const combinedStyle: StyleProp<ViewStyle> = [baseStyle, style];

	if (animated) {
		return <Animated.View style={combinedStyle}>{children}</Animated.View>;
	}

	return <View style={combinedStyle}>{children}</View>;
};
