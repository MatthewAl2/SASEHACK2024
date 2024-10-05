import torch
import torch.nn as nn
from torch.utils.data import Dataset, DataLoader
from sklearn.model_selection import train_test_split
from transformers import BertModel
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score, accuracy_score
from tqdm import tqdm


# Defining the Neural Network Model
class TaskWeightModel(nn.Module):
    def __init__(self, bert_model_name, dropout=0.3):
        super(TaskWeightModel, self).__init__()
        self.bert = BertModel.from_pretrained(bert_model_name)
        self.drop = nn.Dropout(p=dropout)
        self.out = nn.Linear(self.bert.config.hidden_size, 1)  # Single output neuron for regression
        
    def forward(self, input_ids, attention_mask):
        bert_outputs = self.bert(
            input_ids=input_ids,
            attention_mask=attention_mask
        )
        pooled_output = bert_outputs.pooler_output  # CLS token output
        output = self.drop(pooled_output)
        return self.out(output)

# Custom Dataset Class
class TaskDataset(Dataset):
   def __init__(self, tasks, weights, tokenizer, max_len):
      self.tasks = tasks
      self.weights = weights
      self.tokenizer = tokenizer
      self.max_len = max_len
   
   def __len__(self):
      return len(self.tasks)
   
   def __getitem__(self, idx):
      task = self.tasks[idx]
      weight = self.weights[idx]
      # Tokenize the task and get input ids and attention masks
      encoding = self.tokenizer.encode_plus(
         task,
         add_special_tokens=True,
         max_length=self.max_len,
         padding='max_length',
         return_attention_mask=True,
         return_tensors='pt',
         truncation=True
      )
      return {
         'input_ids': encoding['input_ids'].flatten(),
         'attention_mask': encoding['attention_mask'].flatten(),
         'weight': torch.tensor(weight, dtype=torch.float)
      }

# Training Loop
def train_model(model, loader, optimizer, loss_fn, epochs=5):
   device = torch.device('cpu')
   model = model.to(device)
   loss_fn = loss_fn.to(device)

   for epoch in tqdm(range(epochs)):
      model.train()
      train_loss = 0
      for batch in tqdm(loader):
         optimizer.zero_grad()
         input_ids = batch['input_ids'].to(device)
         attention_mask = batch['attention_mask'].to(device)
         weights = batch['weight'].to(device)

         outputs = model(input_ids=input_ids, attention_mask=attention_mask)
         loss = loss_fn(outputs.squeeze(), weights)
         loss.backward()
         optimizer.step()
         train_loss += loss.item()
      
      print(f'Epoch {epoch + 1}, Train Loss: {train_loss / len(loader)}')


def evaluate_model(model, val_loader):
   model.eval()  # Set the model to evaluation mode
   device = torch.device('cpu')  # Assuming no GPU for simplicity
   model = model.to(device)
   
   actuals = []
   predictions = []
   
   with torch.no_grad():  # Disable gradient calculation for evaluation
      for batch in val_loader:
         input_ids = batch['input_ids'].to(device)
         attention_mask = batch['attention_mask'].to(device)
         weights = batch['weight'].to(device)
         
         outputs = model(input_ids=input_ids, attention_mask=attention_mask)
         
         actuals.extend(weights.cpu().numpy())
         predictions.extend(outputs.cpu().numpy().squeeze())
   
   # Calculate metrics
   mse = mean_squared_error(actuals, predictions)
   mae = mean_absolute_error(actuals, predictions)
   r2 = r2_score(actuals, predictions)
   
   print(f"Mean Squared Error: {mse}")
   print(f"Mean Absolute Error: {mae}")
   print(f"R-Squared: {r2}")
   
   return mse, mae, r2


