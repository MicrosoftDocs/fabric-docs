---
title: Fabric Runtime Release Channels 
description: Learn how release channels help you validate Spark runtime updates before they become the default.
ms.reviewer: arali
ms.author: eur
author: eric-urban
ms.topic: how-to
ms.custom:
ms.date: 04/10/2026
ai-usage: ai-assisted
---

# Fabric Runtime Release Channels

Fabric Runtime Release Channels provide a structured and transparent way for customers to test upcoming runtime changes before they become the default. This feature helps organizations validate their production workloads early with these new changes in early access, avoid unexpected disruptions, and gain better control over Spark runtime upgrades.

Instead of receiving silent updates that might break your production workloads, you can opt in to an early access release channel, test your workloads in a development or staging environment, and confirm compatibility before the update becomes default.

## How release channels work
Each Spark runtime has at least two public release channels:

- **Current (default) channel** – This production-grade channel runs the current, default version of the runtime. All users automatically use this channel unless they opt into early access.
- **Early Access channel** – This production-grade channel includes upcoming updates and library changes that are scheduled to become the next current or default channel. You can opt in to test your workloads against upcoming changes.

Once the designated validation window ends, the early access release channel automatically gets promoted to become the new default, and a fresh early access channel is introduced with another set of new changes — continuing the cycle. This model gives you a predictable testing window before changes become default for everyone.

> [!TIP]
> Use the early access channel to validate production workloads before updates reach the current or default channel. 

## Why release channels matter

Spark runtime updates can include library upgrades, security patches, dependency changes, or even operating system upgrades. While all updates pass internal quality checks before release, they can't capture all customer variations and use cases. Early access channels let you identify potential issues early, if there are any, and work with Microsoft by creating a support ticket to address them before updates affect your production environment.

✔ *Predictable Updates* - Customers know exactly when a new runtime becomes available and have time to validate against it.  
✔ *Reduced Risk* - Testing workloads on Early Access ensures compatibility before changes reach production.  
✔ *Better Visibility* - Customers can easily tell which runtime version they are running, reference release notes, and verify upgrade timing.  
✔ *Improved Quality & Security* - Engineering teams can iterate more confidently, incorporate security patches faster, and promote well‑tested builds to all customers.

## Choose a release channel

You can select a release channel by using the Spark configuration. Use the following property in your Spark settings or configuration:

```properties
# Prerequisite: early access doesn't use Starter Pool
spark.fabric.pools.skipStarterPools=true

# Set one of the following values:
spark.computeConf.runtime.releaseChannel=earlyAccess
# or
spark.computeConf.runtime.releaseChannel=current
```

Valid values are:

- `current` – Uses the current, generally available release (default)
- `earlyAccess` – Uses the upcoming early access release for testing

> [!NOTE]
> The release channel setting is immutable for the duration of a Spark session. To switch channels, start a new session.

## Set up and run tests on early access

To effectively test early access releases, follow these steps:

### 1. Set up a test workspace or designate an existing test environment

Create a dedicated workspace for testing the early access channel:

1. Create a new workspace or designate an existing test environment.
1. Create an Environment item and set these properties to use early access.

    :::image type="content" source="media\mrs\EnableReleaseChannelInEnvironment.jpg" alt-text="Screenshot showing properties required to change the release channel." lightbox="media\mrs\EnableReleaseChannelInEnvironment.jpg":::

1. In your notebook or Spark Job Definition, refer to the Environment item you created.
1. When the session starts, validate the usage of the early access release channel by using the following command.

    :::image type="content" source="media\mrs\VerifyUsageOfReleaseChannelInSession.jpg" alt-text="Screenshot showing early access release channel in use in the current session." lightbox="media\mrs\VerifyUsageOfReleaseChannelInSession.jpg":::

### 2. Identify representative workloads

Run workloads that represent your production pipelines:

- Ideally, run your entire production workload in the test workspace against the early access channel.
- If that's not practical, identify the critical tests and pipelines that best represent your production environment.
- Consider using existing UAT or staging environments you might already have.

### 3. Automate testing

Set up automated test runs:

- Schedule tests to run regularly (but less frequently than release updates occur).
- Monitor test results for failures that might indicate issues with the early access release.

### 4. Report issues

If you suspect a failure is caused by the early access release:

1. Compare results against the current channel to isolate the issue.
1. Note the VHD ID of the early access version you're testing.
1. Contact Microsoft support with your findings. Microsoft prioritizes early access issues and will either provide a hotfix or roll back problematic changes.

## Track release updates and VHD information

To stay informed about changes in each release channel:

1. **Identify your VHD**. To find the VHD ID you're running:
   - Check Spark UI or cluster information in your session (like `spark.conf.get("spark.synapse.vhd.id", "")`)
   - Look for VHD ID in cluster logs
   - Use this information when reporting issues to support

1. **Review release notes**. Monitor the [Spark Runtime Releases and Updates](https://github.com/microsoft/synapse-spark-runtime) repository for detailed release notes. Release notes are published per release channel, allowing customers to compare changes easily. Each release includes documented changes to libraries, components, and improvements.

Examples:
- Official-Spark3.5-default-YYYY-MM-DD.md
- Official-Spark3.5-early-access-YYYY-MM-DD.md

When the early access channel becomes the new default:
- The previous default's notes are archived.
- Early access notes are renamed as the new default notes.
- A new early access notes file is published for the next cycle.

## Frequently Asked Questions

#### **Q: Is early access lower quality?**
A: No. Early access channel must pass all standard validation gates. It is simply earlier in the release timeline.

#### **Q: Do customers have to use early access channel?**
A: No. It is entirely optional. Customers who do not opt in will continue using the default channel.

#### **Q: Can I roll back if something fails?**
A: Yes. Customers can disable the early access channel at any time using the Spark Configuration to revert to the default channel. 

#### **Q: Does early access cost extra?**
A: No. Billing remains the same as default channel usage.

#### **Q: Does early access use a custom pool only?**
A: Yes, early access only uses a custom pool because it's an opt-in feature. Unlike with Starter Pool, you notice a delay in session startup time, which applies to custom pools.


## Related content

- [Apache Spark Runtimes in Fabric](./runtime.md)
- [Lifecycle of Apache Spark runtimes in Fabric](./lifecycle.md)
- [Runtime 2.0 in Fabric](./runtime-2-0.md)
- [Runtime 1.3 in Fabric](./runtime-1-3.md)
- [Spark Runtime Releases and Updates](https://github.com/microsoft/synapse-spark-runtime)
