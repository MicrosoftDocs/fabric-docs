---
title: Differences between Data Factory in Fabric and Azure
description: Compare Azure Data Factory and Fabric Data Factory features to choose the right data integration solution for your enterprise.
author: kromerm
ms.author: makromer
ms.topic: concept-article
ms.date: 09/29/2025
ms.custom:
  - template-concept
  - build-2023
  - pipelines
ms.search.form: Pipeline Activity Overview
ai-usage: ai-assisted
---

# Differences between Azure Data Factory and Fabric Data Factory

[Data Factory in Microsoft Fabric](data-factory-overview.md) is the next generation of [Azure Data Factory](/azure/data-factory/introduction), built to handle your most complex data integration challenges with a simpler, more powerful approach.

This guide helps you understand the key differences between these two services, so you can make the right choice for your enterprise. We'll walk you through what's new, what's different, and what advantages Fabric brings to the table.

Fabric Data Factory is the next generation of Azure Data Factory, designed to simplify and enhance data integration workflows. This section introduces the key features and benefits of Fabric Data Factory.

Ready to explore your migration options? Check out our [migration guide](migrate-from-azure-data-factory.md).

## Compare features side by side

Here's how the core features stack up between Azure Data Factory and Fabric Data Factory. We've highlighted what's changed, what's new, and what stays the same.

|[Azure Data Factory](/azure/data-factory/introduction) |[Data Factory in Fabric](data-factory-overview.md) |What's different |
|:---|:---|:---|
|Pipeline |Pipeline | **Better integration**: Pipelines in Fabric work seamlessly with Lakehouse, Data Warehouse, and other Fabric services right out of the box. Fabric pipelines include more SaaS-based activities and differ in JSON definitions. |
|Mapping data flow  |Dataflow Gen2 | **Easier to use**: Dataflow Gen2 gives you a simpler experience for building transformations. We're adding more mapping dataflow features to Gen2 all the time. |
|Activities |Activities|**More activities coming**: We're working to bring all your favorite ADF activities to Fabric. Plus, you get new ones like the Office 365 Outlook activity that aren't available in ADF. See our [Activity overview](activity-overview.md) for details.|
|Dataset |Connections only|**Simpler approach**: No more complex dataset configurations. For Data Factory in Fabric you use connections to link to your data sources and start working. Fabric eliminates datasets, defining data properties inline within activities. |
|Linked Service |Connections |**More intuitive**: Connections work like linked services but are easier to set up and manage. |
|Triggers |Schedule and file event triggers |**Built-in scheduling**: Use Fabric's scheduler and Reflex events to automatically run your pipelines. File event triggers work natively in Fabric without extra setup. Fabric integrates triggers into its Activator framework, unlike ADF’s standalone triggers. |
|Publish |Save and Run |**No publishing step**: In Fabric, skip the publish step entirely. Just select Save to store your work, or select Run to save and execute your pipeline immediately. |
|Autoresolve and Azure Integration runtime |Not needed |**Simplified architecture**: No need to manage integration runtimes. Fabric handles the compute for you. |
|Self-hosted integration runtimes |On-premises Data Gateway |**Same on-premises access**: Connect to your on-premises data using the familiar On-premises Data Gateway. Learn more in our [on-premises data access guide](how-to-access-on-premises-data.md). |
|Azure-SSIS integration runtimes |To be determined |**Future capability in Fabric**: We're still working on the design for SSIS integration in Fabric. |
|Managed virtual networks and private endpoints |To be determined. |**Future capability in Fabric**: We're still working on integration for managed virtual networks and private endpoints in Fabric. |
|Expression language |Expression language |**Same expressions**: Your existing expression knowledge transfers directly. The syntax is nearly identical. |
|Authentication types |Authentication kinds |**More options**: All your popular ADF authentication methods work in Fabric, plus we've added new authentication types. |
|CI/CD |CI/CD |**Coming soon**: Full CI/CD capabilities are on the way for Fabric Data Factory. |
|ARM template export/import |Save as |**Quick duplication**: In Fabric, use "Save as" to quickly duplicate pipelines for development or testing. |
|Monitoring |Monitoring hub + Run history |**Advanced monitoring**: The monitoring hub offers a modern experience with cross-workspace insights and better drill-down capabilities. |
|Debugging |Interactive mode |**Simplified debugging**: Fabric eliminates ADF’s debug mode. You’re always in interactive mode. |
|Change Data Capture (CDC) |Copy jobs |**Incremental data movement**: Fabric manages incremental data movement through Copy jobs instead of CDC artifacts. |
|Azure Synapse Link |Mirroring |**Data replication**: Fabric replaces Azure Synapse Link with mirroring features for data replication. |
|Execute pipeline activity |Invoke pipeline activity |**Cross-platform invocation**: Fabric enhances ADF’s Execute pipeline activity with cross-platform invocation. |

## Key Features of Fabric Data Factory

In Fabric Data Factory, building your pipeline, dataflows, and other Data Factory items is incredibly easy and fast because of native integration with Microsoft's game-changing AI feature Co-Pilot. With Copilot for Data Factory, you can use natural language to easily define your data integration projects.

### Native Lakehouse and Data Warehouse integration

One of the biggest advantages of Fabric Data Factory is how it connects with your data platforms. Lakehouse and Data Warehouse work as both sources and destinations in your pipelines, making it easy to build integrated data projects.

   :::image type="content" source="media/connector-differences/source.png" alt-text="Screenshot showing lakehouse and data warehouse source tab.":::

   :::image type="content" source="media/connector-differences/destination.png" alt-text="Screenshot showing lakehouse and data warehouse destination tab.":::

### Smart email notifications with Office 365

Need to keep your team in the loop? The Office 365 Outlook activity lets you send customized email notifications about pipeline runs, activity status, and results—all with simple configuration. No more checking dashboards constantly or writing custom notification code.

:::image type="content" source="media/connector-differences/office-365-run.png" alt-text="Screenshot showing that office 365 outlook activity.":::

### Streamlined data connection experience

Fabric's modern **Get data** experience makes it quick to set up copy pipelines and create new connections. You'll spend less time configuring and more time getting your data where it needs to go.

:::image type="content" source="media/connector-differences/copy-data-source.png" alt-text="Screenshot showing that A modern and easy Get Data experience.":::

:::image type="content" source="media/connector-differences/create-new-connection.png" alt-text="Screenshot showing that how to create a new connection.":::

### Ease-of-use improvements in CI/CD experience

In Fabric, the CI/CD experience is much easier and more flexible than in Azure Data Factory or Synapse. There is no connection between CI/CD and ARM templates in Fabric making it super-easy to cherry-pick individual parts of your Fabric workspace for check-in, check-out, validation, and collaboration. In ADF and Synapse, your only option for CI/CD is to use your own Git repo. However, in Fabric, you can optionally use the built-in deployment pipelines feature that doesn't require bringing your own external Git repo.

### Next-level monitoring and insights

The monitoring experience in Fabric Data Factory is where you'll really see the difference. The monitoring hub gives you a complete view of all your workloads, and you can drill down into any activity for detailed insights. Cross-workspace analysis is built right in, so you can see the big picture across your entire organization.

:::image type="content" source="./media/connector-differences/monitoring-hub.png" alt-text="Screenshot showing the monitoring hub and the items of Data Factory.":::

When you're troubleshooting copy activities, you'll love the detailed breakdown view. Select the run details button (the glasses icon) to see exactly what happened. The Duration breakdown shows you how long each stage took, making performance optimization easier.

:::image type="content" source="./media/connector-differences/details-of-copy-activity.png" alt-text="Screenshot showing the pipeline copy monitoring results provides breakdown detail of copy activity.":::

:::image type="content" source="./media/connector-differences/duration-breakdown.png" alt-text="Screenshot showing copy data details.":::

### Quick pipeline duplication

Need to create a similar pipeline? The **Save as** feature lets you duplicate any existing pipeline in seconds. It's perfect for creating development versions, testing variations, or setting up similar workflows.

:::image type="content" source="./media/connector-differences/save-as-button.png" alt-text="Screenshot showing save as in Fabric pipeline.":::

## Related content

For more information, see the following resources:

- [Migrate from Azure Data Factory to Data Factory in Microsoft Fabric](migrate-from-azure-data-factory.md)
- [Get the full overview of Data Factory in Microsoft Fabric](data-factory-overview.md)
- [Migration best practices](migration-best-practices.md)
- [Build your first data integration in Fabric](transform-data.md)
