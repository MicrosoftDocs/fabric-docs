---
title: Set up Microsoft Fabric Embed for Real-Time Dashboard items
description: Set up Microsoft Fabric Embed by preparing a workspace assigned to a Microsoft Fabric capacity, Real-Time Dashboard item, Microsoft Entra ID app, and local development tools.
author: billmath
ms.author: billmath
ms.date: 07/01/2026
ms.topic: how-to
ms.service: fabric
ms.custom: doc-kit-assisted
ai-usage: ai-assisted
---

# Set up Microsoft Fabric Embed for Real-Time Dashboard items

Set up Microsoft Fabric Embed before you embed a Real-Time Dashboard item in a JavaScript or TypeScript web application. You should have a workspace assigned to a Microsoft Fabric capacity, user access to the Real-Time Dashboard item, a Microsoft Entra ID app registration with delegated permissions, and local development tools.

Microsoft Fabric Embed is a public-preview capability for embedding supported Microsoft Fabric items.

> [!NOTE]
> Microsoft Fabric Embed is in public preview. For supported item types, authentication, and preview-contract limitations, see [Limitations for Microsoft Fabric Embed](what-is-fabric-embed.md#limitations-for-microsoft-fabric-embed).

## Prerequisites for Microsoft Fabric Embed setup

For a list of prerequisites, see [What do I need to use Microsoft Fabric Embed?](what-is-fabric-embed.md#what-do-i-need-to-use-microsoft-fabric-embed)

## Configure your Fabric workspace

Microsoft Fabric Embed supports delegated user access. The signed-in Microsoft Entra ID user must be able to open the Real-Time Dashboard item in Microsoft Fabric before the same item can render in an embedded application.

1. Open [Microsoft Fabric](https://app.fabric.microsoft.com).
2. Open the workspace that contains the Real-Time Dashboard item.
3. Confirm that the workspace is assigned to an active Microsoft Fabric capacity.
4. Confirm that users who view the embedded Real-Time Dashboard item have Viewer or higher access to the workspace and the Real-Time Dashboard item.

Success check: the workspace shows an active capacity assignment, and the user can open the Real-Time Dashboard item directly in the Microsoft Fabric portal.

   :::image type="content" source="media/set-up-fabric-embed-environment/environment-1.png" alt-text="Screenshot of a workspace with a Real-Time Dashboard.":::

>[!IMPORTANT]
>If a signed-in user doesn't have access to the workspace or Real-Time Dashboard item in Microsoft Fabric, Microsoft Fabric Embed doesn't render the item in the embedded application.

## Register a Microsoft Entra ID app for user sign-in

Your JavaScript or TypeScript application needs a Microsoft Entra ID app registration to sign in users and request delegated access tokens for Microsoft Fabric Embed.

1. Sign in to the [Azure portal](https://portal.azure.com).
1. Select your Microsoft Entra tenant by selecting your account in the upper-right corner of the page.
1. Select **App registrations**. If you don't see this option, search for it.
1. In *App registrations*, select **New registration**.
1. Fill in the following fields:

   * **Name** - Give your application a name.
   * **Supported account type** - Select who can use the application. Select *Accounts in this organizational directory only* for single tenant apps, or *Accounts in any organizational directory* for cross-tenant scenarios.

1. (Optional) In the **Redirect URI** box, add a redirect URL.
1. Select **Register**. After your app is registered, you're directed to your app's overview page, where you can obtain the **Application ID**. Copy and save the **Application ID** and all information in the **Summary** box for later use. Your Microsoft Fabric Embed environment is ready to use.
   :::image type="content" source="media/set-up-fabric-embed-environment/environment-2.png" alt-text="Screenshot of the new app registration in Entra ID.":::

Success check: the app registration overview shows the client ID and tenant ID that your application uses for Microsoft Authentication Library (MSAL) authentication.

>[!NOTE]
>Keep these values available. You use them when you configure authentication in your application.

## Add delegated API permissions for Microsoft Fabric Embed

Your app must request delegated API permissions for Fabric embedding, item read access, and optional workspace discovery. Use delegated user permissions for Microsoft Fabric Embed.

1. In your app registration, open **API permissions**.
1. Select **Add a permission**.
1. Add the delegated permissions that match your scenario.
1. If your organization requires admin consent, ask a tenant admin to grant consent.

   :::image type="content" source="media/set-up-fabric-embed-environment/environment-3.png" alt-text="Screenshot of the API permissions.":::

>[!NOTE]
>Request the least-privileged delegated permissions for your scenario:

| Permission | When to use it | Purpose |
|---|---|---|
| **`Fabric.Embed`** | Required for Microsoft Fabric Embed. | Allows your application to embed supported Microsoft Fabric items. |
| **`KQLDashboard.Read.All`** | Preferred read permission for Real-Time Dashboard items. | Allows your application to read Real-Time Dashboard items that the signed-in user can access. |
| **`Item.Read.All`** | Use only if your scenario requires broader Fabric item read access. | Allows your application to read Fabric items that the signed-in user can access. |
| **`Workspace.Read.All`** | Required only when your application uses Microsoft Fabric REST APIs to discover workspace or item IDs. | Allows read-only workspace discovery for the signed-in user. |

Success check: the app registration includes `Fabric.Embed`, one item read permission, and `Workspace.Read.All` only if your application uses Microsoft Fabric REST APIs to discover IDs.

## Install local development tools for your web app

Install these tools and libraries for the JavaScript or TypeScript application that hosts the embedded Real-Time Dashboard item:

- [Node.js](https://nodejs.org/) and npm for installing the Fabric Embed SDK package
- A code editor, such as [Visual Studio Code](https://code.visualstudio.com/)
- The [Microsoft Authentication Library (MSAL) for JavaScript](/entra/msal/javascript/) for Microsoft Entra ID authentication

## Install the Fabric Embed SDK package in your web app

Install the public-preview [Fabric Embed SDK](https://aka.ms/fabric-embed/sdk) package in the web application that hosts the embedded Real-Time Dashboard item. The package name and version might change during preview. Use the package name that your preview release provides.

```bash
npm install @microsoft/fabric-embed
```

Success check: the Fabric Embed SDK package appears in your application's `package.json` dependencies.



## Collect workspace and Real-Time Dashboard IDs 

You can also collect the workspace ID and Real-Time Dashboard item ID programmatically by using Microsoft Fabric REST APIs. Use Microsoft Fabric REST APIs when your setup script or application needs to discover IDs instead of copying them from the Microsoft Fabric portal.

1. Get the workspace ID with the [List Workspaces API](/rest/api/fabric/core/workspaces/list-workspaces):

   ```http
   GET https://api.fabric.microsoft.com/v1/workspaces
   ```

   Find the workspace by its `displayName` and copy its `id` value.

1. Get the Real-Time Dashboard item ID with the [List Items API](/rest/api/fabric/core/items/list-items):

   ```http
   GET https://api.fabric.microsoft.com/v1/workspaces/<workspaceId>/items?type=KQLDashboard
   ```

   Replace `<workspaceId>` with the workspace ID from the previous step. In the response, find the Real-Time Dashboard item by its `displayName`, and copy its `id` value. Use that value as the item ID in your embed configuration.

>[!NOTE]
>In the Microsoft Fabric REST API, the item type value for a Real-Time Dashboard item is `KQLDashboard`.

Optionally, validate the item ID by calling:

```http
GET https://api.fabric.microsoft.com/v1/workspaces/<workspaceId>/items/<itemId>
```

Use the [Get Item API](/rest/api/fabric/core/items/get-item) to confirm that the workspace ID and item ID identify the expected Real-Time Dashboard item.

Success check: the List Items response includes the expected dashboard `displayName`, an `id` value for the item ID, and the item type value `KqlDashboard`.



## Next steps

- [What is Microsoft Fabric Embed?](what-is-fabric-embed.md)
- [Quickstart: Embed a Fabric item with Microsoft Fabric Embed](quickstart-embed-fabric-item.md)
- [Register an application in Microsoft Entra ID](/entra/identity-platform/quickstart-register-app)
- [What is Real-Time Intelligence in Microsoft Fabric?](/fabric/real-time-intelligence/overview)
