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
	KeyboardAvoidingView,
} from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { WebNavbar } from '../../components/layout/WebNavbar';
import { WebSidebar } from '../../components/layout/WebSidebar';
import { MobileSidebar } from '../../components/layout/MobileSidebar';
import { MobileNavbar } from '../../components/layout/MobileNavbar';
import { deviceType } from '../../utils/responsive';
import { Entidade, FormMode, ViewMode } from './entidade.types';
import * as EntidadeService from './entidadeService';
import { createStyles } from './styles/EntidadeScreen.styles';

export const EntidadeScreen: React.FC = () => {
	const { theme, isDark, toggleTheme } = useTheme();
	const styles = createStyles(theme, isDark);

	const [entidades, setEntidades] = useState<Entidade[]>([]);
	const [filteredEntidades, setFilteredEntidades] = useState<Entidade[]>([]);
	const [searchText, setSearchText] = useState('');
	const [viewMode, setViewMode] = useState<ViewMode>('list');
	const [sidebarOpen, setSidebarOpen] = useState(false);

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
		console.log('🔵 [ENTIDADE] Carregadas:', data.length, 'entidades');
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
		const action = mode === 'create' ? 'CRIAR' : mode === 'edit' ? 'EDITAR' : 'VISUALIZAR';
		const name = entidade ? entidade.nome : 'Nova';
		console.log(`🟢 [ENTIDADE] ${action}: ${name}`);
		
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
		console.log('🔴 [ENTIDADE] EXCLUIR:', entidade.nome);
		
		Alert.alert(
			'Confirmar Exclusão',
			`Deseja realmente excluir ${entidade.nome}?`,
			[
				{ text: 'Cancelar', style: 'cancel' },
				{
					text: 'Excluir',
					style: 'destructive',
					onPress: () => {
						console.log('🔴 [ENTIDADE] CONFIRMADO - Excluindo:', entidade.nome);
						EntidadeService.deleteEntidade(entidade.id);
						loadEntidades();
						Alert.alert('Sucesso', 'Entidade excluída com sucesso!');
					},
				},
			]
		);
	};

	// Renderização com Cards - usado por WEB e MOBILE
	const renderEntityCard = ({ item }: { item: Entidade }) => (
		<Animated.View
			style={[
				styles.entityCard,
				{
					opacity: fadeAnim,
					transform: [{ translateY: slideAnim }],
				},
			]}
		>
			<TouchableOpacity
				onPress={() => handleOpenForm('view', item)}
				activeOpacity={0.8}
			>
				<View style={styles.cardHeader}>
					<View style={styles.cardHeaderInfo}>
						<Text style={styles.cardTitle} numberOfLines={1}>
							{item.nome}
						</Text>
						<Text style={styles.cardSubtitle} numberOfLines={1}>
							{item.tipo} • {item.cnpj}
						</Text>
					</View>
					<View
						style={[
							styles.statusBadge,
							item.status === 'Ativo' ? styles.statusActive : styles.statusInactive,
						]}
					>
						<Text style={styles.statusText}>{item.status}</Text>
					</View>
				</View>

				<View style={styles.cardDetails}>
					<View style={styles.detailRow}>
						<Text style={styles.detailLabel}>Email:</Text>
						<Text style={styles.detailValue} numberOfLines={1}>
							{item.email}
						</Text>
					</View>
					<View style={styles.detailRow}>
						<Text style={styles.detailLabel}>Telefone:</Text>
						<Text style={styles.detailValue}>{item.telefone || 'Não informado'}</Text>
					</View>
					<View style={[styles.detailRow, styles.detailRowLast]}>
						<Text style={styles.detailLabel}>Localização:</Text>
						<Text style={styles.detailValue}>
							{item.cidade}/{item.estado}
						</Text>
					</View>
				</View>
			</TouchableOpacity>

			<View style={styles.cardActions}>
				<TouchableOpacity
					style={[styles.actionButton, styles.editButton]}
					onPress={() => handleOpenForm('edit', item)}
					activeOpacity={0.7}
				>
					<Text style={styles.actionIcon}>✏️</Text>
					<Text style={[styles.actionText, styles.editText]}>Editar</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[styles.actionButton, styles.deleteButton]}
					onPress={() => handleDelete(item)}
					activeOpacity={0.7}
				>
					<Text style={styles.actionIcon}>🗑️</Text>
					<Text style={[styles.actionText, styles.deleteText]}>Excluir</Text>
				</TouchableOpacity>
			</View>
		</Animated.View>
	);

	const handleLogout = () => {
		Alert.alert('Logout', 'Você saiu do sistema.');
	};

	return (
		<View style={{ flex: 1, backgroundColor: theme.background }}>
			{/* NAVBAR WEB */}
			{Platform.OS === 'web' && (
				<WebNavbar
					screenName="Entidades"
					searchText={searchText}
					onSearchChange={setSearchText}
					onAddPress={() => handleOpenForm('create')}
					onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
					addButtonLabel="+ Nova Entidade"
				/>
			)}

			{/* NAVBAR MOBILE */}
			{Platform.OS !== 'web' && (
				<>
					<MobileNavbar
						onAddPress={() => handleOpenForm('create')}
						searchText={searchText}
						onSearchChange={setSearchText}
						screenName="Entidades"
						addButtonLabel="+"
						searchPlaceholder="Buscar entidades..."
						showSearchBar={true}
					/>
					<MobileSidebar 
						isOpen={sidebarOpen}
						onToggle={() => setSidebarOpen(!sidebarOpen)}
					/>
				</>
			)}

			{/* LAYOUT WEB COM SIDEBAR */}
			{Platform.OS === 'web' && (
				<View style={{ flex: 1, flexDirection: 'row' }}>
					<WebSidebar
						isOpen={sidebarOpen}
						onToggle={() => setSidebarOpen(!sidebarOpen)}
						theme={isDark ? 'dark' : 'light'}
						onThemeChange={toggleTheme}
						onLogout={handleLogout}
					/>
					<View style={{ flex: 1, overflow: 'hidden' }}>
						<ScrollView 
							style={{ flex: 1 }}
							showsVerticalScrollIndicator={true}
						>
							<View 
								style={{
									padding: 24,
									display: 'grid',
									gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
									gap: 20,
									width: '100%',
								} as any}
							>
								{filteredEntidades.length > 0 ? (
									filteredEntidades.map((item) => (
										<View key={item.id}>
											{renderEntityCard({ item })}
										</View>
									))
								) : (
									<View style={[styles.emptyContainer, { width: '100%', gridColumn: '1 / -1' } as any]}>
										<Text style={styles.emptyText}>📋</Text>
										<Text style={styles.emptyTitle}>Nenhuma entidade encontrada</Text>
										<Text style={styles.emptySubtitle}>
											{searchText ? 'Tente ajustar sua busca' : 'Crie sua primeira entidade'}
										</Text>
									</View>
								)}
							</View>
						</ScrollView>
					</View>
				</View>
			)}

			{/* MODAL DE FORMULÁRIO */}
			<Modal
				visible={formMode !== null}
				animationType="slide"
				transparent={true}
				onRequestClose={handleCloseForm}
			>
				<KeyboardAvoidingView
					style={styles.modalOverlay}
					behavior={Platform.OS === 'ios' ? 'padding' : undefined}
				>
					<View style={styles.modalContent}>
						<View style={styles.modalHeader}>
							<Text style={styles.modalTitle}>
								{formMode === 'create'
									? 'Nova Entidade'
									: formMode === 'edit'
									? 'Editar Entidade'
									: 'Visualizar Entidade'}
							</Text>
							<TouchableOpacity onPress={handleCloseForm} style={styles.closeButton}>
								<Text style={styles.closeButtonText}>✕</Text>
							</TouchableOpacity>
						</View>

						<ScrollView style={styles.formScroll} showsVerticalScrollIndicator={true}>
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
								<Text style={styles.formLabel}>Email *</Text>
								<TextInput
									style={styles.formInput}
									value={formData.email}
									onChangeText={(text) => setFormData({ ...formData, email: text })}
									placeholder="email@exemplo.com"
									placeholderTextColor={theme.textSecondary}
									keyboardType="email-address"
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
						</ScrollView>

						{formMode !== 'view' && (
							<View style={styles.modalFooter}>
								<TouchableOpacity
									style={[styles.modalButton, styles.cancelButton]}
									onPress={handleCloseForm}
								>
									<Text style={styles.cancelButtonText}>Cancelar</Text>
								</TouchableOpacity>
								<TouchableOpacity
									style={[styles.modalButton, styles.saveButton]}
									onPress={handleSave}
								>
									<Text style={styles.saveButtonText}>Salvar</Text>
								</TouchableOpacity>
							</View>
						)}
					</View>
				</KeyboardAvoidingView>
			</Modal>

			{/* LISTA DE ENTIDADES MOBILE - NÃO ADICIONE CONTAINERS EXTRAS AQUI */}
			{Platform.OS !== 'web' && (
				<FlatList
					data={filteredEntidades}
					renderItem={({ item }) => renderEntityCard({ item })}
					keyExtractor={(item) => item.id}
					style={{ flex: 1 }}
					contentContainerStyle={{
						paddingTop: 165,
						paddingBottom: 100,
						paddingHorizontal: 16,
					}}
					showsVerticalScrollIndicator={true}
					bounces={true}
					alwaysBounceVertical={true}
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
			)}

			{/* BOTÃO FLUTUANTE WEB */}
			{Platform.OS === 'web' && (
				<TouchableOpacity
					style={[styles.webFab, { backgroundColor: theme.primary }]}
					onPress={() => handleOpenForm('create')}
					activeOpacity={0.8}
				>
					<Text style={styles.webFabIcon}>+</Text>
				</TouchableOpacity>
			)}
		</View>
	);
};
