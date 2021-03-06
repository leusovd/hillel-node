const { celebrate } = require('celebrate');
const MessageModel = require('./messages/messages.model');
const { pushReqData } = require('../helpers/request-logger');
const dateFormat = require('dateformat');

exports.validate = (schema) => {
    return (req, res, next) => {
        celebrate(schema, {
            abortEarly: false,
            allowUnknown: false,
            stripUnknown: {
                objects: true
            }
        })(req, res, next);
    }
};

exports.checkAuth = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/login');
    }
}

exports.handleMessagesQueryParams = (req, res, next) => {
    let { sort, sortValue, limit, skip } = req.query;

    sort = sort && (typeof sort === 'string') ? sort : 'createdAt';
    sortValue = sortValue && (sortValue === 'asc' || sortValue === 'desc') ? sortValue : 'asc';

    const sortOpts = {};
    sortOpts[sort] = sortValue;

    req.query = Object.assign(req.query, {
        sort,
        sortValue,
        sortOpts,        
        limit: limit && !isNaN(+limit) && limit > 0 && limit < 51 ? +limit : 20,
        skip: skip && !isNaN(+skip) && skip > 0 && skip < 501 ? +skip : 0
    });

    next();
}

exports.getReqInfo = (req, res, next) => {
    const start = Date.now();

	const afterResponse = () => {
		res.removeListener('finish', afterResponse);
        res.removeListener('close', afterResponse);
        
        let duration = dateFormat(Date.now() - start, 'l');
		pushReqData(req.headers['user-agent'], res.statusCode, duration);
		
	}

	res.on('finish', afterResponse);
	res.on('close', afterResponse);

	next();
}