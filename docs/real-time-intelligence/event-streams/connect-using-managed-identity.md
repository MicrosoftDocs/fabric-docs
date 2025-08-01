---
title: Connect Azure Logic Apps to Fabric Eventstream using Managed Identity
description: Learn how to send data from Azure Logic Apps to Eventstream using Managed Identity authentication.
ms.reviewer: spelluru
ms.author: zhenxilin
author: alexlzx
ms.topic: how-to
ms.date: 4/08/2025
ms.search.form: Eventstreams authentication
---

# Connect to Eventstream using Managed Identity

Eventstream’s Custom Endpoint is a powerful feature that allows you to send and fetch data from Eventstream. It supports two authentication methods for integrating external applications:

- **Microsoft Entra ID**: Simplifies access by tying user permissions directly to Fabric workspace access. It also supports **Managed Identity** authentication for Azure services such as Azure Logic Apps, eliminating the need for secret management and enhancing security.
- **Shared access signature (SAS) Keys:** Enables quick integration by allowing you to copy Eventstream credentials directly into your application using the provided sample code.

In this article, you learn how to enable identity in Azure Logic Apps, assign workspace permissions to the identity, and send data to Fabric Eventstream using **Managed Identity** authentication.

## Prerequisites

Before you begin, make sure the following prerequisites are met:

- Your **Tenant Admin** enabled the following two settings in the Admin portal. [Learn more](/power-bi/developer/embedded/embed-service-principal)
  - Service principals can create workspaces, connections, and deployment pipelines
  - Service principals can call Fabric public APIs
- You have **Member** or higher permissions in the workspace. It's required to manage workspace access and assign the necessary permissions to your Azure resource identity.
- An Eventstream item in your workspace with a Custom Endpoint source. Refer to [this guide](add-source-custom-app.md) for instructions on how to add a Custom Endpoint to Eventstream.
- An Azure Logic Apps workflow configured with an HTTP trigger.

## Step 1: Enable Managed Identity in Azure Logic Apps

1. Open your **Azure Logic App** in the Azure portal.
2. Under the **Identity** section, enable either:
   - **System-assigned managed identity:** autocreated by Azure.
   - **User-assigned managed identity:** can be shared across multiple resources and managed separately.
    :::image type="content" source="media/connect-using-managed-identity/enable-logic-app-identity.png" alt-text="Screenshot of enabling identity in Azure Logic app." lightbox="media/connect-using-managed-identity/enable-logic-app-identity.png":::
3. Select **Save** to apply the changes.

## Step 2: Assign Fabric Workspace Permissions

1. Go to **Microsoft Fabric** and locate your Fabric Workspace.
2. Open **Manage access**, select **Add people or groups**, search for the Logic App’s managed identity for example, *alex-logicapp2*.
3. Assign the **Contributor or** higher permission to the identity for the Eventstream access.

:::image type="content" border="true" source="media/connect-using-managed-identity/assign-workspace-permission.png" alt-text="Screenshot of assigning workspace permission in Fabric." lightbox="media/connect-using-managed-identity/assign-workspace-permission.png":::

## Step 3: Copy Event Hubs information in Eventstream

1. Open your Eventstream in the workspace.
2. Locate the **Custom Endpoint** node within Eventstream.
3. Select **Entra ID authentication**, then copy the Event Hubs information for later use.  

:::image type="content" border="true" source="media/connect-using-managed-identity/custom-endpoint-entra-id.png" alt-text="Screenshot of Entra ID authentication in Eventstream Custom Endpoint." lightbox="media/connect-using-managed-identity/custom-endpoint-entra-id.png":::

## Step 4:  Add an Event Hubs action in Logic Apps

1. Open a workflow in **Azure Logic Apps** and add an HTTP trigger.
2. Search for **Event Hubs** action and select **Send event**.
3. Create a new connection, select **Logic Apps Managed Identity** as the authentication type, and enter the Event Hubs information you saved in the previous step.
    :::image type="content" border="true" source="media/connect-using-managed-identity/logic-app-authentication.png" alt-text="Screenshot of selecting Managed Identity authentication in Logic Apps." lightbox="media/connect-using-managed-identity/logic-app-authentication.png":::
4. Select **Save** and **Run** the workflow.  

You’re all set! Go back to your Eventstream and select **Data Preview** to check for incoming data.

:::image type="content" border="true" source="media/connect-using-managed-identity/data-preview.png" alt-text="Screenshot of data preview in Eventstream." lightbox="media/connect-using-managed-identity/data-preview.png":::

With **Managed Identity** authentication, you can securely connect Azure Logic Apps to Fabric Eventstream without worrying about secret or key management. This approach enhances security, simplifies permission management, and improves operational efficiency.

## Related content

- [Authenticate with Microsoft Entra ID authentication](./custom-endpoint-entra-id-auth.md)
- [Add Custom Endpoint source to Eventstream](./add-source-custom-app.md)
- [Add Custom Endpoint destination to Eventstream](./add-destination-custom-app.md)
