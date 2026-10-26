const _ = require('lodash');

const newName = "mrf00l"

const bad_words = ['fool', 'silly', 'fork']
const substitutions = {
    'o': ['0'],
    'l': ['1', '|'],
    'i': ['1', '!'],
    's': ['$', '5'],
    'r': ['4'],
}

const getPopulatePrefixTree = () => {
    let prefix_tree = {}
    bad_words.forEach((word) => {
        const charArr  = word.split('')

        prefix_tree = _.merge(prefix_tree, getChildren(charArr))
    })

    return prefix_tree
}

const getChildren = (charArr) => {
    const _charArray = [...charArr];
    const children = {}
    if (!charArr.length) {
        return null;
    }
    const char = _charArray.shift()
    children[char] = {
        children: getChildren(_charArray),
    }
    subs = substitutions[char];
    if (subs) {
        subs.forEach((subChar) => {
            children[subChar] = {
                children: getChildren(_charArray),
            }
        })
    }

    return children;
}

console.log(getPopulatePrefixTree())

const prefixTree = getPopulatePrefixTree()

const filterName = (name) => {
    const charArr = name.split('')

    while (charArr.length) {
        // console.log(charArr)
        const constainsCurse = filterSubstring(charArr, prefixTree);
        if (constainsCurse) {
            return true;
        }
        charArr.shift();
    }
    return false;
}

const filterSubstring = (charArr, tree) => {
    const _charArr = [...charArr]
    const char = _charArr.shift()
    const subtree = tree[char];
    if (!subtree) { return false }
    if (subtree.children == null) { return true }
    return filterSubstring(_charArr, subtree.children)
}

console.log(filterName('fool'))
console.log(filterName('fork'))
console.log(filterName('silly'))
console.log(filterName('mrf00l'))