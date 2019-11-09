export const navCategoriesData = {
  categories: [
    {catName: 'action', unicode: '\\E002', displayName: 'Action', fontSize: '0.75em'},
    {catName: 'adventure', unicode: '\\E003', displayName: 'Приключение'},
    {catName: 'arcade', unicode: '\\E004', displayName: 'Аркады'},
    {catName: 'mmo', unicode: '\\E005', displayName: 'MMO'},
    {catName: 'rpg', unicode: '\\E006', displayName: 'Ролевые'},
    {catName: 'sim', unicode: '\\E007', displayName: 'Симуляторы'},
    {catName: 'sport', unicode: '\\E008', displayName: 'Спорт'},
    {catName: 'strategy', unicode: '\\E009', displayName: 'Стратегии'},
  ],
  defaultCategory: {catName: 'other', unicode: '\\E001', displayName: 'Другое'},
};

export const mobileNavData = [
  [
    {text: 'Войти', link: '/login'},
    {text: 'Регистрация', link: '/register'},
    {text: 'Мои покупки', link: '/cart'},
  ],
  [
    {text: 'Каталог игр', link: '/catalog'},
    {text: 'Новинки', link: '/newgames'},
    {text: 'Лидеры продаж', link: '/top'},
  ],
];

export const UserNavData = [
  {text: 'Войти', link: '/login'},
  {text: 'Регистрация', link: '/register'},
  {text: 'Мои покупки', link: '/cart'},
];

export const SiteNavData = [
  {text: 'Главная', link: '/'},
  {text: 'Каталог игр', link: '/catalog'},
  {text: 'Новинки', link: '/newgames'},
  {text: 'Лидеры продаж', link: '/top'},
  {text: 'Помощь', link: '/help'},
];