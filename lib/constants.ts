// Категорії тегів — для форми, Yup, select
export const TAG_OPTIONS = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'] as const;
export type Tag = typeof TAG_OPTIONS[number];

// Категорії тегів - для меню навігації
export const MENU_TAG_OPTIONS: string[] = ['All', ...TAG_OPTIONS];

// Пагінація
export const NOTES_PER_PAGE = 12;

// Значення за замовчуванням
export const DEFAULT_TAG = 'Todo';


