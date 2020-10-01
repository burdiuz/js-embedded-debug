((EDConsole) => {
  const PLUGIN_NAME = 'manage-injectcss';
  /*
    Give a way to inject external css files and css text into style tag. Should save config into localstorage to apply immediately after reload.
  */

  EDConsole.registerPlugin(PLUGIN_NAME);
})(window.EDConsole);
