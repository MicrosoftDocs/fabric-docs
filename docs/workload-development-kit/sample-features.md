---
title: Understand the development sample
description: Understand how the workload development kit workload sample works, and the Fabric capabilities it showcases.
author: KesemSharabi
ms.author: kesharab
ms.topic: how-to
ms.custom:
ms.date: 12/31/2024

# Customer intent: As a developer, I want to understand the Fabric capablities that the workload development kit sample showcases, so that I can use them in the workloads I develop.
---


# Understand the development sample

The workspace development kit sample is designed to showcase some of the capabilities you can use when developing a Microsoft Fabric workload.

## Prerequisites

To understand the sample and the Fabric capabilities it showcases, you need to install it on your local machine using the instructions in [Quickstart - Run a workload sample](quickstart-sample.md) guide.

## Sample functionality

The sample workload is a simple calculator. It creates a text file with a calculation in a lakehouse. To create a new item and test the calculator's functionality, follow these steps:

### Step 1: Create a sample item

To create a new sample item, follow these steps.

1. Run the sample workload.

2. Open Microsoft Fabric with the user you're using to run the sample workload.

3. Open a workspace in Fabric, and select **New item**.

4. In the *New item* pane, search for **Sample Item (preview)**.

5. In the *Create Sample Workload Item* pane, enter text for the following values and select **Create**.
    - **Name** - Enter a name for the item.
    - **Sample description** - (Optional) Enter a description for the item.
    >[!TIP]
    >If you select the *Request Initial consent* checkbox, you'll see how the consent pop-up window looks. This option showcases the ability to ask users to give consent before they create a new item.

6. Select **Create**. The *Sample Item Editor* opens.

### Step 2: Connect to a lakehouse

To connect the sample item to a lakehouse, follow these steps.

1. In the *Sample Item Editor*, select the barrel icon next to **Lakehouse**.

2. From the dropdown list, select the Lakehouse you want to connect to. If you don't have any lakehouses in the list, [create a lakehouse](../data-engineering/create-lakehouse.md).

3. Select **Connect**.

### Step 3: Create a calculation

To create a calculation using the sample item, follow these steps.

1. the *Sample Item Editor*, fill in the following fields:
    - **Operand 1** - Enter a number.
    - **Operand 2** - Enter a number.
    - **Operator** - Select an operation from the dropdown list.

2. Select **Save** (&#128190;).

3. (Optional) To multiply each operand by two, select **Double the result**.

### Step 4: Run your job

Run the calculation job to create a lakehouse text file with the calculation results. To run the job, follow these steps.

1. In the *Sample Item Editor*, select the **Jobs** tab.

2. Select **Run jobs** and from the dropdown menu, select **Scheduled Job**.

### Step 5: View your calculation

To open the file with the calculation results, follow these steps.

1. In Fabric, navigate to the lakehouse you connected to your sample item.
    >[!TIP]
    >You can search for your lakehouse in the search bar.

2. In the lakehouse, from the explorer pane, open the **Files** folder.

3. Select the file with the calculation you created. The file has one row with the calculation and its result.

## Showcased Fabric capabilities

This section list a few of the Fabric capabilities showcased in the sample workload. The section is divided into sub sections for each tab in the sample item workload.

### Home

This section lists some of the Fabric capabilities showcased in the *Home* tab.

- The barrel icon for selecting a lakehouse is visible in two places. This shows the ability to decide where to place UI elements.

- You can select **Navigate to Authentication page** to view how your item's authentication is set up.

### Jobs

This section lists some of the Fabric capabilities showcased in the *Jobs* tab.

- **Run jobs** - After you run a few calculations, you can see UI options for listing the jobs you ran. For example, if you have a scheduled job, and you select *scheduled job*, a popup message with details about the scheduled jobs appears.

    If you select *Go to monitor*, Fabric opens the [Monitor](../admin/monitoring-hub.md) and filters according to sample items

- **Recent runs** - Opens a pane that lists the recent runs of the sample item.

- **Schedule** - Opens a pane that allows you to schedule a job. The schedule pane includes these sub tabs:
    - **About** - You can edit the name and description of the sample item.
    - **Sensitivity labels** - Allows you to select a [sensitivity label](../fundamentals/apply-sensitivity-labels.md) for the sample item.
    - **Endorsement** - Allows you to select an [endorsement](../governance/endorsement-overview.md) for the sample item.
    - **Tags (preview)** - Showcases the ability to add additional functionality to a workload item.

### API Playground

This section lists some of the Fabric frontend capabilities showcased in the *API Playground* tab. These capabilities rely on the [client-side APIs](/javascript/api/%40ms-fabric/workload-client).

- **Notification** - Showcases how a notification is displayed. Select a *title* and write the *message*, then select *Send Notification* to see the notification.

- **Action & Dialog** - Showcases a nonfunctional UI for creating an action call out, a message box and an error. It also has a demo button titled *Call Request Failure Handling*.

- **Panel & Settings** - Showcases Fabric UI options. For example, if you select *Clicking outside of the Panel closes it*, when you select *open panel* you can close it by clicking anywhere outside that panel.

    Select *Open panel* to view additional UI elements that can be implemented.

- **Navigation** - Showcases options for creating navigation options in your sample.

- **Data Hub** - Showcases how a dialog box can be edited in Fabric. Select *Open Data Hub* and view the changes your selection made. You can select these options:
    - **Dialog description** - The text you enter here will appear in the top of the dialog box.
    - **Supported types** - Showcases the ability to create a dropdown list of items that can be filtered when displaying the dialog box. This option isn't implemented.
    - **Present workspace explorer** - When turned on, workspace explorer is open when the dialog box is opened.
    - **Allow multiselection** - When turned on, you can select multiple items in the dialog box.

### FluentUI Playground

This section lists some of the Fabric backend capabilities showcased in the *FluentUI Playground* tab. The functions of these capabilities rely on the [Fabric REST APIs](/rest/api/fabric/articles/).

Here you can find examples of a text box, different buttons for different types of save, a switch, and radio buttons. You can also see the functionality of an explorer pane.

## View the sample workspace landing page

The sample workload landing page includes information about the workload. This information is stored in the [frontend manifest](frontend-manifests.md).

To open the landing page, from Fabric's navigation pane, select **Workloads** and then select **Sample Workload (Preview)**.