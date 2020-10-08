# Embedded Debug Console
A set of tools that should allow to debug code where debug tools are not accessible, like embedded WebView.

Console consists of two parts -- streamer and subscriber. Streamer is an injectable script that is being loaded
into a web page(test target). Subscriber is basically console UI which subscribes to streamer messages and displays
data.

## How to use
1. Build streamer and subscriber by running `npm run build` command in corresponding folders.
2. Copy `edconsole-bundle.js` from streamer and `dist` folder from `subscriber` into your project folder static files.
3. Add scripts to your `index.html`.
```html
    <script>
      EDConsoleConfig = {
        consoleHref: '<path to copied "dist" folder>/index.html',
      };
    </script>
    <script src="<path to copied edconsole-bundle.js>"></script>
```
4. Once page of your project loaded use Ctrl+Shift+ArrowUp to open console in new tab/window or Ctrl+Shift+ArrowDown to open console in a frame.

## Streamer
I've planned tree ways of delivering data between streamer and subscriber -- via MessagePort, WebSocket and SharedWorker,
but currently MessagePort is the only option. Main disadvantage of MessagePort is once target is closed, connection
between streamer and subscriber is lost forever.

You can find all code related to streamer in corresponding folder, it is build from a core part(src folder) and a set
of plugins(plugins folder). To enable/disable plugins, simply comment out imports in `src/bundle.js`, otherwise it will
include all working plugins.

On build it produces three artefacts:
* edconsole.js -- Streamer core with no plugins, useful when plusing should be loaded separately.
* edconsole-bundle.js - Streamer with plugins bundled in one file.
* edconsole-bundle.legacy.js -- Streamer with plugins build with compatibility options.

## Subscriber
Subscriber is a simple(and utterly unoptimized) React application. It shows tabs for connected plugins and builds
with `npm run build` command.

## Plugins
* **plugin-connect-messageport** - Connect to Subscriber using MessagePort
* **plugin-console-iframe** - Open console in iframe
* **plugin-console-window** - Open console in new tab/window
* **plugin-log-console** - Show console messages.
* **plugin-log-location** - Show location/hash, allows going back and forth in history, reload page.
* **plugin-log-redux** - Show Redux actions.
* **plugin-log-websocket** - Show WebSocket connections and incoming/outgoing text data.
* **plugin-log-xhr** - Show outgoing XHR requests started by XmlHttpRequest or fetch().
* **plugin-manage-cookies** - View/Edit cookies
* **plugin-manage-domelement** - View/Edit attributes and styles of HTML elements on Web Page.
* **plugin-manage-storage** - View/Edit contents of LocalStorage and SessionStorage.
