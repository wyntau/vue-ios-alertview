// a mini defer like angular's $q.defer()
export default function(){
  var promise;
  var resolve;
  var reject;

  promise = new Promise(function(_resolve_, _reject_){
    resolve = _resolve_;
    reject = _reject_;
  });

  return {
    promise: promise,
    resolve: resolve,
    reject: reject
  };
};
