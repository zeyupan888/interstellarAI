const express = require('express');
const cors = require('cors');

const app = express();
const port = 5001;

app.use(cors());
app.use(express.json());

// Mock GPU data
const gpus = [
  { id: 1, name: 'NVIDIA Tesla V100', status: 'Available' },
  { id: 2, name: 'NVIDIA A100', status: 'In use' },
  { id: 3, name: 'AMD Instinct MI100', status: 'Available' },
];

app.get('/api/gpus', (req, res) => {
  res.json(gpus);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});