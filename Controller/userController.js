const orderModel = require('../Model/orderModel');
const customerModel = require('../Model/CustomterModel');

const getReg = (req,res)=>{
    res.render("User/reg",{
        title:'registration',
    })
}

const regPost = async(req,res)=>{
    try{
        //console.log("The Details collected from the Form: ",req.body);

        let formData = new customerModel({
            userName: req.body.uName,
            city: req.body.uCity.toUpperCase(),
            email: req.body.email

        });

        let saveData = await formData.save();
        if(saveData){
            res.redirect("/userDetails");
        }

    }catch(error){
        console.log("error in registration",error);
    }
}

const getOrder = async(req,res)=>{
    try{
        let customerData = await customerModel.find();
        //console.log("The Customer Details Got from the dataBase for place order: ",customerData);
        if(customerData){
            res.render("User/Order",{
                title:'Place Order',
                data: customerData
            })
        }
        
    }catch(error){

    }
    
}

const postOrder = async(req,res)=>{
    try{
        //console.log("Order details collected from the Form: ",req.body);
        let formData = new orderModel({
            Order_Id:req.body.OrderId,
            customer_Id:req.body.cid
        });
        let saveData = await formData.save();
        if(saveData){
            res.redirect("/OrderDetails");
        }

    }catch(error){
        console.log("Failed to Place order ",error);
    }
}

const userDetails = async(req,res)=>{
    try{
        let userData = await customerModel.find();
        //console.log("All Customer details got from the database: ",userData);
       
        let cityNameArray = [];
         userData.forEach(value => {  // Removing dublicate City Names from the Search List
            let upperCase = value.city.toUpperCase();
            if(!cityNameArray.includes(upperCase)){
                cityNameArray.push(upperCase);
            }
            return cityNameArray;
        });
        res.render("User/userDetails",{
            title:'User Info',
            data: userData,
            cityData :cityNameArray
        
        })
    }catch(error){
        console.log("Failed to fetch user data from the database ",error);
    }
}

const allDetails = async (req,res)=>{
    try{
    let allOrders = await orderModel.aggregate([
        {
            $lookup:{
                from: "userdatas",
                localField: 'customer_Id',
                foreignField:'_id',
                as:'allData'
            },
        },
        {
            $unwind:{
                path:"$allData"
            },
        },
        {
            
            $project:{
                createdAt:0,
                updatedAt:0,
                "allData.createdAt":0,
                "allData.updatedAt":0
            }
            
        }
    ])
    //console.log("The merged Details are : ",allOrders);
    res.render("User/allDetails",{
        title:'All Data',
        info: allOrders
    })
}catch(err){
    console.log("error",err);
}
}

const searchByCity = async(req,res)=>{
    try{

        let userData = await customerModel.find();
        //console.log("All Customer details got from the database: ",userData);
        let cityNameArray = [];
         userData.forEach(value => {  // Removing dublicate City Names from the Search List
            let upperCase = value.city.toUpperCase();
            if(!cityNameArray.includes(upperCase)){
                cityNameArray.push(upperCase);
            }
            return cityNameArray;
         });   
        console.log("The City names in Array after Removing Duplicay :",cityNameArray);

        let cityName = req.params.cityName; // Collecting City Name from Params
        
        console.log("The Collected City Name: ",cityName);

        let cityDetails = await customerModel.aggregate([
        
            {
                $match: { city: cityName }
            }
        ])
        console.log("The Customers details who live in that City: ",cityDetails);
        res.render("User/userDetails",{
            title: 'User Info',
            data : cityDetails,
            cityData: cityNameArray
            
        })

    }catch(error){
        console.log("Failed to fetch City Details: ",error);
    }
}
module.exports = {getReg,regPost,getOrder,postOrder,allDetails,userDetails,searchByCity}