function matchTermsToTypes(data) {
    var split = data.split('\n').map(function (el) { return el.split(/\s+/); });
    var head = split.shift();
    var obj = split.map(function (el) {
        var obj = {};
        for (var i = 0, l = el.length; i < l; i++) {
            obj[head[i]] = isNaN(Number(el[i])) ? el[i] : +el[i];
        }
        return obj;
    });

    return obj;
}

function phenotypeGet(matchers) {
    let pTerms = []
    let gTerms = []
    for (let i = 0; i < this.currentUserTerms.length; i++) {
        for (let j = 0; j < matchers.length; j++) {
            if (this.currentUserTerms.at(i) == matchers.at(j).hpo_id) {
                pTerms.push(matchers.at(j).hpo_name);
                gTerms.push(matchers.at(j).gene_symbol);
                break;
            }
        }
    }

    //opensans
    return [pTerms, gTerms];
}