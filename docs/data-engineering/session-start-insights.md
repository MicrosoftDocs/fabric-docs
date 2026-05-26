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

Fast session startup is critical for interactive analytics. Fabric starter pools are designed to deliver Spark sessions in approximately 5 seconds by default. However, when that target isn't met, you might have little visibility into why.

Session start insights closes that gap by making session acquisition transparent, debuggable, and actionable.

This article helps you understand:

- Why sessions don't always start in 5 seconds
- What session start insights surfaces in the product
- How to use the session details view to diagnose delays

## Why sessions don't always start in 5 seconds

In practice, session startup delays are almost always driven by user-side configurations, not platform regressions. Common causes include:

- **Custom compute configurations** that prevent reuse of prewarmed starter pools.
- **Preinstalled libraries or environment dependencies** that require cluster customization.
- **Fabric Environments library publishing mode**: If the attached environment uses Full mode, the library snapshot deploys at session start (typically 1 to 3 minutes). If the environment uses Quick mode, libraries install when the first code cell runs, which also adds startup time.
- **Managed VNets or private networking** that force isolated cluster provisioning.
- **Unexpected high regional demand** triggering fallback to on-demand clusters.

## What session start insights delivers

Until now, users could see that a session was "starting," but not what was happening under the hood.

With this feature, Fabric surfaces clear, explicit reasons for session startup behavior directly in the product experience:

- Whether the session was served from a starter pool or required an on-demand cluster.
- The exact reason a fast-path session couldn't be used—for example, libraries, networking, or custom configurations.
- Whether environment libraries were applied through Quick mode (installed at session start) or Full mode (deployed from a prebuilt snapshot).
- Where time was spent during session acquisition.

## Use the session details view to diagnose delays

To review session startup details for a notebook:

1. Open your notebook in the Fabric workspace.

1. Navigate to the notebook's session status or monitoring pane.

1. Select **Session Details** for the active or recent session.

1. Review the **delay reason** and **session source** (starter pool vs. on-demand).

This makes it immediately clear whether the delay was:

- **Expected** due to configuration choices.
- **Related to libraries or networking** — actionable signals to optimize environment setup. For example, if the delay reason shows Full mode snapshot deployment, you can reduce startup time by attaching a [custom live pool](custom-live-pools-overview.md). If Quick mode library installation caused the delay, consider moving stable dependencies to Full mode.

> [!TIP]
> The notebook Resources folder and inline library installations (such as `%pip install`) aren't affected by environment publishing. They install during the active session and don't appear as environment-related delay reasons in session insights.

> [!TIP]
> If session details shows that a starter pool couldn't be used due to library dependencies, consider moving infrequently changing libraries into a published Fabric environment to avoid repeated cluster customization on each session start.

## Related content

- [Manage libraries in Fabric environments](environment-manage-library.md)
- [High concurrency mode in Apache Spark for Fabric](high-concurrency-overview.md)
- [Configure high concurrency mode for Fabric notebooks](configure-high-concurrency-session-notebooks.md)
