export function transactionReducer(state, action) {
    switch (action.type) {
      case 'SET_GAS_USAGE':
        return { ...state, gasUsage: { ...state.gasUsage, [action.payload.hash]: action.payload.gasUsage } };
      case 'SET_FROM':
        return { ...state, from: { ...state.from, [action.payload.hash]: action.payload.from } };
      case 'SET_TO':
        return { ...state, to: { ...state.to, [action.payload.hash]: action.payload.to } };
    case 'SET_TYPE':
        return {...state, type: {...state.type, [action.payload.hash]: action.payload.type}}
      default:
        throw new Error();
    }
  }
