 
router.get('/storeDocument', function(req,res){     //request will have document_name and contents parameters. will use database to determine current version number
  const { document_name, content } = req.body;
  req.pool.getConnection(function(err,connection){
    if(err){
      console.log(err);
      res.sendStatus(500);
      return;
    }
    
  var query="SELECT version_number FROM documents WHERE document_name=?;";
  connection.query(query, [document_name], function(err, rows) {  
      
  if (err) {
    console.log(err);
    res.sendStatus(500);
    return;
  }  
  let current_version_number=1
  
  if (rows.length === 0) {
     console.log('Document does not exist in database');
        
  } else {
        const past_version_number =rows[0].version_number
        current_version_number=past_version_number+1    //increment version_number contained in database by 1 to update new version
        }
    
   console.log('Updated version number:', current_version_number);
    
   var query = "INSERT INTO documents (document_name, content, version_number) VALUES (?, ?, ?)";
   connection.query(query, [document_name, content, current_version_number], function(err,rows,fields) {
   connection.release();
        
   if (err) {
     console.log(err);
     res.sendStatus(500);
     return;
   }
   res.json({ current_version_number: currentVersionNumber });
     
  });//close bracket for second connection.query
  });//close bracket for first connection.query
  });//close bracket for getconnection
  });//close bracket for function
    
   
   
  
