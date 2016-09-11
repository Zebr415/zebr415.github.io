angular.module('Algorithm', [])
    .service('findSubset', function () {
        var concatSet = function (array1, array2) {
            var aleng = array1.length,
                subitem = [],
                subitems = [];
            for (var i = 0; i < aleng; i++) {
                subitem.push(array1[i]);
                subitems.push(array1[i]);
                var csitem = subitem[i].concat(array2);
                subitems.push(csitem);
            }
            subitems.push(array2);
            return subitems;
        }


        var subset = function (items) {
            var sortArray = items.sort(function (a, b) {
                return b - a;
            });

            if (items.length <= 1) {
                return [items];
            }
            var subitem = [],
                subitems = [];
            subitem.push(items[0]);
            subitems.push(subitem);
            for (var i = 1; i < items.length; i++) {
                var concatarray = [];
                concatarray.push(items[i]);
                subitems = concatSet(subitems, concatarray);
            }
            return subitems;
        }

        return function (target, list) {
            var indexArray = [];
            for (var i = 0; i < list.length; i++) {
                indexArray.push(i);
            }
            var allIndexCombs = subset(indexArray);
            console.log(allIndexCombs);
            var resultArray = [];
            for (let indexComb of allIndexCombs) {
                let tmpObj = {}, tmpValue = [], tmpSum = 0, tmpNums = indexComb.length;
                tmpObj.indice = indexComb;
                for (let index of indexComb) {
                    tmpSum += list[index];
                    tmpValue.push(list[index]);
                }
                tmpObj.values = tmpValue;
                tmpObj.sum = tmpSum;
                tmpObj.nums = tmpNums;
                tmpObj.bias = Math.abs(tmpSum - target);
                resultArray.push(tmpObj);
            }
            return resultArray;
        };
    });