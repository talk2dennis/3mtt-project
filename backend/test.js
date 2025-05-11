import express from 'express';

const app = express();
const PORT = 7800;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const databBase = [
  {
    id: 1,
    title: 'Post 1',
    content: 'This is the first post',
  },
  {
    id: 2,
    title: 'Post 2',
    content: 'This is the content of post 2',
  },
  {
    id: 3,
    title: 'Post 3',
    content: 'This is the content of post 4',
  },
];

app.get('/', (req, res) => {
  res.send({ data: databBase });
});

app.post('/create-post', (req, res) => {
  const { title, content } = req.body;
  const newPost = {
    id: databBase.length + 1,
    title: title,
    content: content,
  };
  if (!title || !content) {
    return res.status(400).send({ message: 'Title and content are required' });
  } else {
    databBase.push(newPost);
    res.status(201).send({ message: 'Post added successfully', data: newPost });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});