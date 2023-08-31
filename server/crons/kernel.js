const CronJob = require("cron").CronJob;
const { Booking, Customer } = require('../models');
const SibApiV3Sdk = require('sib-api-v3-sdk')
const defaultClient = SibApiV3Sdk.ApiClient.instance
const apiKey = defaultClient.authentications['api-key']
const { generateHTMLReminder } = require("../helpers/emailHtmlContent")

const job = new CronJob(
   // "*/10 * * * * *",//untuk cek tiap 10 detik
   "0 0 * * *",
   async function () {
      console.log("Running your scheduled task...");
      try {
         const bookings = await Booking.findAll();
         console.log("Fetched bookings:", bookings);


         for (const booking of bookings) {
            if (booking.duration === 0) {
               booking.paid = false;
            } else if (booking.duration === 3) {
               apiKey.apiKey = process.env.SENDINBLUE_KEY
               const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi()
               const customer = await Customer.findOne({
                  where: {
                     id: booking.customerId
                  }
               });
               console.log(customer.email);
               const sender = {
                  email: "parkirsini@gmail.com",
                  name: "Parkir Sini"
               }
               const receivers = [
                  {
                     email: `${customer.email}`
                  }
               ]
               const sendEmail = await apiInstance.sendTransacEmail({
                  sender,
                  to: receivers,
                  subject: "Payment Receipt",
                  htmlContent: generateHTMLReminder()
               })
               booking.duration -= 1;
            } else if (booking.duration > 0 && booking.paid === true) {
               booking.duration -= 1;
            }
            await booking.save();
            console.log("Updated booking:", booking);
         }
      } catch (error) {
         console.error("Error updating bookings:", error);
      }
   },
   null,
   true,
   "Asia/Jakarta"
);

module.exports = job;