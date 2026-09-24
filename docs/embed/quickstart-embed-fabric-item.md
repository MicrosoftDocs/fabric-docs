---
title: "Quickstart: Embed a Real-Time Dashboard with Microsoft Fabric Embed"
description: "Microsoft Fabric Embed quickstart: Embed a Real-Time Dashboard in a web app by using delegated Microsoft Entra authentication and the Fabric Embed SDK."
author: billmath
ms.author: billmath
ms.date: 07/01/2026
ms.topic: quickstart
ms.service: fabric
ms.custom: doc-kit-assisted
ai-usage: ai-generated
---

# Quickstart to Microsoft Fabric Embed

In this Quickstart, you use Fabric Embed to add a Microsoft Fabric Real-Time Dashboard to a browser-based JavaScript or TypeScript web app. By using Fabric Embed, your app can show the dashboard while users access it by using their Microsoft Entra ID identity and delegated permissions.

The app uses the Microsoft Authentication Library for JavaScript (MSAL.js) to request a delegated access token for the Microsoft Fabric API resource and the Fabric Embed SDK to render the dashboard. When you finish, your app displays the Real-Time Dashboard without sending users to the Fabric portal.

## Prerequisites for embedding a Real-Time Dashboard

Before you start, complete [Set up your environment for Microsoft Fabric Embed](set-up-fabric-embed-environment.md). That setup creates or confirms the Microsoft Entra app registration, delegated permissions, Microsoft Fabric workspace, active Fabric capacity, and dashboard values that this quickstart uses.

You also need the following values and permissions.

| Requirement | Description |
|---|---|
| **Web app project** | A browser-based JavaScript or TypeScript app that uses npm. The embed code in this quickstart runs client-side. |
| **Microsoft Entra app registration client ID** | The client ID for the app registration that signs in users by using MSAL.js. |
| **Microsoft Entra tenant ID** | The tenant ID where the app registration and Fabric users are configured. |
| **Delegated API permissions** | Delegated consent for `Fabric.Embed` and `Item.Read.All`. The MSAL token request uses the Fabric `.default` scope to request these consented permissions. |
| **Workspace ID** | The Microsoft Fabric workspace ID that contains the Real-Time Dashboard and is assigned to an active Fabric capacity. |
| **Real-Time Dashboard item ID** | The Microsoft Fabric item ID for the Real-Time Dashboard that you want to embed. |
| **User access** | The signed-in user can open the Real-Time Dashboard in Fabric. The embedded dashboard uses that user's delegated permissions. |

> [!NOTE]
> Microsoft Fabric Embed is in public preview. For supported item types and authentication limitations, see [Limitations for Microsoft Fabric Embed](what-is-fabric-embed.md#limitations-for-microsoft-fabric-embed).

## Install MSAL.js and the Fabric embed SDK

From your web app project folder, install the client-side packages this quickstart uses.

```bash
npm install @azure/msal-browser @microsoft/fabric-embed
```

If your preview onboarding instructions provide a version-specific Fabric Embed SDK package command, use that command for the `@microsoft/fabric-embed` package. After installation, confirm that `package.json` lists `@azure/msal-browser` and `@microsoft/fabric-embed` in `dependencies`.

## Configure Microsoft Entra authentication for Microsoft Fabric Embed

MSAL.js (`@azure/msal-browser`) signs in the user and acquires a delegated access token from the Microsoft identity platform for `https://api.fabric.microsoft.com`. The `.default` scope asks Microsoft Entra ID for delegated Fabric permissions that you already consented to for the app registration, including `Fabric.Embed` and `Item.Read.All`.

For more information, see [Microsoft Authentication Library (MSAL) overview](/entra/identity-platform/msal-overview).

Add this code to your app's client-side authentication file or module before the embed code calls `getAccessToken()`.

```typescript
import {
  AuthenticationResult,
  InteractionRequiredAuthError,
  PublicClientApplication,
} from "@azure/msal-browser";

const msal = new PublicClientApplication({
  auth: {
    clientId: "<client-id>",
    authority: "https://login.microsoftonline.com/<tenant-id>",
    redirectUri: window.location.origin,
  },
});

const defaultScopes = ["https://api.fabric.microsoft.com/.default"];

async function getAccessToken(requestedScopes?: string[]): Promise<string> {
  const scopes = requestedScopes ?? defaultScopes;
  let accounts = msal.getAllAccounts();

  if (accounts.length === 0) {
    await msal.loginPopup({ scopes });
    accounts = msal.getAllAccounts();
  }

  const account = accounts[0];
  if (!account) {
    throw new Error("No Microsoft Entra account is signed in.");
  }

  let result: AuthenticationResult;

  try {
    result = await msal.acquireTokenSilent({ scopes, account });
  } catch (error) {
    if (error instanceof InteractionRequiredAuthError) {
      result = await msal.acquireTokenPopup({ scopes, account });
    } else {
      throw error;
    }
  }

  return result.accessToken;
}
```

Replace `<client-id>` and `<tenant-id>`, including the angle brackets, with the values from your Microsoft Entra app registration. The `getAccessToken()` function returns a delegated Microsoft Fabric access token for the signed-in Microsoft Entra user or throws an error if no user has signed in.

## Add an HTML container for the embedded Real-Time Dashboard

Add an HTML element where the Fabric Embed SDK renders the Microsoft Fabric Real-Time Dashboard. The `id` value must match the container lookup in the embed code. The `role` and `aria-label` identify the embedded dashboard region for screen-reader users.

```html
<div
  id="fabric-embed-container"
  role="region"
  aria-label="Embedded Fabric Real-Time Dashboard"
></div>
```

## Configure an access token provider for Fabric embed SDK token refresh

Configure the access token provider that the Fabric Embed SDK uses to refresh delegated Microsoft Fabric access tokens for the embedded Real-Time Dashboard. The following example implements `accessTokenProvider` by using the `getAccessToken()` function.

```typescript
const accessTokenProvider = {
  callback: async (input?: { scopes?: string[] }) => {
    const token = await getAccessToken(input?.scopes);
    return { token };
  },
};
```

## Embed the Real-Time Dashboard with the Fabric embed SDK

Use the Fabric Embed SDK to render the Microsoft Fabric Real-Time Dashboard in the HTML container. The public-preview SDK types in this sample use `KQLDashboard*` names for Real-Time Dashboard embedding.

The embed configuration uses these values.

| Configuration field | Value |
|---|---|
| **`itemId`** | The Real-Time Dashboard item ID from the prerequisites. |
| **`workspaceId`** | The Microsoft Fabric workspace ID from the prerequisites. |
| **`accessToken`** | The delegated Microsoft Fabric access token returned by `getAccessToken()`. |
| **`accessTokenProvider`** | The callback that refreshes delegated tokens for the embedded dashboard. |
| **`viewMode`** | `KQLDashboardViewMode.View`, which renders the dashboard for viewing. |

```typescript
import {
  EmbedManager,
  KQLDashboardEmbedClient,
  KQLDashboardViewMode,
  KQLDashboardEmbedConfiguration,
} from "@microsoft/fabric-embed";

const embedManager = new EmbedManager({
  embedClientClasses: [KQLDashboardEmbedClient],
});

async function embedDashboard() {
  const container = document.getElementById("fabric-embed-container");

  if (!container) {
    throw new Error("The Fabric embed container was not found.");
  }

  const token = await getAccessToken();

  const embedConfig: KQLDashboardEmbedConfiguration = {
    accessToken: { token },
    itemId: "<real-time-dashboard-item-id>",
    itemType: "KQLDashboard",
    workspaceId: "<workspace-id>",
    viewMode: KQLDashboardViewMode.View,
    eventHooks: { accessTokenProvider },
  };

  const client: KQLDashboardEmbedClient = embedManager.embed(container, embedConfig);

  client.on("rendered", () => {
    console.log("Real-Time Dashboard rendered.");
  });

  client.on("error", (error: unknown) => {
    console.error("Microsoft Fabric Embed error:", error);
  });
}

embedDashboard();
```

Replace `<real-time-dashboard-item-id>` and `<workspace-id>`, including the angle brackets, with your Fabric item and workspace IDs.

When the code runs, the SDK renders the Real-Time Dashboard in the container and writes `Real-Time Dashboard rendered.` to the browser console.

> [!IMPORTANT]
> The SDK type names in this article use public-preview terminology. If your installed preview package uses different type names, use the names from that package version. For other preview-contract caveats, see [Limitations for Microsoft Fabric Embed](what-is-fabric-embed.md#limitations-for-microsoft-fabric-embed).

## Verify the Microsoft Fabric Embed Real-Time Dashboard

The SDK embeds the dashboard successfully when it appears in the `fabric-embed-container` region and the browser console logs `Real-Time Dashboard rendered.`.

If the dashboard doesn't render, use the SDK `error` event details and check these items.

| Check | What to verify |
|---|---|
| **User access** | The signed-in Microsoft Entra user can open the Real-Time Dashboard in Fabric. |
| **Capacity** | The workspace that contains the Real-Time Dashboard is assigned to an active Fabric capacity. |
| **Redirect URI** | The Microsoft Entra app registration includes the redirect URI for your web app. |
| **Delegated permissions** | The app registration has delegated consent for `Fabric.Embed` and `Item.Read.All`(or `KQLDashboard.Read.All`), and the token request uses the Fabric `.default` scope. |
| **Identifiers** | The workspace ID and Real-Time Dashboard item ID match the Fabric content you want to embed. |
| **HTML container** | The `fabric-embed-container` element exists, has an accessible name, and remains reachable by keyboard in your app layout. |
| **SDK error handling** | Your app handles the Fabric Embed SDK `error` event and logs the error details. |

## Next steps

- [What is Microsoft Fabric Embed?](what-is-fabric-embed.md)
- [Set up your environment for Microsoft Fabric Embed](set-up-fabric-embed-environment.md)
- [Register an application in Microsoft Entra ID](/entra/identity-platform/quickstart-register-app)
- [What is Real-Time Intelligence in Microsoft Fabric?](/fabric/real-time-intelligence/overview)