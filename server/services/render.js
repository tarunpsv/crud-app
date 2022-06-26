const PORT = process.env.PORT || 3000
const axios = require('axios');

exports.homeRoutes=(req,res)=>{
    // Make a request to /api/users
    axios.get(`http://localhost:${PORT}/api/users`)
        .then(function(response){
            res.render('index',{users:response.data, port:PORT});
        })
        .catch(err =>{
            res.send(err);
        })
}

exports.add_user=(req,res)=>{
    res.render('add_user');
}

exports.update_user=(req,res)=>{

    axios.get(`http://localhost:${PORT}/api/users`, { params : { id : req.query.id }})
        .then(function(userdata){
            //console.log(userdata.data);
            res.render("update_user", { user : userdata.data, port:PORT})
        })
        .catch(err =>{
            res.send(err);
        })
}