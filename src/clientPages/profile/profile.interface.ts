export interface PasswordChangeInterface {
  oldPassword: string;
  newPassword: string;
  email: string;
}
export interface ChangeAddressInterface {
  email: string;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}

export interface ProfileInterface {
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  _id: string;
  email: string;
  phone: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  resume?: {
    fileId: string;
    url: string;
  };
}
