module.exports = function(event) {
    return new Promise((resolve, reject) => {
        function handler(err, result) {
            event.stopWatching();
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        }
        event.watch(handler);
    });
}
