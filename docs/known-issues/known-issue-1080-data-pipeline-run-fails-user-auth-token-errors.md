---
title: Known issue - Data pipeline run fails due to user auth token errors
description: A known issue is posted where data pipeline run fails due to user auth token errors.
author: kfollis
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 04/08/2025
ms.custom: known-issue-1080
---

# Known issue - Data pipeline run fails due to user auth token errors

Your data pipeline runs might start to fail unexpectedly. You might face this issue if you receive an error about user auth tokens.

**Status:** Open

**Product Experience:** Data Factory

## Symptoms

Your pipelines run fails with one of the following errors:

- `Failed to get User Auth access token. The error message is: AADSTS700003: Device object was not found in the tenant.`
- `Pipelines fails with the error code: LSROBOTokenFailure. The provided grant has expired due to it being revoked, a fresh auth token is needed. The user might have changed or reset their password.`

## Solutions and workarounds

To fix the pipeline, make a small change, such as adding a description. The small change causes the new token to get refreshed, and the next pipeline run succeeds. If you have multiple pipelines that need to be updated, create a support ticket. We can help provide a script to run the update function on multiple pipelines at a time.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
