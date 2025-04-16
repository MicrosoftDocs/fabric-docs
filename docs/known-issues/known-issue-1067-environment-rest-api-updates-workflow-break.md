---
title: Known issue - Environment REST API updates might cause your workflow to break
description: A known issue is posted where environment REST API updates might cause your workflow to break.
author: kfollis
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 04/15/2025
ms.custom: known-issue-1067
---

# Known issue - Environment REST API updates might cause your workflow to break

We're releasing a new version for the environment REST APIs on April 6, 2025. This release introduces several new APIs, removes several APIs, and updates request and response contracts for existing APIs. The APIs to be removed are supported through June 30, 2025. The existing API contract updates to the contracts might break your current workflows.

**Status:** Fixed: April 15, 2025

**Product Experience:** Data Engineering

## Symptoms

On April 6, 2025, your current workflows might break if you use one of the following APIs:

- Get environment (Response contract)
- Publish environment (Response contract)
- List staging libraries (Response contract)
- List staging Spark settings (Response contract)
- List published libraries (Response contract)
- List published Spark settings (Response contract)
- Update Spark settings (Request and response contract)

On June 30, 2025, the following APIs will no longer work:

- Upload staging libraries
- Delete staging libraries

## Solutions and workarounds

You need to fix your workflows to use the updated contracts and APIs. More details are provided in the [Environment Public API documentation](/fabric/data-engineering/environment-public-api).

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
