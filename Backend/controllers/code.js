const Code = require("../models/Code");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const { errorHandler } = require("../auth");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service : "gmail",
	host : "smtp.gmail.com",
	port : 465,
	secure : true,
	auth : {
			user : process.env.MAIL_EMAIL,
			pass : process.env.MAIL_PASS
			}
	});

const genCode = () => {
	const charset = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
	let result = "";

	for (let i = 0; i < 6; i++) {
			result += charset[crypto.randomInt(0,charset.length)];
		}
	return result;
}


module.exports.sendCode = (req, res) => {
	const generatedValue = genCode();
	const newCode = new Code({
		codeString: generatedValue,
		email: req.body.email
	});

	newCode.save()
	.then(savedCode => {
		console.log(`Generated code for ${req.body.email}.`);

		const mailOptions = {
			from : `"Parallox Airlines" <${process.env.MAIL_EMAIL}>`,
			to : `${req.body.email}`,
			subject : "Verify your Account",
			html : `
        <div style="background-color: #f4f7f9; padding: 40px 20px; font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
          <div style="max-width: 500px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05); border-bottom: 4px solid #00C2CB;">
            
            <div style="background-color: #26333D; padding: 30px; text-align: center;">
              <h1 style="color: #00C2CB; margin: 0; font-size: 24px; letter-spacing: 1px; font-weight: bold;">
                PARALLOX <span style="font-weight: 300; color: #ffffff;">AIRLINES</span>
              </h1>
            </div>
        
            <div style="padding: 40px 30px; text-align: center;">
              <h2 style="color: #26333D; font-size: 22px; margin-bottom: 10px; font-weight: bold;">Verify Your Account</h2>
              <p style="color: #55606a; font-size: 15px; line-height: 1.5; margin-bottom: 30px;">
                Ready for your next adventure? Use the code below for verification and start exploring the world.
              </p>
        
              <div style="background-color: #f8f9fa; border: 1.5px solid #e0e6ed; border-radius: 8px; padding: 25px; display: inline-block; min-width: 240px;">
                <span style="display: block; color: #00C2CB; font-size: 11px; font-weight: bold; text-transform: uppercase; margin-bottom: 10px; letter-spacing: 1px;">Verification Code</span>
                <h1 style="color: #26333D; margin: 0; font-size: 42px; letter-spacing: 12px; font-weight: bold;">
                  ${generatedValue}
                </h1>
              </div>
        
              <p style="color: #8a949d; font-size: 12px; margin-top: 30px; line-height: 1.6;">
                This code is valid for <strong>10 minutes</strong>.<br> 
                If you didn't request this, please ignore this email or contact support.
              </p>
            </div>
        
            <div style="background-color: #f8f9fa; padding: 25px; text-align: center; border-top: 1px solid #eeeeee;">
              <p style="color: #26333D; font-size: 11px; margin: 0; text-transform: uppercase; letter-spacing: 1px; font-weight: bold;">
                © 2026 Parallox Airlines Limited
              </p>
              <p style="color: #00C2CB; font-size: 10px; margin-top: 5px; font-style: italic;">
                Work, Travel, Save, Repeat.
              </p>
            </div>
          </div>
        </div>
				`
		}

		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				console.log("Error:", error);
				return res.status(201).send({ 
					message : "Code Generated. Email sending failed. Please try again"
				});
			}
				console.log("Email sent: " + info.response);
				return res.status(201).send({
					message : "Code sent to your email"
				})
		})
	})
	.catch(error => errorHandler(error, req, res))
}

module.exports.verifyCode = (req, res) => {
	const email = req.body.email;
	const codeString = req.body.code.toUpperCase();

	Code.findOne({email, codeString})
	.then(verifiedData => {

		if (!verifiedData) {
			return res.status(200).send({
				message : "The code you entered is incorrect or has expired; please check your inbox or request a new one"
			})
		}

		return res.status(200).send({
			message : "Verification successful"
		})
	})
	.catch(error => errorHandler(error, req, res));
}
