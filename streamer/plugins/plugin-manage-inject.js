((EDConsole) => {
  const PLUGIN_NAME = 'manage-injectcss';
  /*
    Give a way to inject external js/css/html files and text into target document. Should save config into localstorage to apply immediately after reload.
    insert html into prepend/append/selector
  */

  EDConsole.registerPlugin(PLUGIN_NAME);
})(window.EDConsole);
