import React, { useContext, useState } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { DeleteModal } from '../components/userSettings/DeleteModal';
import { userSetingsStyles } from '../components/userSettings/userSettings.style';
import { AuthContext } from '../context/authContext';
import { UserData } from '../components/userSettings/UserData';
import { OrganizationData } from '../components/userSettings/OrganizationData';
import { ChangePassword } from '../components/userSettings/ChangePassword';
import { DeleteAccount } from '../components/userSettings/DeleteAccount';
import { AddUserPhoto } from '../components/userSettings/AddUserPhoto';

export function UserSettings() {
	const [openChangePassword, setChangePassword] = useState(false);
	const [openDeleteModal, setDeleteModalOpen] = useState(false);
	const [openPersonalData, setPersonalData] = useState(false);
	const { user } = useContext(AuthContext);
	const styless = userSetingsStyles();

	const handleOpenModal = () => {
		setDeleteModalOpen(true);
	};

	const handleCloseModal = () => {
		setDeleteModalOpen(false);
	};

	return (
		<Grid container className={styless.userSettingsContainer}>
			<Grid container item direction="column" className={styless.paper}>
				<Typography variant="h4" className={styless.header}>
					Account Settings
				</Typography>
				<Grid item container xs={12} md={12} xl={12} className={styless.formContainer} direction="row">
					<Grid item xs={12} md={7} xl={7}>
						<form noValidate autoComplete="off">
							<UserData
								openPersonalData={openPersonalData}
								user={user}
								setPersonalData={setPersonalData}
							/>
							<OrganizationData user={user} />
							<ChangePassword
								openChangePassword={openChangePassword}
								setChangePassword={setChangePassword}
							/>
							<DeleteAccount handleOpenModal={handleOpenModal} />
						</form>
					</Grid>
					<AddUserPhoto />
				</Grid>
			</Grid>
			<DeleteModal openDeleteModal={openDeleteModal} handleCloseModal={handleCloseModal} />
		</Grid>
	);
}
