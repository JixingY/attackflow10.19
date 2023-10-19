var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
var models = require('../models');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('tags', { title: 'Express' });
});

router.post('/tagslist', async function (req, res, next) {
  // 在响应中设置CORS头
  res.header('Access-Control-Allow-Origin', '*'); // 允许所有来源
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // 允许的请求头
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // 允许的HTTP方法

  try {
    const tags = await models.Tags.findAll();
    console.log(tags);
    if (tags) {

      res.json({ success: true, message: 'successful', tags: tags });
    } else {
      res.status(401).json({ success: false, message: 'not found' });
    }
  } catch (err) {
    console.error('Error logging:', err);
    res.status(500).json({ success: false, error: 'An error occurred' });
  }
});
router.post('/edituser', async function (req, res, next) {
  // 在响应中设置CORS头
  res.header('Access-Control-Allow-Origin', '*'); // 允许所有来源
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // 允许的请求头
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // 允许的HTTP方法
  const { id,account, email,phone, is_admin} = req.body;
  console.log(req.body);
  try {
    const users = await models.User.update({
      account: account,
      email:email,
      phone:phone,
      is_admin:is_admin
    }, {
      where: { id: id }
    });
    if (users) {
      const users2 = await models.User.findAll();
      res.json({ success: true, message: 'successful', users: users2 });
    } else {
      res.status(401).json({ success: false, message: 'not found' });
    }
  } catch (err) {
    console.error('Error logging:', err);
    res.status(500).json({ success: false, error: 'An error occurred' });
  }
});

module.exports = router;