export type TocItem = {
  id: string;
  level: number;
  text: string;
  current?: boolean;
};

export type TocNode = TocItem & { childNodes: TocNode[] };
