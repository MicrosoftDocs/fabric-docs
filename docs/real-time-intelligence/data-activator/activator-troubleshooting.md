---
title: Troubleshooting errors in Activator
description: Learn the meaning of errors in Activator, how to fix them, and troubleshoot common issues in this comprehensive troubleshooting guide
ms.topic: concept-article
ms.custom: FY25Q1-Linter
ms.date: 07/17/2025
#customer intent: As a Fabric user I want to learn to troubleshoot Activator errors.
---

# Troubleshoot Fabric Activator errors

If a problem occurs with any of your Fabric Activator events, objects, or rules after you create them, then Fabric Activator sends you an email containing an error code. This article explains the meaning of the error codes that you can receive and describes the steps to take to fix the associated problems.

## Data ingestion error codes

The following error codes represent problems that can occur when Fabric Activator ingests data from Power BI semantic models and eventstream items.

### PowerBiSourceNotFoundOrInsufficientPermission

Fabric Activator can't access the Power BI semantic model for your object. This error occurs if the dataset is deleted or if permissions on the dataset change since you created the alert. To resolve the problem, check if the dataset still exists, and:

* If the dataset exists, ensure that you have permission to access it.

* If the dataset is deleted, then your objects and rules don't function. Delete then recreate them as needed on another semantic model.

### QueryEvaluationError

Fabric Activator can't query the Power BI semantic model for your object. This error occurs if the structure of the dataset changes after you create the alert. To resolve the problem, either:

* Restore the original structure of your semantic model, or
* Delete your Fabric Activator object and recreate your rule against the semantic model.

### EventHubNotFound

Fabric Activator can't find the Fabric eventstream for your object. This error occurs if the eventstream for your object is deleted, or if the connection from your eventstream to your Fabric Activator item is removed. To resolve the problem, reconnect a Fabric eventstream to your Fabric Activator object.

### EventHubException

Fabric Activator receives an exception from eventstreams when importing your data from your eventstream item. To resolve the problem, open your eventstream item and examine the connection to your Fabric Activator object and check for errors in the connection or the eventstream.

### UnauthorizedAccess

Fabric Activator isn't authorized to access the eventstream item for your Fabric Activator object. This issue occurs when permissions on the eventstream item change since you connected your Eventstream item to Fabric Activator. To resolve the problem, make sure that you have permission to access the eventstream item.

### IncorrectDataFormat

The eventstream item connected to your Fabric Activator object contains data in a format that isn't recognized by Fabric Activator. To resolve the problem, review the data in your eventstream item to ensure that it's in JSON dictionary format, as described in the [Get data from eventstreams](../event-streams/add-destination-activator.md) article.

## Rule evaluation error codes

The following error codes represent problems that can occur when Fabric Activator evaluates your rule condition to see if the condition is met.

### ProcessingLimitsReached

Your rule exceeds data processing limits for one of two reasons:

* You're sending too many events per second to your Fabric Activator object, or
* Your rule is activating too frequently.

There are two ways to resolve this problem. Try reducing the number of events per second that you're sending to your object. Or, update your rule to activate less frequently.

### WorkspaceCapacityDeallocated

The Fabric capacity for your rule's workspace is deallocated, so you no longer have Fabric capacity available to process your rule. To resolve this problem, contact your Fabric capacity administrator to ensure that you have a Fabric capacity assigned to your rule's workspace.

### DefinitionFailedValidation

This error code means that your rule definition is invalid. It indicates an internal problem with Fabric Activator. If you receive this error code, ask for assistance on the [Fabric Activator community site](https://community.fabric.microsoft.com/t5/Data-Activator-forums/ct-p/dataactivator).

### MaxDelayReached

The error code means that Fabric Activator is unable to receive incoming data for your rule for the past seven days, and isn't evaluating your rule. It indicates an internal problem with Fabric Activator. If you receive this error code, ask for assistance on the [Fabric Activator community site](https://community.fabric.microsoft.com/t5/Data-Activator-forums/ct-p/dataactivator).

### PreviewActivatorMigrationRequired

This error code means that this Fabric Activator item was created during the preview period and now needs to be manually migrated. If you receive this error code, reference [the blog post on migration timelines and next steps](https://blog.fabric.microsoft.com/blog/manual-migration-needed-for-activator-preview-items).

## Exceeded capacity error codes

The following error codes represent Fabric Activator problems that can occur when your account runs out of Fabric capacity.

### CapacityLimitExceeded
Your account exceeded the limit of your Fabric capacity for more than 24 hours. When you exceed your capacity, throttling policies are applied and Fabric Activator pauses rules evaluation, background operations, and activations. To resolve this problem, contact your capacity administrator and ask them to review capacity usage and upgrade as needed. Once your capacity issue is resolved, make sure to reactivate your rules.

Learn more with [Understand your Fabric capacity throttling](https://go.microsoft.com/fwlink/?linkid=2293008).

## Alert and Action Error codes

The following error codes represent problems that can occur when Fabric Activator attempts to send an alert, or to start a Power Automate flow, after a rule condition is met.

### UserNotFound

This error code means that Fabric Activator couldn't locate the recipient of your rule's email or Teams alert. To resolve this problem, review the recipient field on your rule's **action** and make sure that it's set to a valid member of your organization.

### EmptyEmailPropertyForUser

This error code means that Fabric Activator couldn't execute the test action because your email address is not defined in your Azure profile. To resolve this problem, add your email address to your Azure profile.

### RecipientThrottled

This error code means that Fabric Activator couldn't alert the recipient of your rule because the recipient receives too many messages from Fabric Activator. The article [Fabric Activator limitations](activator-limitations.md) lists the maximum number of messages that you can send from a rule. To resolve this problem, change the definition of your rule so that it activates less often.

### FabricItemThrottled

This error code means that Fabric Activator couldn't execute the Fabric job defined in your rule because there were too many activations from Fabric Activator in a given time. The article [Fabric Activator limitations](activator-limitations.md) lists the maximum number of executions per user. To resolve this problem, change the definition of your rule so that it activates less often. If you have a use case that requires higher frequency than the limit, share the use case and the frequency required in [Activator Community](https://aka.ms/activatorcommunity).

### BotBlockedByUser

This error code means that you have a rule that sends a Teams alert, and the recipient of the alert blocks the Fabric Activator bot from sending them messages. To resolve this problem, ask the recipient to unblock the bot.

### TeamsAppBlockedInTenant

This error code means that you have a rule that sends a Teams alert, and your Teams administrator blocks the Fabric Activator app. To resolve this problem, ask your Teams administrator to unblock the Fabric Activator Teams app.

### BotNotInstalledInTeamsChatOrChannel

This error code means that you have a rule that sends notifications a Teams chat or channel. To resolve this problem, make sure Fabric Activator bot is installed in the target chat or channel. 

### ReflexAppDisabledInTenant

This error code means that "Reflex - Public" application was disabled by your organization. To resolve this problem, ask your Entra administrator to unblock the app.

### MessageRecipientAmbiguous

This error code means that the notification couldn't be delivered because multiple users share the same email address or UPN (user principal name). To resolve this problem, reach out to your Entra administrator to resolve the ambiguity.

### OfficeSubscriptionMissing

This error code means that Fabric Activator couldn't send the alert on your rule because you don't have a Microsoft Office subscription. To resolve the problem, get a Microsoft Office subscription.

### TeamsDisabled

This error code means that you have a rule that sends a Teams alert, and that the administrator of your Microsoft Entra tenant blocks the Microsoft Teams service principal (SP). To resolve the problem, contact your Microsoft Entra administrator and request that they unblock the Teams SP.

### TeamsChatOrChannelNotFound

This error code means that Fabric Activator couldn't locate the Teams channel or chat you defined. To resolve this problem, review your rule's **action** and make sure that it is set to a valid Teams chat/channel.

### FabricItemNotFound

This error code means that Fabric Activator couldn't locate the Fabric item you have defined. To resolve this problem, review your rule's **action** and make sure that it is set to an existing Fabric item.

### FabricItemExecutionUnauthorized

This error code means that there was an unauthorized error while executing the Fabric item. To resolve this problem, reselect the Fabric item and save the rule again.

### FabricItemExecutionNoPermissions

This error code means that there was a permission error while executing the Fabric Item. To resolve this problem, verify your access rights to the Fabric item or contact the Fabric item’s creator to request the necessary permissions.

## Common issues, symptoms, and remediations
While Activator abstracts away much of the complexity behind real-time event processing, implementations at scale might encounter data, configuration, or orchestration-related issues that require systematic troubleshooting. This section provides a deep dive into how to identify, analyze, and resolve common operational problems in Activator.

| Symptom | Possible Cause | Remediation |
|-------- | ---------------| ------------ | 
| Rules not firing   | Eventstream not pushing data, incorrect object keys, rule conditions never met | Validate stream connectivity, use rule preview, check object schema mapping |
| Alert spam or repeated triggers | Use of stateless operators (for example, less than) instead of stateful ones (for example, decreases) | Redesign rules to use transitional operators like `DECREASES`, `BECOMES`, or enable debounce logic |
| No actions triggered | Misconfigured pipeline/notebook/action target, or rule not satisfied | Check action bindings, ensure trigger payloads match pipeline expectations |
| Unexpected latency (over 30s) | Cold start on Activator, high object cardinality, or Eventstream bottlenecks | Warm up Activator with test events, review object cardinality, check Eventstream diagnostics |
| “No data” errors after 10 min | Eventstream source is idle or disconnected | Monitor Eventstream source health; implement heartbeat detection rules to proactively catch these outages |
| Rules firing too frequently in test mode | Using synthetic or replayed test data with fast-changing states | Use controlled, deduplicated test data; apply filters to focus on realistic objects/events |

#### Diagnosing issues with built-in tools

- **Preview rules** before activating, use the preview feature to see how often a rule would have fired on historical events. This approach is critical for:

  - Identifying misconfigured filters
  - Detecting high-frequency triggers
  - Ensuring correct object grouping

- **Monitor eventstream** by using the Eventstream’s monitoring panel to:

  - Confirm event flow from upstream sources
  - Check timestamps and payload structure
  - Identify dropouts or format mismatches

- **Review triggered actions logs**:
  Actions triggered by Activator (pipelines, flows) log execution metadata:

  - Timestamp, payload, rule that triggered
  - Execution success/failure (via pipeline run history or Power Automate logs)

- **Detect schema mismatch**:
  Activator might silently fail to bind rules to data if:
  - The field name is misspelled
  - The value types (for example, string vs. numeric) are mismatched Use Eventstream’s live sample view to confirm schema correctness before rule creation.

#### Working with Microsoft Support

When issues persist and require escalation, open a support ticket and include the following information:

- Workspace and activator name
- Eventstream source details
- Rule IDs and their conditions
- Approximate timestamps and affected object keys
- Triggered action configuration and expected outcome

Include the following information if possible:

- Export sample event payloads (sanitized)
- Capture screenshots of rule preview and monitoring panels
- Note whether the issue is reproducible on other activators or environments

#### Best Practices to Prevent Issues

- Always use rule preview before going live, especially on high-volume streams
- Prefer stateful operators to avoid repeated triggering
- Implement heartbeat rules to catch silent stream failures
- Periodically audit object key cardinality and streamline schemas
- Design rules with monitoring and fallback in mind (for example, alert if rule hasn't fired in X time)


## Related content

* [What is Fabric Activator?](activator-introduction.md)
* [Get data for Fabric Activator from Power BI](activator-get-data-power-bi.md)
* [Assign data to objects in Fabric Activator](activator-assign-data-objects.md)
* [Create Fabric activators](activator-create-activators.md)
* [Fabric Activator tutorial using sample data](activator-tutorial.md)

You can also learn more about Microsoft Fabric:

* [What is Microsoft Fabric?](../../fundamentals/microsoft-fabric-overview.md)
