var _ = require('lodash')
const Cat = require('../models/cat_model')

module.exports = function(app){
    //_cats =[];
    /* Create*/
    app.post('/cat',function(req,res){
        var newCat = new Cat(req.body);
       newCat.save(function(err,cat){
           if (err){
               
               res.json({info: 'error during create', error:err});
           };
           res.json({info: 'cat was created successfully',data: cat});
       })
    });

    /*Read*/
    app.get('/cat',function(req,res){
       Cat.find(function(err,cats){
        if (err){
            res.json({info: 'error during find cats ', error:err});
            return
        };
        res.json({info: 'cats found successfully',data: cats});
       });
    });

    app.get('/cat/:id',function(req,res){
        Cat.findById(req.params.id,function(err,cat){
            if (err){
                res.status(406)
                res.json({info: 'error during find cat ', error:err});
                return
            };
            if(cat){
                res.json({info: 'cat found successfully',data: cat});
            } else {
                res.status(206).json({info: 'cat was not found '});
            }
            
           });
    });

    app.get('/cats/?',function(req,res){
        const newQuery  = req.query
       
        Cat.find(newQuery,function(err,cat){
            if (err){
                res.status(406)
                res.json({info: 'error during find cat ', error:err});
                return
            };
            if(cat.length>0){
                res.json({info: 'cat found successfully',data: cat});
            } else {
                res.status(206).json({info: 'cat was not found '});
            }
            
           });
    });

    app.put('/cat/:id',function(req,res){
        Cat.findById(req.params.id,function(err,cat){
            if (err){
                res.json({info: 'error during find cat ', error:err});
                return
            };
            if(cat){
               // _.merge(cat,req.body);
                cat.updateOne({_id:req.params.id},function(err,cat){
                    if (err){
                        res.json({info: 'error during update', error:err});
                        return
                    };
                    res.status(400).json({info: 'cat was update successfully',data: cat});
                })
            
           }else{
            res.status(404).json({info: 'cat was not found '});
           }
    });
    });
    app.delete('/cat/:id',function(req,res){
      Cat.findByIdAndRemove(req.params.id,function(err){
          if(err){
            res.json({info: 'error during delete ', error:err});
            return
          }
          res.json({info: 'cat was Deleted successfully'});
      });
    });


}