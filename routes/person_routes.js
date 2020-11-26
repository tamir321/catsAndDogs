var _ = require('lodash')
const Person = require('../models/person_model')

module.exports = function(app){

    /* Create*/
    app.post('/person',function(req,res){
        var newPeron = new Person(req.body);
        newPeron.save(function(err,person){
           if (err){
               
               res.json({info: 'error during create', error:err});
           };
           res.json({info: 'person was created successfully',data:person});
       })
    });

    /*Read*/
    app.get('/person',function(req,res){
       Person.find(function(err,person){
        if (err){
            res.json({info: 'error during find person ', error:err});
            return
        };
        res.json({info: 'person found successfully',data: person});
       });
    });

    app.get('/person/:id',function(req,res){
        Person.findById(req.params.id,function(err,person){
            if (err){
                res.status(404)
                res.json({info: 'error during find person ', error:err});
                return
            };
            if(person){
                res.json({info: 'person found successfully',data: person});
            } else {
                res.status(206).json({info: 'person was not found '});
            }
            
           });
    });

    app.get('/persons/?',function(req,res){
        const newQuery  = req.query
       
        Person.find(newQuery,function(err,person){
            if (err){
                res.status(406)
                res.json({info: 'error during find person ', error:err});
                return
            };
            if(person.length>0){
                res.json({info: 'persons found successfully',data: person});
            } else {
                res.status(206).json({info: 'persons was not found '});
            }
            
           });
    });

    app.put('/person/:id',function(req,res){
        Person.findById(req.params.id,function(err,person){
            if (err){
                res.json({info: 'error during find person ', error:err});
                return
            };
            if(person){
               // _.merge(person,req.body);
                person.updateOne({_id:req.params.id},function(err,person){
                    if (err){
                        res.json({info: 'error during update', error:err});
                        return
                    };
                    res.status(400).json({info: 'person was update successfully',data:person});
                })
            
           }else{
            res.status(404).json({info: 'person was not found '});
           }
    });
    });
    app.delete('/person/:id',function(req,res){
      Person.findByIdAndRemove(req.params.id,function(err){
          if(err){
            res.json({info: 'error during delete ', error:err});
            return
          }
          res.json({info: 'person was Deleted successfully'});
      });
    });


}