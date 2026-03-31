// const express = require('express');
// const app = express();

// const APPS = [
//   'https://lddm-list-2.onrender.com/wake',
//   'https://a-fazer.onrender.com/wake',
//   'https://labonnepaye-3.onrender.com/wake',
//   'https://morningping.onrender.com/wake',
//   'https://skill-up-n3xe.onrender.com'
// ];

//   app.get('/wake', async (req, res) => {
//   const results = await Promise.allSettled(
//     APPS.map(async (url) => {
//       const r = await fetch(url);
//       console.log(`url: ${url} | status: ${r.status} | ok: ${r.ok}`);
//       return r;
//     })
//   );
//   res.status(200).json({ status: 'ok', time: new Date().toISOString() });
// });


// app.listen(3000);



const express = require('express');
const fetch = require('node-fetch'); // si Node <18
const app = express();

const APPS = [
  'https://lddm-list-2.onrender.com/wake',
  // 'https://a-fazer.onrender.com/wake',
  // 'https://labonnepaye-3.onrender.com/wake',
  'https://morningping.onrender.com/wake',
  // 'https://skill-up-n3xe.onrender.com'
];

app.get('/wake', async (req, res) => {
  const now = new Date();
  const hours = now.getHours();   // 0 à 23
  const minutes = now.getMinutes();

  // Exemple : on ne ping MorningPing que entre 8h15 et 8h30
  const results = await Promise.allSettled(
    APPS.map(async (url) => {
      if (url.includes('morningping')) {
        if (!(hours === 8 && minutes >= 0 && minutes <= 30)) {
          console.log(`Skipping ${url} | current time ${hours}:${minutes}`);
          return null;
        }
      }
      const r = await fetch(url);
      console.log(`url: ${url} | status: ${r.status} | ok: ${r.ok}`);
      return r;
    })
  );

  res.status(200).json({ status: 'ok', time: new Date().toISOString() });
});

app.listen(3000, () => console.log('Server running on port 3000'));