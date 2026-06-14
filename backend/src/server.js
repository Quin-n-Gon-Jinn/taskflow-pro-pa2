import app from './app.js';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ API TaskFlow Pro ejecutándose en http://localhost:${PORT}`);
  console.log(`📌 Endpoint principal: http://localhost:${PORT}/api/tasks`);
});
