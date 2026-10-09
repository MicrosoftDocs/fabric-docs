---
title: "What is Microsoft Fabric Embed in Microsoft Fabric (preview)?"
description: Learn what Microsoft Fabric Embed in Microsoft Fabric is, how preview support works for Real-Time Dashboards, and how access uses Microsoft Entra ID.
author: billmath
ms.author: billmath
ms.topic: overview
ms.date: 07/01/2026
ms.service: fabric
ms.custom: doc-kit-assisted
ai-usage: ai-assisted
#customer intent: As an app developer, I want to understand Microsoft Fabric Embed so that I can decide whether to use it to embed Fabric content in my web application.
---

# What is Microsoft Fabric Embed in Microsoft Fabric (preview)?

Microsoft Fabric Embed enables you to add or embed supported Microsoft Fabric items in your browser-based web applications. Use Fabric Embed when you want users to view and interact with Fabric content inside your applications instead of opening the Fabric portal.

In this article, you learn how Microsoft Fabric Embed works, which preview requirements apply and which Fabric items you can embed.

## What do I need to use Microsoft Fabric Embed?
Before you start, confirm that you have:

- Access to a Microsoft Fabric tenant and a delegated access token for the signed-in Microsoft Entra user.
- Permission to create or update a Microsoft Entra ID app registration
- An active [Microsoft Fabric capacity (F SKU)](#what-fabric-capacity-does-microsoft-fabric-embed-require)
- A Microsoft Fabric workspace assigned to that capacity
- Viewer or higher access to the workspace that contains the Real-Time Dashboard item
- A Real-Time Dashboard item that you can access in the workspace
- A JavaScript or TypeScript web application that uses Microsoft Entra ID user sign-in
- Node.js and npm installed on your development machine
- [Fabric Embed software development kit (SDK)](https://aka.ms/fabric-embed/sdk) 

## When should you use Microsoft Fabric Embed in Microsoft Fabric?

Fabric Embed displays Real-Time Dashboard analytics in the applications and workflows that users already use, such as custom applications, portals, and business workflows. The embedded experience uses Fabric governance, workspace permissions, and Microsoft Entra ID user identity instead of a separate access model.

Use Microsoft Fabric Embed when you need to:

- Show a Real-Time Dashboard inside your JavaScript or TypeScript web application during public preview
- Allow users to remain in your application while they explore Fabric content
- Use Microsoft Fabric governance, Fabric workspace permissions, and Microsoft Entra ID for access control
- Build user-based embedded experiences for users who already have access to the underlying Fabric item

## Which item types does Microsoft Fabric Embed preview support?

During public preview, Microsoft Fabric Embed supports only Real-Time Dashboards.

## How does authentication and authorization work for Microsoft Fabric Embed preview?

Microsoft Fabric Embed uses delegated user authentication. Microsoft Entra ID issues a delegated token for the signed-in user—this isn’t an app-only or service principal token.
In this user-based authentication model, content is embedded on behalf of the signed-in user, and Fabric enforces access based on that user’s permissions.

Use these authentication and authorization requirements when you plan a Microsoft Fabric Embed preview solution:

| Authentication requirement | Microsoft Fabric Embed preview behavior |
|---|---|
| **User sign-in** | Your application signs in users with Microsoft Entra ID. |
| **Delegated token** | Your application requests delegated permissions for Fabric embedding and item access. |
| **Workspace and item access** | The signed-in user must have access to the workspace and the Real-Time Dashboard item and the real time dashboard data sources. |
| **Redirect URI** | Your Microsoft Entra app registration must include the redirect URI used by your application. |


## What Fabric capacity does Microsoft Fabric Embed require?

Microsoft Fabric Embed, requires the workspace that contains the Real-Time Dashboard, to use a Fabric capacity (F SKU). Fabric capacity provides compute resources for Fabric workloads and items. Before you build an embedded experience, assign the workspace that contains the dashboard to a Fabric capacity.

| Capacity requirement | What it means for Microsoft Fabric Embed |
|---|---|
| **Fabric capacity (F SKU)** | The Real-Time Dashboard workspace must use Fabric capacity for the embedded experience. |
| **Fabric trial capacity** | Microsoft Fabric Embed supports Fabric trial capacities, subject to the limitations described in [Fabric trial capacity](/fabric/fundamentals/fabric-trial). |



## Limitations for Microsoft Fabric Embed

Microsoft Fabric Embed public preview has the following limitations:


- **Only Real-Time Dashboards are supported** - You can't embed other Fabric item types with Microsoft Fabric Embed during public preview. 
- **Only delegated user authentication is supported** - Users must sign in with Microsoft Entra ID. Service-principal (app-only) authentication isn't supported. 
- **App-owns-data embedding isn't supported** - Microsoft Fabric Embed preview doesn't support app-only tokens or embedding content for users who don't have access to the Fabric item. The signed-in user must be able to open the item in Fabric. 
- **Power BI items use Power BI embedded analytics** - Use Power BI embedded analytics to embed Power BI reports, dashboards, or tiles; Microsoft Fabric Embed preview doesn't embed them as Fabric items. 
- **Preview contracts might change** - The SDK package name, API surface, events, type names, and configuration contracts might change before general availability. Check the public-preview release notes before you update your application. 


## Next steps 

Use these resources to prepare the identity, capacity, and product context for a Microsoft Fabric Embed preview solution:

- [Set up Microsoft Fabric Embed for Real-Time Dashboard items](set-up-fabric-embed-environment.md)
- [Quickstart to Microsoft Fabric Embed](quickstart-embed-fabric-item.md)
- [Register an application in Microsoft Entra ID](/entra/identity-platform/quickstart-register-app)
- [What is Real-Time Intelligence in Microsoft Fabric?](/fabric/real-time-intelligence/overview)

