---
title: Tutorial - CI/CD for Microsoft Fabric Using Fabric Bulk Import/Export API
description: This article provides a Fabric CI/CD tutorial on using the Fabric Bulk Import/Export API.
ms.reviewer: richin
ms.author: billmath
author: billmath
ms.topic: overview
ms.custom:
ms.search.form:
ms.date: 03/04/2026
---

# Tutorial - Fabric CI/CD with Bulk Import Item Definitions API
In this tutorial, you’ll use an Azure DevOps pipeline that leverages the [Bulk import item definition api](https://learn.microsoft.com/en-us/rest/api/fabric/core/items/bulk-import-item-definitions(beta)) to deploy items from a Git folder. The Git folder contains item definitions from a **dev** workspace that is connected to Git, and the pipeline deploys them to a **test** workspace that isn’t connected to Git.

## Prerequisites
- **Azure DevOps** Azure Project and repository + permissions to configure Azure DevOps pipeline and create variable groups.
- **Fabric workspace** name: `bulk-tutorial-test` - target workspace for the deployment
- **Service Principal (SPN)** - An Entra ID (Azure AD) App Registration with a client secret, need to have the client id, client secret and tenant id.
- The service principal has **Conributor** permission for `bulk-tutorial-test` Fabric workspace 
- Fabric Admin Setting for Service Principal - A Fabric Admin must enable *"Service principals can use Fabric APIs"* in the Fabric Admin Portal under **Tenant Settings** 

> 💡 **Tip:** To enable Service Principal access in Fabric, a Fabric Admin must enable *"Service principals can use Fabric APIs"* in the Fabric Admin Portal under **Tenant Settings**.

## Background

In [Git‑based deployment using a build environment](./manage-deployment.md), deployments across Microsoft Fabric workspaces are driven from a central Git repository, where Fabric item definitions are treated as code and promoted through a structured release flow. All environments—Dev, Test, and Prod—are aligned to the same main branch, while each stage is deployed independently using dedicated build and release pipelines.

Pipelines typically begin by exporting Fabric item definitions from a development workspace using Fabric Git Integration. These definitions can then be validated in a build environment through automated checks, pull request reviews, and policy enforcement before promotion. (not cover in this tutorial)

During deployment, the pipeline invokes the Bulk Import API to promote approved item definitions into the target workspace. The API supports both creating new items and updating existing ones in place, while relying on Fabric’s built‑in dependency handling to ensure items are deployed in the correct order. This enables consistent, repeatable deployments into test and production environments without manual intervention. 

:::image type="content" source="./media/manage-deployment/tutorial-bulk-api.png" alt-text="Suggested build and release pipelines using bulk-import item definitions API.":::

## Step 1. Prepare a sample repo

1. Download the zip file [bulk-api-demo-zip](https://github.com/microsoft/fabric-samples/tree/main/docs-samples/cicd/fabric-cicd-bulkapi/bulkapi-tutorial-repo.zip) to your local machine
1. The sample zip contains:
  - Azure DevOps pipeline file (`deploy-using-bulk-api.yml`)
  - Sample workspace with few Fabric items definitions files (`bulk-tutorial-dev`)
1. Clone your Azure DevOps repository to your local machine, and unzip the file to this folder.
1. Push the new content to Azure DevOps repository

## Step 2. - Run Azure DevOps pipeline
### 2.1 Variable Group: `bulkapi-group`

This variable group store the service principal details which the Azure Pipeline will authenticate with.

#### Steps to Create

1. Navigate to **Pipelines → Library** in your ADO project.
2. Click **+ Variable group**.
3. Name it: **`bulkapi-group`**
4. Add the following variables:

| Variable Name | Description |
|---|---|
| `AZURE_TENANT_ID` | Service Principal - Tenant ID |
| `AZURE_CLIENT_ID` | Service Principal - Client ID |
| `AZURE_CLIENT_SECRET` | Service Principal - Client Secret (Mark as secret) |

### 2.2 Azure DevOps Pipeline setup

Create a pipeline in Azure DevOps that references the `deploy-using-bulk-api.yml` - YAML file in your repo.

#### Steps

1. Navigate to **Pipelines → Pipelines** → **New pipeline**.
2. Choose **Azure Repos Git** and select your repository.
3. Choose **Existing Azure Pipelines YAML file**.
4. Change the **pool** according to existing agent pool, e.g. to use Microsoft-Hosted agent (Linux based) use: `vmImage: ubuntu-latest`

7. **Run**
8. After pipeline completion - the `bulk-tutorial-test` Fabric workspace contains the deployed items

> ⚠️ **Permission Tip:** The first time the pipeline runs, ADO may prompt you to authorize access to the variable groups and environments. An ADO admin can pre-authorize these under Pipeline → Settings.


## 3. Code Deep Dive: ADO Pipeline YAML

**File:** `deploy-using-bulk-api.yml`- located in the Azure DevOps repository.

Below is the full pipeline with line-by-line annotations.

```yaml
# ──────────────────────────────────────────────────────────────
# TRIGGER: for simplicity here it is manual trigger
# ──────────────────────────────────────────────────────────────
trigger:
  branches:
    include:
    - none
```

### 🔍 Explanation-Trigger
- for more complex trigger mechanism check: [fabric-cicd and Azure DevOps tutorial](tutorial-fabric-cicd-azure-devops.md). 

```yaml

# ─────────────────────────────────────────────────────────────────────────────────────────
# Define the Azure DevOps agent, use of the variable group, and parameters initialization
# ─────────────────────────────────────────────────────────────────────────────────────────
pool:
  name: 'Default' ## change to: `vmImage: ubuntu-latest` for Microsoft Hosted Agent (Linux based)

variables:
  - group: bulkapi-group
  - name: workspace_to_deploy
    ${{ if startsWith(variables['Build.SourceBranchName'], 'main') }}:
      value: "bulk-tutorial-test"
    ${{ if startsWith(variables['Build.SourceBranchName'], 'test-') }}:
      value: "bulk-tutorial-test"
    ${{ if startsWith(variables['Build.SourceBranchName'], 'prod-') }}:
      value: "bulk-tutorial-prod"
```

```yaml

# ────────────────────────────────────────────────────────────────
# Step 1: Checkout & Get Fabric API token using service principal
# ────────────────────────────────────────────────────────────────
stages:
  - stage: Deploy_Release
    jobs:
      - job: Deploy
        displayName: 'Deploy using Bulk-API'
        steps:
        - checkout: self
        - script: |
            TOKEN=$(curl -s -X POST "https://login.microsoftonline.com/$(AZURE_TENANT_ID)/oauth2/v2.0/token" \
              -H "Content-Type: application/x-www-form-urlencoded" \
              -d "client_id=$(AZURE_CLIENT_ID)&client_secret=$(AZURE_CLIENT_SECRET)&scope=https://api.fabric.microsoft.com/.default&grant_type=client_credentials" \
              | jq -r '.access_token')
            echo "##vso[task.setvariable variable=FABRIC_TOKEN;issecret=true]$TOKEN"
          displayName: 'Get Fabric API token using service principal'
```

```yaml

# ────────────────────────────────────────────────────────────────────
# Step 2: Build REQUEST_BODY and call Bulk Import Item Definitions API 
# ────────────────────────────────────────────────────────────────────
        - script: |
            # Get workspace ID from workspace name to deploy
            WORKSPACE_ID=$(curl -s -H "Authorization: Bearer $(FABRIC_TOKEN)" \
              "https://api.fabric.microsoft.com/v1/workspaces" \
              | jq -r '.value[] | select(.displayName=="'"$(workspace_to_deploy)"'") | .id')

            if [ -z "$WORKSPACE_ID" ] || [ "$WORKSPACE_ID" = "null" ]; then
              echo "##vso[task.logissue type=error]Workspace '$(workspace_to_deploy)' not found"
              exit 1
            fi
            echo "Workspace ID: $WORKSPACE_ID"

            BASE_DIR="$(Build.SourcesDirectory)/bulk-tutorial-dev"

            PARTS_JSON="[]"
            while IFS= read -r -d '' FILE; do
              REL_PATH="/${FILE#$BASE_DIR/}"
              PAYLOAD=$(base64 -w 0 "$FILE" 2>/dev/null || base64 "$FILE")
              PARTS_JSON=$(echo "$PARTS_JSON" | jq \
                --arg path "$REL_PATH" \
                --arg payload "$PAYLOAD" \
                '. + [{path: $path, payload: $payload, payloadType: "InlineBase64"}]')
            done < <(find "$BASE_DIR" -type f -print0)

            REQUEST_BODY=$(jq -n \
              --argjson parts "$PARTS_JSON" \
              '{
                definitionParts: $parts,
                options: {
                  allowPairingByName: false
                }
              }')

            echo "Request body built with $(echo "$PARTS_JSON" | jq length) parts"

            API_URL="https://api.fabric.microsoft.com/v1/workspaces/$WORKSPACE_ID/importItemDefinitions?beta=true"
            echo "Calling Bulk Import Item definition API: $API_URL"

            # Call the Bulk Import API and capture response headers
            HEADER_FILE=$(mktemp)
            RESPONSE=$(curl -s -w "\n%{http_code}" -X POST \
              "$API_URL" \
              -H "Authorization: Bearer $(FABRIC_TOKEN)" \
              -H "Content-Type: application/json" \
              -D "$HEADER_FILE" \
              -d "$REQUEST_BODY")

            HTTP_CODE=$(echo "$RESPONSE" | tail -1)
            BODY=$(echo "$RESPONSE" | sed '$d')

            echo "HTTP Status: $HTTP_CODE"
            echo "$BODY" | jq . 2>/dev/null || echo "$BODY"

            # Extract operation ID from response headers
            OPERATION_ID=$(grep -i '^x-ms-operation-id:' "$HEADER_FILE" | awk '{print $2}' | tr -d '\r\n ')
            echo "Operation ID: $OPERATION_ID"
            rm -f "$HEADER_FILE"

            # Set as variable for the next step
            echo "##vso[task.setvariable variable=OPERATION_ID]$OPERATION_ID"

            if [ "$HTTP_CODE" -ge 400 ]; then
              echo "##vso[task.logissue type=error]Bulk import failed with HTTP $HTTP_CODE"
              exit 1
            fi
          displayName: 'Deploy to $(workspace_to_deploy)'
```

```yaml

# ────────────────────────────────────────
# Step 3: Wait for Deployment to complete 
# ────────────────────────────────────────
        - script: |
            echo "Polling operation: $(OPERATION_ID)"

            while true; do
              RESULT=$(curl -s -H "Authorization: Bearer $(FABRIC_TOKEN)" \
                "https://api.fabric.microsoft.com/v1/operations/$(OPERATION_ID)/result")

              # Check if importItemDefinitionsDetails exists and is not null
              HAS_DETAILS=$(echo "$RESULT" | jq 'has("importItemDefinitionsDetails") and (.importItemDefinitionsDetails != null)')

              if [ "$HAS_DETAILS" = "true" ]; then
                echo "Operation complete. Result:"
                echo "$RESULT" | jq .
                break
              fi

              echo "Operation not yet completed. Waiting 10 seconds..."
              sleep 10
            done
          displayName: 'Poll LRO until complete'
```

## 4. Summary

This tutorial demonstrated how to use the **Bulk Import Item Definition API** as a deployment mechanism. It showed how to deploy items from a dev workspace connected to a Git repository by extracting the repository content, transforming it into the required API input, and deploying it to a test Fabric workspace that isn’t connected to Git.

