const ary = [1,2,3,4,5,6,7];

// Fisher–Yates shuffle Algorithm

const len = ary.length-1;

console.log(Math.round(Math.random()*len))

for (i = len; i > 0; i--) {
  const j = Math.round(Math.random()*len);
  [ary[i], ary[j]] = [ary[j], ary[i]]
}
console.log(ary)