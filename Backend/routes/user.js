const express = require("express");
const userController = require("../controllers/user");
const { verify, verifyAdmin } = require("../auth");
const passport = require('passport');
const router = express.Router();

router.post("/register", userController.registerUser);

router.post("/login", userController.loginUser);

router.put("/update-info", verify, userController.updateUserInfo);

router.patch("/upload-pic", verify, userController.uploadProfilePic);

router.get("/get-profile", verify, userController.getProfile);

router.patch("/update-password", verify, userController.updatePassword);

router.patch("/reset-password", userController.resetPassword);

router.patch("/set-as-admin", verify, verifyAdmin, userController.setAsAdmin);

router.patch("/update-payment-info", verify, userController.updatePaymentInfo);

router.patch("/verify", verify, userController.verifyUser);

router.get('/google', 
        passport.authenticate('google', {
            scope: ['email', 'profile'],
            prompt: "select_account"
        })
    );

router.get('/google/callback', 
        passport.authenticate('google', {
            failureRedirect: '/users/failed',
        }),

        function(req, res) {
            res.redirect('/users/success');
        }
                  
    );

router.get('/failed', (req, res) => {
    console.log("User is not authenticated");
    res.status(400).send("Failed");
});

router.get('/success', (req, res) => {
    console.log(req.user);
    userController.successGoogleAuth;
});

module.exports = router;
