Recursion, simply put, is calling a function on itself. It can used to break down complex problems into smaller manageable similar units that can be handled by the same function.

## Recursion vs Iteration

An iterative function is one that loops to repeat some part of the code, and a recursive function is one that **calls itself** again to repeat the code.

E.g To calculate the sum of an array of numbers

```javascript
function iterativeSum(arr) {
    let sum = 0;
    for (let i of arr) {
        sum += i;
    }
    return sum;
}


function recursiveSum(arr) {
    if (arr.length === 0) {
        return 0;
    }
    return arr[0] + recursiveSum(arr.slice(1));
}

/**
 *
 * iterativeSum([1,2,3]) => 1 + 2 + 3 => 6
 *
 * recursiveSum([1,2,3])
 *     => 1 + recursiveSum([2,3])
 *     =>       2 + recursiveSum([3])
 *     =>           3 + recursiveSum([])
 *     =>               0
 *     => 0 + 3 + 2 + 1 => 6
 */

console.log(iterativeSum([1,2,3])); //6
console.log(recursiveSum([1,2,3])); //6
```

## How to use recursion

### base condition is a must

Using recursion without a base condition leads to infinite recursion. As recursion is calling the function on itself, base condition indicates when to terminate the process.

```javascript
function infiniteRecursion() {
    // keeps calling itself without termination
    return infiniteRecursion();
}
``` 

### break down the problem into smaller units that can be handled by the function itself.

E.g.

*the sum of* an array = the value of first element + *the sum of* the rest of array.

That's how we do it recursively in *recursiveSum* example above.


## Practices make perfect

### Q1

#### Question:

By starting from the number 1 and repeatedly either adding 5 or multiplying by 3, an infinite amount of new numbers can be produced. Write a function that, given a number, tries to find a sequence of such additions and multiplications that produce that number.

#### Thoughts: 

To find a solution for a number(let's call it *A*), we tries adding 5 or multiplying 3 to the current number(let's call it *B*) and use recursion to 
check if there is a solution for the result(i.e. *B + 5* or *B \* 3*). The base condition is when the current number is greater than(boom!) or equal to(solution found!) *A*.

#### Solution: 

```javascript
function findSolution(num) {
    function find(start, history) {
        if(start > num) {
            return null; // boom!
        } else if (start === num) {
            return history; //solution found
        }
        return find(start + 5, `(${history} + 5)`) || find(start * 3, `(${history} * 3)`);
    }

    return find(1, '1');
}

console.log(findSolution(13)); //(((1 * 3) + 5) + 5)
console.log(findSolution(20)); //null
```

### Q2


* Question: [Inorder](https://www.geeksforgeeks.org/tree-traversals-inorder-preorder-and-postorder/)(Left, Right, Top) traversal of binary tree

* Solution

```javascript
class Node {
    constructor(value, left=null, right=null) {
        this.value = value;
        this.left = left;
        this.right = right;
    }
}

function inorder(node, fn) {
    if(node == null) {
        return;
    }
    inorder(node.left, fn);
    fn(node);
    inorder(node.right, fn);
}

function test() {
    /**
     *        A
     *      /   \
     *    B       C
     *   / \       \
     *  E   F       H 
     */
    let E = new Node('E'),
        F = new Node('F'),
        H = new Node('H'),
        B = new Node('B', E, F),
        C = new Node('C', null, H),
        A = new Node('A', B, C);
    inorder(A, node => console.log(node.value)); // E B F A C H
}
test();
```

## Reference 

* [Eloquent JavaScript](https://www.amazon.com/Eloquent-JavaScript-2nd-Ed-Introduction/dp/1593275846)

## Notice

* If you want to follow the latest news/articles for the series of reading notes, Please [「Watch」](https://github.com/n0ruSh/the-art-of-reading)to Subscribe.