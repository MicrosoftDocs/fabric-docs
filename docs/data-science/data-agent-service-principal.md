---
title: Use service principal authentication with Fabric data agent
description: Learn how to configure service principal to authenticate to a Fabric data agent.
ms.author: amjafari
author: amjafari
ms.reviewer: amjafari
ms.topic: how-to
ms.date: 05/12/2026
ms.collection: ce-skilling-ai-copilot
ai-usage: ai-assisted
#customer intent: As an Analyst, I want to use service principal to authenticate to a Fabric data agent from custom application.
---

# Use service principal authentication with Fabric data agent

A Microsoft Entra [service principal (SPN)](/entra/identity-platform/app-objects-and-service-principals) is a non-interactive, application-based identity that can be granted precise permissions on Azure and Microsoft Fabric resources. Fabric data agents now support service principal authentication, so you can call a published data agent from automation, background services, custom applications, and CI/CD pipelines without relying on a signed-in user.

This article explains how to register a service principal, grant it the right access in your Fabric workspace and on the underlying data sources, and then use it to authenticate to a Fabric data agent.

> [!IMPORTANT]  
> This feature is in [preview](../fundamentals/preview.md).

[!INCLUDE [data-agent-prerequisites](./includes/data-agent-prerequisites.md)]
- Permissions to register an application in your Microsoft Entra tenant (for example, the Cloud Application Administrator role), or an Entra ID administrator who can provide you with the SPN credentials (App ID, secret, and tenant ID).
- Microsoft Fabric tenant admin access to enable **Service principals can use Fabric APIs** in the Fabric admin portal.
- Workspace **Admin** or **Member** role membership to grant the SPN access to the workspace that hosts the data agent.

## How service principal authentication works with Fabric data agent

When a service principal calls a Fabric data agent, the agent treats the SPN like any other Microsoft Entra identity:

- The SPN must have access to the **workspace** where the data agent is published.
- The SPN must have read access to each **data source** attached to the agent (warehouse, lakehouse, semantic model, KQL database, mirrored database, or ontology). The agent only reads schemas and runs the query on the data sources that the calling identity can access.
- The SPN acquires a Microsoft Entra access token for the Fabric resource and uses that token as a bearer token when asking questions to the data agent. This endpoint is for querying the agent with natural language questions, not for managing or configuring it.

## Step 1: Create a service principal in Microsoft Entra ID

Follow the steps in [Create a Microsoft Entra application and service principal that can access resources](/entra/identity-platform/howto-create-service-principal-portal). The summary is:

1. Sign in to the [Microsoft Entra admin center](https://entra.microsoft.com) as at least a **Cloud Application Administrator**.
1. Browse to **Entra ID** > **App registrations**, and then select **New registration**.
1. Give the application a name, for example *fabric-data-agent-spn*.
1. Under **Supported account types**, select **Accounts in this organizational directory only**.
1. Select **Register**.
1. From the app registration's **Overview** page, copy the **Application (client) ID** and **Directory (tenant) ID** . They might be required later.
1. Configure a credential for the app registration. Depending on your organization's security policies, you can use a certificate, federated identity credential, or client secret. For guidance, see [Add a credential to your application](/entra/identity-platform/howto-create-service-principal-portal#option-1-recommended-upload-a-trusted-certificate).

> [!NOTE]
> Service principal management is part of Entra ID administration duties. If you can't register applications yourself, ask your Entra ID administrator to provide the **App ID**, **secret**, and **tenant ID**.

## Step 2: Enable service principals to use Fabric APIs

A Fabric tenant administrator must allow service principals to call Fabric APIs:

1. In the [Fabric admin portal](/fabric/admin/admin-center), go to **Tenant settings** > **Developer settings**.
1. Enable **Service principals can use Fabric APIs**.
1. Scope the setting to **The entire organization** or to a specific security group that contains your service principal.

   :::image type="content" source="media/data-agent-service-principal/spn-fabric-portal.png" alt-text="Screenshot of the Fabric portal for SPN.":::

For more details, see [Service principals in Microsoft Fabric](../data-warehouse/service-principals.md).

## Step 3: Grant the service principal access to the workspace

A workspace **Admin** or **Member** must grant the service principal access to the workspace that hosts the Fabric data agent:

1. Open the workspace in Fabric.
1. Select **Manage access**.
1. Select **Add people or groups**, search for the service principal by its app name, and add it.
1. Assign the **Member** or **Contributor** role. **Admin** is only required if the SPN must also manage the workspace.

   :::image type="content" source="media/data-agent-service-principal/manage-access-spn.png" alt-text="Screenshot of the Manage access pane in a Fabric workspace, with a service principal being added.":::

## Step 4: Grant the service principal access to the data sources

The Fabric data agent runs queries against its attached data sources under the calling identity. Make sure the SPN has at least read access on each source. The SPN can only see and query data that it has been granted access to, even if the data agent itself is shared with it.

## Step 5: Acquire a token and call the Fabric data agent

The service principal authenticates to Microsoft Entra ID using the [client credentials flow](/entra/identity-platform/v2-oauth2-client-creds-grant-flow) to request a token for the Fabric resource (`https://api.powerbi.microsoft.com`). It then uses the resulting access token as a bearer token when calling the data agent.

## Limitations

- Managed identities aren't yet supported for Fabric data agent authentication. You need to use a service principal instead.
- The SPN must have explicit access to every data source added to the data agent. Sharing only the data agent item isn't enough if the SPN lacks read access to the underlying data sources.

## Related content

- [How to create a Fabric data agent](how-to-create-data-agent.md)
- [Use a Fabric data agent as an MCP server](data-agent-mcp-server.md)
- [Service principals in Microsoft Fabric Warehouse](../data-warehouse/service-principals.md)
- [Create a Microsoft Entra application and service principal](/entra/identity-platform/howto-create-service-principal-portal)
- [Application and service principal objects in Microsoft Entra ID](/entra/identity-platform/app-objects-and-service-principals)
