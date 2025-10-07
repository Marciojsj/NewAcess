// src/screens/entidade/entidadeScreen.tsx
import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	TextInput,
	FlatList,
	Alert,
	Animated,
	Modal,
	ScrollView,
	TouchableOpacity,
	SafeAreaView,
	Platform,
} from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { WebNavbar } from '../../components/layout/WebNavbar';
import { WebSidebar } from '../../components/layout/WebSidebar';
import { MobileSidebar } from '../../components/layout/MobileSidebar';
import MobileNavbar from '../../components/layout/MobileNavbar';
import { deviceType } from '../../utils/responsive';
import { createStyles } from './entidadeService';
import * as EntidadeService from './entidadeService';
import { Entidade } from './entidadeService';

type ViewMode = 'list' | 'grid';
type FormMode = 'create' | 'edit' | 'view' | null;

export const EntidadeScreen: React.FC = () => {
	const { theme, isDark, toggleTheme } = useTheme();
	const styles = createStyles(theme, isDark);

	const [entidades, setEntidades] = useState<Entidade[]>([]);
	const [filteredEntidades, setFilteredEntidades] = useState<Entidade[]>([]);
	const [searchText, setSearchText] = useState('');
	const [viewMode, setViewMode] = useState<ViewMode>('list');
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [menuVisible, setMenuVisible] = useState<string | null>(null);
	const [menuPosition, setMenuPosition] = useState<{ top: number; right: number } | null>(null);

	// Form state
	const [formMode, setFormMode] = useState<FormMode>(null);
	const [selectedEntidade, setSelectedEntidade] = useState<Entidade | null>(null);
	const [formData, setFormData] = useState<Partial<Entidade>>({
		nome: '',
		cnpj: '',
		tipo: 'Jurídica',
		endereco: '',
		cidade: '',
		estado: '',
		email: '',
		telefone: '',
		status: 'Ativo',
	});

	// Animation
	const fadeAnim = useState(new Animated.Value(0))[0];
	const slideAnim = useState(new Animated.Value(50))[0];

	useEffect(() => {
		loadEntidades();
		Animated.parallel([
			Animated.timing(fadeAnim, {
				toValue: 1,
				duration: 600,
				useNativeDriver: true,
			}),
			Animated.timing(slideAnim, {
				toValue: 0,
				duration: 600,
				useNativeDriver: true,
			}),
		]).start();
	}, []);

	useEffect(() => {
		filterEntidades();
	}, [searchText, entidades]);

	const loadEntidades = () => {
		const data = EntidadeService.getAll();
		setEntidades(data);
		setFilteredEntidades(data);
	};

	const filterEntidades = () => {
		if (!searchText.trim()) {
			setFilteredEntidades(entidades);
			return;
		}

		const results = EntidadeService.search(searchText);
		setFilteredEntidades(results);
	};

	const handleOpenForm = (mode: FormMode, entidade?: Entidade) => {
		setFormMode(mode);
		if (entidade) {
			setSelectedEntidade(entidade);
			setFormData(entidade);
		} else {
			setSelectedEntidade(null);
			setFormData({
				nome: '',
				cnpj: '',
				tipo: 'Jurídica',
				endereco: '',
				cidade: '',
				estado: '',
				email: '',
				telefone: '',
				status: 'Ativo',
			});
		}
	};

	const handleCloseForm = () => {
		setFormMode(null);
		setSelectedEntidade(null);
		setFormData({
			nome: '',
			cnpj: '',
			tipo: 'Jurídica',
			endereco: '',
			cidade: '',
			estado: '',
			email: '',
			telefone: '',
			status: 'Ativo',
		});
	};

	const handleSave = () => {
		// Validação
		if (!formData.nome?.trim()) {
			Alert.alert('Erro', 'Nome é obrigatório');
			return;
		}
		if (!formData.cnpj?.trim()) {
			Alert.alert('Erro', 'CNPJ é obrigatório');
			return;
		}
		if (!formData.email?.trim()) {
			Alert.alert('Erro', 'Email é obrigatório');
			return;
		}

		try {
			if (formMode === 'create') {
				EntidadeService.create(formData as Omit<Entidade, 'id' | 'createdAt' | 'updatedAt'>);
				Alert.alert('Sucesso', 'Entidade criada com sucesso!');
			} else if (formMode === 'edit' && selectedEntidade) {
				EntidadeService.update(selectedEntidade.id, formData);
				Alert.alert('Sucesso', 'Entidade atualizada com sucesso!');
			}

			loadEntidades();
			handleCloseForm();
		} catch (error) {
			Alert.alert('Erro', 'Erro ao salvar entidade');
		}
	};

	const handleDelete = (entidade: Entidade) => {
		Alert.alert(
			'Confirmar Exclusão',
			`Deseja realmente excluir ${entidade.nome}?`,
			[
				{ text: 'Cancelar', style: 'cancel' },
				{
					text: 'Excluir',
					style: 'destructive',
					onPress: () => {
						EntidadeService.deleteEntidade(entidade.id);
						loadEntidades();
						Alert.alert('Sucesso', 'Entidade excluída com sucesso!');
					},
				},
			]
		);
	};

	const handleLogout = () => {
		Alert.alert('Logout', 'Funcionalidade de logout será implementada');
	};

	const toggleMenu = (id: string, event?: any) => {
		console.log('Toggle menu for ID:', id, 'Current visible:', menuVisible);
		if (menuVisible === id) {
			setMenuVisible(null);
			setMenuPosition(null);
		} else {
			setMenuVisible(id);
			// Capturar posição do toque/clique
			if (event?.nativeEvent) {
				const { pageX, pageY } = event.nativeEvent;
				// Posicionar dropdown próximo ao botão clicado
				setMenuPosition({ 
					top: pageY + 5, // Pequeno offset para baixo
					right: 20 // Margem da direita
				});
			} else {
				// Fallback se não houver evento
				setMenuPosition({ top: 100, right: 20 });
			}
		}
	};

	const renderEntityRow = ({ item }: { item: Entidade }) => (
		<Animated.View
			style={[
				styles.tableRow,
				
				{
					opacity: fadeAnim,
					transform: [{ translateY: slideAnim }],
					// backgroundColor: "red",
					// width: '100%',

				},
				
			]}
		>
			<TouchableOpacity
				style={styles.rowClickable}
				onPress={() => handleOpenForm('view', item)}
				activeOpacity={0.7}
			>
				<View style={styles.tableCell}>
					<Text style={styles.cellText} numberOfLines={1}>
						{item.nome}
					</Text>
				</View>

				<View style={styles.tableCell}>
					<Text style={styles.cellText} numberOfLines={1}>
						{item.cnpj}
					</Text>
				</View>

				<View style={styles.tableCellSmall}>
					<Text style={styles.cellText}>{item.tipo}</Text>
				</View>

				<View style={styles.tableCell}>
					<Text style={styles.cellText} numberOfLines={1}>
						{item.email}
					</Text>
				</View>

				<View style={styles.tableCellSmall}>
					<Text style={styles.cellText}>
						{item.cidade}/{item.estado}
					</Text>
				</View>

				<View style={styles.tableCellSmall}>
					<View
						style={[
							styles.statusBadge,
							item.status === 'Ativo' ? styles.statusActive : styles.statusInactive,
						]}
					>
						<Text style={styles.statusText}>{item.status}</Text>
					</View>
				</View>
			</TouchableOpacity>

			{/* Menu de ações */}
			<View style={styles.actionsCell}>
				<TouchableOpacity
					style={styles.menuButton}
					onPress={(e) => toggleMenu(item.id, e)}
					activeOpacity={0.7}
				>
					<Text style={styles.menuIcon}>⋮</Text>
				</TouchableOpacity>
			</View>
		</Animated.View>
	);

	const renderForm = () => (
		<Modal
			visible={formMode !== null}
			transparent
			animationType="fade"
			onRequestClose={handleCloseForm}
		>
			<View style={styles.modalOverlay}>
				<View style={styles.modalContent}>
					<View style={styles.modalHeader}>
						<Text style={styles.modalTitle}>
							{formMode === 'create' && 'Nova Entidade'}
							{formMode === 'edit' && 'Editar Entidade'}
							{formMode === 'view' && 'Visualizar Entidade'}
						</Text>
						<TouchableOpacity onPress={handleCloseForm}>
							<Text style={styles.closeButton}>×</Text>
						</TouchableOpacity>
					</View>

					<ScrollView style={styles.formContainer}>
						<View style={styles.formGroup}>
							<Text style={styles.formLabel}>Nome *</Text>
							<TextInput
								style={styles.formInput}
								value={formData.nome}
								onChangeText={(text) => setFormData({ ...formData, nome: text })}
								placeholder="Nome da entidade"
								placeholderTextColor={theme.textSecondary}
								editable={formMode !== 'view'}
							/>
						</View>

						<View style={styles.formGroup}>
							<Text style={styles.formLabel}>CNPJ *</Text>
							<TextInput
								style={styles.formInput}
								value={formData.cnpj}
								onChangeText={(text) => setFormData({ ...formData, cnpj: text })}
								placeholder="00.000.000/0000-00"
								placeholderTextColor={theme.textSecondary}
								keyboardType="numeric"
								editable={formMode !== 'view'}
							/>
						</View>

						<View style={styles.formGroup}>
							<Text style={styles.formLabel}>Tipo</Text>
							<View style={styles.radioGroup}>
								<TouchableOpacity
									style={styles.radioButton}
									onPress={() =>
										formMode !== 'view' && setFormData({ ...formData, tipo: 'Física' })
									}
									disabled={formMode === 'view'}
								>
									<View
										style={[
											styles.radioCircle,
											formData.tipo === 'Física' && styles.radioCircleSelected,
										]}
									/>
									<Text style={styles.radioLabel}>Física</Text>
								</TouchableOpacity>
								<TouchableOpacity
									style={styles.radioButton}
									onPress={() =>
										formMode !== 'view' && setFormData({ ...formData, tipo: 'Jurídica' })
									}
									disabled={formMode === 'view'}
								>
									<View
										style={[
											styles.radioCircle,
											formData.tipo === 'Jurídica' && styles.radioCircleSelected,
										]}
									/>
									<Text style={styles.radioLabel}>Jurídica</Text>
								</TouchableOpacity>
							</View>
						</View>

						<View style={styles.formGroup}>
							<Text style={styles.formLabel}>Status</Text>
							<View style={styles.radioGroup}>
								<TouchableOpacity
									style={styles.radioButton}
									onPress={() =>
										formMode !== 'view' && setFormData({ ...formData, status: 'Ativo' })
									}
									disabled={formMode === 'view'}
								>
									<View
										style={[
											styles.radioCircle,
											formData.status === 'Ativo' && styles.radioCircleSelected,
										]}
									/>
									<Text style={styles.radioLabel}>Ativo</Text>
								</TouchableOpacity>
								<TouchableOpacity
									style={styles.radioButton}
									onPress={() =>
										formMode !== 'view' && setFormData({ ...formData, status: 'Inativo' })
									}
									disabled={formMode === 'view'}
								>
									<View
										style={[
											styles.radioCircle,
											formData.status === 'Inativo' && styles.radioCircleSelected,
										]}
									/>
									<Text style={styles.radioLabel}>Inativo</Text>
								</TouchableOpacity>
							</View>
						</View>

						<View style={styles.formGroup}>
							<Text style={styles.formLabel}>Endereço</Text>
							<TextInput
								style={styles.formInput}
								value={formData.endereco}
								onChangeText={(text) => setFormData({ ...formData, endereco: text })}
								placeholder="Endereço completo"
								placeholderTextColor={theme.textSecondary}
								editable={formMode !== 'view'}
							/>
						</View>

						<View style={styles.formRow}>
							<View style={[styles.formGroup, { flex: 2, marginRight: 8 }]}>
								<Text style={styles.formLabel}>Cidade</Text>
								<TextInput
									style={styles.formInput}
									value={formData.cidade}
									onChangeText={(text) => setFormData({ ...formData, cidade: text })}
									placeholder="Cidade"
									placeholderTextColor={theme.textSecondary}
									editable={formMode !== 'view'}
								/>
							</View>
							<View style={[styles.formGroup, { flex: 1 }]}>
								<Text style={styles.formLabel}>UF</Text>
								<TextInput
									style={styles.formInput}
									value={formData.estado}
									onChangeText={(text) => setFormData({ ...formData, estado: text })}
									placeholder="UF"
									placeholderTextColor={theme.textSecondary}
									maxLength={2}
									editable={formMode !== 'view'}
								/>
							</View>
						</View>

						<View style={styles.formGroup}>
							<Text style={styles.formLabel}>Email *</Text>
							<TextInput
								style={styles.formInput}
								value={formData.email}
								onChangeText={(text) => setFormData({ ...formData, email: text })}
								placeholder="email@exemplo.com"
								placeholderTextColor={theme.textSecondary}
								keyboardType="email-address"
								autoCapitalize="none"
								editable={formMode !== 'view'}
							/>
						</View>

						<View style={styles.formGroup}>
							<Text style={styles.formLabel}>Telefone</Text>
							<TextInput
								style={styles.formInput}
								value={formData.telefone}
								onChangeText={(text) => setFormData({ ...formData, telefone: text })}
								placeholder="(00) 00000-0000"
								placeholderTextColor={theme.textSecondary}
								keyboardType="phone-pad"
								editable={formMode !== 'view'}
							/>
						</View>
					</ScrollView>

					{formMode !== 'view' && (
						<View style={styles.formActions}>
							<TouchableOpacity
								style={[styles.formButton, styles.cancelButton]}
								onPress={handleCloseForm}
							>
								<Text style={styles.formButtonText}>Cancelar</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={[styles.formButton, styles.saveButton]}
								onPress={handleSave}
							>
								<Text style={[styles.formButtonText, styles.saveButtonText]}>
									{formMode === 'create' ? 'Criar' : 'Salvar'}
								</Text>
							</TouchableOpacity>
						</View>
					)}
				</View>
			</View>
		</Modal>
	);

	return (
		<SafeAreaView style={styles.container}>
			{Platform.OS === 'web' && (
				<>
					<WebSidebar
						isOpen={sidebarOpen}
						onToggle={() => setSidebarOpen(!sidebarOpen)}
						theme={isDark ? 'dark' : 'light'}
						onThemeChange={toggleTheme}
						onLogout={handleLogout}
					/>
					<WebNavbar
						screenName="Entidades"
						searchPlaceholder="Buscar entidades..."
						viewModeLabel="Lista"
						addButtonLabel="+ Nova Entidade"
						searchText={searchText}
						onSearchChange={setSearchText}
						onAddPress={() => handleOpenForm('create')}
						onViewModePress={() => setViewMode(viewMode === 'list' ? 'grid' : 'list')}
						onActionsPress={() => Alert.alert('Ações', 'Menu de ações')}
						onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
					/>
				</>
			)}

			{Platform.OS !== 'web' && (
				<>
					<MobileNavbar
						screenName="Entidades"
						visible={true}
						onMenuToggle={() => { }}
						onAddPress={() => handleOpenForm('create')}
						addButtonLabel="+"
						searchPlaceholder="Buscar entidades..."
						searchText={searchText}
						onSearchChange={setSearchText}
					/>
					<MobileSidebar
						visible={false}
						onMenuToggle={() => { }}
						onThemeChange={toggleTheme}
						onLogout={handleLogout}
					/>
				</>
			)}

			<View style={styles.content}>
				{Platform.OS !== 'web' && (
					<View style={styles.mobileHeader}>
						<Text style={styles.mobileTitle}>Entidades</Text>
						<TouchableOpacity
							style={styles.addButton}
							onPress={() => handleOpenForm('create')}
						>
							<Text style={styles.addButtonText}>+ Nova</Text>
						</TouchableOpacity>
					</View>
				)}

				<View style={styles.listContainer}>
					<View style={styles.listHeader}>
						<Text style={styles.listCount}>
							{filteredEntidades.length} {filteredEntidades.length === 1 ? 'entidade' : 'entidades'}
						</Text>
					</View>

					<ScrollView
						horizontal
						showsHorizontalScrollIndicator={Platform.OS === 'web'}
						contentContainerStyle={{ flexGrow: 1 }}
					>
						<View style={styles.tableContainer}>
							{/* Cabeçalho da tabela */}
							<View style={styles.tableHeader}>
									<View style={styles.tableCell}>
										<Text style={styles.headerText}>Nome</Text>
									</View>
									<View style={styles.tableCell}>
										<Text style={styles.headerText}>CNPJ</Text>
									</View>
									<View style={styles.tableCellSmall}>
										<Text style={styles.headerText}>Tipo</Text>
									</View>
									<View style={styles.tableCell}>
										<Text style={styles.headerText}>Email</Text>
									</View>
									<View style={styles.tableCellSmall}>
										<Text style={styles.headerText}>Cidade/UF</Text>
									</View>
									<View style={styles.tableCellSmall}>
										<Text style={styles.headerText}>Status</Text>
									</View>
									<View style={styles.actionsCell}>
										<Text style={styles.headerText}>Ações</Text>
									</View>
								</View>

							<FlatList
								data={filteredEntidades}
								renderItem={renderEntityRow}
								keyExtractor={(item) => item.id}
								contentContainerStyle={{ flexGrow: 1 }}
								style={{ flex: 1 }}
								ListEmptyComponent={
									<View style={styles.emptyContainer}>
										<Text style={styles.emptyText}>📋</Text>
										<Text style={styles.emptyTitle}>Nenhuma entidade encontrada</Text>
										<Text style={styles.emptySubtitle}>
											{searchText ? 'Tente ajustar sua busca' : 'Crie sua primeira entidade'}
										</Text>
									</View>
								}
							/>
						</View>
					</ScrollView>
				</View>
			</View>

			{renderForm()}

			{/* Dropdown global - renderizado fora da tabela para aparecer sempre na frente */}
			{menuVisible && menuPosition && (
				<>
					{/* Área invisível para fechar o menu ao clicar fora - SEM overlay escuro */}
					<TouchableOpacity
						style={{
							position: 'absolute',
							top: 0,
							left: 0,
							right: 0,
							bottom: 0,
							zIndex: 99998,
						}}
						activeOpacity={1}
						onPress={() => {
							setMenuVisible(null);
							setMenuPosition(null);
						}}
					/>
					
					{/* Menu dropdown */}
					<View 
						style={[
							styles.dropdownMenu,
							{
								position: 'absolute',
								top: menuPosition.top,
								right: menuPosition.right,
								backgroundColor: isDark ? '#1a1a2e' : '#ffffff',
							}
						]}
					>
						<TouchableOpacity
							style={styles.dropdownItem}
							onPress={() => {
								const selectedEntity = entidades.find(e => e.id === menuVisible);
								setMenuVisible(null);
								setMenuPosition(null);
								if (selectedEntity) handleOpenForm('edit', selectedEntity);
							}}
							activeOpacity={0.7}
						>
							<Text style={styles.dropdownIcon}>✏️</Text>
							<Text style={styles.dropdownText}>Editar</Text>
						</TouchableOpacity>

						<TouchableOpacity
							style={[styles.dropdownItem, styles.dropdownItemDanger]}
							onPress={() => {
								const selectedEntity = entidades.find(e => e.id === menuVisible);
								setMenuVisible(null);
								setMenuPosition(null);
								if (selectedEntity) handleDelete(selectedEntity);
							}}
							activeOpacity={0.7}
						>
							<Text style={styles.dropdownIcon}>🗑️</Text>
							<Text style={[styles.dropdownText, styles.dropdownTextDanger]}>Excluir</Text>
						</TouchableOpacity>
					</View>
				</>
			)}
		</SafeAreaView>
	);
};