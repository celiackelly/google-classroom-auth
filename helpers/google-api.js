const google = require("googleapis").google

const googleConfig = {
  clientId: process.env.GOOGLE_OAUTH_ID,
  clientSecret: process.env.GOOGLE_OAUTH_SECRET,
  redirect: process.env.GOOGLE_OAUTH_REDIRECT,
};

const createConnection = () => {
  return new google.auth.OAuth2(
    googleConfig.clientId,
    googleConfig.clientSecret,
    googleConfig.redirect
  )
}

const getConnectionUrl = (auth) => {
  return auth.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/classroom.courses.readonly",
      "https://www.googleapis.com/auth/classroom.rosters.readonly",
      "https://www.googleapis.com/auth/classroom.push-notifications"
    ],
  })
}

/**
 * Exported functions
 */

module.exports.loginUrl = () => {
  const auth = createConnection()
  return getConnectionUrl(auth)
}

module.exports.getToken = async (code) => {
  const auth = createConnection()
  const data = await auth.getToken(code)
  return data.tokens
}
