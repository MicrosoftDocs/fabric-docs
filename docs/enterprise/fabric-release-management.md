---
title: Microsoft Fabric release management
description: Learn about the Microsoft Fabric release management and deployment process.
author: JulCsc
ms.author: juliacawthra
ms.topic: concept-article
ms.date: 01/13/2025
---

# Release management and deployment process

Microsoft Fabric releases weekly new capabilities and feature updates to the service and on-demand targeted fixes to address customer experience and service quality issues. The approach is intended to balance speed and safety. Any code change in Microsoft Fabric passes through a few validation stages before being deployed broadly to external customers, as described in the following diagram.

:::image type="content" source="media/fabric-release-management/deployment-process.png" alt-text="A diagram that describes the release process which has six stages: Fabric test, Fabric daily, Fabric team, Microsoft wide internal, production and sovereign clouds.":::

Every change to the Microsoft Fabric code base passes through automated component and end-to-end tests that validate common scenarios and ensure that interactions yield expected results. In addition, Microsoft Fabric uses a Continuous Integration/Continuous Deployment (CI/CD) pipeline on main development branches to detect other issues that are cost-prohibitive to identify on a per-change basis. The CI/CD process triggers a full cluster build out and various synthetic tests that must pass before a change can enter the next stage in the release process. Approved CI/CD builds are deployed to internal test environments for more automated and manual validation before being included in each weekly feature update. The process means that a change is incorporated into a candidate release within one to seven days after it's completed by the developer.

The weekly feature update then passes through various official deployment rings of Microsoft Fabric’s safe deployment process. The updated product build is applied first to an internal cluster that hosts content for the Microsoft Fabric team followed by the internal cluster that is used by all employees across Microsoft. The changes wait in each of these environments for one week prior to moving to the final step, production deployment. Here, the deployment team adopts a gradual rollout process that selectively applies the new build by region to allow for validation in certain regions prior to broad application.

## Scaling the deployment

Scaling this deployment model to handle exponential service growth is accomplished in several ways, as described below.

* **Comprehensive dependency reviews** - Microsoft Fabric is a complex service with many upstream dependencies and nontrivial hardware capacity requirements. The deployment team ensures the availability and necessary capacity of all dependent resources and services in a target deployment region. Usage models project capacity needs based on anticipated customer demands.

* **Automation** - Microsoft Fabric deployments are essentially zero-touch with little to no interaction required by the deployment team. Prebuilt rollout specifications exist for multiple deployment scenarios. Deployment configuration is validated at build-time to avoid unexpected errors during live deployment roll-outs.

* **Cluster health checks** - Microsoft Fabric deployment infrastructure checks internal service health models before, during, and after an upgrade to identify unexpected behavior and potential regressions. When possible, deployment tooling attempts auto-mitigation of encountered issues.

* **Incident response process** - Deployment issues are handled like other live site incidents. Engineers analyze issues with a focus on immediate mitigation and then follow up with relevant manual or automated process changes to prevent future reoccurrence.

* **Feature management and exposure control** - Microsoft Fabric applies a comprehensive framework for selectively exposing new features to customers. Feature exposure is independent of deployment cadences and allows code for new scenario code to be deployed in a disabled state until it has passed all relevant quality bars. In addition, new features can be exposed to a subset of the overall Microsoft Fabric population as an extra validation step prior to enabling globally. If an issue is detected, the Microsoft Fabric feature management service provides the ability to disable an offending feature in seconds without waiting for more time-consuming deployment rollback operations.

## Related content

* [Microsoft Fabric concepts and licenses](licenses.md)
* [Microsoft Fabric features parity](fabric-features.md)
