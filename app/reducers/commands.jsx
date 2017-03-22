const initialState = {
  commands: [],
  procedure: [],
  procedureIdCount: 0
}

// utility functions
class Node {
  constructor(id, commandId, children=[]) {
    this.id = id;
    this.commandId = commandId;
    this.children = children;
  }
}

const traverse = (singleNode, parentId, node) => {
  console.log('singleNode.id', singleNode.id);
  console.log('parent.id', parentId);
  if (parentId === singleNode.id) {
    singleNode.children.push(node);
    console.log('single node:', singleNode);
  }
};

// constants
const ADD_COMMAND = 'ADD_COMMAND';

const INSERT_INTO_PROCEDURE = 'INSERT_INTO_PROCEDURE';
const INSERT_INTO_PARENT_PROCEDURE = 'INSERT_INTO_PARENT_PROCEDURE';

// action creaters
export const addCommand = (text) => ({
  type: ADD_COMMAND,
  text
});

export const insertIntoProcedure = (index, commandId) => ({
  type: INSERT_INTO_PROCEDURE,
  index,
  commandId
});

export const insertIntoParentProcedure = (parentId, commandId) => ({
  type: INSERT_INTO_PARENT_PROCEDURE,
  parentId,
  commandId
});

// reducer
export default (state=initialState, action) => {
  const newState = Object.assign({}, state);
  const node = new Node(newState.procedureIdCount, action.commandId, []);

  switch (action.type) {
    case ADD_COMMAND:
      const command = {};
      // this id builder is faulty for when commands are deleted, but useful for testing front-end
      command.id = newState.commands.length;
      command.text = action.text;
      newState.commands.push(command);
      break;
    case INSERT_INTO_PROCEDURE:
      newState.procedureIdCount++;
      newState.procedure = [...state.procedure];
      newState.procedure.splice(action.index, 0, node);
      break;
    case INSERT_INTO_PARENT_PROCEDURE:
      newState.procedureIdCount++;
      newState.procedure.forEach((singleNode) => {
        traverse(singleNode, action.parentId, node);
        console.log(singleNode);
      });
      break;
    default:
      return state;
  }

  return newState;
}
