---
title: Export PowerTable Layouts to PDF
description: Learn how to export PowerTable Gantt, Resource, and Calendar layouts to PDF for sharing, reporting, printing, and offline review.
ms.date: 08/19/2026
ms.topic: how-to
#customer intent: As a user, I want to export PowerTable layouts to PDF so that I can share project data, print reports, archive snapshots, and review schedules offline.
---

# Export PowerTable layouts to PDF

Export various PowerTable layout views to PDF to generate a static, shareable snapshot of your project data. PDF exports preserve the current layout and formatting of the view, making them suitable for distribution, presentations, and offline review.

This article lists the common use cases for exporting PowerTable data to PDF, as well as the steps to do it.

## Common use cases

* Share project schedules and timelines with stakeholders who don't have access to PowerTable.
* Include project plans in presentations, status reports, and project documentation.
* Print project views for meetings, reviews, or offline reference.
* Archive project snapshots at specific periods for offline auditing, tracking, or historical comparison.
* Distribute resource allocation and workload information to project managers and team leads.
* Share calendar-based plans and milestones with teams and external stakeholders in a portable format.

> [!NOTE]
> PDF export is supported only for **Gantt**, **Resource**, and **Calendar** layouts.

## Steps to export to PDF

To export your calendar, resource, or Gantt layout to PDF, follow these steps:

1. In the **PowerTable** ribbon, select **Export** > **Export PDF**.

    :::image type="content" source="media/powertable-how-to-export-to-pdf/export-pdf.png" alt-text="Screenshot of the PowerTable ribbon with Export menu open and Export PDF highlighted." lightbox="media/powertable-how-to-export-to-pdf/export-pdf.png":::

1. Select the **Export Type**.
   * Select **Standard** to export the layout directly to PDF without additional customization options, such as date range, task grouping, or header details.
   * Select **Grouped** to specify the date range and group tasks in the exported PDF.
1. Set the page and export properties:

    :::image type="content" source="media/powertable-how-to-export-to-pdf/export-properties.png" alt-text="Screenshot of the Export PDF properties panel with Grouped export type, custom date range, and Sheet Details tags.":::

    * **Page Size:** Select the PDF page size. Choose **Letter**, **A3**, **A4**, **A5**, **Legal**, or **Tabloid**, or specify a custom page width and height.
    * **Quality:** Select the export quality. Choose **HD (720p)**, **UHD (1080p)**, **4K (QHD)**, or **Auto**.
    * **Orientation:** Select the page orientation. Choose **Portrait** or **Landscape**.
    * **Resource:** Select the columns that you want to use to group tasks in the exported PDF. For example, use *Doctor Name* or *Start Date* to group appointments.
    * **Range Type:** Select the date range to include in the export. Choose from the following options:
      * **Full Range:** Select this option to include the complete date range for which data is available.
      * **Custom:** Use this option to specify the custom date range with **Start Date** and **End Date** for the export.
      * **Lock in**: Select this option and choose to include data for **3 weeks** or **6 weeks** before the current date.
    * **Sheet Details:** Select the sheet details that you want to display in the PDF header. You can include one or more of the following: **Sheet Name**, **Assignee**, **Date Range**, **Printed Date**, and **Page Number**.

1. After you select all the required details, select **Export** to generate the PDF. PowerTable generates the PDF and provides a link to access it.
1. Right-click the attachment and select **Save link as** to download the PDF, or select **Open link in new tab** to view the PDF in a new tab.

A sample PDF attachment looks as shown in the following image.

:::image type="content" source="media/powertable-how-to-export-to-pdf/sample-pdf.png" alt-text="Screenshot of the exported PowerTable PDF." lightbox="media/powertable-how-to-export-to-pdf/sample-pdf.png":::

You can use the same steps to export Gantt and resource layouts to PDF. Other layouts don't support PDF exports.
