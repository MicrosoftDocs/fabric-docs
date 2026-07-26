---
title: "Troubleshoot the Mirror Azure Monitor Feature in Fabric (Preview)"
description: Resolve common issues with mirrored Azure Monitor items in Microsoft Fabric, including missing data, tables in an error state, authentication failures, and item creation errors.
ms.reviewer: nirarazy, ilanawaitser
ms.date: 07/22/2026
ms.topic: troubleshooting-general
ai-usage: ai-assisted
ms.search.form: Fabric Mirroring
---

<!--
================================================================================
HOLD: Do not merge until the Azure Monitor data in Fabric public preview is
publicly announced. Content is staged ahead of the launch.

Source: support TSG (Shahar Aharoni, with Nir Arazy and Gal Haggiag) and the
7/20 Nir sync. Internal support-only content (telemetry sources, escalation
routing, and checkpoint internals) is intentionally omitted from this public
article. Reviewer: Nir Arazy.
================================================================================
-->

# Troubleshoot the Mirror Azure Monitor feature in Microsoft Fabric (preview)

This article helps you diagnose connection, table discovery, item health, data availability, and Lakehouse shortcut issues for mirrored Azure Monitor data in Microsoft Fabric. For a short checklist of connection setup failures, see [Troubleshoot connection failures](azure-monitor-tutorial.md#troubleshoot-connection-failures) in the tutorial.

> [!IMPORTANT]
> Mirrored Azure Monitor items in Fabric are in **public preview**. Behavior and error messages might change before general availability.

## Troubleshooting flow

Work through these checks in order:

1. **Check item creation.** If creation fails, use the [connection creation errors](#connection-creation-errors) guidance. Otherwise, continue to table discovery.
1. **Check table discovery.** If a table isn't visible, verify ingestion, allow for discovery delay, and confirm when the table was created.
1. **Check item health.** If the item or a table shows an error, verify source ingestion, compare with healthy tables, and determine whether one or multiple tables are affected.
1. **Check data availability.** If data isn't visible in Fabric, compare the latest timestamps in Log Analytics and Fabric.
1. **Check the consumption experience.** If the mirrored item is healthy but a Lakehouse shortcut fails, troubleshoot the shortcut separately.

## Connection creation errors

Fabric shows a connection error on the connection screen as a customer-facing message, without the HTTP status code. The status code appears in the detailed error information. Use the status code to map the error to a recommended action.

| HTTP status | Meaning | Recommended action |
|-------------|---------|--------------------|
| **400** | The workspace identifier is missing or malformed. | Confirm that the Log Analytics workspace ID is a valid GUID and belongs to the intended workspace. |
| **401** | Authentication failed because the sign-in token is missing, expired, or associated with another tenant. | Sign out, sign in again, and verify that you selected the correct tenant. |
| **403** | The signed-in identity doesn't have the required access. | Verify the identity's Azure role-based access control permissions on the Log Analytics workspace. |
| **404** | The workspace couldn't be found. | Confirm that the workspace exists and that the workspace ID is correct for the signed-in tenant. |
| **429** | The service is throttling requests. | Wait briefly, and then retry. If throttling continues, reduce repeated requests and check service health. |
| **5xx** | A temporary service-side error occurred. | Retry later, and check Azure and Fabric service health if the problem persists. |
| **Other** | The connection failed for an unknown reason. | Verify the workspace ID, tenant, and permissions, and record the full error message and timestamp. |

## Unexpected table visibility

During table discovery, a table might not appear in the mirrored item, only some tables appear, or a table shows a red X. New data must flow into a table frequently for it to appear in the list and be available to select.

Check the following conditions:

- Is data actively flowing into the table in Log Analytics?
- Was the table created before or after onboarding?

## Item lifecycle issues

### A table is missing from the mirrored item

A table that you expect doesn't appear in the mirrored item. Common causes:

| Cause | Description |
|-------|-------------|
| No streaming data | The table isn't receiving records. |
| Discovery or synchronization delay | An existing eligible table hasn't refreshed in Fabric yet. |
| Table created after onboarding | A new table isn't discoverable yet. |
| Insufficient connection permission | The connection identity can't enumerate tables. |
| Metadata issue | Unexpected backend behavior. |

A **discovery or synchronization delay** applies when the table existed before onboarding, has active ingestion, and is eligible for mirroring, but hasn't appeared in Fabric metadata yet.

A table **created after onboarding** might not have a backing container or be discoverable yet. For example, a custom table exists but no records are ingested yet.

**Insufficient connection permission** applies when the connection uses a workspace identity or service principal that lacks read access. Grant the identity the **Reader** role on the Log Analytics workspace, then reopen the item.

To validate:

1. Verify the table exists in Log Analytics.
1. Verify recent ingestion.
1. Determine when the table was created.
1. Compare behavior with healthy tables.

### A table shows a red X in the item

Check the following items:

1. Verify the source table is actively receiving data.
1. Compare with healthy tables.
1. Determine whether the issue affects one table or many.
1. Collect diagnostics.

Open a support case if ingestion is active, other tables are healthy, and the issue persists.

### A table is visible but returns no data

To validate:

1. Query the table directly in Log Analytics.
1. Compare the latest timestamps in Log Analytics and Fabric.
1. Determine whether the issue affects one table or all tables.

During public preview, mirrored items show **new data only**. Historical data from before the table was mirrored isn't backfilled, so a table stays empty until new data streams in on the Azure side.

## A column such as `_ResourceId` is missing

A query fails or returns null because an expected system column isn't present. Mirrored tables currently omit three Azure Monitor system columns:

| Column | Type |
|--------|------|
| `_ResourceId` | string |
| `_SubscriptionId` | string |
| `Type` | string |

## Data freshness

Data exists in Log Analytics but isn't visible in Fabric yet. Mirrored data typically becomes available in Fabric within about **15 minutes**, although no formal service-level agreement applies. To diagnose:

- Compare the latest timestamps in Log Analytics and Fabric.
- Determine whether one table or all tables are affected.

## Lakehouse shortcut issues

### A table won't expand in a Lakehouse

Symptoms include a red X in the Lakehouse, a table that won't expand, missing columns, or a table that's visible but inaccessible. If the table is healthy in the mirrored Azure Monitor item and fails only in the Lakehouse, treat it as a OneLake shortcut issue rather than an Azure Monitor issue, and troubleshoot the shortcut separately.

### Slow or unpredictable Lakehouse performance

Symptoms include slow query startup, slow table expansion, inconsistent latency, and intermittent degradation. Lakehouse shortcut access depends on Delta metadata resolution, transaction log replay, checkpoint generation, and shortcut resolution. Performance variability doesn't necessarily indicate data loss or ingestion failure.

## Workspace identity authentication fails

A connection that you create by using the **workspace identity** authentication mode fails to validate.

Workspace identity authentication has a known issue during early public preview. A fix is rolling out.

To unblock this issue, create the connection by using **service principal** (cross-tenant) or **organizational account** (same-tenant) authentication. Switch to workspace identity after the fix ships.

<!-- REVIEWER NOTE (remove before merge): 7/20 Nir - Workspace identity fix targeted between 7/24 and 7/29. Remove this section once the fix is confirmed live. -->

## Sharing the item fails

You try to share the mirrored item, but the recipient can't access it. Sharing also doesn't send a notification email, even when you select the option to send one.

During public preview, the person you share the item with currently needs at least the **Contributor** role on the Fabric workspace. A fix to allow lower-privilege sharing is rolling out. Until then, use the OneLake security workaround if the Contributor role is too broad. Because the notification email isn't sent, tell the recipient directly that the item is shared and give them the link.

## Known limitations

| Limitation | Notes |
|------------|-------|
| Newly created tables | Might not appear until ingestion and discovery complete. |
| Discovery or synchronization delay | Metadata refresh can take time for otherwise eligible tables. |
| Tables without active ingestion | Don't appear until ingestion is confirmed in Log Analytics. |
| Lakehouse table expansion | If the mirrored item is healthy and the failure is Lakehouse-only, route it to OneLake. |
| Lakehouse performance variability | Expected because of shortcut, metadata, and checkpoint behavior. |
| Read-only access | Mirrored data is analytics-only. Write and update scenarios aren't supported. |

## Related content

- [Mirroring Azure Monitor in Microsoft Fabric](azure-monitor.md)
- [Tutorial: Configure a Microsoft Fabric mirrored Azure Monitor item](azure-monitor-tutorial.md)
- [Azure Monitor Logs overview](/azure/azure-monitor/logs/data-platform-logs)
