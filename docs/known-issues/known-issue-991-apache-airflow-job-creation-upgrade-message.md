---
title: Known issue - Apache Airflow job creation shows Fabric upgrade message
description: A known issue is posted where Apache Airflow job creation shows Fabric upgrade message.
author: mihart
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 01/13/2025
ms.custom: known-issue-991
---

# Known issue - Apache Airflow job creation shows Fabric upgrade message

In Data Factory, you must have a workspace tied to a valid Fabric capacity or Fabric trial to create a new Apache Airflow job. You have the correct license and try to create an Apache Airflow job. The creation fails and you receive a message asking you to upgrade to Fabric.

**Status:** Open

**Product Experience:** Data Factory

## Symptoms

When trying to create an Apache Airflow job, you receive an upgrade message and can't create the job. The upgrade message is similar to: `Upgrade to a free Microsoft Fabric Trial`.

## Solutions and workarounds

You see the upgrade message because Apache Airflow jobs aren't supported in all regions. Currently, Apache Airflow jobs are only supported in the [regions listed in the documentation](/fabric/data-factory/apache-airflow-jobs-concepts#region-availability-public-preview). To work around the limitation, change the capacity of your region to a supported region, and retry the operation. When the issue is resolved, the error message will be improved to include a clear, actionable item.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
