export const DOM_NODE_LOOKUP = 'domNodeLookup';
export const DOM_QUERY_SELECTOR = 'domQuerySelector';
export const DOM_NODE_INFO_UPDATE = 'domNodeInfoUpdate';
export const DOM_NODE_SET_ATTRIBUTE = 'domNodeSetAttribute';
export const DOM_NODE_SET_STYLE = 'domNodeSetStyle';
export const DOM_NODE_COMPUTED_STYLE = 'domNodeComputedStyle';
export const DOM_NODE_COMPUTED_STYLE_RESPONSE = 'domNodeComputedStyleResponse';

export const domNodeLookup = () => ({ type: DOM_NODE_LOOKUP });

export const domQuerySelector = (query) => ({
  type: DOM_QUERY_SELECTOR,
  payload: query,
});

export const domNodeInfoUpdate = (info) => ({
  type: DOM_NODE_INFO_UPDATE,
  payload: info,
});

export const domNodeSetAttribute = (prop) => ({
  type: DOM_NODE_SET_ATTRIBUTE,
  payload: prop,
});

export const domNodeSetStyle = (prop) => ({
  type: DOM_NODE_SET_STYLE,
  payload: prop,
});

export const domNodeComputedStyle = (data) => ({
  type: DOM_NODE_COMPUTED_STYLE,
  payload: data,
});

export const domNodeComputedStyleResponse = (data) => ({
  type: DOM_NODE_COMPUTED_STYLE_RESPONSE,
  payload: data,
});
