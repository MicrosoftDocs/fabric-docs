---
title: OneLake diagnostics
description: OneLake diagnostics makes it simple to answer "who accessed what, when, and how" across your Fabric workspaces
ms.reviewer: tompeplow
ms.author: kgremban
author: kgremban
ms.topic: overview
ms.custom:
ms.date: 10/03/2025
#customer intent: As a data steward or workspace admin, I want to monitor and analyze how data is accessed across Fabric workspaces so that I can support governance, compliance, and operational insight using OneLake diagnostics.
---

# OneLake diagnostics

OneLake diagnostics provides end-to-end visibility into how data is accessed and used across your Microsoft Fabric environment. It enables organizations to answer critical questions like "who accessed what, when, and how," supporting data governance, operational insight, and compliance reporting.

When you enable OneLake diagnostics at the workspace level, it streams data access events as JSON logs into a lakehouse of your choice within the same capacity. You can transform these logs into analytics-ready Delta tables, so your teams can build dashboards and reports that track usage patterns, top-accessed items, and trends over time.

Because all data in Fabric is unified in OneLake, diagnostics at the workspace level provide a consistent, trustworthy record of data activity regardless of how or where the data is consumed. This record includes:

- User actions in the Fabric web experience
- Programmatic access via APIs, pipelines, and analytics engines
- Cross-workspace shortcuts, with events captured from the source workspace

This unified logging approach ensures that even when data is accessed through shortcuts or across workspaces, visibility is preserved.

Diagnostic events are captured for both Fabric and non-Fabric sources. For access through the Fabric UI and the Blob or Azure Data Lake Storage (ADLS) APIs, every operation is logged. For Fabric workloads access, it records that temporary access was granted, so you can look further in the engine specific logs. This approach ensures efficient logging while maintaining visibility into how data is consumed across your organization.

## Example scenarios supported by OneLake diagnostics

- Security investigation: Track which users accessed sensitive datasets, when, and from where to identify unauthorized access attempts or unusual patterns.
- Performance troubleshooting: Diagnose latency or failure issues by correlating diagnostic events with user actions or system interactions.
- Usage analytics and optimization: Understand which datasets are most frequently accessed, by whom, and how often to support data governance and resource optimization.
- Integration monitoring: Monitor external systems interacting with OneLake (via APIs or connectors), ensuring integrations are functioning as expected and diagnosing issues when they arise.

## Configure OneLake diagnostics

### Best practice recommendations

To simplify management and improve access control, consider using a dedicated workspace to store diagnostic events. If you enable diagnostics across multiple workspaces in the same capacity, consider centralizing logs in a single lakehouse to make analysis easier.

### Prerequisites

- Create a lakehouse to store OneLake diagnostic events.
- The lakehouse must reside in the same capacity as the workspaces you want to enable diagnostics for.
- If the workspace uses private links for inbound network protection, it must be within the same virtual network as the lakehouse.
- You must be a workspace admin for the workspace where you're enabling OneLake diagnostics, and a contributor to the destination lakehouse.

### Enable OneLake diagnostics

:::image type="content" source="./media/onelake-diagnostics/enable-onelake-diagnostics.png" lightbox="./media/onelake-diagnostics/enable-onelake-diagnostics.png" alt-text="Screenshot that shows a workspace with OneLake diagnostics turned on.":::

Use the following steps to enable OneLake diagnostics:

1. Open the workspace settings.
1. Navigate to the OneLake settings tab.
1. Toggle **Add diagnostic events to a lakehouse** to **On**.
1. Select the lakehouse where you want to store the diagnostic events.

> [!NOTE]
> It takes up to one hour for diagnostic events to begin flowing into the lakehouse.

### Enable immutable diagnostic logs

You can make OneLake diagnostic events immutable, which means that no one can tamper with or delete the JSON files that contain diagnostic events during the immutability retention period. OneLake diagnostics immutability is built on the immutable storage for Azure Blob Storage capability. For more information, see [Store business-critical blob data with immutable storage in a write once, read many (WORM) state](/azure/storage/blobs/immutable-storage-overview).

:::image type="content" source="./media/onelake-diagnostics/onelake-diagnostics-immutability.png" lightbox="./media/onelake-diagnostics/onelake-diagnostics-immutability.png" alt-text="Screenshot that shows configuring the immutability period for OneLake diagnostics.":::

You configure the immutability period on the workspace that contains the diagnostic lakehouse. The immutability period applies to all events stored in this workspace.

1. Enter the required immutability period.
1. Select **Apply**.

> [!NOTE]
> After you apply the immutability policy, you can't modify or delete the files until the immutability retention period passes. Use caution when applying the policy as it can't be changed once set. 

### Change the OneLake diagnostic lakehouse

You can change which lakehouse stores your diagnostic events.

Changing the lakehouse doesn't affect existing diagnostic events. Previously captured diagnostic events remain in the original lakehouse. New events are stored in the newly selected lakehouse.

1. Open the workspace settings.
1. Go to the OneLake settings tab.
1. Select **Replace lakehouse**.
1. Choose a new lakehouse.

### Disable OneLake diagnostics

1. Open the workspace settings.
1. Navigate to the OneLake settings tab.
1. Toggle **Add diagnostic events to a lakehouse** to **Off**.

OneLake saves your diagnostic lakehouse information. If you re-enable diagnostics, it uses the same lakehouse as before.

## OneLake diagnostic events

:::image type="content" source="./media/onelake-diagnostics/onelake-diagnostic-lakehouse.png" lightbox="./media/onelake-diagnostics/onelake-diagnostic-lakehouse.png" alt-text="Screenshot that shows OneLake a lakehouse containing diagnostics events as JSON.":::

The **DiagnosticLogs** folder within the **Files** section of a lakehouse stores the OneLake diagnostic events. JSON files are written to a folder with the following path: `Files/DiagnosticLogs/OneLake/Workspaces/WorkspaceId/y=YYYY/m=MM/d=DD/h=HH/m=00/PT1H.json`

The JSON event contains the following attributes:

|   Property  | Description |
| -------- | ----------- |
| workspaceId | The GUID of the workspace with diagnostics enabled.  |
| itemId  | The GUID of the fabric item, such as the lakehouse, which performed the OneLake operation. |
| itemType | The kind of item that performed the OneLake operation. |
| tenantId |	The tenant identifier that performed the OneLake operation. |
| executingPrincipalId |	The GUID of the Microsoft Entra principle that performed the OneLake operation. |
| correlationId |	A GUID correlation identifier for the OneLake operation. |
| operationName |	The OneLake operation being performed (not provided for internal Fabric operations). For more information, see the [Operations](#operations) section. |
| operationCategory |	The broad category of the OneLake operation, for example Read. |
| executingUPN |	The Microsoft Entra unique principal name that performed the operation (not provided for internal Fabric operations). |
| executingPrincipalType |	The type of principal being used, for example User or Service Principal. |
| accessStartTime |	The time the operation was performed. Or, when temporary access is provided, the time temporary access started. |
| accessEndTime |	The time the operation was completed. Or, when temporary access is provided, the time temporary access completed. |
| originatingApp |	The workload that performed the operation. For external access, then originatingApp is the user agent string. |
| serviceEndpoint |	The OneLake service endpoint being used (DFS, Blob, or Other). |
| Resource |	The resources being accessed (relative to the workspace). |
| capacityId |	The identifier of the capacity that performed the OneLake operation. |
| httpStatusCode |	The status code returned to the user. |
| isShortcut |	Indicates if access was performed via a shortcut. |
| accessedViaResource |	The resource the data was accessed via. When a shortcut is used, this resource is the location of the shortcut. |
| callerIPAddress |	The IP address of the caller. |

### Personal data

OneLake diagnostic events include `executingUPN` and `callerIpAddress`. To redact this data, tenant admins can disable the setting **Include end-user identifiers in OneLake diagnostic logs** in the Fabric Admin Portal. When disabled, these fields are excluded from new diagnostic events.

## Frequently asked questions (FAQ)

### What happens if the destination lakehouse is deleted?

If the lakehouse selected for diagnostics is deleted:

- All workspaces that point to the lakehouse automatically disable diagnostics.
- Previously captured diagnostic data isn't deleted. The diagnostic data remains in the deleted lakehouse's storage until the workspace itself is deleted. To resume diagnostics, select a new lakehouse in the same workspace. OneLake re-enables diagnostics, and all previously captured logs remain accessible.

### What happens if the workspace is deleted?

- If a workspace is deleted, OneLake diagnostics for that workspace are also deleted.
- If the workspace is restored, the diagnostic data is restored.
- Once the workspace is permanently deleted, the associated diagnostic events are also permanently removed.

### What happens when I change capacities?

- When you move a workspace to a different capacity, diagnostic logging is disabled.
- To re-enable diagnostics, select a new lakehouse within the new capacity.

### What happens when I enable BCDR for the workspace?

When you enable Business Continuity and Disaster Recovery (BCDR), OneLake diagnostics data is replicated to the secondary region and is accessible via the OneLake APIs if a failover occurs.

### Can I audit OneLake diagnostics?

Yes. When you enable or disable workspace monitoring, or update the lakehouse, the system captures a **ModifyOneLakeDiagnosticSettings** event in the [Microsoft 365 security logs](../admin/track-user-activities.md). This event lets you audit changes to diagnostic settings.

### How much consumption does OneLake diagnostics generate?

OneLake diagnostics consumption costs are comparable to Azure Storage diagnostics when you send data to a storage account. For more information, see [OneLake consumption](onelake-consumption.md).

## Limitations

OneLake diagnostics isn't compatible with [Workspace outbound access protection (OAP)](../security/workspace-outbound-access-protection-overview.md) across workspaces. If you require OneLake diagnostics and OAP to work together, you must select a lakehouse in the same workspace.

When you configure OneLake diagnostics, the selection of the workspace honors workspace private link configuration by limiting your selection to workspaces within the same private network. However, OneLake diagnostics doesn't automatically respond to networking changes.

## Operations

### Global operations

| Operation                         | Category |
|-----------------------------------|----------|
| ReadFileOrGetBlob                 | Read     |
| GetFileOrBlobProperties           | Read     |
| GetActionFileOrBlobProperties     | Read     |
| CheckAccessFileOrBlob             | Read     |
| DeleteFileOrBlob                  | Delete   |

### Blob operations

| Operation                        | Category |
|----------------------------------|----------|
| GetBlockList                     | Read     |
| ListBlob                         | Read     |
| GetBlob                          | Read     |
| DeleteBlob                       | Delete   |
| UndeleteBlob                     | Write    |
| GetBlobMetadata                  | Read     |
| SetBlobExpiry                    | Write    |
| SetBlobMetadata                  | Write    |
| SetBlobProperties                | Write    |
| SetBlobTier                      | Write    |
| LeaseBlob                        | Write    |
| AbortCopyBlob                    | Write    |
| PutBlockFromURL                  | Write    |
| PutBlock                         | Write    |
| PutBlockList                     | Write    |
| AppendBlockFromURL               | Write    |
| AppendBlock                      | Write    |
| AppendBlobSeal                   | Write    |
| PutBlobFromURL                   | Write    |
| CopyBlob                         | Write    |
| PutBlob                          | Write    |
| QueryBlobContents                | Read     |
| GetBlobProperties                | Read     |
| CreateContainer                  | Write    |
| DeleteContainer                  | Delete   |
| GetContainerMetadata             | Read     |
| GetContainerProperties           | Read     |
| SetContainerMetadata             | Write    |
| SetContainerAcl                  | Write    |
| LeaseContainer                   | Write    |
| RestoreContainer                 | Write    |
| SnapshotBlob                     | Write    |
| CreateFastPathReadSession        | Read     |
| CreateFastPathWriteSession       | Write    |

### DFS operations

| Operation                              | Category |
|----------------------------------------|----------|
| CreateFileSystem                       | Write    |
| PatchFileSystem                        | Write    |
| DeleteFileSystem                       | Delete   |
| GetFileSystemProperties                | Read     |
| CreateDirectory                        | Write    |
| CreateFile                             | Write    |
| DeleteDirectory                        | Delete   |
| DeleteFile                             | Delete   |
| RenameFileOrDirectory                  | Write    |
| ListFilePath                           | Read     |
| AppendDataToFile                       | Write    |
| FlushDataToFile                        | Write    |
| SetFileProperties                      | Write    |
| SetAccessControlForFile                | Write    |
| SetAccessControlForDirectory           | Write    |
| LeasePath                              | Write    |
| GetPathStatus                          | Read     |
| GetAccessControlListForFile            | Read     |

### Fabric operations
| Operation                              | Category |
|----------------------------------------|----------|
| FabricWorkloadAccess                   | Read     |
