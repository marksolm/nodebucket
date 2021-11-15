/*
 ; Title:  base-response.js
 ; Author: Soliman Abdelmalak
 ; Date:   09 November 2021
 ; Description: base response to get a response back to the requestor.
*/

class BaseResponse{
    constructor(code,msg,data){
      this.code=code;
      this.msg=msg;
      this.data=data
    }
    toObject(){  //return object literal with those fields
      return {
        'code': this.code,
        'msg': this.msg,
        'data': this.data,
        'timestamp': new Date().toLocaleDateString()
      }
    }
}
module.exports = BaseResponse;