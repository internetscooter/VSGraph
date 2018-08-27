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

        // mxClient internal resources
        this.addResource('resources/grapheditor.txt');
        this.addResource('resources/grapheditor_de.txt');
        this.addResource('resources/help.html');
        this.addResource('resources/help_de.html');
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
            this.addResource('mxClient.js');
            this.addResource('js/HelloWorld.js');
            return `
            <!--
              Copyright (c) 2006-2018, JGraph Ltd
              
              Hello, World! example for mxGraph. This example demonstrates using
              a DOM node to create a graph and adding vertices and edges.
            -->
            <html>
            <head>
                <meta charset="UTF-8">
                <!-- Get this working later...
                <meta http-equiv="Content-Security-Policy" content="
                default-src 'self' 'unsafe-eval' *.jgraph.com *.draw.io apis.google.com *.googleapis.com drive.google.com api.trello.com js.live.net code.jquery.com www.dropbox.com;
                style-src *.draw.io *.jgraph.com;
                img-src https://* data:;
                child-src content.googleapis.com accounts.google.com;">
                -->
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <!-- Loads and initializes the library -->
                <script type="text/javascript" src="${this.vscodeResource['mxClient.js']}"></script>
                <script type="text/javascript" src="${this.vscodeResource['js/HelloWorld.js']}"></script>
            </head>
             
            <!-- Page passes the container for the graph to the program -->
            <body onload="HelloWorld(document.getElementById('graphContainer'))">
            
                <!-- Creates a container for the graph with a grid wallpaper -->
                <div id="graphContainer"
                    style="position:relative;overflow:hidden;width:321px;height:241px;background:url('${this.vscodeResource['images/grid.gif']}');cursor:default;">
                </div>
            </body>
            </html>`;
        }

        getIndexHtml(){
            this.addResource('js\URLParams.js');
            this.addResource('\\');
            console.log(this.vscodeResource);
            return `
            <html>
            <head>
                <title>Grapheditor</title>
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
                <link rel="stylesheet" type="text/css" href="${this.vscodeResource['styles/grapheditor.css']}">
                <script type="text/javascript" src="${this.vscodeResource['js/URLParams.js']}"></script>
                <script type="text/javascript" src="${this.vscodeResource['js/Init.js']}"></script>
                <script type="text/javascript" src="${this.vscodeResource['deflate/pako.min.js']}"></script>
                <script type="text/javascript" src="${this.vscodeResource['deflate/base64.js']}"></script>
                <script type="text/javascript" src="${this.vscodeResource['jscolor/jscolor.js']}"></script>
                <script type="text/javascript" src="${this.vscodeResource['sanitizer/sanitizer.min.js']}"></script>
                <script type="text/javascript">
                // Default resources are included in grapheditor resources
                var mxLoadResources = false;
                var mxBasePath = "${this.vscodeResource['\\'].path}";
                </script>
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
                    
                <!--
                <script type="text/javascript" src="${this.vscodeResource['resources/grapheditor.txt']}"></script>
                <script type="text/javascript" src="${this.vscodeResource['resources/grapheditor_de.txt']}"></script>
                <script type="text/javascript" src="${this.vscodeResource['resources/help.html']}"></script>
                <script type="text/javascript" src="${this.vscodeResource['resources/help_de.html']}"></script>
                -->
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
                                    // mxResources.loadDefaultBundle = false;
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
                                            var urlParams = URLParams(window.location.href);
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

        getViewerHtml(){
            return `
            <!--[if IE]><meta http-equiv="X-UA-Compatible" content="IE=5,IE=9" ><![endif]-->
            <!DOCTYPE html>
            <html>
            <head>
                <title>Grapheditor viewer</title>
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
                <script type="text/javascript">
                    var STENCIL_PATH = 'stencils';
                    var IMAGE_PATH = 'images';
                    var STYLE_PATH = 'styles';
                
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

                    // Sets the base path, the UI language via URL param and configures the
                    // supported languages to avoid 404s. The loading of all core language
                    // resources is disabled as all required resources are in grapheditor.
                    // properties. Note that in this example the loading of two resource
                    // files (the special bundle and the default bundle) is disabled to
                    // save a GET request. This requires that all resources be present in
                    // each properties file since only one file is loaded.
                    var mxLoadResources = false;
                    var mxBasePath = '../../../src';
                </script>
                <script type="text/javascript" src="${this.vscodeResource['sanitizer/sanitizer.min.js']}"></script>
                <script type="text/javascript" src="${this.vscodeResource['mxClient.js']}"></script>
                <script type="text/javascript" src="${this.vscodeResource['js/Graph.js']}"></script>
                <script type="text/javascript" src="${this.vscodeResource['js/Shapes.js']}"></script>
            </head>
            <body class="geEditor">
                Input:
                <br />
                <textarea rows="24" cols="100" id="textarea" placeholder="mxGraphModel"></textarea>
                <br />
                <button onclick="show(document.getElementById('textarea').value);return false;">Show</button>
                <div id="graph"></div>
                <script type="text/javascript">
                    var graph = new Graph(document.getElementById('graph'));
                    graph.resizeContainer = true;
                    graph.setEnabled(false);

                    function show(data)
                    {
                        var xmlDoc = mxUtils.parseXml(data);
                        var codec = new mxCodec(xmlDoc);
                        codec.decode(xmlDoc.documentElement, graph.getModel());
                    };
                </script>
            </body>
            </html>`
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
        // panel.webview.html = vsgraph.getHelloWorld();
        // TODO - full client...
        // panel.webview.html = vsgraph.getIndexHtml();
        panel.webview.html = vsgraph.getViewerHtml();


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