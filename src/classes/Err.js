'use strict';

/*
    Custom Error class
*/
module.exports = class Err {
    /**
     * 
     * @param {Number} httpStatus 
     * @param {String} name 
     * @param {String} message 
     */
    constructor(httpStatus, name, message) {
        this.name = name ?? 'Unknown';
        this.message = message ?? 'Unknown';
        this.httpStatus = httpStatus ?? 500;
    }

    setStatusCode(code) {
        this.httpStatus = code;
        return this;
    }

    setName(name) {
        this.name = name;
        return this;
    }

    setMessage(message) {
        this.message = message;
        return this;
    }

    badRequest() {
        this.httpStatus = 400;
        return this;
    }

    unauthorized() {
        this.httpStatus = 401;
        return this;
    }

    notFound() {
        this.httpStatus = 404;
        return this;
    }

    inputErr() {
        this.name = 'Input Error';
        return this;
    }

    timeErr() {
        this.name = 'Timed Out';
        return this;
    }

    syntaxErr() {
        this.name = 'Syntax Error';
        return this;
    }

    memberNotFound() {
        this.httpStatus = 404;
        this.message = 'Member not found';
        return this;
    }

    roleNotFound() {
        this.httpStatus = 404;
        this.message = 'Role not found';
        return this;
    }

    roleAlreadyExists() {
        this.httpStatus = 400;
        this.message = 'Role already exists';
        return this;
    }

    notANumber(whatIsNotANumber) {
        this.httpStatus = 400;
        this.message = whatIsNotANumber + ' is not a number';
        return this;
    }

    notPositive(whatIsNotPositive) {
        this.httpStatus = 400;
        this.message = whatIsNotPositive + ' should be greater than zero';
        return this;
    }

    jsonNotValid() {
        this.message = 'JSON not valid';
        return this;
    }

    timedOut() {
        this.message = 'User took too long to respond';
        return this;
    }
};
