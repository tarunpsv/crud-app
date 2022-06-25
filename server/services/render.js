const axios = require('axios');

exports.homeRoutes=(req,res)=>{
    // Make a request to /api/users
    axios.get('http://localhost:3000/api/users')
        .then(function(response){
            res.render('index',{users:response.data});
        })
        .catch(err =>{
            res.send(error);
        })

    
}

exports.add_user=(req,res)=>{
    res.render('add_user');
}

exports.update_user=(req,res)=>{

    axios.get('http://localhost:3000/api/users', { params : { id : req.query.id }})
        .then(function(userdata){
            //console.log(userdata.data);
            res.render("update_user", { user : userdata.data})
        })
        .catch(err =>{
            res.send(err);
        })

    // axios.get('http://localhost:3000/api/users', {params: {id : req.query.id }})
    //     .then(function(userdata){
    //         res.render("update_user",{user : userdata.data});
    //     })
    //     .catch(err => {
    //         res.send(err);
    //     })

}