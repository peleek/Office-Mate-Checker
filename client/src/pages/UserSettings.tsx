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
	const [modalOpenState, setModalOpenState] = useState(false);
	const [openPersonalData, setPersonalData] = useState(false);
	const { user } = useContext(AuthContext);
	const styles = userSetingsStyles();

	return (
		<Grid container className={styles.userSettingsContainer}>
			<Grid container item direction="column" className={styles.paper}>
				<Typography variant="h4" className={styles.header}>
					Account Settings
				</Typography>
				<Grid item container xs={12} md={12} xl={12} className={styles.formContainer} direction="row">
					<Grid item xs={12} md={7} xl={7}>
						<form noValidate autoComplete="off">
							<UserData
								openPersonalData={openPersonalData}
								user={user}
								setPersonalData={setPersonalData}
							/>
							<OrganizationData organizationCode={user.organizationCode} />
							<ChangePassword
								openChangePassword={openChangePassword}
								setChangePassword={setChangePassword}
							/>
							<DeleteAccount handleOpenModal={() => setModalOpenState(true)} />
						</form>
					</Grid>
					<AddUserPhoto />
				</Grid>
			</Grid>
			<DeleteModal modalOpenState={modalOpenState} setModalOpenState={setModalOpenState} />
		</Grid>
	);
}
