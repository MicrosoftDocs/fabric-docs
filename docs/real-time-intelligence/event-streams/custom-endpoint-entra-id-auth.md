---
title: Connect to Eventstream using Microsoft Entra ID Authentication
description: Learn how to add a Custom Endpoint source or destination and connect a service principal app to Eventstream using Microsoft Entra ID authentication.
ms.reviewer: spelluru
ms.author: zhenxilin
author: alexlzx
ms.topic: how-to
ms.custom:
ms.date: 04/08/2025
ms.search.form: Source and Destination
---

# Connect to Eventstream using Microsoft Entra ID authentication

**Custom Endpoint** is a special type of Eventstream source or destination that allows your application to send and fetch data from Eventstream. It supports two authentication methods for connecting to your application: **SAS Keys** and **Entra ID** authentication.

* **SAS Key Authentication**: Allows you to produce and consume Eventstream data using Shared Access Signature (SAS) keys.
* **Entra ID Authentication**: Enables a security principal (such as a user or a service principal) to produce and consume Eventstream data using Microsoft Entra ID authentication.

This article guides you through creating a Service Principal application, setting up the Java project in Visual Studio Code, and connecting to Eventstream using Microsoft Entra ID authentication.

## Prerequisites

Before you begin, make sure the following prerequisites are met:

* Your **Tenant Admin** enabled the following setting in the Admin portal. [Learn more](/power-bi/developer/embedded/embed-service-principal)
  * Service principals can call Fabric public APIs
* You have **Member** or higher permissions in the workspace. This is required to manage workspace access and assign the necessary permissions to your service principal app.
* An Eventstream item in your workspace with a Custom Endpoint source. Refer to [this guide](add-source-custom-app.md) for instructions on how to add a Custom Endpoint to Eventstream.
* Install [Visual Studio Code](https://code.visualstudio.com/Download).
* Set up VS Code for Java development. Install [Coding pack for Java](https://code.visualstudio.com/docs/java/java-tutorial).

## Step 1: Create a service principal App

1. Sign in to the [Microsoft Entra admin center](https://entra.microsoft.com/).
2. Browse to **Identity** > **Applications** > **App registrations**, and select **New registration**.
3. Enter a display **Name** for your application.
4. Open your app, copy the **client ID** and **tenant ID** for later use.

   :::image type="content" source="media/entra-id-auth/app-id.png" alt-text="Screenshot of app ID." lightbox="media/entra-id-auth/app-id.png":::

5. Go to **Certificates & secrets**, add a new client secret and copy the value.

   :::image type="content" source="media/entra-id-auth/app-secret.png" alt-text="Screenshot of app secret." lightbox="media/entra-id-auth/app-secret.png":::

6. Once completed, you should have the following three information ready:
   * Azure Client ID
   * Azure Tenant ID
   * Azure Client Secret

## Step 2: Assign Fabric workspace permission

1. Go to your Fabric workspace and select **Manage access**.

   :::image type="content" source="media/entra-id-auth/workspace-manage-access.png" alt-text="Screenshot of workspace manage access." lightbox="media/entra-id-auth/workspace-manage-access.png":::

1. Search for the application created in the previous step and assign the **Contributor** (or higher) to your app.

   :::image type="content" source="media/entra-id-auth/assign-workspace-permission.png" alt-text="Screenshot of assigning workspace permission to an app." lightbox="media/entra-id-auth/assign-workspace-permission.png":::

## Step 3: Set up project in VS Code

1. Open the terminal in VS Code and download the [GitHub project](https://github.com/ruiminwang/eventstream-entra-id-auth-samples) or run the following command to clone the project.

   ```powershell
   git clone https://github.com/ruiminwang/eventstream-entra-id-auth-samples.git
   ```

2. Install **Java** and **Maven**. If you don’t have Java and Maven installed, use **Scoop** to install them:

   ``` powershell
   # https://scoop.sh/
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   Invoke-RestMethod -Uri https://get.scoop.sh | Invoke-Expression
    
   scoop bucket add java
   scoop install oraclejdk-lts
   scoop install maven
   ```

3. Set up environment variables. Configure environment variables for your Service Principal app:

   ``` powershell
   $env:AZURE_CLIENT_ID="00001111-aaaa-2222-bbbb-3333cccc4444"
   $env:AZURE_TENANT_ID="aaaabbbb-0000-cccc-1111-dddd2222eeee"
   $env:AZURE_CLIENT_SECRET="Aa1Bb~2Cc3.-Dd4Ee5Ff6Gg7Hh8Ii9_Jj0Kk1Ll2"
   ```

## Step 4: Build and run your project

### Send data to Eventstream

1. In Eventstream, add a Custom Endpoint as a source.
1. Select **Custom Endpoint** > **Entra ID Authentication**, copy the following details, and paste them into the **ProducerSample.java** file:
   * Event hub namespace
   * Event hub

   :::image type="content" source="media/entra-id-auth/producer-sample.png" alt-text="Screenshot of producer sample code in VS Code." lightbox="media/entra-id-auth/producer-sample.png":::

1. Run the following command to build and run the project:

   ``` powershell
   mvn clean package

   java -cp .\target\EventHubOAuth-1.0-SNAPSHOT-jar-with-dependencies.jar com.microsoft.ProducerSample
   ```

If the data is sent successfully, you can go to your eventstream and view the incoming data.

### Fetch data from Eventstream

1. In Eventstream, add a Custom Endpoint as a destination.
1. Select **Custom Endpoint** > **Entra ID Authentication**, copy the following details, and paste them into the **ConsumerSample.java** file:
   * Event hub namespace
   * Event hub
   * Consumer group

   :::image type="content" source="media/entra-id-auth/consumer-sample.png" alt-text="Screenshot of consumer sample code in VS Code." lightbox="media/entra-id-auth/consumer-sample.png":::

1. Run the following command to build and run the project:

   ``` powershell
   mvn clean package
   
   java -cp .\target\EventHubOAuth-1.0-SNAPSHOT-jar-with-dependencies.jar com.microsoft.ConsumerSample
   ```

After successfully running the project, you can view the incoming data in your application.

## Related content

* [Add Custom Endpoint source](add-source-custom-app.md)
* [Add Custom Endpoint destination](add-destination-custom-app.md)
