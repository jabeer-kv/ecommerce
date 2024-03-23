const coupon=require("../helpers/couponhelper")
module.exports={
    coupon:async (req,res)=>{
      const coupons=await coupon.findcoupon()
        res.render("admin/coupon",{coupon:coupons})
    },
    addcoupon:async (req,res)=>{
        try{
        const data = {
            couponName: req.body.couponName,
            couponCode: req.body.couponCode,
            amount: req.body.amount,
            startDate: req.body.startDate,
            expiryDate: req.body.expiryDate,
          };
    // console.log(data);
    const existingcoupon= await coupon.checking(data.couponCode)
    if(existingcoupon){
     res.json({success:false,message:"coupon existing"})
    }
    else{
    await coupon.add(data)
    res.json({ success: true, message: "Coupon added successfully!" });
    }
        }
        catch(error){
            console.error(error);
            res.status(500).json({ message: "Server error" });
        }
}
}