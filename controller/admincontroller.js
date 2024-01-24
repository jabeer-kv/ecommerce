module.exports={
    adminpage:(req, res) => {
        res.render('admin/admin');
    },
    productadd:(req, res) => {
        res.render('admin/productadding');
    }
}