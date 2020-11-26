var _ = require('lodash')
const Owner = require('../models/owner_model')
const Dog = require('../models/dog_model')
const Cat = require('../models/cat_model')
const Person = require('../models/person_model')
var found = {   person:false,
                cat:false,
                dog:false}

module.exports = function(app){
    
    /* Create*/
    app.post('/owner',async function(req,res){
        let newOwner = new Owner(req.body);
        let PersonId = newOwner.personId
        let DogId = newOwner.dogId
        let CatId = newOwner.catId       
        var jnk = {info:"no info"}
        var person = await Person.findById(PersonId);
        var cat = await Cat.findById(CatId);
        var dog = await Dog.findById(DogId);
        if(!dog){
            newOwner.dogId=""
        }
        if(!cat){
            newOwner.catId=""
        }
        if(person && (cat || dog)){
            
            newOwner.save(function(err, Owners){
                if (err){
                    console.log(jnk.info)
                    res.json({info: 'error during create', error:err});
                    return
                };
                res.json({info: 'owner record was created successfully',data: Owners});
            })
        }else {
            res.status(209).json({info: 'owner fail to find person or pet'});
        }
       
    });

    /*Read*/
    app.get('/owner',function(req,res){
       Owner.find(function(err,Owners){
        if (err){
            res.json({info: 'error during find owner  ', error:err});
            return
        };
        res.json({info: 'owners found successfully',data: Owners});
       });
    });

    app.get('/owner/:id',function(req,res){
        Owner.findById(req.params.id,function(err,owner){
            if (err){
                res.status(406)
                res.json({info: 'error during find owner ', error:err});
                return
            };
            if(owner){
                res.json({info: 'owner found successfully',data: owner});
            } else {
                res.status(206).json({info: 'owner was not found '});
            }
            
           });
    });

    app.get('/owners/?',function(req,res){
        const newQuery  = req.query
       
        Owner.find(newQuery,function(err,owner){
            if (err){
                res.status(406)
                res.json({info: 'error during find owner ', error:err});
                return
            };
            if(Owner.length>0){
                res.json({info: 'owner found successfully',data: owner});
            } else {
                res.status(206).json({info: 'owner was not found '});
            }
            
           });
    });

    app.put('/owner/:id',async function(req,res){

 
     
        var person = await Person.findById(req.body.personId);
        var cat = await Cat.findById(req.body.catId);
        var dog = await Dog.findById(req.body.dogId);


        Owner.findById(req.params.id,function(err,owner){
            if (err){
                res.json({info: 'error during find owner ', error:err});
                return
            };
            if(owner){
                _.merge(owner,req.body);
                Owner.save(function(err){
                    if (err){
                        res.json({info: 'error during update', error:err});
                        return
                    };
                    res.json({info: 'owner was update successfully'});
                })
            
           }else{
            res.json({info: 'owner was not found '});
           }
    });
    });
    app.delete('/owner/:id',function(req,res){
      Owner.findByIdAndRemove(req.params.id,function(err){
          if(err){
            res.json({info: 'error during delete ', error:err});
            return
          }
          res.json({info: 'owner was Deleted successfully'});
      });
    });


}