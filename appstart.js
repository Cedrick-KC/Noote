const express = require('express');
const appstart = express();
const port = 3000;

appstart.get('/', (req, res) => {
  res.send('Hello, World!');
});

appstart.listen(port, () => {
  console.log(`Server listening   
 on port ${port}`);
});