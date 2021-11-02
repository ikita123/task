const router = require('express').Router();
const { getRounds } = require('bcrypt');
const data = require('./controllers/controll')

router.post('/register',data.ragistation )
router.post('/login',data.login)
router.post('/data',data.verifyToken,data.additem)
router.put('/update',data.Edititem)
router.get('/:id',verifyToken,data.itemlist)
router.delete('/:id',verifyToken,data.deletedata)

module.exports = router