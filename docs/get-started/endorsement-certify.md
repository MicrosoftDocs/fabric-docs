---
title: Certify Fabric content
description: Learn how to certify Fabric content.
author: paulinbar
ms.author: painbar
ms.topic: how-to
ms.date: 05/23/2023
---

# Certify Fabric content

Power BI provides two ways you can endorse your valuable, high-quality content to increase its visibility: **promotion** and **certification**.

* **Promotion**: Promotion is a way to highlight content you think is valuable and worthwhile for others to use. It encourages the collaborative use and spread of content within an organization.

    Any content owner, as well as any member with write permissions on the workspace where the content is located, can promote the content when they think it's good enough for sharing.

* **Certification**: Certification means that the content meets the organization's quality standards and can be regarded as reliable, authoritative, and ready for use across the organization.

    Only [authorized reviewers (defined by the Power BI administrator)](../admin/endorsement-setup.md) can certify content. Content owners who wish to see their content certified and are not authorized to certify it themselves need to follow their organization's guidelines about getting their content certified.

Currently it is possible to endorse all Fabric items except Power BI dashboards.

If [dataset discoverability](/power-bi/collaborate-share/service-discovery) has been enabled in your organization, endorsed datasets can be made discoverable. When a dataset is discoverable, users who don't have access to it will be able to find it and request access. See [Dataset discoverability](/power-bi/collaborate-share/service-discovery) for more detail.

This article describes how to [promote content](endorsement-promote.md#promote-content), how to [certify content](endorsement-certify.md#certify-content) if you're an authorized reviewer, and how to [request certification](endorsement-certify.md#request-content-certification) if you're not.

See [Endorsement: Promoting and certifying Power BI content](endorsement-overview.md) to learn more about endorsement.

## Certify content

Content certification is a big responsibility, and only authorized users can certify content. Other users can [request content certification](#request-content-certification). This section describes how to certify content.

>[!NOTE]
>For the purposes of illustration, the endorsement dialog for datasets is shown below. The dialogs for the other content types are almost identical, with the same radio button options.

1. Get write permissions on the workspace where the content you want to certify is located. You can request these permissions from the content owner or from anyone with admin permissions on the workspace.

1. Carefully review the content and determine whether it meets your organization's certification standards.

1. If you decide to certify the content, go to the workspace where it resides, and then open the [settings](#how-to-get-to-content-settings) of the content you want to certify.

1. Expand the endorsement section and select **Certified**.

    If you are certifying a dataset and see a **Make discoverable** checkbox, it means you can make it possible for users who don't have access to the dataset to find it. See [dataset discovery](/power-bi/collaborate-share/service-discovery) for more detail.

     If you're certifying a dataset, make sure the dataset has an informative description. The description is important; it's what users see in the dataset info tooltip in the datasets hub and on the dataset's details page. A description helps users quickly identify datasets that might be useful for them. See [Dataset description](/power-bi/connect-data/service-dataset-description) for details about how to provide a dataset description.

    [ ![Screenshot of certify content button.](media/endorsement-certify/power-bi-certify-content.png)]( media/endorsement-certify/power-bi-certify-content.png#lightbox)

1. Select **Apply**.

## Request content certification

If you would like to certify your content but are not authorized to do so, follow the steps below.

>[!NOTE]
>For the purposes of illustration, the endorsement dialog for datasets is shown below. The dialogs for the other content types are almost identical, with the same radio button options. 

1. Go to the workspace where the content you want to be certified is located, and then open the [settings](#how-to-get-to-content-settings) of that content.

1. Expand the endorsement section. The **Certified** button is greyed out since you are not authorized to certify content. Click the link about how to get your content certified.

   [ ![Screenshot of how to request content link.](media/endorsement-certify/power-bi-request-content-certification.png)](media/endorsement-certify/power-bi-request-content-certification.png#lightbox)
    <a name="no-info-redirect"></a>
    >[!NOTE]
    >If you clicked the link above but got redirected back to this note, it means that your Power BI admin has not made any information available. In this case, contact the Power BI admin directly.

## How to get to content settings

The Endorsement dialog is accessed through the settings of the content you want to endorse. Follow the instructions below to get to the settings for each content type.

* **Datasets**: In list view, hover over the dataset you want to endorse, click **More options (...)**, and then choose **Settings** from the menu that appears.
* **Dataflows**: In list view, hover over the dataflow you want to endorse, click **More options (...)**, and then choose **Settings** from the menu that appears.


* **Reports**: In list view, hover over the report you want to endorse, click **More options (...)**, and then choose **Settings** from the menu that appears. Alternatively, if the report is open, choose **File > Settings**.

* **Apps**: Go to the app workspace, click **More options (...)** on the menu bar, and choose **Endorse this app**.

    ![Screenshot of link to app settings.](media/endorsement-certify/power-bi-app-settings.png)

## Next steps

* [Read more about content endorsement](endorsement-overview.md)
* [Promote Fabric content](endorsement-promote.md)
* [Enable content certification](../admin/endorsement-setup.md) (Power BI admins)
* [Read more about dataset discoverability](/power-bi/collaborate-share/service-discovery)
* Questions? [Try asking the Power BI Community](https://community.powerbi.com/)