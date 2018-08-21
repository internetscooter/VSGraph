//VS Code extensibility API
const vscode = require('vscode'); 
const path = require('path');

class VSGraph {
    constructor() {
        this.name = "VSGraph";
        this.viewType = "VSGraph";
        this.viewTitle = "VSGraph";
    }
    getWebviewContent(catGif) {
        return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Cat Coding</title>
    </head>
    <body>
        <p>Insert graph here!</p>
    </body>
    </html>`;
    }
    getHelloWorld(msClient){
        return `
        <!--
          Copyright (c) 2006-2018, JGraph Ltd
          
          Hello, World! example for mxGraph. This example demonstrates using
          a DOM node to create a graph and adding vertices and edges.
        -->
        <html>
        <head>
            <title>Hello, World! example for mxGraph</title>
        
            <!-- Sets the basepath for the library if not in same directory -->
            <script type="text/javascript">
                mxBasePath = '../src';
            </script>
        
            <!-- Loads and initializes the library -->
            <script type="text/javascript" src="${mxClientSrc}"></script>
        
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
                style="position:relative;overflow:hidden;width:321px;height:241px;background:url('editors/images/grid.gif');cursor:default;">
            </div>
        </body>
        </html>`;
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


        // Get path to resource on disk
        //const onDiskPath = vscode.Uri.file(path.join(context.extensionPath, 'vscode-resource', 'cat.gif'));
        const onDiskPathmxClient = vscode.Uri.file(path.join(context.extensionPath, 'vscode-resource', 'mxClient.js'));

        // And get the special URI to use with the webview
        //const catGifSrc = onDiskPath.with({ scheme: 'vscode-resource' });
        const mxClientSrc = onDiskPathmxClient.with({ scheme: 'vscode-resource' });
        console.log(mxClientSrc);
        // panel.webview.html = getWebviewContent(catGifSrc);
        //panel.webview.html = vsgraph.getWebviewContent(catGifSrc);

        panel.webview.html = vsgraph.getHelloWorld(mxClientSrc)


        // Display a message box to the user
        vscode.window.showInformationMessage('Hello Graphs! Not!');

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