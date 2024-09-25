---
title: Tags in Microsoft Fabric
description: "Learn about tags in Microsoft Fabric."
author: paulinbar
ms.author: painbar
ms.service: fabric
ms.subservice: governance
ms.topic: conceptual #Don't change
ms.date: 08/06/2024

#customer intent: As a Fabric admin, domain admin, data creator, or data consumer, I want to learn about tags in Microsoft Fabric.

---

# Tags in Microsoft Fabric

Tags is a Microsoft Fabric feature that gives organizations the ability to apply additional metadata to items in Fabric to help admins govern data and to enhance data discoverability. Tags are simply labels, such as XXX or XXX, that admins can define according to their organization’s needs. Data and content owners can then apply these tags to their Fabric items, admins can use the tags applied to items to help monitor and manage their organization's data, and users in the organization can use the tags to help them find the data and content they need.

Tags are component of Fabric's data mesh architecture. They complement [domains](./domains.md) by providing additional flexibility and granularity:

* Tags are applied per item, whereas domains are applied per workspace.
* An item can have multiple tags, whereas it can only belong to one domain.

By monitoring and analyzing tag use and distribution, admins can use tags to help them manage and govern their organizations data.

Users can filter lists by tags in order to help them discover the items they need.

The set of tags available to use is defined by the Fabric administrator. For more information, see [Create and manage a set of tags](./tags-define.md).

Tags can be applied to items by users with write permissions on the items. For more information, see [Apply tags to items in Fabric](./tags-apply.md).

Users can see tags in the UI and use filters to help them find the content they're looking for. For more information, see []().

## How tags work

1. Admins are create an open list of tags for use across the organization.
1. Data owners, who best know how to categorize their own data, apply tags to items.
1. Once tags are applied, any user in the org can use them to filter or search for the most relevant content.  

## Requirements

## Considerations and limitations


-->

## Use cases

- [Use case]
- [Use case]

<!-- Optional: Describe use cases - H2

In an H2 section, briefly describe a few key scenarios that 
you can use the feature in. Describe how to use it in those
environments. Use a bulleted list.

-->

## [Feature description]

<!-- Required: Describe aspects of the feature - H2

In one or more H2 sections, provide basic information 
about the feature and how to use it. 

-->

### Requirements

<!-- Optional: Describe requirements - H3

As needed, describe software, networking components, tools, 
and product or service versions that you need to run the 
feature.

-->

### Considerations

<!-- Optional: Describe configuration settings - H3

As needed, explain which configuration settings to use 
to optimize feature performance.

-->

### Examples

<!-- Optional: Include examples - H3

Consider adding examples that show practical ways to use 
the feature or providing code for implementing the feature.

-->

## Availability and pricing 

- [Link to regions where the feature is available]
- [Link to pricing information]

<!-- Optional: Describe availability and pricing - H2

In an H2 section, briefly discuss the feature's availability 
and pricing. Use a bulleted list. 

-->

## Limitations 

- [Limitation]
- [Limitation]

<!-- Optional: Describe limitations of the feature - H2

In an H2 section, list the feature's constraints, limitations, 
and known issues. Use a bulleted list. 

-->

## Related content

- [Create and manage a set of tags](tags-define.md)
- [Apply tags](tags-apply.md)
- [Monitor tag use](tags-monitor.md)

<!-- Optional: Related content - H2

Consider including a "Related content" H2 section that 
lists links to 1 to 3 articles the user might find helpful.

-->

<!--

Remove all comments in this template before you 
sign off or merge to the main branch.

-->