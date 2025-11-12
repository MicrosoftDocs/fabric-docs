---
title: Train models with PyTorch in Microsoft Fabric
description: Learn how to train models with the PyTorch framework in Microsoft Fabric for applications like computer vision and natural language processing.
ms.author: scottpolly
author: s-polly
ms.reviewer: negust
reviewer: nelgson
ms.topic: how-to
ms.custom:
ms.date: 09/30/2025
ms.search.form: Train models with PyTorch

#customer intent: As a developer, I want to use PyTorch in Microsoft Fabric so I can train models for applications, such as computer vision and natural language processing.
---

# Train models with PyTorch in Microsoft Fabric

This article describes how to train and track the iterations of a PyTorch model. The [PyTorch](https://pytorch.org/) machine learning framework is based on the Torch library. PyTorch is often used for computer vision and natural language processing applications.

## Prerequisites

Install PyTorch and torchvision in your notebook. Install or upgrade the libraries in your environment with:

```shell
pip install torch torchvision
```

## Set up the machine learning experiment

Create a machine learning experiment with the MLflow API. The MLflow `set_experiment()` function creates the experiment named `sample-pytorch` if it doesn't exist. 

Run the following code in your notebook to create the experiment:

```python
import mlflow

mlflow.set_experiment("sample-pytorch")
```

## Train and evaluate a PyTorch model

After you set up the experiment, load the Modified National Institute of Standards and Technology (MNIST) dataset. Generate the training and test datasets, then create a training function.

Run this code in your notebook to train the PyTorch model:

```python
import os
import torch
import torch.nn as nn
from torch.autograd import Variable
import torchvision.datasets as dset
import torchvision.transforms as transforms
import torch.nn.functional as F
import torch.optim as optim

# Load the MNIST dataset
root = "/tmp/mnist"
if not os.path.exists(root):
    os.mkdir(root)

trans = transforms.Compose(
    [transforms.ToTensor(), transforms.Normalize((0.5,), (1.0,))]
)

# If the data doesn't exist, download the MNIST dataset
train_set = dset.MNIST(root=root, train=True, transform=trans, download=True)
test_set = dset.MNIST(root=root, train=False, transform=trans, download=True)

batch_size = 100

train_loader = torch.utils.data.DataLoader(
    dataset=train_set, batch_size=batch_size, shuffle=True
)
test_loader = torch.utils.data.DataLoader(
    dataset=test_set, batch_size=batch_size, shuffle=False
) 

print("Total training batches: {}".format(len(train_loader)))
print("Total testing batches: {}".format(len(test_loader)))

# Define the network
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

# Train the model
model = LeNet()

optimizer = optim.SGD(model.parameters(), lr=0.01, momentum=0.9)

criterion = nn.CrossEntropyLoss()

for epoch in range(1):
    # Model training
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
    # Model testing
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

## Log a model with MLflow

Start an MLflow run to log results in the machine learning experiment. The code registers a new model named **sample-pytorch** in the `sample-pytorch` experiment.  

Run this code to log the model:

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

## Load and evaluate the model

After you save the model, load it for inference.

Run this code in your notebook to load the model and run inference:

```python
# Load the logged model for inference

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

## Related content

- Explore [machine learning models](machine-learning-model.md).
- Create [machine learning experiments](machine-learning-experiment.md). 
