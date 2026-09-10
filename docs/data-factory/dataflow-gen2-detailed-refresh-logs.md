---
title: Understand Dataflow Gen2 detailed refresh logs
description: Learn how to navigate and interpret the detailed Mashup engine logs for a Dataflow Gen2 refresh.
ms.topic: how-to
ms.date: 08/07/2026
ms.reviewer: jeluitwi
ms.custom: dataflows
---

# Understand Dataflow Gen2 detailed refresh logs

Dataflow Gen2 detailed refresh logs record the operations that the Power Query Mashup engine performs during a refresh. Use these logs to investigate failures, identify slow operations, or provide diagnostic information to Microsoft support.

You can download the logs from the refresh details page. For download instructions, permissions, retention, and gateway requirements, see [Download detailed logs of the refresh](dataflows-gen2-monitor.md#download-detailed-logs-of-the-refresh).

> [!IMPORTANT]
> Detailed refresh logs can contain query expressions, endpoint information, and error details. Review and redact sensitive information before sharing the logs outside your organization or a trusted Microsoft support channel.

## Understand the archive structure

The download is a ZIP archive with a top-level folder named `DetailedLogs_<download-guid>`. The folder structure follows this pattern:

```output
DetailedLogs_<download-guid>\
  mashuplogs\
    <refresh-id-prefix>\
      <session-id-prefix>\
        <engine-instance>\
          <timestamp>_<sequence>.log
```

A refresh can use multiple engine instances, and each instance can produce multiple log files. Treat all `.log` files under `mashuplogs` as part of the same refresh.

| Path element | Description |
|---|---|
| `DetailedLogs_<download-guid>` | Wrapper folder for the downloaded archive. The GUID identifies the download request. |
| `mashuplogs` | Contains logs from the Power Query Mashup engine that executes the dataflow. |
| `<refresh-id-prefix>` | First eight hexadecimal characters of the refresh ID. |
| `<session-id-prefix>` | First eight hexadecimal characters of the session ID. |
| `<engine-instance>` | Folder for an engine instance used during the refresh, such as `vmbackzr_23-<guid>`. Different queries, retries, or parallel operations can use different instances. |

### Interpret log file names

Each log file uses the name format `yyyyMMdd_HHmmssfff_<sequence>.log`. For example, `20260804_222800000_0.log` was created on August 4, 2026, at 22:28:00.000 UTC. The engine can create extra files during a refresh, so use the timestamp and sequence value to order files from the same engine instance.

Because engine instances can run in parallel, records from different folders can overlap in time. To build a refresh-wide timeline, collect every `.log` file and sort the parsed records by their `Start` value.

## Read log entries

Each physical line in a `.log` file is a standalone JSON object. The file uses JSON Lines format, even though its file extension is `.log`. The file doesn't have an outer JSON array, and it doesn't have commas between records.

The following example is formatted across multiple lines for readability. In the downloaded log, the record appears on one line.

```json
{
  "Start": "8/4/2026 10:27:46 PM",
  "Action": "EngineHost/CreateSession/CacheManager",
  "Duration": "00:00:00.0050849",
  "ActivityId": "d8a84481-60eb-4576-ac75-803408c8195d",
  "CorrelationId": "{\"UserTenantId\":\"<tenant-id>\",\"SessionId\":\"<session-id>\",\"CorrelationId\":\"<refresh-id>\"}",
  "Process": "Microsoft.Mashup.Web.EvaluatorHost.NetCore",
  "HostProcessId": "35360",
  "Pid": "35360",
  "Tid": "6",
  "KernelCpu": "0",
  "UserCpu": "0",
  "ProductVersion": "2.157.503.0"
}
```

### Common fields

The following fields form the base record for each log entry:

| Field | Description |
|---|---|
| `Start` | UTC timestamp when the action started. |
| `Action` | Mashup engine operation represented as a slash-delimited path, such as `Engine/IO/Web/Request/GetResponse`. |
| `Duration` | Wall-clock duration of the action in `HH:mm:ss.fffffff` format. |
| `ActivityId` | Identifier that groups entries belonging to the same logical unit of work. |
| `CorrelationId` | JSON serialized as a string inside the outer JSON object. Parse this value a second time to access identifiers such as the refresh and session IDs. |
| `Process` | Process that emitted the record. Common values include `Microsoft.Mashup.Container`, which runs queries, and `Microsoft.Mashup.Web.EvaluatorHost.NetCore`, which hosts and orchestrates the session. |
| `HostProcessId` | Process ID of the evaluator host that owns the session. |
| `Pid` and `Tid` | Operating system process and thread identifiers. Use them to distinguish parallel work. |
| `KernelCpu` and `UserCpu` | CPU time reported for the action. A value of `0` is common for actions that wait on input or output. |
| `ProductVersion` | Power Query engine build that produced the entry. |

### Action-specific fields

Properties beyond the common fields depend on the value of `Action`. For example:

- Web request actions can include request and response properties.
- Failure records can include exception details.
- Compilation actions can include the query expression.

These properties don't use one fixed schema. Inspect the complete record and interpret its additional properties in the context of the `Action` value. Don't assume that a property from one action is present on other actions.

## Analyze a refresh

Use the following workflow to investigate a refresh:

1. Extract the downloaded archive without changing its folder structure.
1. Collect all `.log` files under `mashuplogs`, including files in every engine instance folder.
1. Parse each line independently as a JSON object. If your analysis tool expects one input stream, you can concatenate all log lines before parsing them.
1. Parse `CorrelationId` separately as JSON and confirm that its refresh and session IDs match the refresh you're investigating.
1. Sort records by `Start` to reconstruct the timeline across parallel engine instances.
1. Group related records by `ActivityId`, and use `Action` to follow the operations within that activity.
1. Compare `Duration`, CPU fields, and any exception details to identify long-running, input/output-bound, or failed operations.

Keep a copy of the original archive. If you contact Microsoft support, the unchanged files preserve the original diagnostic context.

## Related content

- [View refresh history and monitor your dataflows](dataflows-gen2-monitor.md)
- [Dataflow Gen2 refresh](dataflow-gen2-refresh.md)
