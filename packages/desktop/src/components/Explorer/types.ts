export type NodeDataType =
  | 'image'
  | 'folder'
  | 'unknown'
  | 'text'
  | 'video'
  | string;

export type NodeData = {
  type: NodeDataType;
  size: number;
  /**
   * Create time
   */
  birthTime: string;
  /**
   * Last modified time
   */
  modifiedTime: string;

  /**
   * Remove time
   */
  deathTime: string;
};
