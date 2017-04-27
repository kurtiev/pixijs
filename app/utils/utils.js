window.log = function (log) {
    if (arguments.length) {
        for (let i in arguments) {
            console.log(arguments[i]);
        }
    }
};