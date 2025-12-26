---
title: Best practices for planning and creating domains in Microsoft Fabric
description: Discover best practices to consider when creating domains for your organization.
author: msmimart
ms.author: mimart
ms.topic: best-practice
ms.date: 10/15/2024
---

# Best practices for planning and creating domains in Microsoft Fabric

Domains in Fabric help to organize business data according to the needs and goals of the organization and to facilitate consumption.

Domains also promote distributed governance by making possible for tenant settings to be delegated to domain admins who can set up appropriate controls for each domain.

## Planning

When implementing domains, there are a few things to think about:

First, consider involving the following roles in the domain design phase:

* Center of excellence, business, and technical architects.

* Center of excellence, business, and technical leads and owners.

* Security and compliance officers.

Next map out answers to the following questions:

* Who is responsible for the data?

* What is the best structure for my organization's data?

* Do I need an extra level of hierarchy? (this consideration helps you decide whether and how to create subdomains within each domain).

## Common organizational structures in industry

The following section describes several of the most common organizational structures in industry.

* **Functional structure**

    In a functional structure, the organization is divided into units (such as Finance, HR, Sales, etc.) based on the roles and business functions they perform. This structure has a clear hierarchy, centralized leadership, and well-defined responsibilities and authorities.

    A functional structure enables specialization, scalability, and accountability. It also sets clear expectations and provides a direct chain of command.

    :::image type="content" source="./media/domains-best-practices/sample-function-based-organizational-structure.png" alt-text="Diagram showing an example of a function-based organizational structure." border="false":::

* **Product/project structure**

    A product/project based structure is suitable for companies that have multiple product lines or projects that require different teams and resources.

    A product/project structure allows the company to assign dedicated teams to each product or project, and fosters innovation and collaboration.

    A drawback of a product/project based structure is that it can create duplication of functions, competition for resources, and lack of coordination among teams.

    :::image type="content" source="./media/domains-best-practices/sample-product-based-organizational-structure.png" alt-text="Diagram showing an example of a product/project based organizational structure." border="false":::

* **Process-based structure**

    A process-based structure is suitable for companies that have standardized or repetitive processes that span different products or markets. A process-based structure allows the company to optimize the efficiency, quality, and consistency of each process and use the expertise and skills of the process teams. However, a process-based structure can also create silos, communication gaps, and reduced customer focus among teams.

    :::image type="content" source="./media/domains-best-practices/sample-process-based-organizational-structure.png" alt-text="Diagram illustrating a process-based organizational structure." border="false":::

* **Region-based structure**

    A region-based structure is suitable for companies that operate in different regions or countries and need to adapt to the local environment, culture, and regulations. A region-based structure allows the company to delegate decision-making authority to the regional managers who can tailor their products and services to regional customer needs and references.

    :::image type="content" source="./media/domains-best-practices/sample-geography-based-organizational-structure.png" alt-text="Diagram illustrating a geography-based organizational structure." border="false":::

* **Mixed structure**

    A mixed structure is a combination of two or more organizational structures, such as functional, product, or market. A mixed structure can help the company balance the advantages and disadvantages of each structure and achieve greater efficiency and flexibility. For example, a company might have global functional departments for finance, human resources, and research and development, and product or market departments for specific business units or segments.

## Subdomain structure

Subdomains can follow the same logic of the parent domain, or they can have their own structure based on organization needs. For example, an organization's domains might be built according to a function-based structure, while the subdomains might be built with a region-based structure.

## Workspace assignment

After creating the structures of the domains and subdomains, the next step is to assign workspaces to each domain or subdomain. There are different ways to assign workspaces to domains, depending on the naming convention and criteria used to create the domains and subdomains. Some possible methods are:

* **By workspace name**: This method is useful for organizations that follow a consistent and clear naming pattern for their workspaces and have names that reflect or relate to the relevant domain or subdomain. For example, if the domain is *Finance* and the subdomain is *Accounting*, then a workspace named *Finance-Accounting-Report* would be assigned to that *Accounting* subdomain.

* **By workspace owner**: This method is applicable for organizations that have a clear and stable ownership structure for their workspaces and have owners that correspond to the domains or subdomains. For example, if the domain is *Product* and the subdomain is *Fabric*, then a workspace owned by *Product Manager-Fabric* would be assigned to that *Fabric* subdomain.

* **By capacity**: This method is suitable for organizations that have adopted the data mesh architecture with capacities, and have capacities that match the domains or subdomains. For example, if the domain is *Marketing* and the subdomain is *Analytics*, then a workspace assigned to the capacity *Marketing-Analytics* would be assigned to that *Analytics* subdomain.

## Related content

* [Domains in Microsoft Fabric](./domains.md)
