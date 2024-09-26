const express = require('express');
const app = express();
const router = express.Router();
const path = __dirname + '/dist/firebaseProyect/';
const PORT = 8080;

router.use((req, res, next) => {
    console.log('/' + req.method);
    next();
});
router.get('/*', (req, res) => {
    res.sendFile(path + 'index.html');
});
app.use(express.static(path));
app.use('/', router);
app.listen(PORT || 4200, () => {
    console.log('Example app listening on port 8080');
});
