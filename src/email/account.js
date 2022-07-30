const sgmail=require('@sendgrid/mail')
const key=process.env.SENDGRID_API_KEY

sgmail.setApiKey(key)

// sgmail.send({
//     to:'hiiamhim56@gmail.com',
//     from:'hsrivastva76@gmail.com',
//     subject:'sexy',
//     text:'hope so '
// })

const sendWelcomeEmail=(email,name)=>{


    sgmail.send({

        to:email,
        from:"hsrivastva76@gmail.com",
        subject:"Integration is going on",
        text:`Hi ${name} hope you're doing well.Have a good day`
    })
}

const sendExitEmail=(email,name)=>{
    sgmail.send({
        to:email,
        from:"hsrivastva76@gmail.com",
        subject:"deletion of account",
        text:`Hi ${name} we feel bad to see you leaving.Hope to see you  soon have a good day`
    })
}

module.exports={
    sendWelcomeEmail,
    sendExitEmail
}

