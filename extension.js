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
                // Only allow the webview to access resources in our extension's vscode-resource directory
                localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath, 'vscode-resource'))]
            }
        )
       
        // Get path to resource on disk
        const onDiskPath = vscode.Uri.file(path.join(context.extensionPath, 'vscode-resource', 'cat.gif'));

        // And get the special URI to use with the webview
        const catGifSrc = onDiskPath.with({ scheme: 'vscode-resource' });

        // panel.webview.html = getWebviewContent(catGifSrc);
        panel.webview.html = vsgraph.getWebviewContent(catGifSrc);
        console.log(catGifSrc);

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