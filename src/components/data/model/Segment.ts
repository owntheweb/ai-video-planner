export interface Segment {
  title: string,

  // These exist after database entry
  slug?: string,
  created?: string,
  updated?: string,
  actions: Array<any>, // TODO: Different types of actions that make this great here soon.
}
