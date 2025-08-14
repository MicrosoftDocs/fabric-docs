# PowerShell script to update author metadata for all data-science markdown files
# Based on TOC structure and author assignments

# Author mappings based on TOC sections
$authorMappings = @{
    # jonburchel assignments (43 docs)
    "jonburchel" = @{
        ms_author = "jburchel"
        author = "jonburchel"
        sections = @(
            "Data Science documentation", "Overview", "AI functions", 
            "Fabric data agent", "Copilot for Data Science", "Semantic link"
        )
    }
    
    # s-polly assignments (44 docs) 
    "s-polly" = @{
        ms_author = "scottpolly"
        author = "s-polly"
        sections = @(
            "Train machine learning models", "Automated machine learning (AutoML)", 
            "Reference (SemPy SDK)", "Secure and manage ML items", "SynapseML", 
            "Preparing data", "Track models and experiments", "Governance"
        )
    }
    
    # lgayhardt assignments (38 docs)
    "lgayhardt" = @{
        ms_author = "lagayhar"
        author = "lgayhardt"
        sections = @(
            "Get started", "Tutorials (Python and R)", "AI services", 
            "Model scoring", "Use Python", "Use R", "Environments"
        )
    }
}

# File to section mapping based on TOC analysis
$fileToSection = @{
    # Data Science documentation (index)
    "index.yml" = "jonburchel"
    
    # Overview
    "data-science-overview.md" = "jonburchel"
    "synapse-overview.md" = "jonburchel"
    
    # Get started
    "tutorial-data-science-introduction.md" = "lgayhardt"
    "tutorial-data-science-prepare-system.md" = "lgayhardt"
    "tutorial-data-science-ingest-data.md" = "lgayhardt"
    "tutorial-data-science-explore-notebook.md" = "lgayhardt"
    "tutorial-data-science-train-models.md" = "lgayhardt"
    "tutorial-data-science-batch-scoring.md" = "lgayhardt"
    "tutorial-data-science-create-report.md" = "lgayhardt"
    
    # Copilot for Data Science (mostly references - assign to jonburchel)
    # These reference other sections with toc.json, so assign to jonburchel
    
    # AI functions
    "ai-functions/overview.md" = "jonburchel"
    "ai-functions/similarity.md" = "jonburchel"
    "ai-functions/classify.md" = "jonburchel"
    "ai-functions/analyze-sentiment.md" = "jonburchel"
    "ai-functions/extract.md" = "jonburchel"
    "ai-functions/fix-grammar.md" = "jonburchel"
    "ai-functions/summarize.md" = "jonburchel"
    "ai-functions/translate.md" = "jonburchel"
    "ai-functions/generate-response.md" = "jonburchel"
    "ai-functions/configuration.md" = "jonburchel"
    
    # Fabric data agent
    "concept-data-agent.md" = "jonburchel"
    "data-agent-tenant-settings.md" = "jonburchel"
    "how-to-create-data-agent.md" = "jonburchel"
    "fabric-data-agent-sdk.md" = "jonburchel"
    "evaluate-data-agent.md" = "jonburchel"
    "data-agent-configurations.md" = "jonburchel"
    "data-agent-configuration-best-practices.md" = "jonburchel"
    "develop-iterative-process-data-agent.md" = "jonburchel"
    "data-agent-foundry.md" = "jonburchel"
    "data-agent-copilot-powerbi.md" = "jonburchel"
    "data-agent-microsoft-copilot-studio.md" = "jonburchel"
    "data-agent-end-to-end-tutorial.md" = "jonburchel"
    "data-agent-sharing.md" = "jonburchel"
    
    # Notebooks (references - skip as they use toc.json)
    
    # Environments (references - lgayhardt)
    # These reference other sections but are under lgayhardt's areas
    
    # Tutorials - Python tutorials
    "use-ai-samples.md" = "lgayhardt"
    "retail-recommend-model.md" = "lgayhardt"
    "customer-churn.md" = "lgayhardt"
    "fraud-detection.md" = "lgayhardt"
    "predictive-maintenance.md" = "lgayhardt"
    "sales-forecasting.md" = "lgayhardt"
    "title-genre-classification.md" = "lgayhardt"
    "time-series-forecasting.md" = "lgayhardt"
    "uplift-modeling.md" = "lgayhardt"
    
    # Tutorials - R tutorials
    "r-customer-churn.md" = "lgayhardt"
    "r-fraud-detection.md" = "lgayhardt"
    "r-avocado.md" = "lgayhardt"
    "r-flight-delay.md" = "lgayhardt"
    
    # Governance
    "data-science-lineage.md" = "s-polly"
    
    # Preparing data
    "read-write-pandas.md" = "s-polly"
    "data-wrangler.md" = "s-polly"
    "data-wrangler-spark.md" = "s-polly"
    "read-write-power-bi-python.md" = "s-polly"
    "semantic-link-validate-data.md" = "s-polly"
    "semantic-link-validate-relationship.md" = "s-polly"
    
    # Train machine learning models
    "model-training-overview.md" = "s-polly"
    "hyperparameter-tuning-fabric.md" = "s-polly"
    "fabric-sparkml-tutorial.md" = "s-polly"
    "train-models-scikit-learn.md" = "s-polly"
    "train-models-synapseml.md" = "s-polly"
    "train-models-pytorch.md" = "s-polly"
    "explainable-boosting-machines-classification.md" = "s-polly"
    "explainable-boosting-machines-regression.md" = "s-polly"
    "how-to-tune-lightgbm-flaml.md" = "s-polly"
    
    # Automated machine learning (AutoML)
    "automated-ml-fabric.md" = "s-polly"
    "automated-machine-learning-fabric.md" = "s-polly"
    "low-code-automl.md" = "s-polly"
    "python-automated-machine-learning-fabric.md" = "s-polly"
    "how-to-use-automated-machine-learning-fabric.md" = "s-polly"
    "tuning-automated-machine-learning-visualizations.md" = "s-polly"
    
    # Track models and experiments
    "machine-learning-experiment.md" = "s-polly"
    "machine-learning-model.md" = "s-polly"
    "mlflow-autologging.md" = "s-polly"
    
    # Model scoring
    "model-scoring-predict.md" = "lgayhardt"
    "model-endpoints.md" = "lgayhardt"
    
    # Secure and manage ML items
    "data-science-disaster-recovery.md" = "s-polly"
    "models-experiments-rbac.md" = "s-polly"
    
    # Apache Spark (references - skip as they use toc.json)
    
    # AI services
    "ai-services/ai-services-overview.md" = "lgayhardt"
    "ai-services/how-to-use-openai-via-rest-api.md" = "lgayhardt"
    "ai-services/how-to-use-openai-sdk-synapse.md" = "lgayhardt"
    "ai-services/how-to-use-text-analytics.md" = "lgayhardt"
    "ai-services/how-to-use-text-translator.md" = "lgayhardt"
    "ai-services/ai-services-in-synapseml-bring-your-own-key.md" = "lgayhardt"
    
    # Use Python
    "python-guide/python-overview.md" = "lgayhardt"
    "python-guide/python-visualizations.md" = "lgayhardt"
    
    # Use R
    "r-overview.md" = "lgayhardt"
    "r-library-management.md" = "lgayhardt"
    "r-use-sparkr.md" = "lgayhardt"
    "r-use-sparklyr.md" = "lgayhardt"
    "r-use-tidyverse.md" = "lgayhardt"
    "r-visualization.md" = "lgayhardt"
    
    # Semantic link
    "semantic-link-overview.md" = "jonburchel"
    "tutorial-data-cleaning-functional-dependencies.md" = "jonburchel"
    "tutorial-power-bi-dependencies.md" = "jonburchel"
    "tutorial-power-bi-measures.md" = "jonburchel"
    "tutorial-power-bi-relationships.md" = "jonburchel"
    "tutorial-relationships-detection.md" = "jonburchel"
    "tutorial-great-expectations.md" = "jonburchel"
    "semantic-link-power-bi.md" = "jonburchel"
    "semantic-link-semantic-propagation.md" = "jonburchel"
    "semantic-link-semantic-functions.md" = "jonburchel"
    "read-write-power-bi-spark.md" = "jonburchel"
    
    # SynapseML
    "lightgbm-overview.md" = "s-polly"
    "synapseml-first-model.md" = "s-polly"
    "install-synapseml.md" = "s-polly"
    "open-ai.md" = "s-polly"
    "how-to-use-lightgbm-with-synapseml.md" = "s-polly"
    "how-to-use-ai-services-with-synapseml.md" = "s-polly"
    "classification-before-and-after-synapseml.md" = "s-polly"
    "conditional-k-nearest-neighbors-exploring-art.md" = "s-polly"
    "onnx-overview.md" = "s-polly"
    "tabular-shap-explainer.md" = "s-polly"
    "isolation-forest-multivariate-anomaly-detection.md" = "s-polly"
    "create-a-multilingual-search-engine-from-forms.md" = "s-polly"
    "multivariate-anomaly-detection.md" = "s-polly"
    "hyperparameter-tuning-fighting-breast-cancer.md" = "s-polly"
    
    # Reference (SemPy SDK) - this is just a link, but assign to s-polly
    
    # Skip includes files - they don't need author metadata
}

function Update-AuthorMetadata {
    param(
        [string]$FilePath,
        [string]$AssignedAuthor
    )
    
    Write-Host "Processing: $FilePath"
    
    # Read file content
    $content = Get-Content $FilePath -Raw -Encoding UTF8
    
    if (-not $content) {
        Write-Warning "Could not read file: $FilePath"
        return
    }
    
    # Check if file has frontmatter
    if (-not $content.StartsWith("---")) {
        Write-Warning "No frontmatter found in: $FilePath"
        return
    }
    
    # Split content into frontmatter and body
    $parts = $content -split "---", 3
    if ($parts.Count -lt 3) {
        Write-Warning "Invalid frontmatter format in: $FilePath"
        return
    }
    
    $frontmatter = $parts[1]
    $body = $parts[2]
    
    # Parse current metadata while preserving order
    $lines = $frontmatter -split "`n"
    $metadata = @{}
    $orderedLines = @()
    
    foreach ($line in $lines) {
        if ($line -match "^(\s*)([\w\.]+):\s*(.*)$") {
            $key = $matches[2].Trim()
            $value = $matches[3].Trim()
            $metadata[$key] = $value
            $orderedLines += $line
        } elseif ($line.Trim() -ne "") {
            # Preserve non-metadata lines (like comments or empty lines)
            $orderedLines += $line
        }
    }
    
    # Get target author info
    $targetAuthor = $authorMappings[$AssignedAuthor]
    
    # Check if current author is already correct
    $currentMsAuthor = $metadata["ms.author"]
    $currentAuthor = $metadata["author"]
    
    $isCurrentlyCorrect = ($currentMsAuthor -eq $targetAuthor.ms_author) -and ($currentAuthor -eq $targetAuthor.author)
    
    if ($isCurrentlyCorrect) {
        Write-Host "  Already correct, skipping: $FilePath"
        return
    }
    
    # Check existing reviewers
    $currentReviewer = $metadata["reviewer"]
    $currentMsReviewer = $metadata["ms.reviewer"]
    
    # List of authors we're reassigning (should not be kept as reviewers)
    $reassignedAuthors = @("jonburchel", "jburchel", "s-polly", "scottpolly", "lgayhardt", "lagayhar")
    
    # Store current values as reviewers only if they're not being reassigned
    $newReviewer = $currentAuthor
    $newMsReviewer = $currentMsAuthor
    
    # If there's already a reviewer who is NOT one of our reassigned authors, keep them
    if ($currentReviewer -and $currentReviewer -notin $reassignedAuthors) {
        $newReviewer = $currentReviewer
    }
    if ($currentMsReviewer -and $currentMsReviewer -notin $reassignedAuthors) {
        $newMsReviewer = $currentMsReviewer
    }
    
    # Update metadata values
    $metadata["ms.author"] = $targetAuthor.ms_author
    $metadata["author"] = $targetAuthor.author
    
    if ($newReviewer -and $newReviewer -ne $targetAuthor.author) {
        $metadata["reviewer"] = $newReviewer
    }
    if ($newMsReviewer -and $newMsReviewer -ne $targetAuthor.ms_author) {
        $metadata["ms.reviewer"] = $newMsReviewer
    }
    
    # Rebuild frontmatter preserving original order
    $newFrontmatter = ""
    foreach ($line in $orderedLines) {
        if ($line -match "^(\s*)([\w\.]+):\s*(.*)$") {
            $key = $matches[2].Trim()
            $prefix = $matches[1]
            if ($metadata.ContainsKey($key)) {
                $newFrontmatter += "$prefix$key`: $($metadata[$key])`n"
            } else {
                $newFrontmatter += "$line`n"
            }
        } else {
            $newFrontmatter += "$line`n"
        }
    }
    
    # Add any new metadata fields that weren't in the original (like reviewer fields)
    $existingKeys = @()
    foreach ($line in $orderedLines) {
        if ($line -match "^(\s*)([\w\.]+):\s*(.*)$") {
            $existingKeys += $matches[2].Trim()
        }
    }
    
    foreach ($key in $metadata.Keys) {
        if ($key -notin $existingKeys) {
            $newFrontmatter += "$key`: $($metadata[$key])`n"
        }
    }
    
    # Rebuild file content
    $newContent = "---`n$newFrontmatter---$body"
    
    # Write back to file
    try {
        Set-Content -Path $FilePath -Value $newContent -Encoding UTF8 -NoNewline
        Write-Host "  Updated: $FilePath -> $AssignedAuthor"
    }
    catch {
        Write-Error "Failed to update $FilePath`: $($_.Exception.Message)"
    }
}

# Main processing
Write-Host "Starting author metadata update for data-science folder..."

# Get all markdown files
$mdFiles = Get-ChildItem -Path "docs/data-science" -Recurse -Filter "*.md"

foreach ($file in $mdFiles) {
    # Skip include files
    if ($file.DirectoryName -like "*includes*") {
        Write-Host "Skipping include file: $($file.FullName)"
        continue
    }
    
    # Get relative path from data-science folder
    $relativePath = $file.FullName.Replace("$PWD\docs\data-science\", "").Replace("\", "/")
    
    # Find assigned author
    $assignedAuthor = $fileToSection[$relativePath]
    
    if ($assignedAuthor) {
        Update-AuthorMetadata -FilePath $file.FullName -AssignedAuthor $assignedAuthor
    }
    else {
        Write-Warning "No author assignment found for: $relativePath"
    }
}

Write-Host "Author metadata update completed!"
