---
title: Fabric workload development kit frontend (preview)
description: Learn how to edit files in the developer sample repo to build the frontend of a customized Fabric workload.
author: mberdugo
ms.author: monaberdugo
ms.reviewer: muliwienrib
ms.topic: how-to
ms.custom:
ms.date: 05/21/2024
#customer intent: As a developer, I want to understand how to build the frontend of a customized Fabric workload so that I can create customized user experiences.
---

# Fabric workload development kit frontend (preview)

[This Fabric developer sample](https://github.com/microsoft/Microsoft-Fabric-developer-sample.git) serves as a guide for integrating a custom UX Workload with Microsoft Fabric. This project enables developers to seamlessly integrate their own UI components and behaviors into Fabric's runtime environment, enabling rapid experimentation and customization. Developers can use the Fabric development kit's framework to build workloads and create custom capabilities that extend the Fabric experience. The Fabric platform is designed to be interoperable with Independent Software Vendor (ISV) capabilities. For example, the item editor allows creating a native, consistent user experience by embedding ISV’s frontend in the context of a Fabric workspace item.

The UX Workload Frontend is a standard web app ([React](https://react.dev/)) that incorporates our extension client SDK, a standard npm package, to enable its functionality.
The ISV hosts and runs it inside an `<iframe>` in the Fabric portal. It presents ISV-specific UI experiences such as an item editor.
The SDK provides all the necessary interfaces, APIs, and bootstrap functions required to transform a regular web app into a Micro Frontend web app that operates seamlessly within the Fabric portal.

The SDK provides a sample UI with the following features:

* Showcases the usage of most of the available SDK calls
* Demonstrates an example of the Fluent UI-based extensible **Ribbon** that matches the look and feel of Fabric
* Allows easy customization
* Allows you to observe changes in Fabric in real time, while in Fabric Development Mode

## Prerequisites

* **UX Workload web app**

   This package is built on top of the [Fluent UI](https://developer.microsoft.com/fluentui#/) and is designed for [React](https://react.dev/).

* **UX Workload Frontend Manifest**

   The UX Workload Frontend Manifest is a JSON resource that the ISV provides. It contains essential information about the workload, such as the URL of the workload web app, and various UI details like the display name of the ISV item and associated icons. It also enables the ISV to customize what happens when users interact with their items in the Fabric portal.

   In this package, the manifest is located in the [Frontend Manifest file](https://github.com/microsoft/Microsoft-Fabric-developer-sample/blob/main/Frontend/Manifests/localWorkloadManifest.json) and a detailed description can be found in the frontend manifest file.

<!--
The following diagram shows how Fabric uses the Manifest to read the workload's metadata and behavior and how it embeds the workload's web app inside Fabric's iFrame.

:::image type="content" source="./media/extensibility-front-end/devx-diagram.png" alt-text="Diagram showing an example of how DEVX interacts with Fabric.":::``

-->

## Step 1: Enable Workload Extensions in Fabric

The tenant administrator has to enable the workload development feature in the Admin Portal. It can be enabled for the entire organization or for specific groups within the organization by enabling the tenant switch *Capacity admins can develop additional workloads*.

:::image type="content" source="./media/extensibility-front-end/tenant-switch.png" alt-text="Screenshot of the workloads extensions tenant switch.":::

## Step 2: Set up the frontend

To set up the front end of the sample project, follow these steps:

1. **Verify** that `Node.js` and `npm` are installed and that the `npm` version is at least **9** (If not, install **latest** `Node.js` and `npm`)

1. **Clone** the repository: Clone the repository found here: https://go.microsoft.com/fwlink/?linkid=2272254 

    <a name="package-structure"></a>
    This is the package directory layout, with a description of the essential components and resources:

    * **docs** - SDK documentation, images
    * **Manifests** - location of the frontend manifest file
    * **node_modules** - the sample workload is shipped with preinstalled SDK packages - under `@trident` -  as their npm package isn't yet publically available
    * **src** - Workload code:
      * **index.ts** - main initialization file, `boostrap` the `index.worker` and `index.ui` iFrames - *detailed below*
      * **App.tsx** - routing of paths to pages, for example - `/sample-workload-editor` is routed to the `SampleWorkloadEditor` function under `components`
      * **assets** - location for images(`svg`, `jpg`, `png`, etc.), that can be referenced in the **Manifest** and be shown in the UI. For example, `assets/github.svg` is set in the manifest as the Product's icon.
      * **components** - location of the actual UI code - the Editor view, and other views that are used by the sample (Ribbon, Authentication page, Panel, etc.)
      * **controller** - the Controller that calls the SDK APIs
      * **models** - the contracts and models used by the UI itself and for communication with the boilerplate's backend
    * **tools** -  
      * `webpack.config.js` - configuration of the local Node.js server
      * `manifest.reader.js` - reading the manifest file

1. **Install**. Notice the existing packages under `node_modules`

    Under the repository folder, go to `Frontend` and run **npm install**  

   ```console
   <repository folder>\Frontend> npm install
    ```

    > [!NOTE]
    >The repository provides packages under ***node_modules/@trident***. These packages aren't yet available on public npm feeds, so deleting them renders the repo unusable. If there are issues with the npm install (when merging mismatching versions, etc.), delete everything under `node_modules` **except** for the `@trident` folder, and delete the `package-lock.json` file, before rerunning **npm install**.

1. **Start server**

   ```console
   <repository folder>\Frontend> npm start
   ```

   This command starts a **local** Node.js server (using `webpack`), that Microsoft Fabric connects to when in Development Mode.

   Refer to the localhost server notes for port details that appear after it starts.
   The current port is `60006`.
   After the localhost server starts, opening the URL: `127.0.0.1:60006/manifests` fetches the contents of the `localWorkloadManifest.json` manifest file.
   Open it to verify that the server is up and running.

   Modifying source files triggers a reload of contents in Fabric through `webpack`, if it's already connected.
   However, typically, you would still need to refresh the page.

   If you change the `localWorkloadManifest.json` manifest file, refresh the Fabric page to reload the manifest.

1. **Run**
   In Fabric, enable the Frontend Developer mode setting, to allow Fabric to access your localhost server.
   Go to **Developer Settings** --> **Fabric Developer Mode** and refresh of the page.
   This setting is persisted in the current browser.

   :::image type="content" source="./media/extensibility-front-end/developer-mode.png" alt-text="Screenshot of a product switcher example in developer mode.":::

### Example of usage

To run a typical *Hello World* test scenario:

1. Start the local server and enable *Dev Mode*. The menu at the left bottom corner should show the new Sample Workload:

   :::image type="content" source="./media/extensibility-front-end/product-switcher.png" alt-text="Screenshot of the Product Switcher Example Image.":::

1. Select the **Sample Workload** and navigate the user to the Sample workload Home page. The upper section presents the *Create* Experience:

   :::image type="content" source="./media/extensibility-front-end/create-card.png" alt-text="Screenshot of the Create Card image on the sample extension home page.":::

1. Select the *Sample Workload* card to open the Sample Workload's UI within Fabric:

   :::image type="content" source="./media/extensibility-front-end/sample-editor.png" alt-text="Screenshot of the[Main Sample UI image interface.":::

Explore the various controls to see Fabric's ExtensionClient API (SDK) capabilities:

* Open Notifications and Dialogs
* Navigate to pages
* Get theme and Workload settings
* Execute Actions

Most of the available SDK functionality is either wired to the button actions, or registered as callbacks. The results are usually a notification or a message box showing that an API was invoked.

For example:

* The *Execute Action* calls the `action.execute()` API with an action named *sample.Action*. The action's functionality is to show a notification.
* Select *Save* on the Ribbon to call the `dialog.open()` API, which opens a dialog where a user provides a name and saves the item in Fabric (this dialog is further explored in the [CRUD section](#crud-operations)).
* *Get Theme Settings* button shows a list of Fabric's theme configurations (via the `theme.get()` API).

The Sample Workload UI is hosted in a Fabric `iframe` that we can see when we examine the page's DOM:

:::image type="content" source="./media/extensibility-front-end/iframe-dom.png" alt-text="Screenshot of the iFrame embedding image.":::

## Step 3: Dive into the code

### bootstrap()

Before bootstrapping, check the path to see if you need to close the window. This step is needed for [authentication](#authentication) API.

```javascript
const redirectUriPath = '/close';
const url = new URL(window.location.href);
if (url.pathname?.startsWith(redirectUriPath)) {
    window.close();
}
```

Every Fabric Workload app needs to support being loaded in two modes:

* **UI mode**: Am app in UI mode is loaded in visible iFrames and listens for its own route changes to render corresponding UI components, including pages, panels, dialogs, and so on.
* **Worker mode**: An app in worker mode runs in an invisible iFrame, which is primarily used to receive commands sent from the outside world and respond to them.
`@trident/extension-client-3p` provides a `bootstrap()` method to simplify the initialization steps. The bootstrap() method internally detects whether the current app is loaded in UI mode or worker mode, and then calls the appropriate initialization method (initializeUI or initializeWorker). After the initialization is complete, bootstrap() notifies Fabric micro-frontend framework of the initialization success or failure.

```javascript
bootstrap({
    initializeWorker: (params) =>
        import('./index.worker').then(({ initialize }) => initialize(params)),
    initializeUI: (params) =>
        import('./index.ui').then(({ initialize }) => initialize(params)),
});
```

### index.worker

This is the main `onAction` registration. It handles events sent from the Fabric host, which are themselves triggered by executed *actions*.
These actions can be sent either by the workload itself to Fabric, and then called-back into the `onAction` handler, or they can be initiated by the Fabric host. For example, when clicking on *Create Sample Item - Frontend Only*, Fabric triggers the action 'open.createSampleWorkloadFrontendOnly', and the onAction handler initiates the opening of the workload main UI page, as seen in the following code.
The current workspace `objectId` is passed into the frontend-only experience as well.

```javascript
   extensionClient.action.onAction((message) => {
        switch (message.action) {
            /**
             * This opens the Frontend-only experience, allowing to experiment with the UI without the need for CRUD operations.
             * This experience still allows saving the item, if the Backend is connected and registered
             */
            case 'open.createSampleWorkloadFrontendOnly':
                const { workspaceObjectId: workspaceObjectId1 } = data as ArtifactCreateContext;
                return extensionClient.page.open({
                    extensionName: 'Fabric.WorkloadSample',
                    route: {
                        path: `/sample-workload-frontend-only/${workspaceObjectId1}`,
                    },
                });

                // ... elided for brevity...
            default:
                throw new Error('Unknown action received');
        }
    });
```

<!--
The following diagram describes how an action is invoked and handled:

:::image type="content" source="./media/extensibility-front-end/actions.png" alt-text="Diagram of actions invocation and handling.":::
-->

### index.ui

The `initialize()` function renders the React DOM where the `App` function is embedded. To invoke the API calls, pass the `extensionClient` SDK handle, which is used throughout the code.
The `FluentProvider` class ensures style consistency across the various FluentUI controls.

 ```react
 ReactDOM.render(
        <FluentProvider theme={fabricLightTheme}>
            <App
                history={history}
                extensionClient={extensionClient}
            />
        </FluentProvider>,
        document.querySelector("#root")
    );
 ```

### Development flow

* `App` routes the code into the `SampleWorkloadEditor`, which is a **function** returning a `React.JSX.Element`.
* The function contains the UI structure (the Ribbon and the controls on the page - buttons, input fields, etc.).
* Information collected from the user is stored via React's `useState()`
* Handlers of the UI controls call the SampleWorkloadController functions and pass the relevant state variables.
* To support the CRUD operations, the state of the created/loaded item is stored in `artifactItem` along with `workspaceObjectId` and a sample implementation of payload variables.

An example with `notification.open()` API:

* state:

   ```javascript
      const [apiNotificationTitle, setNotificationTitle] = useState<string>('');
      const [apiNotificationMessage, setNotificationMessage] = useState<string>('');
   ```

* UI:

  * Title:
  
     ```javascript
     <Field label="Title" validationMessage={notificationValidationMessage} orientation="horizontal" className="field">
         <Input size="small" placeholder="Notification Title" onChange={e => setNotificationTitle(e.target.value)} />
       </Field>
    ```

  * Send Button:

     ```javascript
      <Button icon={<AlertOn24Regular />} appearance="primary" onClick={() => onCallNotification()} > Send Notification </Button>
     ```

  * Handler:

     ```javascript
      function onCallNotification() {
       ... elided for brevity
        callNotificationOpen(apiNotificationTitle, apiNotificationMessage, undefined, undefined, extensionClient, setNotificationId);
      };
     ```

* Controller:

     ```javascript
       export async function callNotificationOpen(
         title: string,
         message: string,
         type: NotificationType = NotificationType.Success,
         duration: NotificationToastDuration = NotificationToastDuration.Medium,
         extensionClient: ExtensionClientAPI,
         setNotificationId?: Dispatch<SetStateAction<string>>) {

         const result = await extensionClient.notification.open({
             notificationType: type,
             title,
             duration,
             message
         });
         if (type == NotificationType.Success && setNotificationId) {
             setNotificationId(result?.notificationId);
         }
     }
     ```

### CRUD operations

While a frontend-only development scenario is easily supported, the full end-to-end developer experience requires saving, reading, and editing existing workload items.
The [Back-end implementation guide](extensibility-back-end.md) describes in detail how to set up and use the backend side.

Once the backend is up and running, and the `Org.WorkloadSample.SampleWorkloadItem` type is **registered in Fabric**, you can perform CRUD operations on this type.
The following operations are exposed via [ArtifactCrud API](/javascript/api/@ms-fabric/workload-client/artifactcrudapi).

#### CREATE

A sample call to `create`, as implemented when saving the workload item for the first time:

```javascript
 const params: CreateArtifactParams = {
        workspaceObjectId,
        payload: { artifactType, displayName, description, workloadPayload: JSON.stringify(workloadPayload), payloadContentType: "InlineJson", }
    };
 const result: CreateArtifactResult = await extensionClient.artifactCrud.createArtifact(params);
```

Our sample implementation stores the created item inside the `artifactItem`.
The item is created under the *currently selected workspace*. Therefore the workspace must be assigned to the capacity that is configured by the backend configuration, as detailed in the backend docs.
Any attempt to create an item under a noncompatible workspace fails.

* The `onCreateFabricItem` callback in the backend blocks the *CREATE* call - a failure there causes the operation to fail and no item is created in Fabric. See backend's debugging/TSG documentation.

* Currently, a saved item doesn't automatically appear in the workspace. A page refresh is needed.

#### GET

When you select an existing Sample Workload item in the workspace view, Fabric navigates to the route that is defined in the Frontend manifest, under `artifacts`-->`editor`-->`path`:

```json
"artifacts": [
  {
   "name": "Org.WorkloadSample.SampleWorkloadItem",
   "editor": {
    "extension": "Fabric.WorkloadSample",
    "path": "/sample-workload-editor"
   },
```

When you invoke `artifactCrud.getArtifact`, data is loaded from Fabric's backend, along with data from the Workload backend, and is loaded into the `artifactItem` object of the opened GUI.

:::image type="content" source="./media/extensibility-front-end/items-in-workspace.png" alt-text="Screenshot of opening existing items in the workspace.":::

#### UPDATE

Updated an existing item with `artifactCrud.updateArtifact`. The Workload payload itself is updated by the Workload backend, while in Fabric only the item's `lastModifiedTime` is changed.

#### DELETE

Call the *delete* operation either from Fabric's Workspace view (as a general action available for all items), or via an explicit call from the Workload to `artifactCrud.deleteArtifact`.
Both calls go through the Workload backend's `onDeleteItem` callback.

### Authentication

 In the sample workload editor, there's a section that lets you navigate to the authentication section.
 Before you use authentication API, configure an Entra app Microsoft Entra ID.
 In localWorkloadManifest.json, configure your Entra config under "extension":

```json
   "devAADAppConfig": {
   "appId": your app id,
   "redirectUri": "http://localhost:60006/close" // you can change this to whatever path that suits you in index.ts
   "audience": your audience
  }
```

## Step 4: Debug

To see the Worker and UI iFrames, open the **Source** tab of the browser's DevTools (<kbd>F12</kbd>).

:::image type="content" source="./media/extensibility-front-end/debugging.png" alt-text="Screenshot of debugging files in VS Code.":::

You can place a breakpoint both in the Worker iFrame and see the main `switch` on the incoming Action. You can also debug the UI iFrame, for example, the code inside `SampleWorkloadEditor`.

## Fluent UI controls

UX Workloads use Fluent UI controls for visual consistency with Fabric and ease of development. The Sample Workload provides examples of how to use the most common controls.
More information can be found [on the Fluent UI page](https://develop.fluentui.dev/get-started/develop).

## Frontend Manifest customization

The frontend manifest describes the frontend aspects of the workload - product appearance, names, visual assets, available actions, and more. It's the main point of contact between Fabric and the workload.
For our sample workload, the `localWorkloadManifest.json` manifest is loaded into Fabric in Developer mode, and its various sections, definitions and examples of the manifest are shown [in the frontend manifest](https://github.com/microsoft/Microsoft-Fabric-developer-sample/blob/main/Frontend/frontendManifest.md).
Changes to the manifest's entries, the wiring of different actions and updating of visual assets are seen in real time after a page refresh.

## Client SDK - supported APIs

The SDK documentation is located [in the docs section of the Fabric developer sample repo](https://github.com/microsoft/Microsoft-Fabric-developer-sample/blob/main/Frontend/docs/client-3p/index.html).
To view it, download, or clone the repo, open the `index.html` from the file system.
This opens the API documentation that you can see in each of the SDK's files.

The following APIs are supported:

* notification.open
* notification.hide
* panel.open
* panel.close
* action.onAction
* action.execute
* navigation.navigate
* navigation.onNavigate
* navigation.onBeforeNavigateAway
* navigation.onAfterNavigateAway
* page.open
* dialog.openDialog
* dialog.openMessageBox
* dialog.close
* theme.get
* theme.onChange
* settings.get
* settings.onChange
* errorHandling.openErrorDialog
* errorHandling.handleRequestFailure
* artifactCrud.createArtifact
* artifactCrud.getArtifact
* artifactCrud.updateArtifact
* artifactCrud.deleteArtifact
* artifactSchedule.runArtifactJob
* artifactSchedule.cancelArtifactJob
* artifactRecentRuns.open

## Related content

* [Development kit overview](development-kit-overview.md)

* [Backend configuration guide](extensibility-back-end.md)
