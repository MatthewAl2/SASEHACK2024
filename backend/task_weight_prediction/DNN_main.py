import pandas as pd
from sklearn.model_selection import train_test_split
import torch
from transformers import BertTokenizer
import torch.optim as optim
import torch.nn as nn
from torch.utils.data import DataLoader
from DNN import TaskDataset, TaskWeightModel, train_model, evaluate_model


df = pd.read_csv('tasks_data.csv')


# Data Preparation
'''
features: task descriptions
labels: task weights
'''
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
tasks = df['Task'] # List of tasks from dataset
weights = df['Weight'] # Corresponding weight scores
max_len = 50  # Max length for tokenization

# Splitting the data
# Splitting the data and resetting index
train_tasks, test_tasks, train_weights, test_weights = train_test_split(tasks, weights, test_size=0.2)

train_tasks = train_tasks.reset_index(drop=True)
test_tasks = test_tasks.reset_index(drop=True)
train_weights = train_weights.reset_index(drop=True)
test_weights = test_weights.reset_index(drop=True)

train_dataset = TaskDataset(train_tasks, train_weights, tokenizer, max_len)
test_dataset = TaskDataset(test_tasks, test_weights, tokenizer, max_len)

train_loader = DataLoader(train_dataset, batch_size=16, shuffle=True)
val_loader = DataLoader(test_dataset, batch_size=16)

# Model Initialization
model = TaskWeightModel(bert_model_name='bert-base-uncased')
optimizer = optim.Adam(model.parameters(), lr=2e-5)
loss_fn = nn.MSELoss()

# Train the model
print('Training model...')
train_model(model, train_loader, optimizer, loss_fn, epochs=30)

# Call the evaluation function

print('Evaluating model...')
evaluate_model(model, val_loader)

# Save the model
print('Saving the model...')
torch.save(model.state_dict(), 'task_weight_model.pth')
