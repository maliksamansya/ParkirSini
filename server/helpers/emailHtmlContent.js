const generateHTML = (amount, email, date, address, username, phoneNumber, parkingSpaceName) => {
   amount = Number(amount).toLocaleString()
   return `<!DOCTYPE html
   PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
<html lang="en">

<head></head>
<div id="__react-email-preview" style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">
   Parkir Sini Receipt<div>
       ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿
   </div>
</div>

<body style="font-family:&quot;Helvetica Neue&quot;,Helvetica,Arial,sans-serif;background-color:#ffffff">
   <table align="center" role="presentation" cellSpacing="0" cellPadding="0" border="0" width="100%"
      style="max-width:37.5em;margin:0 auto;padding:20px 0 48px;width:660px">
      <tr style="width:100%">
         <td>
            <table align="center" border="0" cellPadding="0" cellSpacing="0" role="presentation" width="100%">
               <tbody>
                  <tr>
                     <td>
                     <td><img alt="Parkir Sini Logo" src="https://i.ibb.co/jL6JKcb/fp-logo.png" width="150" height="50"
                           style="display:block;outline:none;border:none;text-decoration:none" /></td>
                     <td align="right" style="display:table-cell">
                        <p style="font-size:32px;line-height:24px;margin:16px 0;font-weight:300;color:#888888">Payment
                           Receipt
                        </p>
                     </td>
         </td>
      </tr>
      </tbody>
   </table>
   <table align="center" border="0" cellPadding="0" cellSpacing="0" role="presentation" width="100%">
      <tbody>
         <tr>
            <td>
               <p
                  style="font-size:22px;line-height:24px;margin:36px 0 40px 0;text-align:center;font-weight:700;color:#888888">
                  Enjoy with 'Parkir Sini'</p>
            </td>
         </tr>
      </tbody>
   </table>
   <table
      style="border-collapse:collapse;border-spacing:0px;color:rgb(51,51,51);background-color:rgb(250,250,250);border-radius:3px;font-size:12px"
      align="center" border="0" cellPadding="0" cellSpacing="0" role="presentation" width="100%">
      <tbody>
         <tr>
            <td>
               <table width="100%" style="height:46px" align="center" role="presentation" cellSpacing="0"
                  cellPadding="0" border="0">
                  <tbody style="width:100%">
                     <tr style="width:100%">
                        <td colSpan="2">
                           <table width="100%" align="center" role="presentation" cellSpacing="0" cellPadding="0"
                              border="0">
                              <tbody style="width:100%">
                                 <tr style="width:100%">
                                    <td
                                       style="padding-left:20px;border-style:solid;border-color:white;border-width:0px 1px 1px 0px;height:44px">
                                       <p
                                          style="font-size:10px;line-height:1.4;margin:0;padding:0;color:rgb(102,102,102)">
                                          USER ID</p><a target="_blank"
                                          style="color:#15c;text-decoration:underline;font-size:12px;margin:0;padding:0;line-height:1.4">${email}</a>
                                    </td>
                                 </tr>
                              </tbody>
                           </table>
                           <table width="100%" align="center" role="presentation" cellSpacing="0" cellPadding="0"
                              border="0">
                              <tbody style="width:100%">
                                 <tr style="width:100%">
                                    <td
                                       style="padding-left:20px;border-style:solid;border-color:white;border-width:0px 1px 1px 0px;height:44px">
                                       <p
                                          style="font-size:10px;line-height:1.4;margin:0;padding:0;color:rgb(102,102,102)">
                                          INVOICE DATE</p>
                                       <p style="font-size:12px;line-height:1.4;margin:0;padding:0">${date}</p>
                                    </td>
                                 </tr>
                              </tbody>
                           </table>
                           <table width="100%" align="center" role="presentation" cellSpacing="0" cellPadding="0"
                              border="0">
                              <tbody style="width:100%">
                                 <tr style="width:100%">
                                    <td
                                       style="padding-left:20px;border-style:solid;border-color:white;border-width:0px 1px 1px 0px;height:44px">
                                       <p
                                          style="font-size:10px;line-height:1.4;margin:0;padding:0;color:rgb(102,102,102)">
                                          Phone Number</p><a target="_blank"
                                          style="color:#15c;text-decoration:underline;font-size:12px;margin:0;padding:0;line-height:1.4">${phoneNumber}</a>
                                    </td>
                                    <td
                                       style="padding-left:20px;border-style:solid;border-color:white;border-width:0px 1px 1px 0px;height:44px">
                                       <p
                                          style="font-size:10px;line-height:1.4;margin:0;padding:0;color:rgb(102,102,102)">
                                          PRODUCT NAME</p>
                                       <p style="font-size:12px;line-height:1.4;margin:0;padding:0">${parkingSpaceName}</p>
                                    </td>
                                 </tr>
                              </tbody>
                           </table>
                        </td>
                        <td colSpan="2"
                           style="padding-left:20px;border-style:solid;border-color:white;border-width:0px 1px 1px 0px;height:44px">
                           <p style="font-size:10px;line-height:1.4;margin:0;padding:0;color:rgb(102,102,102)">BILLED TO
                           </p>
                           <p style="font-size:12px;line-height:1.4;margin:0;padding:0">${username}</p>
                           <p style="font-size:12px;line-height:1.4;margin:0;padding:0">${address}</p>
                           <p style="font-size:12px;line-height:1.4;margin:0;padding:0">INDONESIA</p>
                        </td>
                     </tr>
                  </tbody>
               </table>
            </td>
         </tr>
      </tbody>
   </table>
   <hr style="width:100%;border:none;border-top:1px solid #eaeaea;margin:30px 0 0 0" />
   <table align="center" border="0" cellPadding="0" cellSpacing="0" role="presentation" width="100%">
      <tbody>
         <tr>
            <td>
            <td align="right" style="display:table-cell">
               <p
                  style="font-size:10px;line-height:24px;margin:0;color:rgb(102,102,102);font-weight:600;padding:0px 30px 0px 0px;text-align:right">
                  TOTAL</p>
            </td>
            <td style="height:48px;border-left:1px solid;border-color:rgb(238,238,238)"></td>
            <td style="display:table-cell;width:90px">
               <p
                  style="font-size:16px;line-height:24px;margin:0px 20px 0px 5px;font-weight:600;white-space:nowrap;text-align:right">
                  Rp. ${amount}</p>
            </td>
            </td>
         </tr>
      </tbody>
   </table>
   <hr style="width:100%;border:none;border-top:1px solid #eaeaea;margin:0 0 75px 0" />
   <table align="center" border="0" cellPadding="0" cellSpacing="0" role="presentation" width="100%">
      <tbody>
         <tr>
            <td>
            <td align="center" style="display:block"><img alt="Parkir Sini Logo"
                  src="https://i.ibb.co/jL6JKcb/fp-logo.png" width="200" height="70"
                  style="display:block;outline:none;border:none;text-decoration:none" /></td>
            </td>
         </tr>
      </tbody>
   </table>
   <hr style="width:100%;border:none;border-top:1px solid #eaeaea;margin:65px 0 20px 0" />
   <p style="font-size:12px;line-height:24px;margin:8px 0 0 0;text-align:center;color:rgb(102,102,102)"><a
         target="_blank" style="color:#067df7;text-decoration:none" href="#">Account Settings</a> • <a target="_blank"
         style="color:#067df7;text-decoration:none" href="#">Terms of Sale</a> • <a target="_blank"
         style="color:#067df7;text-decoration:none" href="#">Privacy Policy </a></p>
   <p style="font-size:12px;line-height:24px;margin:25px 0 0 0;text-align:center;color:rgb(102,102,102)">Copyright ©
      2023 Parkir Sini Inc. <br /> <a target="_blank" style="color:#067df7;text-decoration:none" href="#">All rights
         reserved</a></p>
   </td>
   </tr>
   </table>
</body>

</html>`
}

const generateHTMLReminder = () => {
   return `<!DOCTYPE html
   PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
<html lang="en">

<head></head>
<div id="__react-email-preview" style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">
   Parkir Sini Receipt<div>
       ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿
   </div>
</div>

<body style="font-family:&quot;Helvetica Neue&quot;,Helvetica,Arial,sans-serif;background-color:#ffffff">
   <table align="center" role="presentation" cellSpacing="0" cellPadding="0" border="0" width="100%"
      style="max-width:37.5em;margin:0 auto;padding:20px 0 48px;width:660px">
      <tr style="width:100%">
         <td>
            <table align="center" border="0" cellPadding="0" cellSpacing="0" role="presentation" width="100%">
               <tbody>
                  <tr>
                     <td>
                     <td><img alt="Parkir Sini Logo" src="https://i.ibb.co/jL6JKcb/fp-logo.png" width="150" height="50"
                           style="display:block;outline:none;border:none;text-decoration:none" /></td>
         </td>
      </tr>
      </tbody>
   </table>
   <table align="center" border="0" cellPadding="0" cellSpacing="0" role="presentation" width="100%">
      <tbody>
         <tr>
            <td>
               <p
                  style="font-size:22px;line-height:24px;margin:36px 0 40px 0;text-align:center;font-weight:700;color:#888888">
                  Friendly Reminder for a Due Date</p>
            </td>
         </tr>
      </tbody>
   </table>
   <div>
      <div style="font-family: Helvetica, Arial, sans-serif; font-size: 15px; color: #7a7a7a;">
         <p>Hi, Valued Customer,</p>

         <p>We hope this message finds you well. We would like to inform you that the
            rental period is about to expire in the upcoming days. To ensure continuous
            access, we kindly request you to extend your booking before the expiration
            date. Failure to extend the rental period will result in the deactivation
            of your booking code.</p>

         <p>To extend your rental period, simply navigate to your dashboard and follow
            the steps provided. Don't miss out on enjoying our services for a longer
            duration!</p>

         <p>Thank you for choosing our services. If you have any questions or need
            assistance, feel free to reach out to our support team.</p>

         <p>Thank you so much for using Parkir Sini!</p>

         <p>Signature</p>
      </div>
   </div>
   <hr style="width:100%;border:none;border-top:1px solid #eaeaea;margin:0 0 75px 0" />
   <table align="center" border="0" cellPadding="0" cellSpacing="0" role="presentation" width="100%">
      <tbody>
         <tr>
            <td>
            <td align="center" style="display:block"><img alt="Parkir Sini Logo"
                  src="https://i.ibb.co/jL6JKcb/fp-logo.png" width="200" height="70"
                  style="display:block;outline:none;border:none;text-decoration:none" /></td>
            </td>
         </tr>
      </tbody>
   </table>
   <hr style="width:100%;border:none;border-top:1px solid #eaeaea;margin:65px 0 20px 0" />
   <p style="font-size:12px;line-height:24px;margin:8px 0 0 0;text-align:center;color:rgb(102,102,102)"><a
         target="_blank" style="color:#067df7;text-decoration:none" href="#">Account Settings</a> • <a target="_blank"
         style="color:#067df7;text-decoration:none" href="#">Terms of Sale</a> • <a target="_blank"
         style="color:#067df7;text-decoration:none" href="#">Privacy Policy </a></p>
   <p style="font-size:12px;line-height:24px;margin:25px 0 0 0;text-align:center;color:rgb(102,102,102)">Copyright ©
      2023 Parkir Sini Inc. <br /> <a target="_blank" style="color:#067df7;text-decoration:none" href="#">All rights
         reserved</a></p>
   </td>
   </tr>
   </table>
</body>

</html>`
}

module.exports = { generateHTML, generateHTMLReminder }