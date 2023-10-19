var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
var models = require('../models');
const sd = require('silly-datetime');


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/register', async function (req, res, next) {
  // 在响应中设置CORS头
  res.header('Access-Control-Allow-Origin', '*'); // 允许所有来源
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // 允许的请求头
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // 允许的HTTP方法


  try {
    // Generate a hash for the password
    //const hashedPassword = await bcrypt.hash(req.body.password, 10); // 10 is the hashing cost

    // Set the username (keeping the example's approach)
    models.User.count()
      .then(count => {
        req.body.username = "user" + count.toString();
      })
      .catch(error => {
        console.error("Error", error);
      });

    // Create a new Annotator record with the hashed password stored in the database
    const user = await models.User.create({
      username: req.body.username,
      password: req.body.password, // Store the hashed password
      email: req.body.email,
      account: req.body.account
    });

    res.json({ user: user });
  } catch (error) {
    console.error('Error registering:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

router.post('/login', async function (req, res, next) {
  // 在响应中设置CORS头
  res.header('Access-Control-Allow-Origin', '*'); // 允许所有来源
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // 允许的请求头
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // 允许的HTTP方法


  try {
    const { account, password } = req.body;

    // Find a matching user in the database
    const user = await models.User.findOne({
      where: { account: account }
    });

    // If a matching user is found
    if (user) {
      // Verify if the password matches
      //const hashedPassword = await bcrypt.hash(password, 10);

      if (password == user.password) {
        // Successful login, you can return some user information
        res.json({ success: true, message: 'Login successful', user: user });
      } else {
        // Password doesn't match
        res.status(401).json({ success: false, message: 'Invalid password' });
      }
    } else {
      // User doesn't exist
      res.status(401).json({ success: false, message: 'User not found' });
    }
  } catch (err) {
    console.error('Error logging:', err);
    res.status(500).json({ success: false, error: 'An error occurred' });
  }
});
router.post('/addtags', async function (req, res, next) {
  // 在响应中设置CORS头
  res.header('Access-Control-Allow-Origin', '*'); // 允许所有来源
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // 允许的请求头
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // 允许的HTTP方法


  try {

    const tags = await models.Tags.create({
      name: req.body.name
    });
    if (tags) {
      const tags2 = await models.Tags.findAll();
      res.json({ success: true, message: 'successful', tags: tags2 });
    } else {
      res.status(401).json({ success: false, message: 'not found' });
    }
  } catch (error) {
    console.error('Error addtags:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});
router.post('/edittags', async function (req, res, next) {
  // 在响应中设置CORS头
  res.header('Access-Control-Allow-Origin', '*'); // 允许所有来源
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // 允许的请求头
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // 允许的HTTP方法
  const { id,name} = req.body;
  console.log(req.body);
  try {
    const tags = await models.Tags.update({
      name: name
    }, {
      where: { id: id }
    });
    if (tags) {
      const tags2 = await models.Tags.findAll();
      res.json({ success: true, message: 'successful', tags: tags2 });
    } else {
      res.status(401).json({ success: false, message: 'not found' });
    }
  } catch (err) {
    console.error('Error logging:', err);
    res.status(500).json({ success: false, error: 'An error occurred' });
  }
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

router.post('/userslist', async function (req, res, next) {
  // 在响应中设置CORS头
  res.header('Access-Control-Allow-Origin', '*'); // 允许所有来源
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // 允许的请求头
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // 允许的HTTP方法

  try {
    const users = await models.User.findAll();
    if (users) {

      res.json({ success: true, message: 'successful', users: users });
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
router.post('/verifyuser', async function (req, res, next) {
  // 在响应中设置CORS头
  res.header('Access-Control-Allow-Origin', '*'); // 允许所有来源
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // 允许的请求头
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // 允许的HTTP方法
  const { id,astatus} = req.body;
  console.log(req.body);
  try {
    const users = await models.User.update({
      astatus: astatus
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
router.post('/deleteuser', async function (req, res, next) {
  // 在响应中设置CORS头
  res.header('Access-Control-Allow-Origin', '*'); // 允许所有来源
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // 允许的请求头
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // 允许的HTTP方法
  const { id} = req.body;
  console.log(req.body);
  try {
    const users = await models.User.delete({
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

router.post('/adddocument', async function (req, res, next) {
  // 在响应中设置CORS头
  res.header('Access-Control-Allow-Origin', '*'); // 允许所有来源
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // 允许的请求头
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // 允许的HTTP方法
  
  const document_no = sd.format(new Date(), 'YYYYMMDDHHmmss');

  try {

    const documents = await models.Documents.create({
      document_name: req.body.document_name,
      uploader_id: req.body.uploader_id,
      version_number: req.body.version_number,
      path: req.body.path,
      document_no:document_no
    });
    console.log(documents);
    if (documents) {
      res.json({ success: true, message: 'successful', documents: documents });
    } else {
      res.status(401).json({ success: false, message: 'not found' });
    }
  } catch (error) {
    console.error('Error addtags:', error);
    res.status(500).json({ error: 'An error occurred' });
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
    });
    
    console.log(annotations);
    if (annotations && referencedTexts && documents2) {
      res.json({ success: true, message: 'successful', documents: documents2 });
    } else {
      res.status(401).json({ success: false, message: 'not found' });
    }
  } catch (error) {
    console.error('Error addtags:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = router;