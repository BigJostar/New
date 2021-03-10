function groupBy(array, keySelector, equalityComparer) {
    let map = []; // Массив массивов двух элементов - ключ и массив значений
    for (let i = 0, count = array.length; i < count; ++i) {
        let val = array[i],
            key = keySelector(val),
            found;
        for (let j = 0, count = map.length; j < count; ++j) {
            let key2 = map[j][0];
            if (found = equalityComparer.equals(key, key2)) {
                map[j][1].push(val);
                break;
            }
        }
        if (!found)
            map.push([key, [val]]);
    }
    return map;
}

class Comparer {
    equals(s1, s2) {
        if (s1 === s2) return true;
        if (s1.length !== s2.length) return false;
        let a1 = this.groupChars(s1),
            a2 = this.groupChars(s2);
        return a1 === a2;
    }
    groupChars(str) { // Упрощенная версия просто для количеств в группе и строки, но отсортированная
        return [...str].sort().join("");
    }
}

(function main() {
    let array = process.argv.slice(2); //["ABCDE", "EDBCA", "XYZ", "ZYX", "ZXY"],
    if (!array.length)
        return;
    let groups = groupBy(array, e => e, new Comparer()),
        max1 = Math.max(...groups.map(e => e[1].length));

    for (let item of groups.filter(e => e[1].length === max1)[0][1]) {
        console.log(item);
    }
})();