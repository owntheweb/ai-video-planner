import { Segment } from "@/components/data/model/Segment";

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      }
};

export enum SegmentActionTypes {
  // TODO: This one could* be unnecessary or split, better for the Segment actions create/update/delete
  UpdateSegment = 'UPDATE_SEGMENT',
  // NOTE: I could add this to its own reducer to be combined, keep here for now since only one top level action atm.
  CreateAction = 'CREATE_ACTION',
  UpdateAction = 'UPDATE_ACTION',
  DeleteAction = 'DELETE_ACTION',
}

// Temp
interface TempAction {
  id: string,
  actionType: string,
  // TODO: Then consider extending this type with extra action specifics for different types of actions
}

interface SegmentPayload {
  [SegmentActionTypes.UpdateSegment]: Segment;
  [SegmentActionTypes.CreateAction]: TempAction;
  [SegmentActionTypes.UpdateAction]: TempAction;
  [SegmentActionTypes.DeleteAction]: {
    id: string,
  };
}

export type SegmentActions = ActionMap<SegmentPayload>[keyof ActionMap<SegmentPayload>];

export const segmentReducer = (state: Segment, action: SegmentActions) => {
  switch (action.type) {
    case SegmentActionTypes.UpdateSegment:
      return {
        ...state,
        title: action.payload.title,
        uuid: action.payload.uuid,
        created: action.payload.created,
        updated: action.payload.updated,
      }
    case SegmentActionTypes.CreateAction:
      return {
        ...state,
        actions: [
          ...state.actions,
          action.payload,
        ],
      }
    case SegmentActionTypes.UpdateAction:
      return {
        ...state,
        actions: [
          ...state.actions.map(stateAction => stateAction.id === action.payload.id ? action.payload : stateAction),
        ],
      }
    case SegmentActionTypes.DeleteAction:
      return {
        ...state,
        actions: [
          ...state.actions.filter(action => action.id !== action.payload.id),
        ],
      }
    default:
      return state;
  }
}
