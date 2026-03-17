---
title: Session start insights for Fabric Data Engineering
description: Learn how session start insights in Microsoft Fabric Data Engineering makes Spark session acquisition transparent, debuggable, and actionable.
ms.reviewer: saravi
ms.topic: concept-article
ms.date: 03/18/2026
ai-usage: ai-assisted
---

# Session start insights for Fabric Data Engineering

**Applies to:** [!INCLUDE[fabric-de-and-ds](includes/fabric-de-ds.md)]

Fast session startup is critical for interactive analytics. Fabric starter pools are designed to deliver Spark sessions in approximately 5 seconds by default. However, when that target isn't met, users have historically had little visibility into why.

Session start insights closes that gap by making session acquisition transparent, debuggable, and actionable.

This article helps you understand:

- Why sessions don't always start in 5 seconds.
- What Session Start Insights surfaces in the product.
- How to use the session details view to diagnose delays.

## Why sessions don't always start in 5 seconds

In practice, session startup delays are almost always driven by user-side configurations, not platform regressions. Common causes include:

- **Custom compute configurations** that prevent reuse of prewarmed starter pools.
- **Preinstalled libraries or environment dependencies** that require cluster customization.
- **Managed VNets or private networking** that force isolated cluster provisioning.
- **Unexpected high regional demand** triggering fallback to on-demand clusters.

## What session start insights delivers

Until now, users could see that a session was "starting," but not what was happening under the hood.

With this feature, Fabric surfaces clear, explicit reasons for session startup behavior directly in the product experience:

- Whether the session was served from a starter pool or required an on-demand cluster.
- The exact reason a fast-path session couldn't be used—for example, libraries, networking, or custom configurations.
- Where time was spent during session acquisition.

## Use the session details view to diagnose delays

To review session startup details for a notebook:

1. Open your notebook in the Fabric workspace.

1. Navigate to the notebook's session status or monitoring pane.

1. Select **Session Details** for the active or recent session.

1. Review the **delay reason** and **session source** (starter pool vs. on-demand).

This makes it immediately clear whether the delay was:

- **Expected** due to configuration choices.
- **Related to libraries or networking** — actionable signals to optimize environment setup.

> [!TIP]
> If session details shows that a starter pool couldn't be used due to library dependencies, consider moving infrequently changing libraries into a published Fabric environment to avoid repeated cluster customization on each session start.

## Related content

- [High concurrency mode in Apache Spark for Fabric](high-concurrency-overview.md)
- [Apache Spark compute in Microsoft Fabric](spark-compute.md)
- [Configure high concurrency mode for Fabric notebooks](configure-high-concurrency-session-notebooks.md)
