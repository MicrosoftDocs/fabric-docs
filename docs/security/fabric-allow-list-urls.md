---
title: Add Fabric URLs to your allowlist
description: Learn about URL endpoints and ports with their associated linked sites to add to your allowlist for connectivity to Fabric.
author: paulinbar
ms.author: painbar
ms.reviewer: ''
ms.service: fabric
ms.topic: conceptual
ms.date: 05/28/2024
---

# Add Fabric URLs to your allowlist

This article contains the allowlist of the Microsoft Fabric URLs required for interfacing with Fabric workloads. For the Power BI allowlist, see [Add Power BI URLs to your allowlist](./power-bi-allow-list-urls.md).

The URLs are divided into two categories: required and optional. The required URLs are necessary for the service to work correctly. The optional URLs are used for specific features that you might not use. To use Fabric, you must be able to connect to the endpoints marked required in the tables in this article, and to any endpoints marked required on the linked sites. If the link to an external site refers to a specific section, you only need to review the endpoints in that section. You can also add endpoints that are marked optional to allowlists for specific functionality to work.

Fabric requires only TCP Port 443 to be opened for the listed endpoints.

The tables in this article use the following conventions:

* Wildcards (*) represent all levels under the root domain.
* N/A is used when information isn't available.

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
|For OneLake access for DFS APIs (default Onelake endpoint) |*.onelake.dfs.fabric.microsoft.com|Port 1443|
|Onelake endpoint for calling Blob APIs|*.onelake.blob.fabric.microsoft.com|TCP 443|
|**Optional**: Regional Endpoints for DFS APIs |*\<region\>-onelake.dfs.fabric.microsoft.com|TCP 443|
|**Optional**: Regional Endpoints for Blob APIs |*\<region\>-onelake.blob.fabric.microsoft.com|TCP 443|

## Pipeline

|Purpose   |Endpoint  |Port      |
|:---------|:---------|:---------|
|**For outbound connections**|||
|**Required**: Portal|*.powerbi.com|TCP 443|
|**Required**: Backend APIs for Portal|*.pbidedicated.windows.net|TCP 443|
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
|**Required**: Notebook backend|https://\*.pbidedicated.windows.net<br>wss://\*.pbidedicated.windows.net<br>(HTTP/WebSocket)|N/A|
|**Required**: Lakehouse backend|https://onelake.dfs.fabric.microsoft.com|N/A|
|**Required**: Shared backend|https://*.analysis.windows.net|N/A|
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
|**Required**: Datamart SQL |datamart.fabric.microsoft.com|1433|
|**Required**: Datamart SQL |datamart.pbidedicated.microsoft.com|1433|
|**Required**: Fabric DW SQL |datawarehouse.fabric.microsoft.com|1433|
|**Required**: Fabric SQL |datawarehouse.pbidedicated.microsoft.com|1433|

## Data Science

|Purpose   |Endpoint  |Port      |
|:---------|:---------|:---------|
|Inbound connections (library management for PyPI)|https://pypi.org/*|N/A|
|Inbound connections (library management for Conda)|local static endpoints for condaPackages|N/A|

## KQL Database

|Purpose   |Endpoint  |Port      |
|:---------|:---------|:---------|
||https://*.z[0-9].kusto.fabric.microsoft.com||

## Eventstream

|Purpose   |Endpoint  |Port      |
|:---------|:---------|:---------|
|Customers can send/read events from Event stream in their custom app |sb://*.servicebus.windows.net|http: 443<br>amqp: 5672/5673<br>kafka: 9093|

## Related content

* [Add Power BI URLs to allowlist](./power-bi-allow-list-urls.md)