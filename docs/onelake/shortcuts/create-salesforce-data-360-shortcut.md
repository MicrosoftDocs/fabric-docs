---
title: Create a Salesforce Data 360 shortcut
description: Learn how to create a OneLake shortcut to Salesforce Data 360 objects in a Microsoft Fabric lakehouse.
# author: Do not use - assigned by folder in docfx file
# ms.author: Do not use - assigned by folder in docfx file
ms.search.form: Shortcuts
ms.topic: how-to
ms.date: 10/07/2026
ai-usage: ai-assisted
#customer intent: As a data engineer, I want to create a shortcut to Salesforce Data 360 objects so that I can query shared Salesforce data from Microsoft Fabric without copying it.
---

# Create a Salesforce Data 360 shortcut (preview)

In this article, you create a OneLake shortcut that makes selected Salesforce Data 360 objects available in a Microsoft Fabric lakehouse. You can query the shared objects from Fabric while Salesforce Data 360 remains the data source.

For an overview of shortcuts, see [OneLake shortcuts](../onelake-shortcuts.md).

> [!IMPORTANT]
> Salesforce Data 360 shortcuts are currently in **public preview**. Features and behavior might change before general availability.

## Prerequisites

- Access to Salesforce Data 360 with the **Data Cloud Architect** permission set.
- A Salesforce Data 360 edition that supports data sharing. For more information, see [Data 360 edition availability](https://help.salesforce.com/s/articleView?id=data.c360_a_dc_editions.htm&language=en_US&type=5).
- The Salesforce Data 360 objects that you want to share with OneLake.
- A Fabric workspace with a lakehouse and permission to create table shortcuts. For more information about shortcut permissions, see [Create and delete shortcuts](../onelake-shortcut-security.md#create-and-delete-shortcuts).
- One of the following Microsoft Entra authentication methods: **Service principal certificate** (recommended for production), **Service principal key**, or **Organizational account**.

### Prepare service principal credentials

If you plan to authenticate by using a service principal, complete the following steps. Skip this section if you plan to use an organizational account.

1. [Register an application with the Microsoft identity platform](/entra/identity-platform/quickstart-register-app).

1. [Add an application credential](/entra/identity-platform/how-to-add-credentials) by using one of these options:

   - For production, add a certificate issued by a trusted certificate authority. Microsoft recommends certificates instead of client secrets for production applications.
   - For evaluation or testing, add a client secret. Copy the client secret value when you create the secret. The value isn't displayed again after you leave the page.

1. In the Microsoft Entra admin center, search for your application name under **Enterprise applications**, and select the matching service principal. On its **Overview** page, copy the **Object ID** for the Salesforce data share target and the **Application ID** (client ID) for the Fabric connection.

   Don't select the entry under **App registrations**. Registering an application creates a corresponding service principal, which appears as an enterprise application.

   Collect these values from the service principal:

   | Value | Use |
   | --- | --- |
   | Tenant ID | Use for the Salesforce data share target and the Fabric service principal connection. |
   | Application (client) ID | Use as the **Service Account ID** in Salesforce Data 360 and the **Service principal client ID** in Fabric. This value is the **Application ID** on the service principal's **Overview** page. |
   | Service principal object ID | Use for the Salesforce Data 360 data share target. |
   | Client secret value or certificate thumbprint | Use either a certificate credential with **Service principal certificate** or a client secret value with **Service principal key** in Fabric. |

> [!WARNING]
> Securely store certificate private keys and client secret values. Treat them as credentials, and don't include them in documentation, source control, or unsecured messages.

### Prepare organizational account credentials

To use organizational account authentication, collect your Microsoft Entra tenant ID and user object ID.

1. Go to the [Microsoft Entra admin center](https://entra.microsoft.com/).

1. Select **View user profile**, and then copy the **Tenant ID** and **Object ID** values.

## Configure Salesforce Data 360

Create a data share and a Microsoft OneLake data share target in Salesforce Data 360. Then, link the data share to the target to make the selected objects available to OneLake.

### Create a data share

Follow the Salesforce instructions to [create a data share](https://help.salesforce.com/s/articleView?id=data.c360_a_create_data_shares.htm). Include the Salesforce Data 360 objects that you want to access from Fabric.

:::image type="content" source="media/create-salesforce-data-360-shortcut/salesforce-data-lake-objects.png" alt-text="Screenshot of the Salesforce Data Lake Objects tab showing available objects." lightbox="media/create-salesforce-data-360-shortcut/salesforce-data-lake-objects.png":::

### Create a data share target

Create a data share target to connect Salesforce Data 360 and OneLake.

1. In Salesforce Data 360, go to the **Data Share Targets** tab, and then select **New**.

1. For the connection type, select **Microsoft OneLake**, and then select **Next**.

1. Enter a display name of up to 20 characters in **Label**. Keep the generated API name, or enter a different API name.

1. Enter the Microsoft Entra **Tenant ID** and the object ID for your authentication method:

    - For a service principal, enter the **Object ID** from the service principal's **Overview** page under **Enterprise applications**. Don't enter the **Application ID**.
    - For an organizational account, enter the user object ID.

   :::image type="content" source="media/create-salesforce-data-360-shortcut/new-data-share-target.png" alt-text="Screenshot that shows how the Microsoft Entra service principal object ID and tenant ID map to the Service Account ID and Azure Tenant ID fields in the Salesforce New Data Share Target form.":::

1. Copy the **Core Tenant ID** and **Tenant Endpoint** values. Use these values to create the connection in Fabric.

1. Select **Save**.

### Link the data share to the target

1. In Salesforce Data 360, go to the **Data Shares** tab.

1. Select the data share that you created in the previous section.

1. On the data share record page, select **Link/Unlink Data Share Target**.

   :::image type="content" source="media/create-salesforce-data-360-shortcut/link-data-share-target.png" alt-text="Screenshot of the Salesforce data share record showing Link/Unlink Data Share Target." lightbox="media/create-salesforce-data-360-shortcut/link-data-share-target.png":::

1. Select the Microsoft OneLake data share target.

1. Select **Save**.

The linked data share target appears on the data share record page.

## Create a shortcut

After you configure sharing in Salesforce Data 360, create shortcuts to the shared objects in a Fabric lakehouse.

1. Open an existing lakehouse, or create the lakehouse where you want the shortcuts to appear.

1. Select **Get data** > **New table shortcut**.

1. Under **External sources**, select **Salesforce Data 360**.

   :::image type="content" source="media/create-salesforce-data-360-shortcut/salesforce-data-360.png" alt-text="Screenshot of the New shortcut source selection page showing Salesforce Data360 under External sources.":::

1. Select **New connection**.

1. Enter the connection details.

   | Setting | Value |
   | --- | --- |
   | **Salesforce instance URL** | Enter the **Tenant Endpoint** generated by Salesforce Data 360. |
   | **Salesforce org ID** | Enter the **Core Tenant ID** generated by Salesforce Data 360. |
   | **Connection** | Select **Create new connection**. |
   | **Connection name** | Enter a recognizable name for the connection. |
   | **Authentication kind** | Select **Service principal certificate**, **Service principal key**, or **Organizational account**. |

1. Complete the authentication details for the method that you selected:

   - For **Service principal certificate**, enter the Microsoft Entra tenant ID and the service principal's **Application ID** (client ID), and provide the certificate credential requested by the connection form.
   - For **Service principal key**, enter the Microsoft Entra tenant ID, the service principal's **Application ID** (client ID), and client secret value.
   - For **Organizational account**, select **Sign in**, and then complete the sign-in process.

   :::image type="content" source="media/create-salesforce-data-360-shortcut/new-shortcut-connection.png" alt-text="Screenshot of the New shortcut connection form showing the Salesforce instance URL, organization ID, connection name, and service principal authentication fields." lightbox="media/create-salesforce-data-360-shortcut/new-shortcut-connection.png":::

1. Select **Next**.

1. Select the data lake objects for which you want to create shortcuts.

   :::image type="content" source="media/create-salesforce-data-360-shortcut/select-data-lake-objects.png" alt-text="Screenshot of the New shortcut object selection page showing the data lake objects in the Salesforce data share." lightbox="media/create-salesforce-data-360-shortcut/select-data-lake-objects.png":::

1. Select **Save**.

   :::image type="content" source="media/create-salesforce-data-360-shortcut/creating-shortcuts.png" alt-text="Screenshot of the New shortcut summary showing the selected objects with creation in progress." lightbox="media/create-salesforce-data-360-shortcut/creating-shortcuts.png":::

The selected Salesforce Data 360 objects appear as shortcuts in the lakehouse.

## Verify the shortcut

1. In Salesforce Data 360, open the data share, and then select **Data Share Targets**. Confirm that the Microsoft OneLake target is linked.

1. In Fabric, open the destination lakehouse and confirm that shortcuts for the selected data lake objects appear.

1. Open or query a selected object to confirm that you can access it with your current permissions.

   :::image type="content" source="media/create-salesforce-data-360-shortcut/verify-shortcut-data.png" alt-text="Screenshot of the Fabric lakehouse showing Salesforce table shortcuts and data from a selected object." lightbox="media/create-salesforce-data-360-shortcut/verify-shortcut-data.png":::

## Limitations and known issues

- Only Data Lake objects (DLOs) with the `_dll` extension are supported. Data Model Objects (DMOs) and Calculated Insight Objects (CIOs) aren't supported.
- Salesforce Data 360 doesn't support schema-level shortcuts.
- Data filtering isn't supported. The shortcut makes all data in the DLO available in Fabric, even if the DLO has filters configured in Salesforce Data 360.
- If you enter an incorrect credential and then correct it in the same connection window during shortcut creation, an error might occur. Close the connection window completely, and then restart shortcut creation.

## Related content

- [OneLake shortcuts](../onelake-shortcuts.md)
- [Create an Azure Blob Storage shortcut](create-blob-shortcut.md)
- [Manage connections for shortcuts](../manage-shortcut-connections.md)
