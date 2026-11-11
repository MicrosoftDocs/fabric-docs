---
title: Add a custom stream connector to an eventstream
description: Learn how to upload a Kafka Connect source connector as a custom stream connector, add it to an eventstream, and manage package versions.
ms.topic: how-to
ms.date: 10/16/2026
ai-usage: ai-assisted
---

# Add a custom stream connector to an eventstream

Microsoft Fabric provides built-in connectors for many real-time data sources. If a built-in connector isn't available for your source, use a custom stream connector to upload a Kafka Connect source connector plugin. The connector then appears as a source in Real-Time hub, where you can configure it and add it to an eventstream.

[!INCLUDE [feature-preview-note](../../includes/feature-preview-note.md)]

This article shows you how to prepare and upload a custom stream connector package, add the connector to an eventstream, and manage package versions.

## Prerequisites

Before you begin, ensure you have:

- Access to a workspace assigned to a Fabric capacity or a trial capacity.
- Contributor or higher permissions in the workspace.
- A Kafka Connect source connector plugin package that meets the [package requirements](#prepare-the-connector-package).
- The connector class name and the configuration properties required by the connector.

## Prepare the connector package

You can develop a Kafka Connect source connector or use one supplied by an independent software vendor or an open-source project. Fabric doesn't provide a connector development environment. Develop and test the connector in your own environment before you upload it.

> [!IMPORTANT]
> If you use a third-party connector, review its license, dependencies, configuration properties, and documentation. Confirm that it's a source connector. The third-party provider's terms and privacy statements govern your access to and use of third-party connectors and data sources.

For information about developing a connector, see the [Kafka Connect connector development guide](https://kafka.apache.org/41/kafka-connect/connector-development-guide). Your implementation must meet these requirements:

- The connector class extends the Kafka Connect `SourceConnector` class.
- The task class extends the Kafka Connect `SourceTask` class.
- The plugin produces structured object data that the `JsonConverter` can convert to JSON.
- You know the fully qualified connector class name. For example, `com.example.plugin.connector.MySourceConnector`.

Build the connector and its dependencies into Java Archive (JAR) files. Place all required files in one folder without subfolders, and compress the folder as a ZIP file. For example:

```text
my-custom-connector-package.zip
├── my-source-connector.jar
├── dependency-one.jar
└── dependency-two.jar
```

> [!IMPORTANT]
> A custom stream connector item can contain multiple package versions, but each item must represent only one connector. When you add the connector to an eventstream, you can specify only one connector class name.

## Upload the connector package

Upload the package from Real-Time hub or create a custom stream connector item in a workspace first.

### Upload from Real-Time hub

1. In Fabric, open **Real-Time hub**.
1. Select **Upload custom connector**. Find this option in the upper-right corner or on an empty search results page.

   :::image type="content" source="./media/add-custom-stream-connector/upload-custom-connector.png" alt-text="Screenshot of the Real-Time hub Add data page with the Upload custom connector button highlighted." lightbox="./media/add-custom-stream-connector/upload-custom-connector.png":::

1. In the upload dialog, select the connector package and icon.
1. Enter the connector name and description.
1. Select the workspace where you want to create the custom stream connector item.
1. Select **Finish + upload**.

   :::image type="content" source="./media/add-custom-stream-connector/configure-custom-connector-upload.png" alt-text="Screenshot of the Upload custom connector dialog showing the package, workspace, item name, icon, and description fields." lightbox="./media/add-custom-stream-connector/configure-custom-connector-upload.png":::

Fabric creates a custom stream connector item in the selected workspace. After the upload finishes, return to Real-Time hub and search for the connector name to find its source tile.

On the source tile, select **More options** (**...**) to perform one of these actions:

- **Connect**: Open the **Get events** wizard and add the source to an eventstream.
- **Manage connector**: Open the custom stream connector item to manage its details and package versions.

### Upload from a custom stream connector item

Use the **New item** entry point to create a custom stream connector item before you upload the package.

1. In a Fabric workspace, select **New item**.
1. In the **New item** pane, under **Get data**, select **Custom stream connector (preview)**.

   :::image type="content" source="./media/add-custom-stream-connector/new-item-connector-details.png" alt-text="Screenshot of the New Custom stream connector dialog showing the Name and Location fields and the Create button." lightbox="./media/add-custom-stream-connector/new-item-connector-details.png":::

1. In the **New Custom stream connector** dialog, enter a **Name**, confirm the workspace under **Location**, and then select **Create**.

   :::image type="content" source="./media/add-custom-stream-connector/new-item-custom-stream-connector.png" alt-text="Screenshot of the New item pane with the Custom stream connector (preview) tile highlighted under Get data." lightbox="./media/add-custom-stream-connector/new-item-custom-stream-connector.png":::

1. On the custom stream connector start page, select **Upload custom connector**.

   :::image type="content" source="./media/add-custom-stream-connector/new-item-upload-package.png" alt-text="Screenshot of the custom stream connector start page with the Upload custom connector button highlighted." lightbox="./media/add-custom-stream-connector/new-item-upload-package.png":::

1. Under **Connector package**, upload the ZIP file you [prepared earlier](#prepare-the-connector-package).
1. Optionally, upload an **Icon** and enter a **Description** for the connector.
1. Select **Finish upload**.

   :::image type="content" source="./media/add-custom-stream-connector/new-item-finish-upload.png" alt-text="Screenshot of the custom connector upload page showing an uploaded ZIP package, optional Icon and Description fields, and the Finish upload button." lightbox="./media/add-custom-stream-connector/new-item-finish-upload.png":::

After the upload finishes, the connector appears as a source tile in Real-Time hub. Continue to [create an eventstream with a custom stream connector](#create-an-eventstream-with-a-custom-stream-connector).

## Create an eventstream with a custom stream connector

After you create the custom stream connector, use it as an eventstream source to ingest data into Fabric. Follow these steps to create a new eventstream from Real-Time hub.

1. In Real-Time hub, find the custom stream connector source tile. In the tile's upper-right corner, select **More options** (**...**), and then select **Connect**.

   :::image type="content" source="./media/add-custom-stream-connector/select-custom-connector-connect.png" alt-text="Screenshot of Real-Time hub showing a custom stream connector source tile with the Connect menu option highlighted." lightbox="./media/add-custom-stream-connector/select-custom-connector-connect.png":::

1. In the **Get events** wizard, create or select a connection to the source. Custom stream connectors support username and password authentication or API key authentication.
1. If you have Contributor or higher permissions for the connector's workspace, select the package version under **Connect to version**. This setting isn't available with Viewer permissions.
1. Under **ClassName**, enter the fully qualified Kafka connector class name. For example, enter `com.example.plugin.connector.MySourceConnector`.
1. Under **Configurations**, add the connector properties as key-value pairs and then complete the wizard.

:::image type="content" source="./media/add-custom-stream-connector/configure-connection-settings.png" alt-text="Screenshot of the Configure connection settings page showing the connection, system variables, package version, class name, and optional configurations." lightbox="./media/add-custom-stream-connector/configure-connection-settings.png":::

You can use these system variables as connector property values:

| System variable | Value |
| --- | --- |
| `${username}` | Username stored in the selected connection. |
| `${password}` | Password stored in the selected connection. |
| `${server}` | Server address stored in the selected connection. |
| `${key}` | API key stored in the selected connection. |
| `${es_topic}` | Default topic that Eventstream provides to receive source data. |

For example, set a connector's `connection.password` property to `${password}`. Use system variables for credentials instead of entering secrets directly in connector properties.

You can also start this setup from the custom stream connector item. Select **Connect** on the ribbon or on a package version's menu, and then complete the **Get events** wizard.

:::image type="content" source="./media/add-custom-stream-connector/connect-custom-connector.png" alt-text="Screenshot of the connector configuration page showing the Connect button." lightbox="./media/add-custom-stream-connector/connect-custom-connector.png":::

To add a custom stream connector to an existing eventstream, start from the eventstream editor:

1. In the edit mode, select **Add source** > **Connect data sources** on the ribbon.
   

   :::image type="content" source="./media/add-custom-stream-connector/add-source-menu.png" alt-text="Screenshot of the event stream editor with the Add source menu open and Connect data sources highlighted." lightbox="./media/add-custom-stream-connector/add-source-menu.png":::

1. In the **Choose a source** dialog, select **All**, and then select your custom stream connector's tile.

   :::image type="content" source="./media/add-custom-stream-connector/select-custom-connector-from-all-sources.png" alt-text="Screenshot of the Choose a source dialog with All selected and a custom stream connector source tile highlighted." lightbox="./media/add-custom-stream-connector/select-custom-connector-from-all-sources.png":::

1. Complete the **Get events** wizard to configure the connector and add the source to your eventstream.

## Verify the connector

After you add the source, open the eventstream and confirm that the custom stream connector appears on the canvas. Publish the eventstream to deploy the connector.

Use one of these methods to verify that the connector works:

- Preview the source data in the eventstream.
- Check the source state and metrics.
- Open the source's runtime logs and check for connection, configuration, or processing errors.

:::image type="content" source="./media/add-custom-stream-connector/preview-custom-connector-data.png" alt-text="Screenshot of an eventstream with an active SFTP custom stream connector source and JSON file records in the Data preview pane." lightbox="./media/add-custom-stream-connector/preview-custom-connector-data.png":::

## Manage the custom stream connector

Open the custom stream connector item from its workspace to manage the connector.

On the **Overview** page, you can:

- Select **New version package** to upload a new package version.
- Select **Edit overview** to change the connector name, description, or icon.
- Select **Connect** to add the default version to an eventstream.
- Select **Download** to download the connector package.

On the **Versions** page, you can:

- Select **Set as default version** to choose the version that Real-Time hub adds to an eventstream by default.
- Select **Delete** to remove a package version. Deleting a version prevents you from adding it to another eventstream but doesn't affect connectors that are already running.

:::image type="content" source="./media/add-custom-stream-connector/manage-connector-versions.png" alt-text="Screenshot of the custom stream connector Versions page showing multiple package versions and the menu for connecting, downloading, editing settings, deleting, or setting the default version." lightbox="./media/add-custom-stream-connector/manage-connector-versions.png":::

## Limitations

- Only Kafka Connect source connector plugins are supported. Sink connector plugins aren't supported.
- Eventstream uses `JsonConverter` for custom stream connectors. `ByteArrayConverter` and custom converters aren't supported. If the connector produces byte-array data, Eventstream writes it as a Base64-encoded value.
- You must enter connector properties manually as key-value pairs in the **Get events** wizard.
- You can't view the relationship between a package version and the eventstreams that use it.
- Sources on private networks, including virtual networks and on-premises networks, aren't supported.
- Changes to a connector's icon or description in the custom stream connector item don't appear in Real-Time hub.

## Related content

- [Add and manage an eventstream source](add-manage-eventstream-sources.md)
- [Create and manage an eventstream](create-manage-an-eventstream.md)
- [Preview data in an eventstream](preview-data.md)
- [Monitor eventstreams](monitor.md)
- [Add an Apache Kafka source to an eventstream](add-source-apache-kafka.md)
