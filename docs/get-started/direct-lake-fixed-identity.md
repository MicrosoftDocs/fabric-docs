---
title: Learn how to specify a fixed identity for a Direct Lake semantic model in Power BI and Microsoft Fabric
description: Describes how to specify a fixed identity for a Direct Lake semantic model in Power BI and Microsoft Fabric.
author: kfollis
ms.author: kfollis
ms.reviewer: ''
ms.service: powerbi
ms.subservice: powerbi-premium
ms.topic: conceptual
ms.date: 04/24/2024
LocalizationGroup: Admin
---

# Specify a fixed identity for a Direct Lake semantic model

Follow these steps to specify a fixed identity connection for a Direct Lake semantic model.

1. In your Direct Lake model's settings, expand **Gateway and cloud connections**. Note that your Direct Lake model has a SQL Server data source pointing to a lakehouse or data warehouse in Fabric.

    :::image type="content" source="media/direct-lake-fixed-identity/direct-lake-settings-fixed-identity.png" alt-text="Screenshot of Direct Lake model settings.":::

1. In the **Maps to** listbox, select **Create a connection**. A **New connection** pane appears with some data source information already entered for you. Specify a connection name.

1. In **Authentication method**, select **OAuth 2.0** or **Service Principal**,  and then specify credentials for the fixed identity you want to use.

    :::image type="content" source="media/direct-lake-fixed-identity/direct-lake-settings-fixed-identity-new-connection.png" alt-text="Screenshot of authentication credentials specified in new connection settings.":::

1. In **Single sign-on**, ensure **SSO via Microsoft Entra ID for DirectQuery queries** is *not* selected.

    :::image type="content" source="media/direct-lake-fixed-identity/direct-lake-settings-fixed-identity-new-connection-single-sign-on.png" alt-text="Screenshot of Single sign-on where option is not selected.":::

1. Configure any additional parameters if needed and then click **Create**.

1. In the Direct Lake model settings, verify the data source is now associated with the non-SSO cloud connection.

## Related content

- [Direct Lake overview](direct-lake-overview.md)  
- [Analyze query processing for Direct Lake semantic models](direct-lake-analyze-query-processing.md)  
