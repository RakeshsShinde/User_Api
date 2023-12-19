const errormiddleware = async (err, req, res, next) => {
    err.statuscode = err.statuscode || 500;
    err.message = err.message || "internal server error "

    return res.status(err.statuscode).json({
        sucesss: false,
        message: err.message
    });
}


export default errormiddleware;