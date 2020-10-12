export const INJECTION_ADD = 'injectionAdd';
export const INJECTION_REMOVE = 'injectionRemove';
export const INJECTION_EXECUTE = 'injectionExecute';
export const INJECTIONS_CLEAR = 'injectionsClear';

export const injectionAdd = (payload) => ({ type: INJECTION_ADD, payload });

export const injectionRemove = (index) => ({
  type: INJECTION_REMOVE,
  payload: index,
});
export const injectionExecute = (payload) => ({
  type: INJECTION_EXECUTE,
  payload,
});
export const injectionsClear = () => ({ type: INJECTIONS_CLEAR });
