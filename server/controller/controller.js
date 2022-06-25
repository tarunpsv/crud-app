var Userdb = require('../model/model');

// create and save new user
exports.create = (req,res) => {
    
    console.log("Create");
    
    // validate request
    if(!req.body)
    {
        res.status(400).send({message: "Message cannot be Empty!"});
        return;
    }

    //new user
    const user = new Userdb({
        name:req.body.name,
        email:req.body.email,
        contact:req.body.contact,
        gender:req.body.gender,
        branch:req.body.branch
    })

    // save the user in the database
    user
        .save(user)
        .then(data => {
            //res.send(data)
            res.redirect('/add-user')
        })
        .catch(err => {
            res.status(500).send({
                message : err.message || "Some error occured while creating a create operation"
            });
        });
}

//retrieve and return all users or a single user
exports.find = (req,res) => {

    console.log("Find");

    if(req.query.id)
    {
        const id = req.query.id;

        Userdb.findById(id)
            .then(data => {
                if(!data){
                    res.status(404).send({message : "Not found user with id = "+id})
                }
                else
                {
                    res.send(data);
                }
            })
            .catch(err => {
                res.status(500).send({message : "Error occured while retrieving user with id = "+id})
            })
    }
    else
    {
        Userdb.find()
        .then(user => {
            res.send(user)
        })
        .catch(err => {
            res.status(500).send({message : err.message || "Error Occured while retrieving user information"})
        })
    }

}

// update a new identified user by user Id
exports.update = (req,res) =>{

    console.log("Update");

    if(!req.body)
    {
        return res
            .status(400)
            .send({message : "Data to be updated cannot be Empty!"})
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, {useFindAndModify:false })
        .then(data => {
            if(!data)
            {
                res.status(404).send({message : `Cannot update user with ${id}. May be user not found!`})
            }
            else{
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({message : "Error in Updating the user Information"})
        })

}

// delete a user with specified user Id in the request
exports.delete =(req,res) =>{

    console.log("Delete");

    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
        .then(data => {
            if(!data)
            {
                res.status(404).send({message : `Cannot delete with id ${id}. May be id is wrong`})
            }
            else
            {
                res.send({
                    message : "Student was deleted Succesfully!"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message : "Could not delete user with id = "+id
            });
        });

}