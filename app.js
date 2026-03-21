const express = require('express');
const app = express();

const APPS = [
  'https://lddm-list-2.onrender.com/wake',
  'https://a-fazer.onrender.com/wake',
  'https://labonnepaye-3.onrender.com/wake',

  'https://morningping.onrender.com/wake',
  'https://skill-up-n3xe.onrender.com'
];

  app.get('/wake', async (req, res) => {
  const results = await Promise.allSettled(
    APPS.map(async (url) => {
      const r = await fetch(url);
      console.log(`url: ${url} | status: ${r.status} | ok: ${r.ok}`);
      return r;
    })
  );
  res.status(200).json({ status: 'ok', time: new Date().toISOString() });
});


app.listen(3000);