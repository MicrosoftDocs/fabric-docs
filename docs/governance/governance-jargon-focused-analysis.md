# Microsoft Fabric Governance - Jargon Review

## Identified unnecessary jargon terms
| Term | Articles (relative paths) |
|------|---------------------------|
| Data mesh | governance/domains.md; governance/governance-compliance-overview.md |
| Federated data architecture | governance/domains.md |
| Federated governance | governance/domains.md; governance/governance-compliance-overview.md |
| Data estate | governance/governance-compliance-overview.md; governance/metadata-scanning-overview.md |
| Domain-level delegation | governance/domains.md; governance/governance-compliance-overview.md |
| Lineage view | governance/lineage.md; governance/governance-compliance-overview.md |
| Upstream/downstream | governance/lineage.md; governance/impact-analysis.md |
| Impact analysis | governance/impact-analysis.md; governance/governance-compliance-overview.md |
| Metadata scanning | governance/metadata-scanning-overview.md; governance/governance-compliance-overview.md |
| Scanner APIs | governance/metadata-scanning-overview.md |
| Endorsement | governance/endorsement-overview.md; governance/governance-compliance-overview.md |
| Master data designation | governance/endorsement-overview.md |
| Certified badge | governance/endorsement-overview.md |
| DLP policies | governance/data-loss-prevention-configure.md; governance/data-loss-prevention-monitor.md |
| Compliance administrator | governance/data-loss-prevention-configure.md |
| Admin units | governance/data-loss-prevention-configure.md |
| Sensitivity labels | governance/information-protection.md; governance/governance-compliance-overview.md |
| Default labeling | governance/information-protection.md |
| Label inheritance | governance/information-protection.md; governance/service-security-sensitivity-label-inheritance-from-data-sources.md |
| Programmatic labeling | governance/information-protection.md |
| Tenant-level settings | governance/governance-compliance-overview.md; governance/domains.md |
| Capacity isolation | governance/governance-compliance-overview.md |
| Chargebacks | governance/governance-compliance-overview.md |
| Downstream inheritance | governance/service-security-sensitivity-label-downstream-inheritance.md |
| Purview hub | governance/use-microsoft-purview-hub.md; governance/governance-compliance-overview.md |
| Data loss prevention | governance/data-loss-prevention-configure.md; governance/data-loss-prevention-monitor.md |

## Definitions
| Term | Plain-language definition |
|------|--------------------------|
| Data mesh | Organizing data by business teams instead of one central IT group. |
| Federated data architecture | Shared approach where different teams manage their own data. |
| Federated governance | Letting teams apply and manage certain rules themselves. |
| Data estate | All of the organization's data across systems. |
| Domain-level delegation | Giving a specific team control over certain settings. |
| Lineage view | A visual map showing how data moves between items. |
| Upstream/downstream | Items that send data to another / items that receive data from another. |
| Impact analysis | Review of what changes will affect before making them. |
| Metadata scanning | Automatically finding and listing details about data items. |
| Scanner APIs | Tools that collect information about items for governance. |
| Endorsement | Marking content as reviewed and trustworthy. |
| Master data designation | Marking an item as the main approved source for a type of data. |
| Certified badge | A label showing the item passed an approved quality review. |
| DLP policies | Rules that prevent sharing sensitive data in the wrong place. |
| Compliance administrator | Person who manages data protection rules. |
| Admin units | Groups used to scope what an admin can manage. |
| Sensitivity labels | Tags that show how sensitive data is and how to protect it. |
| Default labeling | Applying a starting protection tag automatically. |
| Label inheritance | Passing a protection tag from one item to related items. |
| Programmatic labeling | Applying protection tags automatically with scripts or APIs. |
| Tenant-level settings | Settings that affect the whole organization. |
| Capacity isolation | Separating compute resources for performance or security. |
| Chargebacks | Tracking and assigning resource costs to teams. |
| Downstream inheritance | Passing protection from a data source to items that use it. |
| Purview hub | Central place to view governance and compliance insights. |
| Data loss prevention | Protecting sensitive info from leaving approved locations. |

## Example rewrites
**1. Domains introduction (domains.md)**  
Before: "Organizations are shifting from traditional IT centric data architectures ... to more federated models organized according to business needs."  
After: "Organizations are moving from one central IT-controlled system to a model where business teams manage their own data."  

**2. Metadata scanning (metadata-scanning-overview.md)**  
Before: "Metadata scanning facilitates governance ... by making it possible for cataloging tools to catalog and report on the metadata."  
After: "Metadata scanning helps you manage data by automatically listing key details about every item."  

**3. Endorsement certification (endorsement-overview.md)**  
Before: "When an item has the Certified badge, it means that an organization-authorized reviewer has certified that the item meets the organization's quality standards..."  
After: "A Certified badge means an approved reviewer confirmed the item meets your organization's standards and can be trusted."  

**4. DLP policy description (data-loss-prevention-configure.md)**  
Before: "Data loss prevention policies ... protect their sensitive data by detecting upload of sensitive data in supported item types."  
After: "Data protection rules watch for sensitive information being added and warn you if it shouldn't be uploaded."  

**5. Lineage overview (lineage.md)**  
Before: "Understanding the flow of data ... can be a challenge."  
After: "It can be hard to see where data comes from and where it goes; lineage view shows the connections."  

**6. Impact analysis (impact-analysis.md)**  
Before: "Use impact analysis to assess downstream dependencies before making changes."  
After: "Use impact analysis to see what other items will be affected before you change something."  

**7. Information protection labeling (information-protection.md)**  
Before: "Fabric provides multiple capabilities, such as default labeling, label inheritance, and programmatic labeling, to help achieve maximal coverage."  
After: "Fabric can automatically apply and pass along protection tags so more of your data is covered."  

## Recommended articles and links
| Article | Path | Jargon Found |
|---------|------|--------------|
| Domains | governance/domains.md | Data mesh, federated data architecture, federated governance, domain-level delegation |
| Governance compliance overview | governance/governance-compliance-overview.md | Data estate, domains, capacity isolation, chargebacks, Purview hub, tenant-level settings |
| Endorsement overview | governance/endorsement-overview.md | Endorsement, master data designation, certified badge |
| Data loss prevention configure | governance/data-loss-prevention-configure.md | DLP policies, compliance administrator, admin units |
| Metadata scanning overview | governance/metadata-scanning-overview.md | Metadata scanning, scanner APIs, data estate |
| Lineage | governance/lineage.md | Lineage view, upstream/downstream |
| Impact analysis | governance/impact-analysis.md | Impact analysis, downstream |
| Information protection | governance/information-protection.md | Sensitivity labels, default labeling, programmatic labeling, label inheritance |
| Purview hub usage | governance/use-microsoft-purview-hub.md | Purview hub |
| Sensitivity label downstream inheritance | governance/service-security-sensitivity-label-downstream-inheritance.md | Downstream inheritance |

## Comparison articles and rationale
| Reference Article | Link | Rationale |
|-------------------|------|-----------|
| Microsoft Learn style and voice quick start | https://learn.microsoft.com/en-us/contribute/content/style-quick-start | Emphasizes everyday words and concise sentences supporting simplification. |
| Writing style guidelines | https://learn.microsoft.com/en-us/windows/apps/design/style/writing-style | Advises avoiding jargon and using clear, direct language. |
| User interface content recommendations | https://learn.microsoft.com/en-us/power-platform/well-architected/experience-optimization/user-interface-content | Reinforces speaking in plain language without unnecessary jargon. |
| Office Add-ins voice guidelines | https://learn.microsoft.com/en-us/office/dev/add-ins/design/voice-guidelines | Highlights natural, consistent, user-centered wording applicable to governance docs. |
