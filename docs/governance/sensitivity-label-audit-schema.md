---
title: "Audit schema for sensitivity labels in Microsoft Fabric"
description: "This article documents the information in the Fabric auditing schema that's specific to sensitivity labels."
author: msmimart
ms.author: mimart
ms.service: fabric
ms.topic: concept-article #Don't change.
ms.date: 08/04/2024

#customer intent: As a member of a security and compliance team, I want to know which sensitivity label operations are audited and understand the information that appears in the audit entries.

---

# Audit schema for sensitivity labels in Fabric

Whenever a sensitivity label on a Fabric item is applied, changed, or removed, that activity is recorded in the audit log for Fabric, where you can track it. For information about tracking activities in the audit log, see [Track user activities in Microsoft Fabric](../admin/track-user-activities.md).

This article documents the information in the Fabric auditing schema that's specific to sensitivity labels. It covers the following activity keys:

* SensitivityLabelApplied
* SensitivityLabelChanged
* SensitivityLabelRemoved

## SensitivityLabelEventData

|Field|Type|Must appear in the schema|Description|
|---------|---------|---------|---------|
|SensitivityLabelId|Edm.Guid||The guid of the new label. This field is only present when the activity key is SensitivityLabelApplied or SensitivityLabelChanged.|
|OldSensitivityLabelId|Edm.Guid||The guid of the label on the item before the action. This field is only present when the activity key is SensitivityLabelChanged or SensitivityLabelRemoved.|
|[ActionSource](#actionsource)|Edm.Enum|Yes|This field indicates whether the label change is the result of an automatic or manual process.|
|[ActionSourceDetail](#actionsourcedetail)|Edm.Enum|Yes|This field gives more detail about what caused the action to take place.|
|[LabelEventType](#labeleventtype)|Edm.Enum|Yes|This field indicates whether the action resulted in a more restrictive label, less restrictive label, or a label of the same degree of sensitivity.|

## ArtifactType

This field indicates the type of item the label change took place on.

|Value |Field  |
|--|---------|
|1|Power BI dashboard|
|2|Power BI report|
|3|Power BI semantic model|
|7|Power BI dataflow|
|11|Datamart|
|12|Fabric item|

## ActionSource

This field indicates whether the label change is the result of an automatic or manual process.

|Value |Meaning  |Description  |
|--|---------|---------|
|2|Auto|An automatic process performed the action.|
|3|Manual|A manual process performed the action.|

## ActionSourceDetail

This field gives more detail about what caused the action to take place.

|Value |Meaning  |Description  |
|--|---------|---------|
|0|None|There are no other details.|
|3|AutoByInheritance|The label change took place as a result of an automatically triggered inheritance process.|
|4|AutoByDeploymentPipeline|The label change took place automatically as a result of the deployment pipeline process.|
|5|PublicAPI|The label change action was performed by one of the following Fabric public admin REST APIs: [bulkSetLabels](/rest/api/fabric/admin/labels/bulk-set-labels), [bulkRemoveLabels](/rest/api/fabric/admin/labels/bulk-remove-labels).|

## LabelEventType

This field indicates whether the action resulted in a more restrictive label, less restrictive label, or a label of the same degree of sensitivity.

|Value |Meaning  |Description  |
|--|---------|---------|
|1|LabelUpgraded|A more restrictive label was applied to the item.|
|2|LabelDowngraded|A less restrictive label was applied to the item.|
|3|LabelRemoved|The label was removed from the item.|
|4|LabelChangedSameOrder|The label was replaced by another label with the same level of sensitivity.|

## Related content

* [Track user activities in Fabric](../admin/track-user-activities.md)