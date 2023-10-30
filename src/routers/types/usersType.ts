export type DBUserType = {
	_id: any;
  } & UserGeneralType;
  
  export type UserGeneralType = {
	accountData: {
		userName: string
		email: string
		passwordHash: string
		createdAt: string
	},
	emailConfirmation: {
		confirmationCode: string
		expirationDate: Date
		isConfirmed: boolean
	},
  };
  
  export type UserType = {
	id: any;
	login: string;
	email: string;
	createdAt: string;
  };

  export type RegistrationDateType = {
	ip: string;
  };
  