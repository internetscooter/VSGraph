//VS Code extensibility API
const vscode = require('vscode'); 
const path = require('path');

class VSGraph {
    constructor() {
        this.name = "VSGraph";
        this.viewType = "VSGraph";
        this.viewTitle = "VSGraph";
        this.vscodeResource = {};
        this.extensionPath = "";
    }


    // Collect resources required for webview in a dictionary for ease of use
    // This allows us to change any local file references to local vscode-resource references
    // i.e. src="./src/something.js" becomes src="${this.vscodeResource['src/something.js']}"
    // e.g. <script type="text/javascript" src="${this.vscodeResource['mxClient.js']}"></script>
    addResources(extensionPath){
        this.extensionPath = extensionPath;
        // get all the local resources required for VSGraph
        this.addResource('mxClient.js');
        this.addResource('js/Init.js');
        this.addResource('js/EditorUi.js');
        this.addResource('js/Editor.js');
        this.addResource('js/Sidebar.js');
        this.addResource('js/Graph.js');
        this.addResource('js/Format.js');
        this.addResource('js/Shapes.js');
        this.addResource('js/Actions.js');
        this.addResource('js/Menus.js');
        this.addResource('js/Toolbar.js');
        this.addResource('js/Dialogs.js');
        this.addResource('styles/grapheditor.css');
        this.addResource('images/grid.gif');
        this.addResource('deflate/pako.min.js');
        this.addResource('deflate/base64.js');
        this.addResource('jscolor/jscolor.js');
        this.addResource('sanitizer/sanitizer.min.js');
    }

    // get individual resource and add to dictionary (VSGraph uses ./vscode-resource to store resources)
    addResource(resourceString){
        // Get path to resource on disk
        const onDiskPath = vscode.Uri.file(path.join(this.extensionPath, 'vscode-resource', resourceString));
        // And get the special URI to use with the webview
        const resObject = onDiskPath.with({ scheme: 'vscode-resource' });
        this.vscodeResource[resourceString] = resObject;
    }

        // simple hello world from msGraph examples
        getHelloWorld(){
            return `
            <!--
              Copyright (c) 2006-2018, JGraph Ltd
              
              Hello, World! example for mxGraph. This example demonstrates using
              a DOM node to create a graph and adding vertices and edges.
            -->
            <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <!-- Loads and initializes the library -->
                <script type="text/javascript" src="${this.vscodeResource['js/mxClient.js']}"></script>
            
                <!-- Example code -->
                <script type="text/javascript">
                    // Program starts here. Creates a sample graph in the
                    // DOM node with the specified ID. This function is invoked
                    // from the onLoad event handler of the document (see below).
                    function main(container)
                    {
                        // Checks if the browser is supported
                        if (!mxClient.isBrowserSupported())
                        {
                            // Displays an error message if the browser is not supported.
                            mxUtils.error('Browser is not supported!', 200, false);
                        }
                        else
                        {
                            // Disables the built-in context menu
                            mxEvent.disableContextMenu(container);
                            
                            // Creates the graph inside the given container
                            var graph = new mxGraph(container);
            
                            // Enables rubberband selection
                            new mxRubberband(graph);
                            
                            // Gets the default parent for inserting new cells. This
                            // is normally the first child of the root (ie. layer 0).
                            var parent = graph.getDefaultParent();
                                            
                            // Adds cells to the model in a single step
                            graph.getModel().beginUpdate();
                            try
                            {
                                var v1 = graph.insertVertex(parent, null, 'Hello,', 20, 20, 80, 30);
                                var v2 = graph.insertVertex(parent, null, 'World!', 200, 150, 80, 30);
                                var e1 = graph.insertEdge(parent, null, '', v1, v2);
                            }
                            finally
                            {
                                // Updates the display
                                graph.getModel().endUpdate();
                            }
                        }
                    };
                </script>
            </head>
            
            <!-- Page passes the container for the graph to the program -->
            <body onload="main(document.getElementById('graphContainer'))">
            
                <!-- Creates a container for the graph with a grid wallpaper -->
                <div id="graphContainer"
                    style="position:relative;overflow:hidden;width:321px;height:241px;background:url('${this.vscodeResource['images/grid.gif']}');cursor:default;">
                </div>
            </body>
            </html>`;
        }

        getIndexHtml(){
            return `
            <html>
            <head>
                <title>Grapheditor</title>
                    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
                <link rel="stylesheet" type="text/css" href="${this.vscodeResource['styles/grapheditor.css']}">
                    <script type="text/javascript">
                            // Parses URL parameters. Supported parameters are:
                            // - lang=xy: Specifies the language of the user interface.
                            // - touch=1: Enables a touch-style user interface.
                            // - storage=local: Enables HTML5 local storage.
                            // - chrome=0: Chromeless mode.
                            var urlParams = (function(url)
                            {
                                    var result = new Object();
                                    var idx = url.lastIndexOf('?');

                                    if (idx > 0)
                                    {
                                            var params = url.substring(idx + 1).split('&');

                                            for (var i = 0; i < params.length; i++)
                                            {
                                                    idx = params[i].indexOf('=');

                                                    if (idx > 0)
                                                    {
                                                            result[params[i].substring(0, idx)] = params[i].substring(idx + 1);
                                                    }
                                            }
                                    }

                                    return result;
                            })(window.location.href);

                            // Default resources are included in grapheditor resources
                            mxLoadResources = false;
                    </script>
                    <script type="text/javascript" src="${this.vscodeResource['js/Init.js']}"></script>
                    <script type="text/javascript" src="${this.vscodeResource['deflate/pako.min.js']}"></script>
                    <script type="text/javascript" src="${this.vscodeResource['deflate/base64.js']}"></script>
                    <script type="text/javascript" src="${this.vscodeResource['jscolor/jscolor.js']}"></script>
                    <script type="text/javascript" src="${this.vscodeResource['sanitizer/sanitizer.min.js']}"></script>
                    <script type="text/javascript" src="${this.vscodeResource['mxClient.js']}"></script>
                    <script type="text/javascript" src="${this.vscodeResource['js/EditorUi.js']}"></script>
                    <script type="text/javascript" src="${this.vscodeResource['js/Editor.js']}"></script>
                    <script type="text/javascript" src="${this.vscodeResource['js/Sidebar.js']}"></script>
                    <script type="text/javascript" src="${this.vscodeResource['js/Graph.js']}"></script>
                    <script type="text/javascript" src="${this.vscodeResource['js/Format.js']}"></script>
                    <script type="text/javascript" src="${this.vscodeResource['js/Shapes.js']}"></script>
                    <script type="text/javascript" src="${this.vscodeResource['js/Actions.js']}"></script>
                    <script type="text/javascript" src="${this.vscodeResource['js/Menus.js']}"></script>
                    <script type="text/javascript" src="${this.vscodeResource['js/Toolbar.js']}"></script>
                    <script type="text/javascript" src="${this.vscodeResource['js/Dialogs.js']}"></script>
            </head>
            <body class="geEditor">
                    <script type="text/javascript">
                            // Extends EditorUi to update I/O action states based on availability of backend
                            (function()
                            {
                                    var editorUiInit = EditorUi.prototype.init;

                                    EditorUi.prototype.init = function()
                                    {
                                            editorUiInit.apply(this, arguments);
                                            this.actions.get('export').setEnabled(false);

                                            // Updates action states which require a backend
                                            if (!Editor.useLocalStorage)
                                            {
                                                    mxUtils.post(OPEN_URL, '', mxUtils.bind(this, function(req)
                                                    {
                                                            var enabled = req.getStatus() != 404;
                                                            this.actions.get('open').setEnabled(enabled || Graph.fileSupport);
                                                            this.actions.get('import').setEnabled(enabled || Graph.fileSupport);
                                                            this.actions.get('save').setEnabled(enabled);
                                                            this.actions.get('saveAs').setEnabled(enabled);
                                                            this.actions.get('export').setEnabled(enabled);
                                                    }));
                                            }
                                    };

                                    // Adds required resources (disables loading of fallback properties, this can only
                                    // be used if we know that all keys are defined in the language specific file)
                                    mxResources.loadDefaultBundle = false;
                                    var bundle = mxResources.getDefaultBundle(RESOURCE_BASE, mxLanguage) ||
                                            mxResources.getSpecialBundle(RESOURCE_BASE, mxLanguage);

                                    // Fixes possible asynchronous requests
                                    mxUtils.getAll([bundle, STYLE_PATH + '/default.xml'], function(xhr)
                                    {
                                            // Adds bundle text to resources
                                            mxResources.parse(xhr[0].getText());

                                            // Configures the default graph theme
                                            var themes = new Object();
                                            themes[Graph.prototype.defaultThemeName] = xhr[1].getDocumentElement();

                                            // Main
                                            new EditorUi(new Editor(urlParams['chrome'] == '0', themes));
                                    }, function()
                                    {
                                            document.body.innerHTML = '<center style="margin-top:10%;">Error loading resource files. Please check browser console.</center>';
                                    });
                            })();
                    </script>
            </body>
            </html>
            `
        }
}

let vsgraph = new VSGraph();

// this method is called when VSGraph extension is activated
function activate(context) {

    console.log('"VSGraph" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.VSGraph', function () {
        // The code you place here will be executed every time your command is executed
        const panel = vscode.window.createWebviewPanel(
            vsgraph.viewType,
            vsgraph.viewTitle,
            vscode.ViewColumn.One,
            {
                // Enable javascript in the webview
                enableScripts: true,
                // Only allow the webview to access resources in our extension's vscode-resource directory
                localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath, 'vscode-resource'))]
            }
        )

        // load local resources from extensionPath/vscode-resource
        vsgraph.addResources(context.extensionPath);

        // console.log(vsgraph.vscodeResource);
        // panel.webview.html = getWebviewContent(catGifSrc);
        //panel.webview.html = vsgraph.getWebviewContent(catGifSrc);
        // console.log(vsgraph.getHelloWorld());
        panel.webview.html = vsgraph.getHelloWorld();
        // TODO - full client...
        // panel.webview.html = vsgraph.getIndexHtml();


        // Display a message box to the user
        vscode.window.showInformationMessage('Hello Graphs!');

        //Clean up
        panel.onDidDispose(() => {/*any clean up code goes here */}, null, context.subscriptions)
    });

    context.subscriptions.push(disposable);

}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;