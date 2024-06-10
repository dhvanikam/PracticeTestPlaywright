const os = require('os');
// @ts-check
module.exports = {

    /**Convert an Object Array to String Array */
    convertObjectArrayToStringArray(objectArray){
        let strArr = [];

        const keysValues = Array.from(objectArray.values());

        for(const e of keysValues){
            strArr.push(String(e));
        }
        return strArr;
    },

    /**Check if each element in the given array matches exactly with expected String */
    checkActualEveryErrMsgToEquate(expArray,expectedText){
        let arr = expArray;
        return arr.every((e) => e===expectedText); 
    },

    /**Generate random number */
    getRandomInt(max) 
    {
        return Math.floor(Math.random() * max);
    },

    getKeyboardKeyOS(){
        let platform = os.platform();

        if(platform==='darwin'){
            return 'MetaLeft';
        }
        else{
            return 'Control';
        }

    }

}

