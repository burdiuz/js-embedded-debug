import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { evalCommandSend, consoleInstanceSet } from 'store/actions/console';

import ConsoleView from './ConsoleView';
import CommandInput from './CommandInput';

const ConsoleTabPane = ({ onEvalCommandSend, onConsoleInstanceSet }) => (
  <>
    <ConsoleView onInit={onConsoleInstanceSet}></ConsoleView>
    <CommandInput onSend={onEvalCommandSend}></CommandInput>
  </>
);

ConsoleTabPane.propTypes = {
  onEvalCommandSend: PropTypes.func.isRequired,
  onConsoleInstanceSet: PropTypes.func.isRequired,
};

export default connect(null, {
  onEvalCommandSend: evalCommandSend,
  onConsoleInstanceSet: consoleInstanceSet,
})(ConsoleTabPane);
