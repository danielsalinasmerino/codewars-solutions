// https://www.codewars.com/kata/58b1ae711fcffa34090000ea

export enum DoorState {
  Closed = "Closed",
  Opening = "Opening",
  Open = "Open",
  Closing = "Closing",
  Paused = "Paused",
}

const DOOR = Object.freeze({
  MIN_POSITION: 0,
  MAX_POSITION: 5,
} as const);

interface DoorContext {
  state: DoorState;
  previousState: DoorState | null;
  position: number;
}

type StateHandler = (context: DoorContext, event: string) => DoorContext;

const isButtonPress = (event: string): boolean => event === "P";
const isObstacleDetected = (event: string): boolean => event === "O";

const decrementPosition = (position: number): number =>
  Math.max(position - 1, DOOR.MIN_POSITION);
const incrementPosition = (position: number): number =>
  Math.min(position + 1, DOOR.MAX_POSITION);

const handleClosed: StateHandler = (context, event) => {
  if (isButtonPress(event)) {
    return {
      ...context,
      state: DoorState.Opening,
      position: DOOR.MIN_POSITION + 1,
    };
  }
  return context;
};

const handleOpening: StateHandler = (context, event) => {
  if (isButtonPress(event)) {
    return {
      ...context,
      state: DoorState.Paused,
      previousState: DoorState.Opening,
    };
  }

  if (isObstacleDetected(event)) {
    return {
      ...context,
      position: decrementPosition(context.position),
      state: DoorState.Closing,
    };
  }

  const newPosition = incrementPosition(context.position);
  return {
    ...context,
    position: newPosition,
    state: newPosition === DOOR.MAX_POSITION ? DoorState.Open : context.state,
  };
};

const handleOpen: StateHandler = (context, event) => {
  if (isButtonPress(event)) {
    return {
      ...context,
      state: DoorState.Closing,
      position: DOOR.MAX_POSITION - 1,
    };
  }
  return context;
};

const handleClosing: StateHandler = (context, event) => {
  if (isButtonPress(event)) {
    return {
      ...context,
      state: DoorState.Paused,
      previousState: DoorState.Closing,
    };
  }

  if (isObstacleDetected(event)) {
    return {
      ...context,
      position: incrementPosition(context.position),
      state: DoorState.Opening,
    };
  }

  const newPosition = decrementPosition(context.position);
  return {
    ...context,
    position: newPosition,
    state: newPosition === DOOR.MIN_POSITION ? DoorState.Closed : context.state,
  };
};

const handlePaused: StateHandler = (context, event) => {
  if (!isButtonPress(event) || !context.previousState) {
    return context;
  }

  const isOpening = context.previousState === DoorState.Opening;
  const newPosition = isOpening
    ? incrementPosition(context.position)
    : decrementPosition(context.position);

  const hasReachedLimit = isOpening
    ? newPosition === DOOR.MAX_POSITION
    : newPosition === DOOR.MIN_POSITION;

  const newState = hasReachedLimit
    ? isOpening
      ? DoorState.Open
      : DoorState.Closed
    : context.previousState;

  return {
    state: newState,
    previousState: null,
    position: newPosition,
  };
};

const stateHandlers: Record<DoorState, StateHandler> = {
  [DoorState.Closed]: handleClosed,
  [DoorState.Opening]: handleOpening,
  [DoorState.Open]: handleOpen,
  [DoorState.Closing]: handleClosing,
  [DoorState.Paused]: handlePaused,
};

export function door(events: string): string {
  let context: DoorContext = {
    state: DoorState.Closed,
    previousState: null,
    position: DOOR.MIN_POSITION,
  };

  const positions: number[] = [];

  for (const event of events) {
    const handler = stateHandlers[context.state];
    context = handler(context, event);
    positions.push(context.position);
  }

  return positions.join("");
}
