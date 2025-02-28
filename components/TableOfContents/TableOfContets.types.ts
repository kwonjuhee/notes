export type TocItem = {
  id: string;
  level: number;
  text: string;
  current?: boolean;
  index: number;
};

export type TocNode = TocItem & { childNodes: TocNode[] };
