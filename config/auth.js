/**
 * Created by Usuario on 16/12/2015.
 */

module.exports = {
    'facebookAuth': {
        clientID: '206127749720827',
        clientSecret: '3f3b6994ec1dfda4c36de216d8fa03e3',
        callbackURL: 'http://localhost:3000/auth/facebook/callback',
        profileFields: ['id', 'displayName', 'photos', 'emails']// [1]
 },
  'twitterAuth': {
        clientID: 'qCxDfFYZobEDyhrpSC4ERp8mT',
        clientSecret:'PC2tpiFgFHyMtEjYwBwc5uROZukS40mbhO5U7K6n9lrgrg8uRN',
        callbackURL : "http://localhost:3000/auth/twitter/callback"
    }




};
