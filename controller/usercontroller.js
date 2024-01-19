
module.exports={
    signup:(req, res) => {
        res.render('signin');
    },
    signin:(req, res) => {
        res.render('signup');
    },
    userpage:(req, res) => {
        res.render('index');
    }
}