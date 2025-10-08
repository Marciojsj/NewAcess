import React, { useMemo, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Modal,
    TouchableWithoutFeedback,
    StyleSheet,
    Platform,
} from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';

export interface WebNavbarProps {
    screenName: string;
    searchText: string;
    onSearchChange: (text: string) => void;
    onAddPress: () => void;
    onViewModePress?: () => void;
    onActionsPress?: () => void;
    onSidebarToggle?: () => void;
    onSettingsPress?: () => void;
    onLogoutPress?: () => void;

    searchPlaceholder?: string;
    actionsLabel?: string;
    viewModeLabel?: string;
    addButtonLabel?: string;
}

export const WebNavbar: React.FC<WebNavbarProps> = ({
    screenName,
    searchText,
    onSearchChange,
    onAddPress,
    onViewModePress,
    onActionsPress,
    onSidebarToggle,
    onSettingsPress,
    onLogoutPress,
    searchPlaceholder,
    actionsLabel,
    viewModeLabel,
    addButtonLabel,
}) => {
    const { theme, toggleTheme } = useTheme();
    const [menuVisible, setMenuVisible] = useState(false);

    const effectiveSearchPlaceholder = searchPlaceholder ?? 'Search or type a command';
    const effectiveActionsLabel = actionsLabel ?? 'Actions';
    const effectiveViewModeLabel = viewModeLabel ?? 'List view';
    const effectiveAddButtonLabel = addButtonLabel ?? '+ Add Entity';

    const styles = useMemo(
        () =>
            StyleSheet.create({
                // Container principal
                container: {
                    backgroundColor: theme.backgroundCard,
                    borderBottomWidth: 1,
                    borderBottomColor: theme.borderLight,
                    paddingHorizontal: 32,
                    paddingTop: 15,
                    paddingBottom: 10,
                    shadowColor: theme.shadow,
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.08,
                    shadowRadius: 12,
                    elevation: 4,
                },

                // LINHA 1: Título centralizado e input à direita
                titleRow: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 2,
                    width: '100%',
                },
                screenName: {
                    fontSize: 24,
                    fontWeight: '700',
                    color: theme.text,
                    letterSpacing: -0.5,
                    textAlign: 'center',
                    flex: 1,
                    width: '10%',
                    maxWidth: '12%',
                    // backgroundColor: 'red'
                },

                // LINHA 2: Busca + Botões
                actionsRow: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 1,
                },

                // Campo de busca
                searchInput: {
                    width: '30%',
                    height: 44,
                    borderWidth: 1,
                    borderRadius: 10,
                    paddingHorizontal: 16,
                    paddingVertical: 10,
                    fontSize: 14,
                    backgroundColor: theme.background,
                    color: theme.text,
                    borderColor: theme.borderLight,
                    shadowColor: theme.shadow,
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.04,
                    shadowRadius: 4,
                    elevation: 1,
                },

                // Grupo de botões
                buttonsGroup: {
                    flexDirection: 'row',
                    gap: 1,
                },

                // Botão adicionar (primário)
                addButton: {
                    minWidth: 140,
                    height: 44,
                    paddingHorizontal: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 10,
                    backgroundColor: theme.primary,
                    shadowColor: theme.shadow,
                    shadowOffset: { width: 0, height: 3 },
                    shadowOpacity: 0.12,
                    shadowRadius: 6,
                    elevation: 3,
                },
                addButtonText: {
                    fontSize: 14,
                    color: '#ffffff',
                    fontWeight: '600',
                },

                // Botão de ação secundário
                actionButton: {
                    minWidth: 120,
                    height: 44,
                    paddingHorizontal: 16,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 10,
                    backgroundColor: theme.background,
                    borderWidth: 1,
                    borderColor: theme.borderLight,
                    shadowColor: theme.shadow,
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.04,
                    shadowRadius: 4,
                    elevation: 2,
                },
                actionButtonText: {
                    fontSize: 14,
                    color: theme.text,
                    fontWeight: '500',
                },
                modalOverlay: {
                    flex: 1,
                    backgroundColor: 'transparent',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-end',
                    paddingTop: 72,
                    paddingRight: 16,
                },
                menuContainer: {
                    width: 200,
                    borderRadius: 12,
                    backgroundColor: theme.backgroundCard,
                    borderWidth: 1,
                    borderColor: theme.borderLight,
                    shadowColor: theme.shadow,
                    shadowOffset: { width: 0, height: 6 },
                    shadowOpacity: 0.12,
                    shadowRadius: 12,
                    elevation: 6,
                },
                menuItem: {
                    paddingHorizontal: 16,
                    paddingVertical: 14,
                    borderBottomWidth: 1,
                    borderBottomColor: theme.borderLight,
                },
                menuItemText: {
                    fontSize: 14,
                    color: theme.text,
                    fontWeight: '500',
                },
                menuItemLast: {
                    borderBottomWidth: 0,
                },
                logoWrapper: {
                    width: '10%',
                    height: 50,
                    borderRadius: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: theme.background,
                    borderWidth: 3,
                    borderColor: theme.borderLight,
                },
                menuTrigger: {
                    paddingHorizontal: 12,
                    paddingVertical: 10,
                    borderRadius: 10,
                    backgroundColor: theme.background,
                    borderWidth: 1,
                    borderColor: theme.borderLight,
                    marginLeft: 12,
                    shadowColor: theme.shadow,
                    shadowOffset: { width: 0, height: 3 },
                    shadowOpacity: 0.06,
                    shadowRadius: 6,
                    elevation: 2,
                },
                menuTriggerText: {
                    fontSize: 16,
                    color: theme.text,
                },
            }),
        [theme],
    );

    const closeMenu = () => setMenuVisible(false);

    const handleToggleTheme = () => {
        closeMenu();
        toggleTheme();
    };

    const handleSettings = () => {
        closeMenu();
        onSettingsPress?.();
    };

    const handleLogout = () => {
        closeMenu();
        onLogoutPress?.();
    };

    return (
        <View style={styles.container}>
            {/* LINHA 1: Título centralizado */}
            <View style={styles.titleRow}>
                <Text style={styles.screenName}>{screenName}</Text>
                 <TextInput
                    style={styles.searchInput}
                    placeholder={effectiveSearchPlaceholder}
                    placeholderTextColor={theme.textSecondary}
                    value={searchText}
                    onChangeText={onSearchChange}
                />
            </View>
            
        </View>
    );
};