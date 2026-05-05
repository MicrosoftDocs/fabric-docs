---
title: Dataflow Gen2 data destinations validation rules
description: Description of validation rules in Dataflow Gen2 for data destinations within Fabric Data Factory.
ms.reviewer: whhender
ms.author: jeluitwi
author: luitwieler
ms.topic: concept-article
ms.date: 02/02/2026
ms.custom: dataflows
ai-usage: ai-assisted
---

# Dataflow Gen2 data destinations validation rules

Dataflow Gen2 in Fabric Data Factory supports various data destinations for storing transformed data. Just like with data sources, data destinations have specific validation rules to ensure data integrity and that during refresh operations, data is written correctly. This article outlines the validation rules for data destinations supported by Dataflow Gen2.

## How validation works

When you configure a data destination for a query in Dataflow Gen2, the system performs validation checks to ensure that:

- The destination query is properly configured and can be found
- The destination script returns a valid type
- Data source references in the destination query are resolved correctly
- Only one destination query exists per output

These validation checks run during the publish process and at the start of each refresh operation. If validation fails, the dataflow either fails to publish or the refresh operation is blocked until the issue is resolved.

## When validation occurs

Validation of data destinations happens at several points in the dataflow lifecycle:

| Stage | Description |
|---|---|
| **Authoring** | Basic validation occurs as you configure the data destination in the Power Query editor. |
| **Publishing** | Full validation runs when you publish your dataflow. Any validation errors prevent the publish from completing. |
| **Refresh** | Validation runs at the start of each refresh to ensure the destination is still valid and accessible. |

## Authoring validation rules for data destinations

The following table lists the authoring validation rules that apply to data destinations in Dataflow Gen2. These rules help ensure that data destinations are configured correctly.

| Validation rule | Description |
|---|---|
| **DestinationQueryNotFound** | The destination query couldn't be found. This error occurs when the internal query that contains the navigation steps to your destination is missing or has been removed. |
| **DestinationTransformQueryNotFound** | The destination transform query couldn't be found. This error occurs when a destination transform query is expected (as defined in the destination settings) but can't be located. Note that table destinations don't have a transform query. |
| **DestinationQueryChallenge** | The destination query encountered a challenge during validation. This typically indicates an authentication or authorization issue when connecting to the destination. |
| **DestinationQueryException** | The destination query encountered an exception during validation. This error indicates an unexpected error occurred while validating the destination query. |
| **DestinationQueryHasUnsupportedScript** | The destination query contains an unsupported script. This error can occur when the destination script returns an invalid type (not table, binary, or null), or when the data source resolution fails due to multiple or zero data sources referenced in the destination query, or an invalid resource kind. A known limitation is using multiple resource kinds in a single destination query, such as a Warehouse destination query that includes a step filtering with a parameter whose values come from a Lakehouse. |
| **MultipleDestinationQueries** | Multiple destination queries were found when only one is expected. This validation exists because the internal contract supports an array of destinations, but the standard authoring experience only allows configuring a single destination per query. This error might occur when editing dataflow definitions directly through CI/CD. |
| **UnknownError** | An unknown error occurred during validation, typically caused by network issues or service errors. This error isn't displayed in the UI and results in a silent failure. |

## Troubleshooting validation errors

When you encounter a validation error, use the following guidance to resolve the issue.

### DestinationQueryNotFound and DestinationTransformQueryNotFound

These errors indicate that the internal destination queries are missing. To resolve:

1. Open your dataflow in the Power Query editor.
1. Remove the existing data destination from the affected query.
1. Reconfigure the data destination by selecting **Add data destination** from the ribbon or query settings.
1. Publish the dataflow again.

### DestinationQueryChallenge

This error typically indicates an authentication issue. To resolve:

1. Verify that your connection credentials are still valid.
1. Check that you have the appropriate permissions on the destination.
1. Try editing the connection and reauthenticating.
1. If using a service principal, ensure the credentials haven't expired.

### DestinationQueryException

This error indicates an unexpected exception occurred. To resolve:

1. Check the destination service status to ensure it's available.
1. Verify that the destination table or file path still exists.
1. Review any recent changes to the destination schema or permissions.
1. Try removing and reconfiguring the data destination.

### DestinationQueryHasUnsupportedScript

This error can occur for several reasons. To resolve:

1. **Invalid return type**: Ensure your destination query returns a table, binary, or null value. Functions, lists, and other types aren't supported as destinations.
1. **Zero data sources**: Ensure your destination query has a valid data source reference.
1. **Multiple resource kinds**: Avoid mixing different resource kinds in a single destination query. For example, don't use a Warehouse destination query that filters using a parameter whose values come from a Lakehouse. Instead, use resources of the same kind or restructure your dataflow.

### MultipleDestinationQueries

This error occurs when a query has multiple destination configurations, which can happen when editing dataflow definitions directly through CI/CD. The standard authoring experience only allows one destination per query. To resolve:

1. Review the dataflow definition to identify queries with multiple destinations configured.
1. Remove duplicate destination configurations from the definition.
1. If you need to load data to multiple destinations, create separate queries for each destination.

### UnknownError

Since this error doesn't appear in the UI, you might notice it as a silent refresh failure. To troubleshoot:

1. Check the [refresh history](dataflows-gen2-monitor.md) for any additional error details.
1. Try removing and reconfiguring the data destination.
1. If the issue persists, consider recreating the dataflow.

## Best practices for data destinations

To avoid validation errors and ensure reliable data loading:

- **Test connections regularly**: Periodically verify that your destination connections are working and credentials are valid.
- **Use managed settings**: When possible, use automatic settings for new tables to let Dataflow Gen2 manage the mapping for you.
- **Monitor refresh history**: Regularly check your [dataflow refresh history](dataflows-gen2-monitor.md) to catch any issues early.
- **Document your dataflows**: Keep track of which queries load to which destinations to make troubleshooting easier.

## Related content

- [Dataflow Gen2 data destinations and managed settings](dataflow-gen2-data-destinations-and-managed-settings.md)
- [Dataflow refresh](dataflow-gen2-refresh.md)
- [View refresh history and monitor your dataflows](dataflows-gen2-monitor.md)
- [What is Dataflow Gen2?](dataflows-gen2-overview.md)
