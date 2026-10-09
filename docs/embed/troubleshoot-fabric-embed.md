---
title: Troubleshoot Microsoft Fabric Embed (preview)
description: Diagnose and resolve common Microsoft Fabric Embed issues, including a Real-Time Dashboard that doesn't render, authentication and token errors, permission and consent problems, and unsupported preview scenarios.
author: billmath
ms.author: billmath
ms.topic: troubleshooting
ms.date: 07/01/2026
ms.service: fabric
ms.custom: doc-kit-assisted
ai-usage: ai-assisted
#customer intent: As an app developer, I want to troubleshoot Microsoft Fabric Embed so that I can resolve embedding, authentication, and permission errors in my web application.
---

# Troubleshoot Microsoft Fabric Embed (preview)

This article helps you diagnose and resolve common problems when you embed a Real-Time Dashboard with Microsoft Fabric Embed. Use it when the dashboard doesn't render, sign-in or token acquisition fails, or the Fabric Embed SDK reports an error.

> [!NOTE]
> Microsoft Fabric Embed is in public preview. For supported item types, authentication, and preview-contract limitations, see [Limitations for Microsoft Fabric Embed](what-is-fabric-embed.md#limitations-for-microsoft-fabric-embed).

## Start with the SDK error event

The Fabric Embed SDK raises a `rendered` event when the dashboard loads and an `error` event when embedding fails. Subscribe to both so you can capture the failure details that the rest of this article refers to.

```typescript
client.on("rendered", () => {
  console.log("Real-Time Dashboard rendered.");
});

client.on("error", (error: unknown) => {
  console.error("Microsoft Fabric Embed error:", error);
});
```

Embedding succeeds when the dashboard appears in the `fabric-embed-container` region and the browser console logs `Real-Time Dashboard rendered.`. If it doesn't, use the `error` event details together with the checks in the following sections. For the full verification checklist, see [Verify the Microsoft Fabric Embed Real-Time Dashboard](quickstart-embed-fabric-item.md#verify-the-microsoft-fabric-embed-real-time-dashboard).

## The Real-Time Dashboard doesn't render

If the container stays blank or the `error` event fires, work through these causes in order.

| Cause | How to confirm | Resolution |
|---|---|---|
| The signed-in user can't access the workspace or dashboard | The user can't open the Real-Time Dashboard directly in the [Microsoft Fabric portal](https://app.fabric.microsoft.com). | Grant the user Viewer or higher access to both the workspace and the Real-Time Dashboard item. Fabric Embed renders the item only for users who can already open it in Fabric. See [Configure your Fabric workspace](set-up-fabric-embed-environment.md#configure-your-fabric-workspace). |
| The workspace isn't on an active Fabric capacity | The workspace doesn't show an active Fabric capacity (F SKU) assignment. | Assign the workspace that contains the dashboard to an active Fabric capacity. See [What Fabric capacity does Microsoft Fabric Embed require?](what-is-fabric-embed.md#what-fabric-capacity-does-microsoft-fabric-embed-require). |
| The workspace ID or item ID is wrong | The IDs in your embed configuration don't match the dashboard you expect. | Reconfirm both IDs. When you list items, use the item type `KQLDashboard`. See [Collect workspace and Real-Time Dashboard IDs](set-up-fabric-embed-environment.md#collect-workspace-and-real-time-dashboard-ids). |
| The HTML container is missing or its `id` doesn't match | The console logs `The Fabric embed container was not found.` | Add a container whose `id` matches the value your embed code looks up (for example, `fabric-embed-container`), and make sure the element exists before the embed code runs. |
| The dashboard data source is inaccessible | The dashboard renders empty tiles or data errors. | Confirm the signed-in user can access the Real-Time Dashboard *and* its underlying data sources. Delegated embedding enforces the user's permissions on the data. |

## Authentication and token errors

Microsoft Fabric Embed uses delegated user authentication through the Microsoft Authentication Library for JavaScript (MSAL.js). Sign-in and token problems usually surface before the SDK renders anything.

| Symptom | Cause | Resolution |
|---|---|---|
| `No Microsoft Entra account is signed in.` | The app requested a token before a user signed in. | Sign the user in with MSAL.js (for example, `loginPopup`) before calling `getAccessToken()`. See [Configure Microsoft Entra authentication](quickstart-embed-fabric-item.md#configure-microsoft-entra-authentication-for-microsoft-fabric-embed). |
| `InteractionRequiredAuthError` when acquiring a token | A silent token request needs user interaction (consent, MFA, or an expired session). | Fall back to an interactive request (`acquireTokenPopup`) when this error occurs, as shown in the quickstart's `getAccessToken()` function. |
| Sign-in popup fails or returns to a blank page | The Microsoft Entra app registration is missing the redirect URI your app uses. | Add the redirect URI (for example, `window.location.origin`) to the app registration. See [Register a Microsoft Entra ID app for user sign-in](set-up-fabric-embed-environment.md#register-a-microsoft-entra-id-app-for-user-sign-in). |
| Token acquired for the wrong tenant or app | The `clientId` or `authority` (tenant) in the MSAL configuration is incorrect. | Set `clientId` to your app registration's Application (client) ID and `authority` to `https://login.microsoftonline.com/<tenant-id>`. |
| Token is missing Fabric permissions | The token request didn't use the Fabric resource scope. | Request the Fabric `.default` scope (`https://api.fabric.microsoft.com/.default`) so the token includes the delegated Fabric permissions you consented to. |

## Permission and consent errors

Even with a valid sign-in, embedding fails if the app doesn't have the right delegated Fabric permissions.

| Symptom | Cause | Resolution |
|---|---|---|
| Consent prompt for Fabric permissions, or the dashboard won't load | The app registration is missing `Fabric.Embed` or an item-read permission. | Add the delegated `Fabric.Embed` permission and an item-read permission (`KQLDashboard.Read.All`, or `Item.Read.All` for broader read access). See [Add delegated API permissions for Microsoft Fabric Embed](set-up-fabric-embed-environment.md#add-delegated-api-permissions-for-microsoft-fabric-embed). |
| `AADSTS65001` or "admin approval required" | Your organization requires admin consent for the requested permissions. | Ask a tenant admin to grant admin consent for the app's delegated permissions. |
| Workspace or item discovery calls return 403 | The app calls Fabric REST APIs to discover IDs without `Workspace.Read.All`. | Add `Workspace.Read.All` only if your app discovers workspace or item IDs through the Fabric REST APIs. |
| Embedding works for you but not for other users | Those users lack access to the item, or admin consent wasn't granted tenant-wide. | Grant each viewer access to the workspace and dashboard, and confirm admin consent covers all users. |

## Unsupported scenarios during preview

Some failures are expected because the scenario isn't supported in the public preview. Confirm your scenario against the [Limitations for Microsoft Fabric Embed](what-is-fabric-embed.md#limitations-for-microsoft-fabric-embed) before you troubleshoot further.

- **Embedding a non–Real-Time Dashboard item fails.** During preview, Microsoft Fabric Embed supports only Real-Time Dashboards (item type `KQLDashboard`).
- **Service principal or app-only authentication fails.** Only delegated user authentication is supported. Users must sign in with Microsoft Entra ID.
- **Power BI content won't embed as a Fabric item.** Use [Power BI embedded analytics](/power-bi/developer/embedded/embedded-analytics-power-bi) to embed Power BI reports, dashboards, or tiles.

## Preview SDK package and type-name differences

The Fabric Embed SDK is in public preview, so package and API details can change between releases.

- **Type names don't match the sample.** The documentation uses public-preview `KQLDashboard*` type names. If your installed package exposes different names, use the names from your package version.
- **The install command or package name differs.** If your preview onboarding provides a version-specific package command, use it instead of the generic `npm install @microsoft/fabric-embed`.
- **Events, configuration fields, or type names changed after an update.** Preview contracts—including the SDK package name, API surface, events, type names, and configuration—might change before general availability. Review the public-preview release notes before you update your app.





## Troubleshooting tools


### F12 in Browser for frontend debugging

The F12 key launches the developer window within your browser. This tool lets you look at network traffic and see other valuable information.

### Extract error details from Fabric embed response

This code snippet shows how to extract the error details from an HTTP exception:

```csharp
public static string GetExceptionText(this HttpOperationException exc)
{
    var errorText = string.Format("Request: {0}\r\nStatus: {1} ({2})\r\nResponse: {3}",
    exc.Request.Content, exc.Response.StatusCode, (int)exc.Response.StatusCode, exc.Response.Content);
    if (exc.Response.Headers.ContainsKey("RequestId"))
    {
        var requestId = exc.Response.Headers["RequestId"].FirstOrDefault();
        errorText += string.Format("\r\nRequestId: {0}", requestId);
    }

    return errorText;
}
```

We recommend logging the Request ID (and error details for troubleshooting). Provide the Request ID when approaching Microsoft support.


## Related content

- [What is Microsoft Fabric Embed?](what-is-fabric-embed.md)
- [Set up your environment for Microsoft Fabric Embed](set-up-fabric-embed-environment.md)
- [Quickstart to Microsoft Fabric Embed](quickstart-embed-fabric-item.md)
- [Register an application in Microsoft Entra ID](/entra/identity-platform/quickstart-register-app)
- [What is Real-Time Intelligence in Microsoft Fabric?](/fabric/real-time-intelligence/overview)
