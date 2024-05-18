import { create } from 'zustand';

type GlobalType = {
  user: {
    signer?: string;
    chainId?: string;
    address?: string;
    xAccount?: string;
    xAvatar?: string;
  };
  themeMode: 'light' | 'dark';
};

type NewUserType = { [key in keyof GlobalType['user']]: any };

type GlobalAction = {
  updateUser: (newData: NewUserType) => void;
  resetUser: () => void;
  toggleColorMode: () => void;
};

const globalStore = create<GlobalType & GlobalAction>()(set => ({
  user: {},
  themeMode: 'dark',
  updateUser: newData => set(state => ({ user: { ...state.user, ...newData } })),
  resetUser: () => set(() => ({})),
  toggleColorMode: () =>
    set(state => ({ themeMode: state.themeMode === 'light' ? 'dark' : 'light' })),
}));

export default globalStore;
