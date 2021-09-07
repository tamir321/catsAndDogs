var _ = require('lodash')
const Dog = require('../models/dog_model')

module.exports = function(app){
    
    /* Create*/
    app.post('/dog',function(req,res){
        var newDog = new Dog(req.body);
       newDog.save(function(err,dog){
           if (err){
               
               res.json({info: 'error during create', error:err});
           };
           res.json({info: 'dog was created successfully',data:dog});
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
    app.get('/dog/findDog',function(req,res){
        const newQuery  = {"name":"dog2"}
        Dog.find(newQuery,function(err,dog){
            if (err){
                res.status(406)
                res.json({info: 'error during find dog ', error:err});
                return
            };
            if(dog){
                const myDog = dog[0]
                console.log(`dog id ${myDog._id}`);
                console.log(`dog age ${myDog.age}`);
                myDog.age  ++;
                console.log(`dog new age ${myDog.age}`);
                Dog.updateOne({_id:myDog._id},myDog,function(err,myDog){
                    if (err){
                        res.json({info: 'error during update', error:err});
                        return
                    };
                    res.json({info: 'myDog was update successfully',data: myDog});
                   
                })

               // res.json({info: 'dog found successfully',data: dog});
            } else {
                res.status(206).json({info: 'dog was not found '});
            }
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
               // _.merge(dog,req.body);
                Dog.updateOne({_id:req.params.id},req.body,function(err,dog){
                    if (err){
                        res.json({info: 'error during update', error:err});
                        return
                    };
                    res.json({info: 'dog was update successfully',data: dog});
                   
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