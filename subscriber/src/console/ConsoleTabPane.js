import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { evalCommandSend, consoleInstanceSet } from 'store/actions/console';

import ConsoleView from './ConsoleView';
import CommandInput from './CommandInput';

const ConsoleTabPane = ({ commandSend, instanceSet }) => (
  <>
    <ConsoleView onInit={instanceSet}></ConsoleView>
    <CommandInput onSend={commandSend}></CommandInput>
  </>
);

ConsoleTabPane.propTypes = {
  commandSend: PropTypes.func.isRequired,
  instanceSet: PropTypes.func.isRequired,
};

export default connect(null, {
  commandSend: evalCommandSend,
  instanceSet: consoleInstanceSet,
})(ConsoleTabPane);
