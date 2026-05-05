---
title: Microsoft Fabric and GitHub Enterprise Cloud with data residency support
description: Learn Microsoft Fabric supports GitHub for data residency
ms.reviewer: NimrodShalit
ms.topic: how-to
ms.date: 05/11/2025
#customer intent: As a developer, I want to learn how to integrate Git with a service principal in Microsoft Fabric, so that I can automate CI/CD workflows.
---

# Microsoft Fabric and GitHub Enterprise Cloud with data residency support (Public preview)

Microsoft Fabric is expanding its Git integration capabilities to support [GitHub Enterprise Cloud with data residency ( ghe.com )](https://docs.github.com/en/enterprise-cloud@latest/admin/data-residency/about-github-enterprise-cloud-with-data-residency) instances.  These new capabilities enable enterprise customers to meet regulatory commitments while using Fabric’s CI/CD workflows. 

Previously, git integration supported only repositories hosted on github.com. This blocked organizations that require their GitHub Enterprise data to be stored within specific geographic boundaries. Now, Fabric workspaces are able to connect to repositories hosted on .ghe.com/&lt;org_name&gt;, using the same UI and API experiences already established for GitHub.com. This change treats GHE.com as part of the existing GitHub provider—not a new provider—while allowing users to authenticate via Personal Access Tokens (PATs).

## How it works

Once connected, users with appropriate permissions can perform standard Git operations such as syncing, committing, updating content, and branching out from an existing workspace—even across environments where one workspace uses GitHub.com and another uses GHE.com. 

All Git Integration APIs function the same across both domains, and schema updates remain fully backward‑compatible. 


   :::image type="content" source="media/github-data-residency-support/data-1.png" alt-text="Screenshot showing the GitHub connection details." lightbox="media/github-data-residency-support/data-1.png":::


## Limitations and considerations
The following limitations apply: 
 
 - Requires a dedicated GHE.com connection per repository 
 - Currently, no organization‑level connection support.


## Related content

- [Understand the Git integration process](./git-integration/git-integration-process.md)
- [Manage Git branches](./git-integration/manage-branches.md)
- [Git integration best practices](best-practices-cicd.md)







