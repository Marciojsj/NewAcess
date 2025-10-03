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

interface WebNavbarProps {
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
                container: {
                    backgroundColor: theme.backgroundCard,
                    borderBottomWidth: 1,
                    borderBottomColor: theme.borderLight,
                    paddingHorizontal: 24,
                    paddingTop: 18,
                    paddingBottom: 10,
                    shadowColor: theme.shadow,
                    shadowOffset: { width: 0, height: 6 },
                    shadowOpacity: 0.08,
                    shadowRadius: 12,
                    elevation: 4,
                },
                actionBar: {
                    backgroundColor: theme.backgroundCard,
                    paddingHorizontal: 24,
                    paddingTop: 14,
                    paddingBottom: 10,
                    shadowColor: theme.shadow,
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.06,
                    shadowRadius: 10,
                    elevation: 3,
                },
                row: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                },
                leftSection: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    flex: 1,
                },
                centerSection: {
                    flex: 2,
                    paddingHorizontal: 24,
                },
                rightSection: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    flex: 1,
                },
                iconButton: {
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: theme.background,
                    borderWidth: 1,
                    borderColor: theme.borderLight,
                    shadowColor: theme.shadow,
                    shadowOffset: { width: 0, height: 3 },
                    shadowOpacity: 0.06,
                    shadowRadius: 6,
                    elevation: 2,
                },
                iconText: {
                    fontSize: 20,
                    color: theme.text,
                },
                searchInput: {
                    width: 370,
                    borderWidth: 1,
                    borderRadius: 12,
                    paddingHorizontal: 22,
                    paddingVertical: 12,
                    fontSize: 14,
                    backgroundColor: theme.background,
                    color: theme.text,
                    borderColor: theme.borderLight,
                },
                actionButton: {
                    paddingHorizontal: 18,
                    paddingVertical: 12,
                    borderRadius: 10,
                    backgroundColor: theme.background,
                    borderWidth: 1,
                    borderColor: theme.borderLight,
                    marginLeft: 16,
                    shadowColor: theme.shadow,
                    shadowOffset: { width: 0, height: 3 },
                    shadowOpacity: 0.06,
                    shadowRadius: 6,
                    elevation: 2,
                },
                actionButtonText: {
                    fontSize: 14,
                    color: theme.text,
                    fontWeight: '500',
                },
                addButton: {
                    paddingHorizontal: 22,
                    paddingVertical: 12,
                    borderRadius: 10,
                    backgroundColor: theme.primary,
                    marginLeft: 16,
                    shadowColor: theme.shadow,
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.12,
                    shadowRadius: 8,
                    elevation: 3,
                },
                addButtonText: {
                    fontSize: 14,
                    color: '#ffffff',
                    fontWeight: '600',
                },
                screenName: {
                    fontSize: 18,
                    fontWeight: '600',
                    color: theme.text,
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
        <>
            <View style={styles.container}>
                <View style={styles.row}>
                    <View style={styles.leftSection}>
                        {/* <View style={styles.logoWrapper}>
                            {logoSource ? (
                                <Image source={logoSource} style={styles.logo} resizeMode="contain" />
                            ) : (
                                <Text style={styles.logoFallbackText}>AC</Text>
                            )}
                        </View> */}
                    </View>

                    <View style={styles.rightSection}>
                        <TextInput
                            style={styles.searchInput}
                            placeholder={effectiveSearchPlaceholder}
                            placeholderTextColor={theme.textSecondary}
                            value={searchText}
                            onChangeText={onSearchChange}
                        />

                                               

                        <TouchableOpacity
                            style={styles.addButton}
                            onPress={onAddPress}
                            activeOpacity={0.9}
                        >
                            <Text style={styles.addButtonText}>{effectiveAddButtonLabel}</Text>
                        </TouchableOpacity>
                        {/* <TouchableOpacity
                            style={styles.menuTrigger}
                            onPress={() => setMenuVisible(prev => !prev)}
                            activeOpacity={0.85}
                        >
                            <Text style={styles.menuTriggerText}>⚙</Text>
                        </TouchableOpacity> */}
                    </View>
                </View>


                <Modal
                    visible={menuVisible}
                    transparent
                    animationType="fade"
                    onRequestClose={closeMenu}
                >
                    <TouchableWithoutFeedback onPress={closeMenu}>
                        <View style={styles.modalOverlay}>
                            <TouchableWithoutFeedback>
                                <View style={styles.menuContainer}>
                                    <TouchableOpacity
                                        style={styles.menuItem}
                                        onPress={handleToggleTheme}
                                        activeOpacity={0.85}
                                    >
                                        <Text style={styles.menuItemText}>Switch Theme</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={styles.menuItem}
                                        onPress={handleSettings}
                                        activeOpacity={0.85}
                                    >
                                        <Text style={styles.menuItemText}>Settings</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={[styles.menuItem, styles.menuItemLast]}
                                        onPress={handleLogout}
                                        activeOpacity={0.85}
                                    >
                                        <Text style={styles.menuItemText}>Logout</Text>
                                    </TouchableOpacity>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            </View>

            <View style={styles.actionBar}>
                <View style={styles.row}>
                    <View style={styles.leftSection}>
                        <Text style={styles.screenName}>{screenName}</Text>
                    </View>

                    <View style={styles.rightSection}>
                        <TouchableOpacity
                            style={styles.actionButton}
                            onPress={onActionsPress}
                            activeOpacity={0.85}
                        >
                            <Text style={styles.actionButtonText}>{effectiveActionsLabel}</Text>
                        </TouchableOpacity>
{/* 
                        <TouchableOpacity
                            style={styles.addButton}
                            onPress={onAddPress}
                            activeOpacity={0.9}
                        >
                            <Text style={styles.addButtonText}>{effectiveAddButtonLabel}</Text>
                        </TouchableOpacity> */}
                    </View>
                </View>
            </View>
        </>
    );
};