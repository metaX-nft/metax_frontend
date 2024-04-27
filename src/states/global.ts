import { create } from 'zustand';

type GlobalType = {
  user: { signer?: string; chainId?: string; accounts?: string };
  themeMode: 'light' | 'dark';
};

type NewUserType = { [key in keyof GlobalType['user']]: any };

type GlobalAction = {
  updateUser: (newData: NewUserType) => void;
  toggleColorMode: () => void;
};

const globalStore = create<GlobalType & GlobalAction>()(set => ({
  user: {},
  themeMode: 'light',
  updateUser: newData => set(state => ({ user: { ...state.user, ...newData } })),
  toggleColorMode: () =>
    set(state => ({ themeMode: state.themeMode === 'light' ? 'dark' : 'light' })),
}));

export default globalStore;
