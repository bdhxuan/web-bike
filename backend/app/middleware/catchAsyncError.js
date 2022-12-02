module.exports = theFunc => (req, res, next) => {
    Promise.resolve(theFunc(req, res, next)).catch(next); //promise handle cac loi khi thuc hien tac vu bat dong bo //resolve la ham se duoc goi khi promise hoan thanh
};