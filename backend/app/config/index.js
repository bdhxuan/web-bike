const config = {
    app: {
        port: process.env.PORT || 4000,
    },
    db: {
        uri: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/webbike"
    },
    JWTS: {
        secret: process.env.JWT_SECRET || "AFASJEJ35509NJKJNOU79GGBRRTYJQ355",
        expire: process.env.JWT_EXPIRE || "5d"
    },
    cookie: {
        ck_exprise: process.env.COOKIE_EPIRE || "5"
    },
    smpt: {
        smpts: process.env.SMPT_SERVICE || "gmail",
        smptm: process.env.SMPT_MAIL || "xuanb1910180@student.ctu.edu.vn",
        smptp: process.env.SMPT_PASSWORD || "xuan061201",
        smpth: process.env.SMPT_HOST || "smtp.gmail.com",
        smptport: process.env.SMPT_PORT || "465"
    }
};


module.exports = config;