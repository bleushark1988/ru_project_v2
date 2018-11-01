const router = require('express').Router();
const bodyParser = require('body-parser');

let relations = [];

router.use(bodyParser.json()); // support json encoded bodies
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/users', (req, res) => res.json([
  { id: 1, name: 'John Doe', disabled: true },
  { id: 2, name: 'Alice' },
  { id: 3, name: 'Bob' },
]));

router.get('/roles', (req, res) => res.json([
  { id: 1, name: 'Admin' },
  { id: 2, name: 'Editor' },
  { id: 3, name: 'Viewer' },
]));

router.get('/projects', (req, res) => res.json([
  { id: 1, name: 'Trip to Space' },
  { id: 2, name: 'Assembly Ikea furniture' },
  { id: 3, name: 'Datumize Zentral' },
]));

router.get('/relations', (req, res) => res.json(relations));

router.post('/relations', (req, res) => {
  relations = req.body;
  res.status(201).json(relations);
});

module.exports = router;
