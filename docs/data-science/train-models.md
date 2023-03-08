---
title: How to train models
description: Learn how to train models.
ms.reviewer: mopeakande
ms.author: negust
author: nelgson
ms.subservice: data-science
ms.topic: how-to
ms.date: 02/10/2023
---

# How to train models

> [!IMPORTANT]
> [!INCLUDE [product-name](../includes/product-name.md)] is currently in PREVIEW. This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here.

## Train models with PyTorch

[PyTorch](https://pytorch.org/) is a machine learning framework based on the Torch library. It's frequently used for applications such as computer vision and natural language processing. In this article, we'll go through an example of how you can train and track the iterations of your PyTorch model.

### Install PyTorch

To get started with PyTorch, you must ensure that it's installed within your notebook. You can install or upgrade the version of PyTorch on your environment using the following command:

```shell
%pip install torch
```

### Set up the machine learning experiment

Next, we'll create a machine learning experiment using the MLFLow API. The MLflow set_experiment() API will create a new machine learning experiment if it doesn't already exist.

```python
import mlflow

mlflow.set_experiment(“sample-pytorch”)
```

### Train and evaluate a Pytorch model

After the experiment has been created, we'll load the MNSIT dataset, generate our test and training datasets, and create our training function.

```python
import os
import torch
import torch.nn as nn
from torch.autograd import Variable
import torchvision.datasets as dset
import torchvision.transforms as transforms
import torch.nn.functional as F
import torch.optim as optim


## load mnist dataset
root = "/tmp/mnist"
if not os.path.exists(root):
    os.mkdir(root)

trans = transforms.Compose(
    [transforms.ToTensor(), transforms.Normalize((0.5,), (1.0,))]
)
# if not exist, download mnist dataset
train_set = dset.MNIST(root=root, train=True, transform=trans, download=True)
test_set = dset.MNIST(root=root, train=False, transform=trans, download=True)

batch_size = 100

train_loader = torch.utils.data.DataLoader(
    dataset=train_set, batch_size=batch_size, shuffle=True
)
test_loader = torch.utils.data.DataLoader(
    dataset=test_set, batch_size=batch_size, shuffle=False
) 

print("==>>> total trainning batch number: {}".format(len(train_loader)))
print("==>>> total testing batch number: {}".format(len(test_loader)))

## network

class LeNet(nn.Module):
    def __init__(self):
        super(LeNet, self).__init__()
        self.conv1 = nn.Conv2d(1, 20, 5, 1)
        self.conv2 = nn.Conv2d(20, 50, 5, 1)
        self.fc1 = nn.Linear(4 * 4 * 50, 500)
        self.fc2 = nn.Linear(500, 10)

    def forward(self, x): 
        x = F.relu(self.conv1(x))
        x = F.max_pool2d(x, 2, 2)
        x = F.relu(self.conv2(x))
        x = F.max_pool2d(x, 2, 2)
        x = x.view(-1, 4 * 4 * 50)
        x = F.relu(self.fc1(x))
        x = self.fc2(x)
        return x

    def name(self):
        return "LeNet"

## training
model = LeNet()

optimizer = optim.SGD(model.parameters(), lr=0.01, momentum=0.9)

criterion = nn.CrossEntropyLoss()

for epoch in range(1):
    # trainning
    ave_loss = 0
    for batch_idx, (x, target) in enumerate(train_loader):
        optimizer.zero_grad()
        x, target = Variable(x), Variable(target)
        out = model(x)
        loss = criterion(out, target)
        ave_loss = (ave_loss * batch_idx + loss.item()) / (batch_idx + 1)
        loss.backward()
        optimizer.step()
        if (batch_idx + 1) % 100 == 0 or (batch_idx + 1) == len(train_loader):
            print(
                "==>>> epoch: {}, batch index: {}, train loss: {:.6f}".format(
                    epoch, batch_idx + 1, ave_loss
                )
            )
    # testing
    correct_cnt, total_cnt, ave_loss = 0, 0, 0
    for batch_idx, (x, target) in enumerate(test_loader):
        x, target = Variable(x, volatile=True), Variable(target, volatile=True)
        out = model(x)
        loss = criterion(out, target)
        _, pred_label = torch.max(out.data, 1)
        total_cnt += x.data.size()[0]
        correct_cnt += (pred_label == target.data).sum()
        ave_loss = (ave_loss * batch_idx + loss.item()) / (batch_idx + 1)

        if (batch_idx + 1) % 100 == 0 or (batch_idx + 1) == len(test_loader):
            print(
                "==>>> epoch: {}, batch index: {}, test loss: {:.6f}, acc: {:.3f}".format(
                    epoch, batch_idx + 1, ave_loss, correct_cnt * 1.0 / total_cnt
                )
            )

torch.save(model.state_dict(), model.name())
```

### Log model with MLflow

Now, we'll start an MLflow run and track the results within our machine learning experiment.

```python
with mlflow.start_run() as run:
    print("log pytorch model:")
    mlflow.pytorch.log_model(
        model, "pytorch-model", registered_model_name="sample-pytorch"
    )

    model_uri = "runs:/{}/pytorch-model".format(run.info.run_id)
    print("Model saved in run %s" % run.info.run_id)
    print(f"Model URI: {model_uri}")
```

This creates a run with the specified parameters and log the run within the sample-pytorch experiment. This snippet will also create a new model called sample-pytorch.  

### Load and evaluate the model

Once the model is saved, it can also be loaded for inferencing.  

```python
# Inference with loading the logged model
loaded_model = mlflow.pytorch.load_model(model_uri)
print(type(loaded_model))

correct_cnt, total_cnt, ave_loss = 0, 0, 0
for batch_idx, (x, target) in enumerate(test_loader):
    x, target = Variable(x, volatile=True), Variable(target, volatile=True)
    out = loaded_model(x)
    loss = criterion(out, target)
    _, pred_label = torch.max(out.data, 1)
    total_cnt += x.data.size()[0]
    correct_cnt += (pred_label == target.data).sum()
    ave_loss = (ave_loss * batch_idx + loss.item()) / (batch_idx + 1)

    if (batch_idx + 1) % 100 == 0 or (batch_idx + 1) == len(test_loader):
        print(
            "==>>> epoch: {}, batch index: {}, test loss: {:.6f}, acc: {:.3f}".format(
                epoch, batch_idx + 1, ave_loss, correct_cnt * 1.0 / total_cnt
            )
        )
```

## Train models with scikit-learn

Scikit-learn ([scikit-learn.org](https://scikit-learn.org)) is a popular, open-source machine learning framework. It's frequently used for supervised and unsupervised learning. It also provides various tools for model fitting, data preprocessing, model selection, model evaluation, and more.  

In this section, we'll go through an example of how you can train and track the iterations of your Scikit-Learn model.

### Install scikit-learn

To get started with scikit-learn, you must ensure that it's installed within your notebook. You can install or upgrade the version of scikit-learn on your environment using the following command:

```shell
%pip install scikit-learn
```

Next, we'll create a machine learning experiment using the MLFLow API. The MLflow set_experiment() API will create a new machine learning experiment if it doesn't already exist.

```python
import mlflow

mlflow.set_experiment(“sample-sklearn”)
```

### Train a scikit-learn model

After the experiment has been created, we'll create a sample dataset and create a logistic regression model. We'll also start a MLflow run and track the metrics, parameters, and final logistic regression model. Once we’ve generated the final model, we'll also save the resulting model for additional tracking.

```python
import mlflow.sklearn
import numpy as np
from sklearn.linear_model import LogisticRegression
from mlflow.models.signature import infer_signature

with mlflow.start_run() as run:

    lr = LogisticRegression()
    X = np.array([-2, -1, 0, 1, 2, 1]).reshape(-1, 1)
    y = np.array([0, 0, 1, 1, 1, 0])
    lr.fit(X, y)
    score = lr.score(X, y)
    signature = infer_signature(X, y)

    print("log_metric.")
    mlflow.log_metric("score", score)

    print("log_params.")
    mlflow.log_param("alpha", "alpha")

    print("log_model.")
    mlflow.sklearn.log_model(lr, "sklearn-model", signature=signature)
    print("Model saved in run_id=%s" % run.info.run_id)

    print("register_model.")
    mlflow.register_model(

        "runs:/{}/sklearn-model".format(run.info.run_id), "sample-sklearn"
    )
    print("All done")
```

### Load and evaluate the model on a sample dataset

Once the model is saved, it can also be loaded for inferencing. To do this, we'll load the model and run the inference on a sample dataset.

```python
# Inference with loading the logged model
from synapse.ml.predict import MLflowTransformer

spark.conf.set("spark.synapse.ml.predict.enabled", "true")

model = MLflowTransformer(
    inputCols=["x"],
    outputCol="prediction",
    modelName="sample-sklearn",
    modelVersion=1,
)

test_spark = spark.createDataFrame(
    data=np.array([-2, -1, 0, 1, 2, 1]).reshape(-1, 1).tolist(), schema=["x"]
)

batch_predictions = model.transform(test_spark)

batch_predictions.show()
```

## Next steps

- Learn about [machine learning models](machine-learning-model.md).
- Learn about [machine learning experiments](machine-learning-experiment.md).
