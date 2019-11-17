export const IS_AUTHENTICATED = 'IS_AUTHENTICATED';
export const NOT_AUTHENTICATED = 'NOT_AUTHENTICATED';
export const ANY_AUTH_STATUS = 'ANY_AUTH_STATUS';

export type AuthStatus = typeof IS_AUTHENTICATED | typeof NOT_AUTHENTICATED | typeof ANY_AUTH_STATUS;

export const navCategoriesData = {
  categories: [
    { catName: 'action', unicode: '\\E002', displayName: 'Action', fontSize: '0.75em' },
    { catName: 'adventure', unicode: '\\E003', displayName: 'Приключение' },
    { catName: 'arcade', unicode: '\\E004', displayName: 'Аркады' },
    { catName: 'mmo', unicode: '\\E005', displayName: 'MMO' },
    { catName: 'rpg', unicode: '\\E006', displayName: 'Ролевые' },
    { catName: 'sim', unicode: '\\E007', displayName: 'Симуляторы' },
    { catName: 'sport', unicode: '\\E008', displayName: 'Спорт' },
    { catName: 'strategy', unicode: '\\E009', displayName: 'Стратегии' },
  ],
  defaultCategory: { catName: 'other', unicode: '\\E001', displayName: 'Другое' },
};

export interface NavData {
  text: string;
  link: string;
  auth: AuthStatus;
}

export const mobileNavData: NavData[][] = [
  [
    { text: 'Войти', link: '/login', auth: NOT_AUTHENTICATED },
    { text: 'Регистрация', link: '/register', auth: NOT_AUTHENTICATED },

    { text: 'Личный кабинет', link: '/cabient', auth: IS_AUTHENTICATED },

    { text: 'Мои покупки', link: '/cart', auth: ANY_AUTH_STATUS },
  ],
  [
    { text: 'Каталог игр', link: '/catalog', auth: ANY_AUTH_STATUS },
    { text: 'Новинки', link: '/newgames', auth: ANY_AUTH_STATUS },
    { text: 'Лидеры продаж', link: '/top', auth: ANY_AUTH_STATUS },
  ],
];

export const UserNavData: NavData[] = [
  { text: 'Войти', link: '/login', auth: NOT_AUTHENTICATED },
  { text: 'Регистрация', link: '/register', auth: NOT_AUTHENTICATED },

  { text: 'Личный кабинет', link: '/cabient', auth: IS_AUTHENTICATED },

  { text: 'Мои покупки', link: '/cart', auth: ANY_AUTH_STATUS },
];

export const SiteNavData: NavData[] = [
  { text: 'Главная', link: '/', auth: ANY_AUTH_STATUS },
  { text: 'Каталог игр', link: '/catalog', auth: ANY_AUTH_STATUS },
  { text: 'Новинки', link: '/newgames', auth: ANY_AUTH_STATUS },
  { text: 'Лидеры продаж', link: '/top', auth: ANY_AUTH_STATUS },
  { text: 'Помощь', link: '/help', auth: ANY_AUTH_STATUS },
];
