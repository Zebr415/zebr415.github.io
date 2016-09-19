/**
 * Created by ljk on 9/19/16.
 */

angular.module('Algorithm') // Module 'Algorithm' must be defined before this script.
    .service('findSubsetWithLJKAlgorithm', function () {

        /**
         * Give an array of int, a target value and deviation, return one subset which sum to exclusively (target ± deviation).
         * This algorithm won't enumerate all satisfied results, instead return the first one encountered.
         * @param target
         * @param inputArray
         * @param deviation
         * @returns {Array}
         */
        function hashMapFind(target, inputArray, deviation = 0) {
            function getInterval(num, devi=deviation) {
                if (devi === 0) return num;
                let quotient = num / devi;
                return quotient >= 0 ? Math.floor(quotient) : Math.ceil(quotient);
            }
            let indexArr = null;
            let hashMap = {};
            for (let i = 0; i < inputArray.length; i++) {
                // For example, we got a element of 100, target of 300; first compute the difference = 300 - 100;
                let difference = target - inputArray[i];
                let intervalOfDiff = getInterval(difference, deviation);
                if (intervalOfDiff === 0) {
                    // In this case we can return this element directly.
                    indexArr = [i];
                    break;
                }
                // Then find out if the difference already exists.
                if (hashMap[intervalOfDiff]) {
                    // Yes, there it is.
                    indexArr = hashMap[intervalOfDiff].concat([i]);
                    break;
                }
                // Add this element to hashMap.
                // There are problems with adding new keys during iteration.
                // So we use a tmpHashMap for adding new key.
                let tmpHashMap = {};
                for (let key in hashMap) {
                    let elements = hashMap[key];
                    let newElements = elements.concat([i]);
                    let sum = newElements.reduce((preVal, curVal) => {
                        return preVal + inputArray[curVal]
                    }, 0);
                    let intervalOfSumDiff = getInterval(target - sum);
                    if (intervalOfSumDiff === 0) {
                        indexArr = newElements;
                        break;
                    }
                    let intervalOfSum = getInterval(sum);
                    tmpHashMap[intervalOfSum] = newElements;
                }
                // Merge the two maps.
                Object.assign(hashMap, tmpHashMap);
                let intervalOfElement = getInterval(inputArray[i]);
                // Do not replace if this element is less than elements already exist.
                if (hashMap[intervalOfElement] !== undefined &&
                    hashMap[intervalOfElement].reduce((a, b) => a + b) > inputArray[i]) continue;
                // Finally add this element to map.
                hashMap[intervalOfElement] = [i];
            }

            // Make our result looks nice.
            // [ 0, 1, 2, 3 ] =>
            // { values: [ 91, 80, 79.5, 79.5 ],
            //     indices: [ 0, 1, 2, 3 ],
            //     bias: 30 }

            if (!indexArr) {
                return null;
            }

            let valueArr = indexArr.map((index) => {
                return inputArray[index];
            });
            return {
                values: valueArr,
                indices: indexArr,
                nums: valueArr.length,
                sum: valueArr.reduce((a, b) => a + b),
                get bias () {
                    // Self-references in object literal declarations.
                    // See http://stackoverflow.com/questions/4616202/self-references-in-object-literal-declarations
                    return this.sum - target;
                }
            };
        }

        return hashMapFind;

    });

