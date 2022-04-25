import { http } from '@google-cloud/functions-framework';

// HTTP Cloud Function.
http('helloHttp', (req, res) => {
  res.send(`Hello world!`);
});
