var _ = require('lodash')
const Dog = require('../models/dog_model')

module.exports = function(app){
    
    /* Create*/
    app.post('/dog',function(req,res){
        var newDog = new Dog(req.body);
       newDog.save(function(err){
           if (err){
               
               res.json({info: 'error during create', error:err});
           };
           res.json({info: 'dog was created successfully'});
       })
    });

    /*Read*/
    app.get('/dog',function(req,res){
       Dog.find(function(err,dogs){
        if (err){
            res.json({info: 'error during find dogs ', error:err});
            return
        };
        res.json({info: 'dogs found successfully',data: dogs});
       });
    });

    app.get('/dog/:id',function(req,res){
        Dog.findById(req.params.id,function(err,dog){
            if (err){
                res.status(406)
                res.json({info: 'error during find dog ', error:err});
                return
            };
            if(dog){
                res.json({info: 'dog found successfully',data: dog});
            } else {
                res.status(206).json({info: 'dog was not found '});
            }
            
           });
    });

    app.get('/dogs/?',function(req,res){
        const newQuery  = req.query
       
        Dog.find(newQuery,function(err,dog){
            if (err){
                res.status(406)
                res.json({info: 'error during find dog ', error:err});
                return
            };
            if(Dog.length>0){
                res.json({info: 'dog found successfully',data: dog});
            } else {
                res.status(206).json({info: 'dog was not found '});
            }
            
           });
    });

    app.put('/dog/:id',function(req,res){
        Dog.findById(req.params.id,function(err,dog){
            if (err){
                res.json({info: 'error during find dog ', error:err});
                return
            };
            if(dog){
                _.merge(dog,req.body);
                Dog.save(function(err){
                    if (err){
                        res.json({info: 'error during update', error:err});
                        return
                    };
                    res.json({info: 'dog was update successfully'});
                })
            
           }else{
            res.json({info: 'dog was not found '});
           }
    });
    });
    app.delete('/dog/:id',function(req,res){
      Dog.findByIdAndRemove(req.params.id,function(err){
          if(err){
            res.json({info: 'error during delete ', error:err});
            return
          }
          res.json({info: 'dog was Deleted successfully'});
      });
    });


}