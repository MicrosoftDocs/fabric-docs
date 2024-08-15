---
title: Fabric Application lifecycle management variable library
description: Learn how to use the Fabric Application lifecycle management (ALM) variable library tool to customize your stages.
author: mberdugo
ms.author: monaberdugo
ms.service: fabric
ms.subservice: cicd
ms.topic: concept-article
ms.custom:
ms.date: 08/15/2024
#customer intent: As a developer, I want to learn how to deploy content to an empty or nonempty stage using the Fabric Application lifecycle management (ALM) deployment pipeline tool so that I can manage my content lifecycle.
---


---
title: [Follow SEO guidance at 
https://review.learn.microsoft.com/en-us/help/platform/seo-meta-title]
description: "[Article description]."
author: [your GitHub alias]
ms.author: [your Microsoft alias or a team alias]
ms.service: [the approved service name]
ms.topic: overview #Don't change
ms.date: [mm/dd/yyyy]

#customer intent: As a <role>, I want <what> so that <why>.

---

<!-- --------------------------------------

- Use this template with pattern instructions for:

Overview

- Before you sign off or merge:

Remove all comments except the customer intent.

- Feedback:

https://aka.ms/patterns-feedback

-->

# What is [product or service]?

<!-- Required: Article headline - H1

Identify the product or service and the feature area
you are providing overview information about.

-->

[Introduce and explain the purpose of the article.]

<!-- Required: Introductory paragraphs (no heading)

Write a brief introduction that can help the user
determine whether the article is relevant for them
and to describe how the article might benefit them.

-->

## [Feature section]

[Introduce a section that describes a feature.]

<!-- Required: Feature sections - H2

In two or more H2 sections, describe key features of
the product or service. Consider sections for basic
requirements, dependencies, limitations, and overhead.

-->

## Related content

- [Related article title](link.md)
- [Related article title](link.md)
- [Related article title](link.md)

<!-- Optional: Related content - H2

Consider including a "Related content" H2 section that 
lists links to 1 to 3 articles the user might find helpful.

-->

<!--

Remove all comments except the customer intent
before you sign off or merge to the main branch.

-->


# Fabric Application lifecycle management variable library

Native centralized unitied way to manage configurations across the workspace items.

Introduction
Fabric platform supports variables as a service to workloads and users.
Users can store their own variables in items of a new item type in fabric - Variable library.
Workloads can discover the available variables in the workspace and resolve their values.

Details
Customers' main pain points today, which is a blocker to their fabric onboarding, is a missing native solution for workspace variables allowing to:

* Customize configurations (like data source) based on the release pipeline stage (semantic models, data pipelines, shortcuts for LHs, etc.).
* Share configurations across items in the workspace (Lakehouses using the same shortcut, etc.)

EG: Dev stage of dta pipeline has one connection, test stage has another connection, prod stage has restrictions so no  connection.

Variable library is a unified way for customers to manage items configuration in a workspace, in a scalable way and across lifecycle stages.
It is implemented as an item in fabric holding list of variables, including their other values for all stages in the release pipeline. The user need to configure once for each stage which value set is the active one for it (only its values are read).
It is supported in CI/CD (can be integrated to git and be deployed in Deployment pipelines) and can be automated using the public APIs.
