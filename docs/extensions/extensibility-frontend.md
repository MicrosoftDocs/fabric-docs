---
title: Fabric extensibility frontend
description: Learn how to edit files in the developer sample repo to build the frontend of a customized Fabric workload.
author: paulinbar
ms.author: painbar
ms.reviewer: muliwienrib
ms.topic: how-to
ms.custom:
ms.date: 12/25/2023
#customer intent: As a developer, I want to understand how to build the frontend of a customized Fabric workload so that I can create customized user experiences.
---

# Fabric extensibility frontend

[This Fabric developer sample](https://github.com/microsoft/Microsoft-Fabric-developer-sample.git) serves as a guide for integrating a custom UX Workload with Microsoft Fabric. This project enables developers to seamlessly integrate their own UI components and behaviors into Fabric's runtime environment, enabling rapid experimentation and customization. Developers can use the Fabric Extensibility framework to build workloads and create custom capabilities that extend the Fabric experience. The Fabric platform is designed to be interoperable with Independent Software Vendor (ISV) capabilities. For example, the item editor allows creating a native, consistent user experience by embedding ISV’s frontend in the context of a Fabric workspace item.

The UX Workload Frontend is a standard web app ([React](https://react.dev/)) that incorporates our extension client SDK, a standard NPM package, to enable its functionality.
It's hosted by the ISV and runs within an `<iframe>` in the Fabric portal. It presents ISV-specific UI experiences such as an item editor.
The SDK provides all the necessary interfaces, APIs, and bootstrap functions required to transform a regular web app into a Micro Frontend web app that operates seamlessly within the Fabric portal.

The SDK provides a sample UI that has the following features:

* Showcases the usage of most of the available SDK calls
* Demonstrates a sample of the Fluent UI-based extensible **Ribbon** that visually matches the look and feel of Fabric
* Allows easy customization* Allows you to observe changes in Fabric in real time, while in Fabric Development Mode.

## Prerequisites

* **UX Workload web app**

   This package is built on top of the [Fluent UI](https://developer.microsoft.com/fluentui#/) and is designed for [React](https://react.dev/).

* UX Workload Frontend Manifest

  The UX Workload Frontend Manifest is a JSON resource that the ISV provides. It contains essential information about the workload, such as the URL of the workload web app, and various UI details like the display name of the ISV item and associated icons. It also enables the ISV to customize what happens when users interact with their items in the Fabric portal (e.g user selects the ISV item in the workspace).

  In this package, the manifest is located in the [Frontend Manifest file](https://github.com/microsoft/Microsoft-Fabric-developer-sample/blob/main/Frontend/Manifests/localWorkloadManifest.json) and a detailed description can be found in the [frontend manifest](./frontend-manifest.md).

By combining these two components, the Fabric UX Workload enables ISVs to seamlessly integrate their web applications within the Fabric portal, providing a consistent user experience and applying Fabric features.

The following diagram depicts how Fabric uses the Manifest to read the Workload's metadata and behavior and how it embeds the Workload's Web App inside Fabric's iFrame.

:::image type="content" source="./media/extensibility-frontend/devx-diagram.png" alt-text="Diagram showing an example of how DEVX interacts with Fabric.":::``

## Step 1: Enable Workload Extensions in Fabric

The tenant administrator has to enable this feature in the Admin Portal. It can be enabled for the entire organization or for specific groups within the organization by enabling the switch 'Workload extensions (preview)'.

:::image type="content" source="./media/extensibility-frontend/tenant-switch.png" alt-text="Screenshot of the workloads extensions tenant switch.":::

## Step 2: Set up the Frontend

To get started with the Sample Project, follow these steps:

1. **Verify** that `Node.js` and `npm` are installed and that the `npm` version is at least **9** (It not, install **latest** `Node.js` and `npm`)

1. **Clone** the repository:

   ```console
   git clone https://github.com/microsoft/Microsoft-Fabric-developer-sample.git
   ```

    This is the package directory layout, with a description of the essential components and resources:

    * **docs** - SDK documentation, images
    * **Manifests** - location of the Frontend manifest file
    * **node_modules** - the sample workload is shipped with preinstalled SDK packages - under `@trident` -  as their NPM package isn't yet publically available
    * **src** - Workload code:
      * **index.ts** - main initialization file, `boostrap`-ing the `index.worker` and `index.ui` IFrames - *detailed below*
      * **App.tsx** - routing of paths to pages, for example - `/sample-workload-editor` is routed to the `SampleWorkloadEditor` function under `components`
      * **assets** - location for images(`svg`, `jpg`, `png`, ...), that can be referenced in the **Manifest** and be shown in the UI. For example, `assets/github.svg` is set in the manifest as the Product's icon.
      * **components** - location of the actual UI code - the Editor view, and other views that are used by the sample (Ribbon, Authentication page, Panel, etc.)
      * **controller** - the Controller that is calling the SDK APIs
      * **models** - the contracts and models in use by the UI itself and for communication with the boilerplate's Backend
    * **tools** -  
      * `webpack.config.js` - configuration of the local Node.js server
      * `manifest.reader.js` - reading the Manifest file

1. **Install**. Notice existing packages under `node_modules` !

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

   This starts a **local** Node.js server (using `webpack`), that Microsoft Fabric connects to when in Development Mode.

   Refer to the localhost server notes for port details that appear after it starts.
   Current port is `60006`.
   After the localhost server has been started, opening the URL: `127.0.0.1:60006/manifests` fetches the contents of the `localWorkloadManifest.json` manifest file.
   This can be done to verify that the server is up and running.

   Modifying source files triggers a reload of contents in Fabric through `webpack`, if already connected.
   However, typically, this would still necessitate a page refresh.

   If you make changes to the `localWorkloadManifest.json` manifest file, refresh the Fabric page to reload the manifest.

1. **Run**
   In Fabric - enable the Frontend Developer mode setting, allowing Fabric to access your localhost server
   This is done via Developer Settings --> Fabric Developer Mode (and a refresh of the page).
   This setting is persisted in the current browser.

   :::image type="content" source="./media/extensibility-frontend/dev-mode.png" alt-text="Product Switcher Example ImageEnable developer mode.":::

### Example of usage

To run a typical *Hello World* test scenario:

1. Start the local server and enable Dev Mode. The menu at the left bottom corner should show the new Sample Workload:

   :::image type="content" source="./media/extensibility-frontend/product-switcher.png" alt-text="Screenshot of the Product Switcher Example Image.":::

1. Select the **Sample Workload** and navigate the user to the Sample workload Home page. The upper section presents the Create Experience:

   :::image type="content" source="./media/extensibility-frontend/create-card.png" alt-text="Screenshot of the Create Card image on the sample extension home page.":::

1. Select the *Sample Workload* card to open the Sample Workload's UI within Fabric:

   :::image type="content" source="./media/extensibility-frontend/sample-editor.png" alt-text="Screenshot of the[Main Sample UI image interface.":::

Explore the various controls to see Fabric's ExtensionClient API (SDK) capabilities:

* Open Notifications and Dialogs
* Navigate to pages
* Get theme and Workload settings
* Execute Actions

Most of the available SDK functionality is either wired to the buttons' actions, or registered as callbacks. The results are usually a notification or a message box showing that an API was invoked.

Here are some examples:

* the *Execute Action* calls the `action.execute()` API with an action named *sample.Action*. The action's functionality is to show a Notification.
* Select *Save* on the Ribbon to call the `dialog.open()` API, which opens a dialog where a user provides a name and saves the item in Fabric (this is further explored in the [CRUD section](#crud-operations)).
* *Get Theme Settings* button shows a list of Fabric's Theme configurations (via the `theme.get()` API).

The Sample Workload UI is hosted in a Fabric `iframe` that we can see when we examine the page's DOM:

:::image type="content" source="./media/extensibility-frontend/iframe-dom.png" alt-text="Screenshot of the IFrame embedding image.":::

## Step 3: Dive into the code

### bootstrap()

Before bootstrapping, check if you need to close the window by checking the path. This step is needed for [authentication](#authentication) API.

```javascript
const redirectUriPath = '/close';
const url = new URL(window.location.href);
if (url.pathname?.startsWith(redirectUriPath)) {
    window.close();
}
```

Every Fabric Workload app needs to support being loaded in two modes:

* UI mode: App in UI mode is loaded in visible IFrames and listens for its own route changes to render corresponding UI components, including pages, panels, dialogs, and so on.
* Worker mode: App in worker mode runs in an invisible IFrame, which is mainly used to receive commands sent from the outside world and respond to them.
`@trident/extension-client-3p` provides a `bootstrap()` method to simplify the initialization steps. The bootstrap() method internally detects whether the current App is loaded in UI mode or worker mode, and then calls the appropriate initialization method (initializeUI vs. initializeWorker). After the initialization is complete, bootstrap() notifies Fabric micro-frontend framework of the initialization success or failure.

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
These actions can be either sent by the workload itself to Fabric, and then called-back into the `onAction` handler; or initiated by the Fabric host - for example, when clicking on *Create Sample Item - Frontend Only*, Fabric triggers the action 'open.createSampleWorkloadFrontendOnly', and the onAction handler initiates the opening of the workload main UI page, as seen in the following code.
The current workspace objectId is passed into the Frontend-only experience as well.

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

The following diagram describes how an action is invoked and handled:

:::image type="content" source="./media/extensibility-frontend/actions.png" alt-text="Diagram of actions invocation and handling.":::

### index.ui

The `initialize()` function renders the React DOM where the `App` function is embedded. We pass the `extensionClient` SDK handle which is used throughout the code to invoke the API calls.
The `FluentProvider` class is for style consistency across the various FluentUI controls in use.

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
* Handlers of the UI controls call the SampleWorkloadController functions, and pass the relevant state variables.
* In order to support the CRUD operations, the state of the created/loaded item is stored in `artifactItem`, along with `workspaceObjectId` and a sample implementation of payload variables.

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
The setup and use of the backend side is described in details in the [Fabric extensibility backend boilerplate](./extensibility-backend.md).

Once the backend is up and running, and the Fabric.WorkloadSample.SampleWorkloadArtifact type is **registered in Fabric**, you can perform CRUD operations on this type.
These operations are exposed via `ArtifactCrudAPI` inside of `ExtensionClientAPI` - [ArtifactCrud API](./node_modules/@trident/extension-client-3p/src/lib/apis/artifact-crud-api.d.ts).

#### CREATE

A sample call to `create`, as implemented when saving the workload item for the first time:

```javascript
 const params: CreateArtifactParams = {
        workspaceObjectId,
        payload: { artifactType, displayName, description, workloadPayload: JSON.stringify(workloadPayload), payloadContentType: "InlineJson", }
    };
 const result: CreateArtifactResult = await extensionClient.artifactCrud.createArtifact(params);
```

Our sample implementation is storing the created item inside of the `artifactItem`.
Notice that the item will be created under the *currently selected workspace*. This requires the workspace to be assigned to the capacity that is configured by the backend configuration, as detailed in the backend docs.
An attempt to create an item under a noncompatible workspace fails.

* The `onCreateFabricItem` callback in the backend is blocking the CREATE call - a failure there causes the operation to fail and no item is created in Fabric. See backend's debugging/TSG documentation.

* Currently, a saved item doesn't automatically appear in the workspace. and a page refresh is needed.

#### GET

When you select an existing Sample Workload item in the workspace view, Fabric navigates to the route that is defined in the Frontend manifest, under `artifacts`-->`editor`-->`path`:

```json
"artifacts": [
  {
   "name": "Fabric.WorkloadSample.SampleWorkloadArtifact",
   "editor": {
    "extension": "Fabric.WorkloadSample",
    "path": "/sample-workload-editor"
   },
```

As we invoke `artifactCrud.getArtifact`, the data is loaded from Fabric's backend (along with data from the Workload Backend), and is loaded into the `artifactItem` object of the opened GUI.

:::image type="content" source="./media/extensibility-frontend/items-in-workspace.png" alt-text="Screenshot of opening existing items in the workspace.":::

#### UPDATE

An existing item can be updated via `artifactCrud.updateArtifact` - the Workload payload itself is updated by the Workload Backend, while in Fabric only the item's "lastModifiedTime" is changed.

#### DELETE

The delete operation can be called either from Fabric's Workspace view (as a general action available for all items), or via an explicit call from the Workload to `artifactCrud.deleteArtifact`.
Both calls would end up going through the Workload backend's `onDeleteItem` callback

### Authentication

 In sample workload editor, there's a section that lets you navigate to the authentication section.
 Before you use authentication API, an Azure AD app is required to be configured the right way in Entra.
 In localWorkloadManifest.json, you need to configure your aad config under "extension":

```json
   "devAADAppConfig": {
   "appId": your app id,
   "redirectUri": "http://localhost:60006/close" // you can change this to whatever path that suits you in index.ts
   "audience": your audience
  }
```

## Step 4: Debug

Open the **Source** tab of the browser's DevTools (F12) to see the Worker and UI IFrames:

:::image type="content" source="./media/extensibility-frontend/debugging.png" alt-text="Screenshot of debugging files in VS code.":::

We can place a breakpoint both in the Worker IFrame and see the main `switch` on the incoming Action, as well as deb the UI IFrame, for example, the code inside `SampleWorkloadEditor`.

## Fluent UI controls

UX Workloads use Fluent UI controls to provide visual consistency with Fabric and ease of development. The Sample Workload provides examples of usage of the most common controls.
Additional information can be found [on the Fluent UI page](https://develop.fluentui.dev/get-started/develop).

## Frontend Manifest customization

As mentioned, the frontend manifest describes the frontend aspects of the workload - appearance of the product, names, visual assets, available actions, and is the main point of contact of Fabric with the workload.
For our sample workload, the `localWorkloadManifest.json` is the manifest that is loaded into Fabric in Developer mode, and its various sections, definitions and examples of the manifest are shown [in the frontend manifest](https://github.com/microsoft/Microsoft-Fabric-developer-sample/blob/main/Frontend/frontendManifest.md).
Changes to the manifest's entries, the wiring of different actions and updating of visual assets can be seen in real time after a page refresh.

## Extension Client SDK - supported APIs

The SDK documentation is located [in the docs section of this repo](https://github.com/microsoft/Microsoft-Fabric-developer-sample/blob/main/Frontend/docs/client-3p/index.html)
To view it, download, or clone the repo, open the `index.html` from the file system.
This opens the API documentation that can be seen in each of the SDK's files.

The following is a list of supported APIs:

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

* [Fabric extensibility overview](extensibility-overview.md)
* [Fabric extensibility backend](extensibility-backend.md)