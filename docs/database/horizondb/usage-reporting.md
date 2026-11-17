---
title: "Usage reporting for Microsoft Fabric HorizonDB"
description: Understand Fabric HorizonDB compute, storage, and integration consumption in the Fabric capacity model.
ms.reviewer: scoriani
ms.date: 11/06/2026
ms.topic: concept-article
ms.search.form: Fabric HorizonDB billing and utilization, PostgreSQL capacity usage
ai-usage: ai-assisted
---
# Usage reporting for Microsoft Fabric HorizonDB

Fabric HorizonDB runs in a workspace assigned to an active, supported Fabric capacity. Confirm consumption and commercial terms for your preview before evaluating a workload; the onboarding procedures don't establish rates, included allowances, or a billing policy.

> [!IMPORTANT]
> Fabric HorizonDB is in public preview. Capabilities, limits, and behavior might change before general availability. Commercial rates, meter policies, included allowances, and conversion factors can change. Use the current Fabric pricing and Capacity Metrics experiences for billable values. For more information, see [Microsoft Fabric preview features](../../fundamentals/preview.md).

## Understand the consumption boundary

Fabric HorizonDB uses service-managed compute and storage. Available compute controls are shown in the database item and can vary by preview environment.

Usage reporting separates:

- **Performance telemetry**, which explains workload behavior.
- **Capacity consumption**, which records customer usage under the published Fabric policy.

Don't calculate charges from sampled CPU charts or PostgreSQL catalog counters. Use the Fabric Capacity Metrics and billing experiences as the authoritative customer consumption surfaces.

## Compute state and usage

Where scale to zero is enabled, an idle database can pause and a connection through the same endpoint resumes it. Don't infer a billing interval or zero charges from an idle or paused state. Confirm the applicable preview policy and inspect the usage information available to your capacity administrator.

A compute control, if exposed, doesn't cap the consumption of every item in an end-to-end solution. Review database, mirroring, analytical queries, and Copy jobs separately.

## Storage consumption

Persistent primary storage is independent of active compute.

Storage can remain while:

- The database is paused.
- A deletion or failed operation is still cleaning up owned resources.
- An integration maintains its own data or metadata.

No rate, included-storage amount, or size cap is published in this article.

## Fabric integration consumption

Database compute is only one part of an end-to-end workload. Depending on the released commercial policy, separate Fabric work can include:

- Mirroring and the mirrored analytical copy.
- Queries against the SQL analytics endpoint.
- Federated queries against supported Fabric endpoints.
- Copy jobs that read, transfer, stage, and write data.
- Reports, notebooks, pipelines, and semantic models.

Monitor each participating Fabric item and workload; don't assume that database compute telemetry includes all analytical work.

## Use the Fabric Capacity Metrics experience

Open the current Fabric Capacity Metrics experience and filter to the relevant capacity, workspace, and time range. Locate the HorizonDB database and review the operation categories exposed for the release.

Correlate consumption with:

- Database lifecycle transitions.
- Current and target compute.
- Available compute-setting changes.
- Connection and query activity.
- Storage growth.
- Mirroring, federation, Copy job, report, and notebook activity.

Use exact timestamps and time zones. A chart sample might not align exactly with an operation boundary.

## Investigate unexpected usage

1. Confirm that you selected the correct capacity, workspace, item, and time range.
1. Check the displayed database lifecycle state, including idle, paused, resuming, or scaling states where available.
1. Review any compute controls exposed by your preview.
1. Check application connection pools for persistent connections that prevent auto-pause.
1. Review long-running queries, blocked transactions, and high connection counts.
1. Review primary storage growth.
1. Review mirroring, federation, Copy job, and analytical activity separately.
1. Record the item, operation, and correlation IDs for support.

A monitoring gap isn't proof of zero usage. Conversely, sampled workload telemetry isn't an invoice.

## Design for predictable consumption

- Use only compute controls available in your preview and confirm their effect on the workload.
- Close unused application and notebook connections so the database can become idle.
- Bound connection pools and recycle stale sessions.
- Optimize queries, indexes, and transaction length before increasing the maximum.
- Remove unneeded customer data through an approved retention process.
- Validate Copy job staging and avoid accidental duplicate loads.
- Monitor analytical items separately from the operational database.
- Test pause and resume behavior in clients.

## Related content

- [Control compute usage](control-compute-usage.md).
- [Monitor Fabric HorizonDB](monitor.md).
- [Fabric Capacity Metrics app](../../enterprise/metrics-app.md).
