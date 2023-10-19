var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
var models = require('../models');
const sd = require('silly-datetime');


router.post('/documents1', async function (req, res, next) {
  // 在响应中设置CORS头
  res.header('Access-Control-Allow-Origin', '*'); // 允许所有来源
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // 允许的请求头
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // 允许的HTTP方法

  try {
    const documents = await models.Documents.findAll({
      where:{status:0}
    });
    console.log(documents);
    if (documents) {

      res.json({ success: true, message: 'successful', documents: documents });
    } else {
      res.status(401).json({ success: false, message: 'not found' });
    }
  } catch (err) {
    console.error('Error logging:', err);
    res.status(500).json({ success: false, error: 'An error occurred' });
  }
});
router.post('/documents2', async function (req, res, next) {
  // 在响应中设置CORS头
  res.header('Access-Control-Allow-Origin', '*'); // 允许所有来源
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // 允许的请求头
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // 允许的HTTP方法

  try {
    const documents = await models.Documents.findAll({
      where:{status:1}
    });
    console.log(documents);
    if (documents) {

      res.json({ success: true, message: 'successful', documents: documents });
    } else {
      res.status(401).json({ success: false, message: 'not found' });
    }
  } catch (err) {
    console.error('Error logging:', err);
    res.status(500).json({ success: false, error: 'An error occurred' });
  }
});
router.post('/documents3', async function (req, res, next) {
  // 在响应中设置CORS头
  res.header('Access-Control-Allow-Origin', '*'); // 允许所有来源
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // 允许的请求头
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // 允许的HTTP方法

  try {
    const documents = await models.Documents.findAll({
      where:{status:2}
    });
    console.log(documents);
    if (documents) {

      res.json({ success: true, message: 'successful', documents: documents });
    } else {
      res.status(401).json({ success: false, message: 'not found' });
    }
  } catch (err) {
    console.error('Error logging:', err);
    res.status(500).json({ success: false, error: 'An error occurred' });
  }
});
router.post('/getannotions', async function (req, res, next) {
  // 在响应中设置CORS头
  res.header('Access-Control-Allow-Origin', '*'); // 允许所有来源
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // 允许的请求头
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // 允许的HTTP方法

  try {
    const annotations = await models.Annotations.findAll({
      where:{document:req.body.id}
    });
    console.log(annotations);
    if (annotations) {

      res.json({ success: true, message: 'successful', annotations: annotations });
    } else {
      res.status(401).json({ success: false, message: 'not found' });
    }
  } catch (err) {
    console.error('Error logging:', err);
    res.status(500).json({ success: false, error: 'An error occurred' });
  }
});

module.exports = router;