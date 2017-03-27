import {FunctionInstance} from '../command_pattern/command.js';

const initialState = {
  commands: [],
  procedure: [],
  procedureIdCount: 0,
  isExecuting: false,
  program: new FunctionInstance()
}

// utility functions
class Node {
  constructor(id, commandId, children=[]) {
    this.id = id;
    this.commandId = commandId;
    this.children = children;
  }
}

const traverse = (currentNode, parentId, newNode) => {
  if (parentId === currentNode.id) {
    const duplicateCurrentNode = Object.assign({}, currentNode);
    duplicateCurrentNode.children = [...duplicateCurrentNode.children, newNode];
    return duplicateCurrentNode;
  }
  return currentNode;
};

// constants
const ADD_COMMAND = 'ADD_COMMAND';
const TOGGLE_EXECUTION = 'TOGGLE_EXECUTION';
const INSERT_INTO_PROCEDURE = 'INSERT_INTO_PROCEDURE';
const INSERT_INTO_PARENT_PROCEDURE = 'INSERT_INTO_PARENT_PROCEDURE';
const PROGRAM_INSTANCE = 'PROGRAM_INSTANCE';

// action creaters
export const addCommand = (text, commandType) => ({
  type: ADD_COMMAND,
  text,
  commandType
});

export const insertIntoProcedure = (index, commandId) => ({
  type: INSERT_INTO_PROCEDURE,
  index,
  commandId
});

export const insertIntoParentProcedure = (parentId, commandId, index) => ({
  type: INSERT_INTO_PARENT_PROCEDURE,
  parentId,
  commandId,
  index
});

export const toggleExecution = (bool) => {
  return {
    type: TOGGLE_EXECUTION,
    bool
  }
}

export const currentProgramInstance = (program) => {
  return {
    type: PROGRAM_INSTANCE,
    program
  }
}

// reducer
export default (state=initialState, action) => {
  const newState = Object.assign({}, state);
  const newNode = new Node(newState.procedureIdCount, action.commandId, []);

  switch (action.type) {
    case ADD_COMMAND:
      console.log(action);
      const command = {};
      // this id builder is faulty for when commands are deleted, but useful for testing front-end
      command.id = newState.commands.length;
      command.text = action.text;
      command.commandType = action.commandType;
      newState.commands = [...newState.commands, command];
      break;
    case INSERT_INTO_PROCEDURE:
      newState.procedureIdCount++;
      newState.procedure = [...state.procedure];
      newState.procedure.splice(action.index, 0, newNode);
      break;
    case INSERT_INTO_PARENT_PROCEDURE:
    // console.log('index:', action.index);
      newState.procedureIdCount++;
      newState.procedure = newState.procedure.map((currentNode) => {
        return traverse(currentNode, action.parentId, newNode);
      });
      break;
    case TOGGLE_EXECUTION:
      newState.isExecuting = action.bool;
      break;
    case PROGRAM_INSTANCE:
      newState.program = action.program;
      break;
    default:
      return state;
  }

  return newState;
}
