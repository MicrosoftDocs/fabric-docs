---
title: Use the HTML document builder in Dataflow Gen2
description: Use the HTML document builder in Dataflow Gen2 to add sections and parts, review the document structure, and configure file output or an email body.
ms.reviewer: jeluitwi
ms.author: jeluitwi
author: luitwieler
ms.topic: how-to
ms.date: 11/12/2026
ms.custom: dataflows
ai-usage: ai-generated
---

# Use the HTML document builder in Dataflow Gen2 (preview)

> [!NOTE]
> The HTML document builder is currently in preview.

<!-- Draft review: November 12 screenshots confirm document creation, add menus, initial part settings, structural preview, Edit document, the document-to-email handoff, and email-first Body menus. Confirm Document-level properties, chart and MultiStat options after source selection, Text/Footer input-mode menus, new-document completion and return to email configuration, file-destination completion, and the generated file/received email before publishing. -->

The HTML document builder in Dataflow Gen2 helps you turn prepared query data into a formatted document. Use the visual editor to add a header, sections, tables, charts, statistics, and text. After creating the document query, choose a file destination or use the document as an email body.

Preparing the data, defining the document, and producing the output are separate steps:

1. Prepare the rows, columns, and calculations in your source queries.
1. Use the builder to define the document structure and select the data used by its parts. Selecting **OK** creates a document query.
1. Review the document structure and configure a file destination or email action. A dataflow run generates the configured output.

This walkthrough creates a header and a table, then explains the output choices. The part-setting screenshots also illustrate the other content you can add.

## Understand the document structure

The tree on the left of the builder shows the document structure. Select an item in the tree to configure its properties on the right.

| Term | Meaning |
|---|---|
| Source query | A query in the dataflow that supplies prepared data, such as an orders table. |
| Document | The root of the HTML document definition. |
| Header, Body, and Footer | The document regions shown in the tree. Use the body for the main content. |
| Section | A container that groups content in the body and has its own title and subtitle. |
| Part | An element inside the body or a section, such as a **Table**, **Chart**, **MultiStat**, or **Text** part. |
| Document query | The query that describes the HTML document and references the queries used by its parts. Select this query to review or edit the document and configure its output. |

Unlike an Excel workbook, the HTML document uses regions and sections rather than worksheets and cell ranges.

## Prerequisites

Before you begin, ensure you have the following prerequisites:

- A Dataflow Gen2 that you can edit, with the HTML document builder available. To get started, see [Create your first dataflow](create-first-dataflow-gen2.md).
- A query that returns the table of data you want to include.
- For file output, a connection with write access to a supported file-based destination.
- For email output, an Outlook connection and a test mailbox you control. See [Send email prerequisites](send-email-dataflow-gen2.md#prerequisites).

Prepare rows, columns, data types, and calculations in Power Query before opening the builder. If you want to show totals by product, calculate those totals in a source query before using it in a document part.

## Prepare the sample data

The screenshots use a source query named `Orders`. You can use an existing table-valued query or create a synthetic sample with the following values:

| OrderId | Product | Amount |
|---|---|---|
| 1001 | Notebook | 1200 |
| 1002 | Pen | 450 |
| 1003 | Backpack | 2100 |

To create the sample, add a blank query with the following Power Query M expression, and then name the query `Orders`:

```powerquery-m
#table(
    type table [OrderId = Int64.Type, Product = text, Amount = number],
    {
        {1001, "Notebook", 1200},
        {1002, "Pen", 450},
        {1003, "Backpack", 2100}
    }
)
```

These values are examples. You can use an existing query with your own prepared data instead.

## Create an HTML document

1. Open your dataflow in the Power Query editor.
1. On **Home**, select **Destination document** > **HTML (Preview)**.

:::image type="content" source="media/dataflow-document-builder-html/ribbon-entry.png" alt-text="Screenshot of the Destination document menu with HTML (Preview) outlined below the Excel and PowerPoint choices.":::

The **Create HTML document (Preview)** dialog starts with **Header**, **Body**, and **Footer** under **Document**. Select a region or part to display its settings on the right. You add the sections and parts you need; a section isn't required to add content to the body.

:::image type="content" source="media/dataflow-document-builder-html/create-document.png" alt-text="Screenshot of a new HTML document with Header, Body, and Footer regions and empty Header Title and Subtitle fields." lightbox="media/dataflow-document-builder-html/create-document.png":::

## Add sections and parts

Use the **+** button next to **Body** or a section in the tree:

| Where you select **+** | Available choices |
|---|---|
| **Body** | **Section**, **Table**, **Chart**, **MultiStat**, and **Text**. |
| A section, such as **Section1** | **Table**, **Chart**, **MultiStat**, and **Text**. |

:::image type="content" source="media/dataflow-document-builder-html/add-body-content.png" alt-text="Screenshot of the Body add button outlined beside its menu, which offers Section, Table, Chart, MultiStat, and Text.":::

A section groups related parts under a title and subtitle. Its add menu doesn't offer another section, so sections aren't nested through this menu.

:::image type="content" source="media/dataflow-document-builder-html/add-section-content.png" alt-text="Screenshot of Section1 with Title and Subtitle fields and its outlined add button opening a menu of Table, Chart, MultiStat, and Text.":::

Expand or collapse nodes to navigate the tree. Select a part to edit its settings, or select its **X** button to remove it. A section also has an **X** button.

## Configure the document content

The settings depend on the selected region or part. Fields marked with an asterisk are required.

| Region or part | Settings shown in the editor |
|---|---|
| **Header** | **Title** and **Subtitle**. |
| **Section** | **Title** and **Subtitle**, plus an add menu for its parts. |
| **Table** | **Title**, **Subtitle**, and required **Data source**. |
| **Chart** | **Title**, **Subtitle**, required **Data source**, and **Chart type**. In the initial state, **Chart type** displays **Bar chart** and is disabled while **Data source** is **(none)**. |
| **MultiStat** | **Title**, **Subtitle**, and required **Data source** in its initial pane. |
| **Text** | Required **Text**, with a multiline input and an input-mode menu. |
| **Footer** | **Text**, with a multiline input and an input-mode menu. |

### Header and sections

Select **Header** to enter a document heading and an optional subtitle. A section has separate title and subtitle fields, so you can introduce each group of content.

For the worked example, enter `Hello world` as the header **Title** and leave **Subtitle** empty.

### Table

Add **Table** to the body or a section, and then select the new part, such as **Table1**. Choose the table-valued query that supplies its rows under **Data source**. You can also enter a title and subtitle for the table.

:::image type="content" source="media/dataflow-document-builder-html/configure-table.png" alt-text="Screenshot of Table1 in Section1 with Title and Subtitle fields and Orders selected as its required Data source." lightbox="media/dataflow-document-builder-html/configure-table.png":::

Filter, sort, or transform the rows in the source query. Selecting a source for the table part doesn't replace the data-preparation steps in Power Query.

### Chart

Add **Chart** and select its **Data source**. The initial pane has title and subtitle fields and a **Chart type** control. Complete the chart settings available for your selected source.

:::image type="content" source="media/dataflow-document-builder-html/configure-chart.png" alt-text="Screenshot of Chart1 with Title and Subtitle fields, Data source set to none, and a disabled Chart type control displaying Bar chart." lightbox="media/dataflow-document-builder-html/configure-chart.png":::

### MultiStat

Add **MultiStat** to include a statistics part based on query data. Select the part, choose its **Data source**, and enter a title or subtitle if needed.

### Text and footer

Use a **Text** part to add explanatory text to the body or a section. Enter the content in the multiline **Text** field.

:::image type="content" source="media/dataflow-document-builder-html/configure-text.png" alt-text="Screenshot of Text1 selected in the document tree, with a required multiline Text field and an input-mode menu." lightbox="media/dataflow-document-builder-html/configure-text.png":::

Select **Footer** to enter text for the end of the document. Its text field isn't marked as required. Both text inputs have a menu beside the field for choosing the input mode; this example uses direct text input.

## Complete the example document

The settings screenshots illustrate the available parts. The following example uses only one table directly in **Body**, rather than all four part types inside a section:

1. Select **Header** and set **Title** to `Hello world`.
1. Select **+** next to **Body**, and then select **Table**.
1. Select **Table1** and set **Data source** to `Orders`. Leave the table title and subtitle empty.
1. Leave the footer empty.
1. Select **OK** to create the document query.

## Review the document query

The builder creates a separate query. In this example, the query is named `HtmlAdvancedQuery`, and the diagram shows its dependency on `Orders`.

Select the document query to see a structural preview, similar to the [Excel document builder preview](dataflow-gen2-document-builder-excel.md#review-the-document-query). It shows the region and part counts, expandable **Header**, **Body**, and **Footer** regions, and the parts and source-query references.

The example has three regions and one part. **Header** shows the title `Hello world`, and **Body** lists **Table1** with **Source: Orders**.

:::image type="content" source="media/dataflow-document-builder-html/document-query-preview.png" alt-text="Screenshot of HtmlAdvancedQuery showing Header, Body with Table1 sourced from Orders, and Footer, with the Edit document button outlined." lightbox="media/dataflow-document-builder-html/document-query-preview.png":::

This preview describes the document structure. It isn't a rendered web page or a preview of the message as it appears in an email app.

Keep the source query and the document query separate:

- Change rows, data types, grouping, and calculations in `Orders`.
- Change the document structure and part settings in the HTML document builder. Select **Edit document** to reopen it.

> [!IMPORTANT]
> Selecting **OK** in the builder doesn't write a file or send an email. **No destination yet** means the document isn't configured to write to a file location. Configure the output you need before running the dataflow.

## Configure the output destination

With the document query selected, expand **Data destination** in **Query settings**. You have three choices:

| Option | What it opens |
|---|---|
| **Use OneDrive as destination** | The shortcut for configuring OneDrive file output. |
| **Choose another destination** | Setup for another supported file-based destination. |
| **Send as email** | The **Send email (Preview)** dialog with this document query already selected as **Body**. |

:::image type="content" source="media/dataflow-document-builder-html/output-options.png" alt-text="Screenshot of Query settings for HtmlAdvancedQuery showing the OneDrive and other destination choices, with Send as email outlined.":::

### Write the document to a file

Configure file output on the document query, not only on its source query:

1. Select **Use OneDrive as destination** or **Choose another destination**.
1. Complete the connection and target-location settings. Use a location where the connection can write files.
1. Enter a file name, such as `Orders.html`. If the destination setup asks for a file format, select **HTML**.
1. Review the destination settings and finish the setup.

For more information, see [Set up file-based destinations](dataflow-gen2-data-destinations-and-managed-settings.md#set-up-file-based-destinations). If you use a lakehouse, choose its **Files** area rather than **Tables**.

### Run the dataflow and open the document

1. Select **Save & run**.
1. Review the run status. If the run fails, check the error before retrying. For instructions, see [View refresh history and monitor your dataflows](dataflows-gen2-monitor.md).
1. After a successful run, open the generated HTML file from the configured destination in a browser.
1. Check the document heading and table contents against the source query.

For the sample data, check that the generated document contains the `Hello world` heading and the three rows from `Orders`.

## Send the document as email

You can configure an email directly from the document query without first setting a file destination:

1. Select the document query, such as `HtmlAdvancedQuery`.
1. Under **Query settings** > **Data destination**, select **Send as email**.
1. In **Send email (Preview)**, confirm that **Body** already selects the document query.
1. Configure the Outlook connection, recipients, and subject by following [Complete the email configuration](send-email-dataflow-gen2.md#complete-the-email-configuration).
1. Before running the dataflow, in **Queries**, right-click the document query and clear **Enable staging**. Keep the `Orders` source query enabled for staging, or configure a data destination on a query in the dataflow. An email action alone doesn't satisfy the requirement for a staged query or a data destination.

The button opens the configuration dialog; it doesn't send the message immediately. Email execution is part of the dataflow refresh.

You can also [start from the Send email dialog](send-email-dataflow-gen2.md#start-from-the-send-email-dialog). In the **Body** input-mode menu, choose **Select a query**, then choose an existing HTML document query or select **New blank HTML body** to open the builder.

> [!NOTE]
> The email renderer supports a subset of HTML document parts. **Chart** and **MultiStat** parts are omitted from HTML email. Use **Text** or **Table** parts for information recipients need to receive, and inspect the received message rather than relying on the structural preview.

For email-specific properties, table styles, and nested values, see [Advanced options for HTML email](send-html-email-dataflow.md).

## Edit an existing document

Use the document query to return to the definition stored in the dataflow:

1. Select the document query, and then select **Edit document** above the structural preview.
1. Update the document structure, part properties, or data-source selections.
1. Select **OK** to return to the document query.
1. Review the configured outputs before the next run. If the dataflow has an email action, confirm the recipients and message before running it.

Editing the definition doesn't update a previously generated file or resend an email. A dataflow run executes the configured outputs. If you rename or remove source columns, review the parts that use that query.

## Troubleshoot common issues

Use the source-query preview to inspect data, the document preview to review structure, and the refresh history to investigate execution failures.

| Symptom | What to check |
|---|---|
| A Table, Chart, or MultiStat part has no data source. | Select a table-valued query under **Data source**, and complete the required settings for that part. |
| A part can't find a source column. | Check that the selected source query still contains the column, especially after a rename or schema change. |
| Chart values don't match the intended totals. | Review filtering, grouping, and data types in the source query. Use a numeric value column. |
| No HTML file appears after you close the builder. | Configure a file-based destination on the document query, run the dataflow, and check refresh history and write permissions. |
| Changes don't appear in the generated document. | Confirm that the dataflow ran successfully after the changes and that you're opening the file at the configured destination. |
| The email dialog warns about invalid or missing credentials. | Select **Configure connection** and complete the Outlook connection setup before running the dataflow. |
| Charts or statistics parts are missing from the received email. | **Chart** and **MultiStat** aren't rendered in HTML email. Use supported parts and check the delivered result. |

## Related content

- [Dataflow Gen2 data destinations and managed settings](dataflow-gen2-data-destinations-and-managed-settings.md)
- [Excel document builder](dataflow-gen2-document-builder-excel.md)
- [Send email from Dataflow Gen2](send-email-dataflow-gen2.md)
- [View refresh history and monitor your dataflows](dataflows-gen2-monitor.md)
