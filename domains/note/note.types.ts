export type Note = {
  path: string;
  name: string;
  content?: string;
};

export type Category = {
  label: string;
  slug: string;
  isPrivate: boolean;
};
