---
title: Add Fabric URLs to your allowlist
description: Learn about URL endpoints and ports with their associated linked sites to add to your allowlist for connectivity to Fabric.
author: msmimart
ms.author: mimart
ms.reviewer: ''
ms.service: fabric
ms.topic: reference
ms.date: 02/13/2026
---

# Add Fabric URLs to your allowlist

An allowlist is a security mechanism used to permit access only to specific, trusted resources. In the context of Microsoft Fabric, an allowlist ensures that your network can connect to the required and optional Fabric services by explicitly allowing traffic to and from specific URLs. This approach helps secure your environment by blocking unauthorized or unknown connections while enabling essential communication with Fabric services.

This article contains the allowlist of the Microsoft Fabric URLs required for interfacing with Fabric workloads. For the Power BI allowlist, see [Add Power BI URLs to your allowlist](./power-bi-allow-list-urls.md).

The URLs in the allowlist play a critical role in enabling connectivity to Fabric services. These URLs represent endpoints that your network must access for Fabric workloads to function properly. For example, they may correspond to APIs, authentication services, or other back-end systems that Fabric relies on. The URLs are used in various scenarios, such as accessing the Fabric portal, running workloads, or enabling specific features.

The URLs are divided into two categories: required and optional. The required URLs are necessary for the service to work correctly. The optional URLs are used for specific features that you might not use. To use Fabric, you must be able to connect to the endpoints marked required in the tables in this article, and to any endpoints marked required on the linked sites. If the link to an external site refers to a specific section, you only need to review the endpoints in that section. You can also add endpoints that are marked optional to allowlists for specific functionality to work.

Fabric requires only TCP Port 443 to be opened for the listed endpoints.

The tables in this article use the following conventions:

* Wildcard (*): Represents all levels under the root domain.
* N/A: No specific port required.

The **Endpoint** column lists domain names and links to external sites, which contain further endpoint information.

## Fabric Platform Endpoints

|Purpose   |Endpoint  |Port      |
|:---------|:---------|:---------|
|**Required**: Portal|*.fabric.microsoft.com|TCP 443|
<!--
|CRUD Artifact APIs|||
|PATCH Artifact API|||
|Schedule CRUD|||
|Monitoring Hub API |||
|Lineage & Capacity endpoint|||
-->

## OneLake
|Purpose   |Endpoint  |Port      |
|:---------|:---------|:---------|
|For OneLake access for DFS APIs (default OneLake endpoint) |*.onelake.dfs.fabric.microsoft.com|TCP 443|
|OneLake endpoint for calling Blob APIs|*.onelake.blob.fabric.microsoft.com|TCP 443|
|**Optional**: Regional Endpoints for DFS APIs |*\<region\>-onelake.dfs.fabric.microsoft.com|TCP 443|
|**Optional**: Regional Endpoints for Blob APIs |*\<region\>-onelake.blob.fabric.microsoft.com|TCP 443|

## Pipeline

|Purpose   |Endpoint  |Port      |
|:---------|:---------|:---------|
|**For outbound connections**|||
|**Required**: Portal|*.powerbi.com|TCP 443|
|**Required**: Back-end APIs for Portal|*.pbidedicated.windows.net|TCP 443|
|**Required**: Cloud pipelines|No specific endpoint is required|N/A|
|**Optional**: On-premises data gateway login|\*.login.windows.net<br>login.live.com<br>aadcdn.msauth.net<br>login.microsoftonline.com<br>\*.microsoftonline-p.com<br>[See the documentation for Adjust communication settings for the on-premises data gateway](/data-integration/gateway/service-gateway-communication#ports)|TCP 443|
|**Optional**: On-premises data gateway communication|*.servicebus.windows.net|TCP 443<br>TCP 5671-5672<br>TCP 9350-9354|
|**Optional**: On-premises data gateway pipelines|*.frontend.clouddatahub.net<br>(User can use service tag DataFactory or DataFactoryManagement)|TCP 443<br>|
|**For inbound connections**|No specific endpoints other than the customer's data store endpoints required in pipelines and behinds the firewall.<br>(User can use service tag DataFactory, regional tag is supported, like DataFactory.WestUs)|

<!--
## Dataflow

|Purpose   |Endpoint  |Port      |
|:---------|:---------|:---------|
|Write data||Port 443
|Read data||Port 1433
-->

## Lakehouse

|Purpose   |Endpoint  |Port      |
|:---------|:---------|:---------|
|Inbound connections|https://cdn.jsdelivr.net/npm/monaco-editor*|N/A|

## Notebook

|Purpose   |Endpoint  |Port      |
|:---------|:---------|:---------|
|Inbound connections (icons)|http://res.cdn.office.net/|N/A|
|**Required**: Notebook back end|https://\*.pbidedicated.windows.net<br>wss://\*.pbidedicated.windows.net<br>(HTTP/WebSocket)|N/A|
|**Required**: Lakehouse back end|https://onelake.dfs.fabric.microsoft.com|N/A|
|**Required**: Shared back end|https://*.analysis.windows.net|N/A|
|**Required**: DE/DS extension UX|https://pbides.powerbi.com|N/A|
|**Required**: Notebooks UX|https://aznb-ame-prod.azureedge.net|N/A|
|**Required**: Notebooks UX|https://*.notebooks.azuresandbox.ms|N/A|
|**Required**: Notebooks UX|https://content.powerapps.com|N/A|
|**Required**: Notebooks UX|https://aznbcdn.notebooks.azure.net|N/A|

## Spark

|Purpose   |Endpoint  |Port      |
|:---------|:---------|:---------|
|Inbound connections (icons)|http://res.cdn.office.net/|N/A|
|Inbound connections (library management for PyPI)|https://pypi.org/*|N/A|
|Inbound connections (library management for Conda)|local static endpoints for condaPackages|N/A|

## Data Warehouse

|Purpose   |Endpoint  |Port      |
|:---------|:---------|:---------|
|**Required**: Datamart SQL |*.datamart.fabric.microsoft.com|TCP 1433|
|**Required**: Datamart SQL |*.datamart.pbidedicated.microsoft.com|TCP 1433|
|**Required**: Datamart SQL |*.pbidedicated.microsoft.com|TCP 1433|
|**Required**: Fabric DW SQL |*.datawarehouse.fabric.microsoft.com|TCP 1433|
|**Required**: Fabric DW SQL |*.datawarehouse.pbidedicated.microsoft.com|TCP 1433|
|**Required**: Fabric DW SQL |*.pbidedicated.microsoft.com|TCP 1433|
|**Required**: Fabric DW SQL |*.pbidedicated.windows.net |TCP 1433|

## Data Science

|Purpose   |Endpoint  |Port      |
|:---------|:---------|:---------|
|Inbound connections (library management for PyPI)|https://pypi.org/*|N/A|
|Inbound connections (library management for Conda)|local static endpoints for condaPackages|N/A|

## KQL Database

|Purpose   |Endpoint  |Port      |
|:---------|:---------|:---------|
||https://*.z[0-9].kusto.fabric.microsoft.com||

## Cosmos DB Database

|Purpose   |Endpoint  |Port      |
|:---------|:---------|:---------|
|Inbound connections|https://sql.cosmos.fabric.microsoft.com|TCP 443|

## Eventstream

|Purpose   |Endpoint  |Port      |
|:---------|:---------|:---------|
|Customers can send/read events from Eventstream in their custom app |sb://*.servicebus.windows.net|http: 443<br>amqp: 5672/5673<br>kafka: 9093|

## SQL database in Fabric

For complete information on SQL database in Fabric connection policy, see [Default connection policy in Connectivity Architecture](/azure/azure-sql/database/connectivity-architecture?view=azuresql-db&preserve-view=true#connection-policy). Refer to the [Azure IP Ranges and Service Tags – Public Cloud](https://www.microsoft.com/download/details.aspx?id=56519) for a list of your region's IP addresses to allow.

|Purpose   |Endpoint  |Port      |
|:---------|:---------|:---------|
|**Required**|*.database.fabric.microsoft.com<br>(Can use service tag: SQL)|1433|
|**Required** Redirect connection policy ports |*.database.fabric.microsoft.com|11000-11999|

For SQL database in Fabric, if your environment uses redirect connection policy, also allow TCP ports 11000-11999 for *.database.fabric.microsoft.com.

## Related content

* [Add Power BI URLs to allowlist](./power-bi-allow-list-urls.md)
