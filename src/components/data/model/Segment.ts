export interface Segment {
  title: string;

  // These exist after database entry
  uuid?: string;
  created?: string;
  updated?: string;
  actions: Array<any>; // TODO: Different types of actions that make this great here soon.
}
