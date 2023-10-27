var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
var models = require('../models');
const sd = require('silly-datetime');

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: '3306',
    database: 'attackflow' 
});



router.post('/documents', async function (req, res, next) {
  // 在响应中设置CORS头
  res.header('Access-Control-Allow-Origin', '*'); // 允许所有来源
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // 允许的请求头
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // 允许的HTTP方法

  try {
    sql = 'SELECT ts.`id`, ts.`document_no`, `document_name`, `version_number`, `content`, `path`, `uploader_id`, `is_accepted`, ts.`status`, ts.`createdAt`, ts.`updatedAt`,rs.account FROM `documents` ts  '
    +' INNER JOIN `users` rs on rs.id=ts.uploader_id'
    +' where ts.status=1 and ts.version_number=1'
    connection.query(sql, function (error, results, fields) {
      if (error) throw error;
      console.log(results)
      documents = results;
      if (documents) {

        res.json({ success: true, message: 'successful', documents: documents });
      } else {
        res.status(401).json({ success: false, message: 'not found' });
      }
    });
   
  } catch (err) {
    console.error('Error logging:', err);
    res.status(500).json({ success: false, error: 'An error occurred' });
  }
});

router.post('/documentsbyid', async function (req, res, next) {
  // 在响应中设置CORS头
  res.header('Access-Control-Allow-Origin', '*'); // 允许所有来源
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // 允许的请求头
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // 允许的HTTP方法

  try {
    sql = 'SELECT ts.`id`, ts.`document_no`, `document_name`, `version_number`, `content`, `path`, `uploader_id`, `is_accepted`, ts.`status`, ts.`createdAt`, ts.`updatedAt`,xt.referenced_text,ns.tags,rs.account FROM `documents` ts INNER JOIN `annotations` ns on '
    +'ts.id=ns.document INNER JOIN `users` rs on rs.id=ts.uploader_id INNER JOIN `referenced_texts` xt on xt.id=ns.referenced_text'
    +' where ts.status=1 and ts.id = '+req.body.id;
    connection.query(sql, function (error, results, fields) {
      if (error) throw error;
      console.log(results)
      documents = results;
      if (documents) {

        res.json({ success: true, message: 'successful', documents: documents });
      } else {
        res.status(401).json({ success: false, message: 'not found' });
      }
    });
  } catch (err) {
    console.error('Error logging:', err);
    res.status(500).json({ success: false, error: 'An error occurred' });
  }
});

router.post('/documentsbyno', async function (req, res, next) {
  // 在响应中设置CORS头
  res.header('Access-Control-Allow-Origin', '*'); // 允许所有来源
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // 允许的请求头
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // 允许的HTTP方法

  try {
    sql = 'SELECT ts.`id`, ts.`document_no`, `document_name`, `version_number`, `content`, `path`, `uploader_id`, `is_accepted`, ts.`status`, ts.`createdAt`, ts.`updatedAt`,xt.referenced_text,ns.tags,rs.account FROM `documents` ts INNER JOIN `annotations` ns on '
    +'ts.id=ns.document INNER JOIN `users` rs on rs.id=ts.uploader_id INNER JOIN `referenced_texts` xt on xt.id=ns.referenced_text'
    +' where ts.status=1 and ts.document_no = '+req.body.document_no;
    connection.query(sql, function (error, results, fields) {
      if (error) throw error;
      console.log(results)
      documents = results;
      if (documents) {

        res.json({ success: true, message: 'successful', documents: documents });
      } else {
        res.status(401).json({ success: false, message: 'not found' });
      }
    });
  } catch (err) {
    console.error('Error logging:', err);
    res.status(500).json({ success: false, error: 'An error occurred' });
  }
});

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
    const annotations = await models.Annotations.findOne({
      where:{document:req.body.id}
    });
    const referenced_texts = await models.Referenced_texts.findOne({
      where:{document:req.body.id}
    });
    const user = await models.User.findOne({
      where:{id:annotations.user}
    });
    console.log(referenced_texts);
    if (annotations) {

      res.json({ success: true, message: 'successful', annotations: annotations,referencedTexts:referenced_texts,user:user });
    } else {
      res.status(401).json({ success: false, message: 'not found' });
    }
  } catch (err) {
    console.error('Error logging:', err);
    res.status(500).json({ success: false, error: 'An error occurred' });
  }
});

router.post('/addAnnotation', async function (req, res, next) {
  // 在响应中设置CORS头
  res.header('Access-Control-Allow-Origin', '*'); // 允许所有来源
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // 允许的请求头
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // 允许的HTTP方法
  

  try {

    const documents = await models.Documents.findOne({
      where: { id: req.body.document_id }
    });
    const documents2 = await models.Documents.create({
      document_name: documents.document_name,
      uploader_id: req.body.uid,
      version_number: documents.version_number +1,
      path: req.body.path,
      document_no:req.body.document_no,
    });

    const referencedTexts = await models.Referenced_texts.create({
      document: documents2.id,
      referenced_text: req.body.referenced_text,
    });
    
    const annotations = await models.Annotations.create({
      document: documents2.id,
      user: req.body.uid,
      tags: req.body.tags,
      referenced_text: referencedTexts.id,
      document_no:req.body.document_no,
    });
    sql = 'SELECT ns.`id`, `tags`, `user`, ns.`document`, ns.`document_no`, ts.`referenced_text`, ns.`createdAt`, ns.`updatedAt` FROM `annotations` ns INNER JOIN `referenced_texts` ts on ts.id= ns.referenced_text '
    +' where ns.document_no = ' + req.body.document_no
    connection.query(sql, function (error, results, fields) {
      if (error) throw error;
      console.log(results)
      annotations2 = results;
      if (annotations && referencedTexts && documents2) {
        res.json({ success: true, message: 'successful', documents: documents2,annotations:annotations2 });
      } else {
        res.status(401).json({ success: false, message: 'not found' });
      }
    });
    
    console.log(annotations);
    
  } catch (error) {
    console.error('Error addtags:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

router.post('/approveannotions', async function (req, res, next) {
  // 在响应中设置CORS头
  res.header('Access-Control-Allow-Origin', '*'); // 允许所有来源
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // 允许的请求头
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // 允许的HTTP方法
  const { id} = req.body;
  console.log(req.body);
  try {
    const documents = await models.Documents.update({
      status: 1
    }, {
      where: { id: id }
    });
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
router.post('/rejectannotions', async function (req, res, next) {
  // 在响应中设置CORS头
  res.header('Access-Control-Allow-Origin', '*'); // 允许所有来源
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // 允许的请求头
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // 允许的HTTP方法
  const { id} = req.body;
  console.log(req.body);
  try {
    const documents = await models.Documents.update({
      status: 2
    }, {
      where: { id: id }
    });
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

module.exports = router;