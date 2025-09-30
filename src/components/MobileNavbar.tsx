// src/components/MobileNavbar.tsx
import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    TextInput,
    Animated,
    Alert,
    Platform,
    Dimensions,
    StyleSheet,
    TouchableWithoutFeedback,
    Switch,
    FlatList,
    Keyboard,
} from 'react-native';
import { responsive, deviceType } from '../utils/responsive';
import { useTheme } from '../contexts/ThemeContext';

interface SidebarAction {
    id: string;
    title: string;
    icon: string;
    color: string;
    keywords: string[];
    onPress: () => void;
}

interface MobileNavbarProps {
    visible?: boolean;
    onMenuToggle?: (isOpen: boolean) => void;
    onThemeChange?: (theme: 'light' | 'dark') => void;
    onLogout?: () => void;
}

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const MobileNavbar: React.FC<MobileNavbarProps> = ({
    visible = true,
    onMenuToggle,
    onThemeChange,
    onLogout
}) => {
    const { theme, isDark, toggleTheme } = useTheme();
    const slideAnim = useRef(new Animated.Value(visible ? 0 : -100)).current;
    const menuAnim = useRef(new Animated.Value(-300)).current;
    const contentAnim = useRef(new Animated.Value(0)).current;
    const iconAnim = useRef(new Animated.Value(0)).current;

    const [searchModalVisible, setSearchModalVisible] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredActions, setFilteredActions] = useState<SidebarAction[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const searchInputRef = useRef<TextInput>(null);

    const sidebarActions: SidebarAction[] = [
        {
            id: '1',
            title: 'Dashboard',
            icon: '📊',
            color: theme.purple || '#8b5cf6',
            keywords: ['dashboard', 'início', 'home', 'principal'],
            onPress: () => {
                Alert.alert('Dashboard', 'Navegando para dashboard');
                closeMenu();
            },
        },
        {
            id: '2',
            title: 'Usuários',
            icon: '👥',
            color: theme.blue || '#06b6d4',
            keywords: ['usuários', 'users', 'pessoas', 'clientes'],
            onPress: () => {
                Alert.alert('Usuários', 'Gerenciar usuários');
                closeMenu();
            },
        },
        {
            id: '3',
            title: 'Relatórios',
            icon: '📈',
            color: theme.green || '#10b981',
            keywords: ['relatórios', 'reports', 'análise', 'métricas'],
            onPress: () => {
                Alert.alert('Relatórios', 'Visualizar relatórios');
                closeMenu();
            },
        },
        {
            id: '4',
            title: 'Configurações',
            icon: '⚙️',
            color: theme.orange || '#f59e0b',
            keywords: ['configurações', 'settings', 'preferências', 'opções'],
            onPress: () => {
                Alert.alert('Configurações', 'Configurações do sistema');
                closeMenu();
            },
        },
        {
            id: '5',
            title: 'Suporte',
            icon: '💬',
            color: theme.error || '#ef4444',
            keywords: ['suporte', 'help', 'ajuda', 'contato'],
            onPress: () => {
                Alert.alert('Suporte', 'Entre em contato conosco');
                closeMenu();
            },
        },
    ];

    // Notificar quando o menu abre/fecha
    useEffect(() => {
        onMenuToggle?.(isMenuOpen);
    }, [isMenuOpen, onMenuToggle]);

    // Filtro de busca
    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredActions(sidebarActions);
            setSelectedIndex(-1);
        } else {
            const query = searchQuery.toLowerCase();
            const filtered = sidebarActions.filter(item =>
                item.title.toLowerCase().includes(query) ||
                item.keywords.some(keyword => keyword.toLowerCase().includes(query))
            );
            setFilteredActions(filtered);
            setSelectedIndex(filtered.length > 0 ? 0 : -1);
        }
    }, [searchQuery]);

    // Animação do menu lateral e ícone
    useEffect(() => {
        if (isMenuOpen) {
            // Abrir menu
            Animated.parallel([
                Animated.spring(menuAnim, {
                    toValue: 0,
                    damping: 20,
                    stiffness: 90,
                    useNativeDriver: true,
                }),
                Animated.spring(contentAnim, {
                    toValue: screenWidth * 0.7,
                    damping: 20,
                    stiffness: 90,
                    useNativeDriver: true,
                }),
                Animated.spring(iconAnim, {
                    toValue: screenWidth * 0.75,
                    damping: 20,
                    stiffness: 90,
                    useNativeDriver: true,
                })
            ]).start();
        } else {
            // Fechar menu
            Animated.parallel([
                Animated.spring(menuAnim, {
                    toValue: -300,
                    damping: 20,
                    stiffness: 90,
                    useNativeDriver: true,
                }),
                Animated.spring(contentAnim, {
                    toValue: 0,
                    damping: 20,
                    stiffness: 90,
                    useNativeDriver: true,
                }),
                Animated.spring(iconAnim, {
                    toValue: 0,
                    damping: 20,
                    stiffness: 90,
                    useNativeDriver: true,
                })
            ]).start();

            // FECHAR TECLADO quando o menu fechar
            Keyboard.dismiss();
        }
    }, [isMenuOpen]);

    React.useEffect(() => {
        Animated.spring(slideAnim, {
            toValue: visible ? 0 : -100,
            damping: 20,
            stiffness: 90,
            useNativeDriver: true,
        }).start();
    }, [visible]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
        setSearchQuery('');
        // FECHAR TECLADO ao fechar menu
        Keyboard.dismiss();
    };

    const handleOverlayPress = () => {
        // FECHAR TECLADO ao clicar no overlay
        Keyboard.dismiss();
        closeMenu();
    };

    const handleThemeToggle = (value: boolean) => {
        toggleTheme();
        onThemeChange?.(value ? 'dark' : 'light');
    };

    const handleLogout = () => {
        Alert.alert(
            'Sair',
            'Tem certeza que deseja sair?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Sair', style: 'destructive', onPress: () => {
                        onLogout?.();
                        closeMenu();
                    }
                }
            ]
        );
    };

    const highlightText = (text: string, query: string) => {
        if (!query.trim()) return text;

        const parts = text.split(new RegExp(`(${query})`, 'gi'));
        return parts.map((part, index) =>
            part.toLowerCase() === query.toLowerCase() ? (
                <Text key={index} style={[styles.highlightedText, { backgroundColor: theme.primary }]}>
                    {part}
                </Text>
            ) : (
                part
            )
        );
    };

    const renderSearchResult = ({ item, index }: { item: SidebarAction; index: number }) => (
        <SidebarButton
            action={item}
            isSelected={index === selectedIndex}
            searchQuery={searchQuery}
            onPress={closeMenu}
        />
    );

    // Função para quando o usuário tocar no campo de busca
    const handleSearchInputFocus = () => {
        // O teclado vai abrir automaticamente quando o input receber foco
    };

    // Função para quando o usuário tocar fora do input (no menu)
    const handleMenuPress = () => {
        // Fecha o teclado se estiver aberto
        Keyboard.dismiss();
    };

    if (deviceType.isDesktop || Platform.OS === 'web') {
        return null;
    }

    return (
        <>
            <Animated.View
                style={[
                    styles.container,
                    {
                        transform: [{ translateY: slideAnim }],
                        backgroundColor: theme.backgroundSecondary,
                        borderBottomWidth: 1,
                        borderBottomColor: theme.border,
                    },
                ]}
            >
                <Animated.View
                    style={[
                        styles.menuButtonWrapper,
                        {
                            transform: [{ translateX: iconAnim }],
                        }
                    ]}
                >
                    <TouchableOpacity
                        style={[
                            styles.toggleButton,
                            {
                                backgroundColor: theme.backgroundCard,
                                borderColor: theme.borderLight,
                            }
                        ]}
                        onPress={toggleMenu}
                        activeOpacity={0.7}
                    >
                        <View style={styles.toggleIconContainer}>
                            <View style={[
                                styles.toggleLine,
                                { backgroundColor: theme.text }
                            ]} />
                            <View style={[
                                styles.toggleLine,
                                { backgroundColor: theme.text }
                            ]} />
                            <View style={[
                                styles.toggleLine,
                                { backgroundColor: theme.text }
                            ]} />
                        </View>
                    </TouchableOpacity>
                </Animated.View>
            </Animated.View>

            {/* Overlay para fechar o menu ao clicar fora */}
            {isMenuOpen && (
                <TouchableWithoutFeedback onPress={handleOverlayPress}>
                    <View style={styles.overlay} />
                </TouchableWithoutFeedback>
            )}

            {/* Menu Lateral - Adicionado onPress para fechar teclado */}
            <TouchableWithoutFeedback onPress={handleMenuPress}>
                <Animated.View
                    style={[
                        styles.sideMenu,
                        {
                            transform: [{ translateX: menuAnim }],
                            backgroundColor: theme.backgroundCard,
                        },
                    ]}
                >
                    {/* Header do Menu */}
                    <View style={styles.sideMenuHeader}>
                        <View style={styles.headerContent}>
                            <View style={[styles.avatar, { backgroundColor: theme.purpleLight || '#8b5cf620' }]}>
                                <Text style={styles.avatarText}>👤</Text>
                            </View>
                            <View style={styles.headerText}>
                                <Text style={[styles.userName, { color: theme.text }]}>
                                    Admin User
                                </Text>
                                <Text style={[styles.userRole, { color: theme.purple || '#8b5cf6' }]}>
                                    Administrador
                                </Text>
                            </View>
                        </View>
                    </View>

                    {/* Campo de Busca - Adicionado onFocus personalizado */}
                    <View style={styles.searchWrapper}>
                        <TextInput
                            ref={searchInputRef}
                            style={[
                                styles.searchInput,
                                {
                                    color: theme.text,
                                    backgroundColor: theme.background + '80',
                                }
                            ]}
                            placeholder="Buscar funcionalidades..."
                            placeholderTextColor={theme.textTertiary}
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            returnKeyType="search"
                            selectionColor={theme.primary + '40'}
                            onFocus={handleSearchInputFocus}
                            blurOnSubmit={true}
                        />
                    </View>

                    {/* Lista de Ações/Resultados da Busca */}
                    <View style={styles.actionsContainer}>
                        <FlatList
                            data={filteredActions}
                            renderItem={renderSearchResult}
                            keyExtractor={(item) => item.id}
                            showsVerticalScrollIndicator={false}
                            ListEmptyComponent={
                                <View style={styles.emptyState}>
                                    <View style={[
                                        styles.emptyIcon,
                                        { backgroundColor: theme.background }
                                    ]}>
                                        <Text style={[
                                            styles.emptyIconText,
                                            { color: theme.textTertiary }
                                        ]}>
                                            🔍
                                        </Text>
                                    </View>
                                    <Text style={[
                                        styles.emptyText,
                                        { color: theme.textTertiary }
                                    ]}>
                                        {searchQuery ? 'Nenhum resultado encontrado' : 'Busque por funcionalidades'}
                                    </Text>
                                    {!searchQuery && (
                                        <Text style={[
                                            styles.emptySubtext,
                                            { color: theme.textTertiary }
                                        ]}>
                                            Digite acima para explorar o sistema
                                        </Text>
                                    )}
                                </View>
                            }
                        />
                    </View>

                    {/* Controles - Tema e Logout */}
                    <View style={[
                        styles.controlsSection,
                        {
                            borderTopColor: theme.borderLight,
                        }
                    ]}>
                        <View style={styles.controlItem}>
                            <View style={styles.controlLeft}>
                                <View style={[
                                    styles.controlIcon,
                                    { backgroundColor: theme.background }
                                ]}>
                                    <Text style={styles.controlIconText}>
                                        {isDark ? '🌙' : '☀️'}
                                    </Text>
                                </View>
                                <Text style={[
                                    styles.controlText,
                                    { color: theme.text }
                                ]}>
                                    Modo Escuro
                                </Text>
                            </View>
                            <Switch
                                value={isDark}
                                onValueChange={handleThemeToggle}
                                trackColor={{ false: theme.border, true: theme.primary }}
                                thumbColor={theme.backgroundCard}
                            />
                        </View>

                        <TouchableOpacity
                            style={[
                                styles.logoutButton,
                                { backgroundColor: theme.errorLight + '20' }
                            ]}
                            onPress={handleLogout}
                        >
                            <View style={[
                                styles.logoutIcon,
                                { backgroundColor: theme.error }
                            ]}>
                                <Text style={styles.logoutIconText}>🚪</Text>
                            </View>
                            <Text style={[
                                styles.logoutText,
                                { color: theme.error }
                            ]}>
                                Sair
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Footer */}
                    <View style={[
                        styles.footer,
                        {
                            borderTopColor: theme.borderLight,
                        }
                    ]}>
                        <Text style={[
                            styles.footerText,
                            { color: theme.textTertiary }
                        ]}>
                            Controle de Acesso v0.0
                        </Text>
                    </View>
                </Animated.View>
            </TouchableWithoutFeedback>

            {/* Container animado para o conteúdo principal */}
            <Animated.View
                style={[
                    styles.contentContainer,
                    {
                        transform: [{ translateX: contentAnim }],
                    },
                ]}
            />
        </>
    );
};

// Componente SidebarButton para os itens do menu
const SidebarButton: React.FC<{
    action: SidebarAction;
    isSelected?: boolean;
    searchQuery?: string;
    onPress: () => void;
}> = ({ action, isSelected = false, searchQuery = '', onPress }) => {
    const { theme } = useTheme();
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.timing(scaleAnim, {
            toValue: 0.98,
            duration: 100,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true,
        }).start(() => {
            action.onPress();
            onPress();
        });
    };

    const highlightText = (text: string, query: string) => {
        if (!query.trim()) return text;

        const parts = text.split(new RegExp(`(${query})`, 'gi'));
        return parts.map((part, index) =>
            part.toLowerCase() === query.toLowerCase() ? (
                <Text key={index} style={[styles.highlightedText, { backgroundColor: theme.primary }]}>
                    {part}
                </Text>
            ) : (
                part
            )
        );
    };

    return (
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <TouchableOpacity
                style={[
                    styles.actionButton,
                    {
                        backgroundColor: isSelected
                            ? theme.primary + '20'
                            : 'transparent',
                    }
                ]}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                activeOpacity={0.8}
            >
                <View style={[
                    styles.actionIcon,
                    {
                        backgroundColor: action.color,
                    }
                ]}>
                    <Text style={styles.actionIconText}>{action.icon}</Text>
                </View>
                <Text style={[
                    styles.actionTitle,
                    { color: theme.text }
                ]}>
                    {searchQuery ? highlightText(action.title, searchQuery) : action.title}
                </Text>
                <View style={styles.chevron}>
                    <Text style={[
                        styles.chevronText,
                        { color: theme.textTertiary }
                    ]}>
                        ›
                    </Text>
                </View>
            </TouchableOpacity>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        paddingTop: Platform.OS === 'ios' ? 40 : responsive.padding.md,
        paddingBottom: responsive.padding.sm,
        zIndex: 1000,
    },
    menuButtonWrapper: {},
    toggleButton: {
        width: 48,
        height: 48,
        left: 20,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 4,
    },
    toggleIconContainer: {
        width: 20,
        height: 16,
        justifyContent: 'space-between',
    },
    toggleLine: {
        height: 2,
        borderRadius: 1,
        width: '100%',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 999,
    },
    sideMenu: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        width: 300,
        zIndex: 1001,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 10,
    },
    sideMenuHeader: {
        paddingTop: Platform.OS === 'ios' ? 37 : responsive.padding.xl,
        paddingBottom: responsive.padding.md,
        paddingHorizontal: responsive.padding.lg,
        borderBottomWidth: 1,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: responsive.spacing.md,
        borderWidth: 2,
        borderColor: 'rgba(139, 92, 246, 0.3)',
    },
    avatarText: {
        fontSize: 20,
    },
    headerText: {
        flex: 1,
    },
    userName: {
        fontSize: responsive.fontSize.md,
        fontWeight: '600',
        marginBottom: 2,
    },
    userRole: {
        fontSize: responsive.fontSize.sm,
        fontWeight: '500',
    },
    searchWrapper: {
        paddingHorizontal: responsive.padding.lg,
        marginBottom: responsive.padding.sm,
        marginTop: responsive.padding.md,
    },
    searchInput: {
        //   flex: 1,
        fontSize: responsive.fontSize.md,
        height: 44, // 🔑 controla a altura fixa do campo
        paddingHorizontal: responsive.padding.md,
        backgroundColor: 'transparent',
        borderWidth: 0,
        fontWeight: '400',
        borderRadius: 12,
    },
    actionsContainer: {
        flex: 1,
        paddingTop: responsive.padding.md,
        paddingHorizontal: responsive.padding.sm,
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: responsive.padding.md,
        paddingHorizontal: responsive.padding.md,
        marginHorizontal: responsive.padding.xs,
        borderRadius: 12,
        marginBottom: responsive.spacing.xs,
    },
    actionIcon: {
        width: 40,
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: responsive.spacing.md,
    },
    actionIconText: {
        fontSize: 16,
    },
    actionTitle: {
        fontSize: responsive.fontSize.md,
        fontWeight: '500',
        flex: 1,
    },
    chevron: {
        opacity: 0.7,
    },
    chevronText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    highlightedText: {
        color: '#ffffff',
        fontWeight: '600',
        borderRadius: 2,
        paddingHorizontal: 2,
    },
    emptyState: {
        paddingVertical: responsive.padding.xl,
        alignItems: 'center',
        paddingHorizontal: responsive.padding.lg,
    },
    emptyIcon: {
        width: 64,
        height: 64,
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: responsive.padding.md,
    },
    emptyIconText: {
        fontSize: 24,
        opacity: 0.5,
    },
    emptyText: {
        fontSize: responsive.fontSize.md,
        textAlign: 'center',
        fontWeight: '500',
        marginBottom: responsive.padding.xs,
    },
    emptySubtext: {
        fontSize: responsive.fontSize.sm,
        textAlign: 'center',
        opacity: 0.7,
    },
    controlsSection: {
        paddingHorizontal: responsive.padding.lg,
        paddingVertical: responsive.padding.md,
        borderTopWidth: 1,
        marginTop: responsive.padding.md,
    },
    controlItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: responsive.padding.lg,
    },
    controlLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    controlIcon: {
        width: 36,
        height: 36,
        borderRadius: 9,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: responsive.spacing.md,
    },
    controlIconText: {
        fontSize: 14,
    },
    controlText: {
        fontSize: responsive.fontSize.sm,
        fontWeight: '500',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: responsive.padding.md,
        paddingHorizontal: responsive.padding.md,
        borderRadius: 12,
        marginTop: responsive.spacing.sm,
    },
    logoutIcon: {
        width: 36,
        height: 36,
        borderRadius: 9,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: responsive.spacing.md,
    },
    logoutIconText: {
        fontSize: 14,
    },
    logoutText: {
        fontSize: responsive.fontSize.sm,
        fontWeight: '600',
    },
    footer: {
        paddingHorizontal: responsive.padding.lg,
        paddingVertical: responsive.padding.md,
        borderTopWidth: 1,
    },
    footerText: {
        fontSize: responsive.fontSize.xs,
        textAlign: 'center',
        fontWeight: '500',
    },
    contentContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'transparent',
        zIndex: 998,
    },
});