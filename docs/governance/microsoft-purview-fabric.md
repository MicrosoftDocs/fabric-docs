---
title: Use Microsoft Purview to govern Microsoft Fabric
description: This article describes how Microsoft Purview and Microsoft Fabric work together to deliver a complete, governed data flow.
ms.reviewer: viseshag
ms.author: whhender
author: whhender
ms.topic: overview 
ms.date: 3/31/2023
---

# Use Microsoft Purview to govern Microsoft Fabric

Microsoft Purview and Microsoft Fabric are part of the Microsoft Intelligent data platform that allows you to store, analyze, and govern your data. With Microsoft Fabric and Microsoft Purview together you're able to govern your entire estate and lineage of data. From data source down to the Power BI report.
Discover your Fabric artifacts with no other Purview permissions required!

End to end data protection through your entire data journey.

## What is Microsoft Purview?

Microsoft Purview is a family of data governance, risk, and compliance solutions that can help your organization govern, protect, and manage your entire data estate. Microsoft Purview solutions provide integrated coverage and help address the recent increases in remote user connectivity, the fragmentation of data across organizations, and the blurring of traditional IT management roles.

## Microsoft Purview and Fabric together

Users can discover and manage Fabric artifacts in the Microsoft Purview portal without any additional Microsoft permissions.

Microsoft Purview Information Protection allows you to discover and classify data at scale, with built in labeling and protecttion and encryption. Set sensitivity label on datasets, reports, PBIX files, datamarts (new), etc. Protect data when export to Excel, PowerPoint, Word, PBIX and PDF files.

Unified policies across your data estate.

Microsoft Purview Data Loss Prevention allows you to prevent accidental or unauthorized sharing of sensitive data. Automatically enforce compliance with regulations and internal policies across cloud and on-premises. Extend DLP policy to both Microsoft and non-Microsoft endpoints, on premises file shares, user apps, browsers, and services. Apply flexible policy administration to balance ​
user productivity.

Use Data Estate Insights to manage your data governance journey.

The Microsoft Purview Data Catalog.

The Microsoft Purview Data Map

## Microsoft Purview Hub

The Microsoft Purview Hub allows you to see insights about your Fabric data inside Fabric itself! It also acts as a gateway between Fabric and Microsoft Purview so you can govern the rest of your data estate as well.

[Link to hub documentation](use-microsoft-purview-hub.md)

### Your role in the hub

The Microsoft Purview Hub in Fabric is dynamic, adjusting based on your role in Fabric

Explanation of roles. [Maybe a link to roles documentation in Fabric](../placeholder.md).

#### Admin view in the hub

Access to [Microsoft Purview Insights](use-microsoft-purview-hub.md#microsoft-purview-insights).
Access to [reports](use-microsoft-purview-hub.md#reports).
Access to [links](use-microsoft-purview-hub.md#other-links).

#### Data owner view in the hub

Access to [Microsoft Purview Insights](use-microsoft-purview-hub.md#microsoft-purview-insights).
Access to [reports](use-microsoft-purview-hub.md#reports).
Access to [links](use-microsoft-purview-hub.md#other-links).

#### Consumer role in the hub

Access to [reports](use-microsoft-purview-hub.md#reports).
Access to [links](use-microsoft-purview-hub.md#other-links).

## Microsoft Purview Permissions

•	Free tire- every free Trident user will be able to see on Purview all the artifacts that he has access to in Trident.
He would be able to take actions, but it would be limited.
Open questions:
	What are the limitations, what actions can the user take? 
They should be able to add description, contacts and other annotations like terms and managed attributes. Description and contacts is a stretch goal for 5/24 and annotations will land 6/30 as per current ETA.  However, they cannot add labels and classifications at this time.
	What will he sees in Data estate Insights?
To see Insights in Purview, they would require ‘Insights reader’ role in Purview. 
	Assuming that the user doesn’t have enterprise license, would he be able to see the same info, if he will open Purview portal from the browser, and not from the Purview hub (will he be asked to logged in? we need to make sure it works smoothly)
They will not be asked to log in and it should work seamlessly.. Enterprise tier will contain all the features of free tier which includes live mode. There is no free tier only feature.  Also, a user can log to Purview either from Purview HUB or by entering URL in the browser. It should be independent of license.
 
•	Enterprise tier- every user with the relevant enterprise license, will have an auto authentication, meaning if he’s logged-in to Trident, and opens the Purview portal, he would already be logged in.
It will only become available at the end of Jun, so this section should be hide at the beginning. 
Open questions:
	@Naga I assume that enterprise customers will only be able to see their enterprise data, when they enter from the portal, and not from the Purview hub. Until this scenario will become available, we need to think how to present this in the documentation.
As I stated above, the logging of user to Purview is independent of the license. Any user will be able to come to Purview if they have access on Trident side. However, the functionality they see in Purview depends on the license. For example – if Purview is in free tier they see only live mode, if Purview is in enterprise tier they will see live + indexed mode. 


## Procurement/Licensing

What licenses do you need for Fabric and Purview to access what?

## Learn more

- How to use the [Microsoft Purview Hub](use-microsoft-purview-hub.md)
