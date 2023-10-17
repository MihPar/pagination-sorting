export type DBUserType = {
	_id: any;
  } & UserGeneralType;
  
  export type UserGeneralType = {
	login: string;
	email: string;
	passwordHash: string;
	createdAt: string;
  };
  
  export type UserType = {
	id: any;
	login: string;
	email: string;
	createdAt: string;
  };
  