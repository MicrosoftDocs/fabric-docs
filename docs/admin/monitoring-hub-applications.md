---
title: "Monitor Applications in Monitor Hub (Preview)"
description: Learn how to monitor application health and usage in the Monitor hub by using always-on platform metrics and full observability onboarding.
ms.topic: how-to
ms.date: 08/20/2026
ai-usage: ai-assisted
#customer intent: As a Fabric administrator, I want to monitor application health and usage in the Monitor hub so that I can detect issues, track usage trends, and identify regressions after release windows.
---

# Monitor applications in the Monitor hub

The Monitor hub provides a guided way to monitor the health and usage of your applications in Microsoft Fabric. Use it to catch service issues early, track usage trends, and spot regressions after a release—without setting up monitoring for each application yourself.

This article shows you how to review baseline health and usage signals for an application, how the available metrics map to common monitoring scenarios, and how to reach richer diagnostics by onboarding to full observability.

> [!IMPORTANT]
> Application monitoring in the Monitor hub is currently in preview.
> See the [Supplemental Terms of Use for Microsoft Azure Previews](https://azure.microsoft.com/support/legal/preview-supplemental-terms/) for legal terms that apply to Azure features that are in beta, preview, or otherwise not yet released into general availability.

## Monitoring tiers

Monitoring comes in two tiers:

- **Always-on platform observability (default)**: Available out of the box, with no extra onboarding. This tier provides platform metrics for quick health checks, trend monitoring, and basic issue detection.

- **Full observability (onboarding-based)**: Available when you enable Workspace monitoring and advanced telemetry onboarding. This tier adds rich logs and traces, deeper dimensions and diagnostics, broader troubleshooting workflows, and more advanced alerting and root-cause analysis.

## Prerequisites

Before you begin, make sure that you have the following:

- Access to Fabric and permission to open the Monitor hub.
- An application or workload that you can view in the Monitor hub.
- For full observability, Workspace monitoring and advanced telemetry onboarding enabled for your workspace.

## Get started with monitoring

The default, always-on experience is low-friction and immediately useful. To start monitoring an application:

1. Sign in to [Microsoft Fabric](https://app.fabric.microsoft.com).

1. Open **Monitor** from the navigation pane. Switch to the new the Monitor hub experience if you're still in the classic view.

1. Select **Applications**.

1. Use the filters and search box to find your application.

1. Select the application to open the application experience view.

1. On the **Dashboard**, review the health signal metrics:

   - Sign-ins count
   - Query count
   - Query error count
   - Query error rate
   - Average duration
   - App load

1. Use the charts to identify regressions, then drill into deeper diagnostics if your workspace has full observability onboarding.

<!-- SCREENSHOT PLACEHOLDER: The Application Experience view in the Monitor hub, showing the health signal metric charts. Capture and add a :::image reference before publication. -->

## Map metrics to monitoring scenarios

The always-on metrics help you address common monitoring scenarios. Use the following table to identify the relevant metrics for each scenario.

| Scenario | Metrics to use |
|---|---|
| Is healthy right now? | Query error count, query error rate, and average duration trends. |
| Is usage stable and growing as expected? | Sign-ins count, app load, and query count. |
| Are regressions happening after release windows? | Correlate changes in query errors, query error rate, and average duration with deployment timing. |

## Considerations and limitations

The following limitations apply to the preview:

- Scope is intentionally backend-first. The preview defers some frontend and function-level scenarios.
- The always-on tier doesn't fully expose advanced trace-level workflows. Enable full observability through Workspace monitoring and advanced telemetry onboarding to access rich logs and traces.

## Related content

- [What is the Monitor hub?](monitoring-hub.md)
- [Monitor jobs in the Monitor hub](monitoring-hub-jobs.md)
