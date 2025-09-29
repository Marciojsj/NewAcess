import React, { useRef, useEffect } from 'react';
import { View, Animated, ViewStyle } from 'react-native';
import { responsive } from '../utils/responsive';

// Interface para props do componente LoadingSpinner
// Define opções de customização para tamanho, cor e estilo
interface LoadingSpinnerProps {
	// Tamanho do spinner em pixels - padrão 24px para uso geral
	size?: number;
	// Cor do spinner - padrão roxo para consistência com tema
	color?: string;
	// Estilos adicionais para o container
	style?: ViewStyle;
}

// Componente de spinner de carregamento com animação de rotação contínua
// Usado para indicar estados de loading em toda a aplicação
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
	// Tamanho padrão de 24px - adequado para a maioria dos casos
	size = 24,
	// Cor roxa padrão - consistente com paleta de cores da aplicação
	color = '#8a2be2',
	style,
}) => {
	// Valor animado para rotação - inicia em 0 para rotação completa
	const spinValue = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		// Configuração da animação de rotação contínua
		const spinAnimation = Animated.loop(
			Animated.timing(spinValue, {
				// Rotação completa (0 para 1)
				toValue: 1,
				// Duração de 1 segundo por rotação - velocidade adequada para feedback
				duration: 1000,
				// Native driver para melhor performance
				useNativeDriver: true,
			})
		);

		// Inicia a animação imediatamente
		spinAnimation.start();

		// Cleanup - para a animação quando componente é desmontado
		return () => spinAnimation.stop();
	}, []);

	// Interpolação do valor animado para graus de rotação
	// Converte valores 0-1 em rotação de 0-360 graus
	const spin = spinValue.interpolate({
		inputRange: [0, 1],
		outputRange: ['0deg', '360deg'],
	});

	return (
		<View
			// Container centralizado para o spinner
			style={[{ alignItems: 'center', justifyContent: 'center' }, style]}
		>
			<Animated.View
				style={{
					// Dimensões baseadas no tamanho fornecido
					width: size,
					height: size,
					// Borda para criar o círculo do spinner
					borderWidth: 2,
					// Cor da borda baseada na prop color
					borderColor: color,
					// Topo transparente para criar efeito de spinner
					borderTopColor: 'transparent',
					// Bordas arredondadas para círculo perfeito
					borderRadius: size / 2,
					// Aplicação da animação de rotação
					transform: [{ rotate: spin }],
				}}
			/>
		</View>
	);

};