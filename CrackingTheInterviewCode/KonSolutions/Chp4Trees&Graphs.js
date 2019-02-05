// Route Between Nodes: Given a directed graph,
// design an algorithm to find out whether there is a route between two nodes

// me first I need to create a directed graph via a graph node class

class GraphNode {
  constructor(value, children = []){
    this.value = value
    this.children = children
  }
}

class Graph {
  constructor(nodes = []){
    this.nodes = []
  }
}

// From file: DirectedGraph#1.png

const n0 = new GraphNode(0)
const n1 = new GraphNode(1)
const n2 = new GraphNode(2)
const n3 = new GraphNode(3)
const n4 = new GraphNode(4)
const n5 = new GraphNode(5)
n0.children = [n1, n5]
n1.children = [n4, n3]
n2.children = [n1]
n3.children = [n2, n4]

function routeExists(node, targetNode, visitedNodes = []){
  if (node.children.length === 0){
    return false
  }
  let childIsTarget = false
  let i = 0
  while(!childIsTarget && node.children[i]){
    if (node.children[i] === targetNode) {
      childIsTarget = true
    }
    i++
  }
  if (childIsTarget) {
    return true
  }
  visitedNodes.push(node)
  return node.children.map((child) => {
    if(!visitedNodes.includes(child)) {
      return routeExists(child, targetNode, visitedNodes)
    } else {
      return false
    }
  }).find(bool => bool === true)
}

function isRouteBetweenTwoNodes(node1, node2) {
  return !!(routeExists(node1, node2) || routeExists(node2, node1))
}

// console.log(isRouteBetweenTwoNodes(n0, n1))
// console.log(isRouteBetweenTwoNodes(n0, n2))
// console.log(isRouteBetweenTwoNodes(n0, n3))
// console.log(isRouteBetweenTwoNodes(n0, n4))
// console.log(isRouteBetweenTwoNodes(n0, n5))
// console.log(isRouteBetweenTwoNodes(n5, n0))
// console.log(isRouteBetweenTwoNodes(n5, n1))
// console.log(isRouteBetweenTwoNodes(n5, n2))
// console.log(isRouteBetweenTwoNodes(n5, n3))
// console.log(isRouteBetweenTwoNodes(n5, n4))


// THE below assumes a non node class structure for the graph. As explained in the book:
// You don't necessarily need any additional classes to represent a graph. An array (or a hash table) of lists (arrays, arraylists, linked lists, etc.) can store the adjacency list. The graph above could be represented as:
// 0: 1
// 1: 2
// 2: 0, 3 3: 2
// 4: 6
// 5: 4
// 6: 5

// that's why we can do the line: 'if (let neighbour of graph[node]) { ...'
// same thing as iterating through children if we were using classes
// the below demostrates the BFS and DFS for a direct graph

/**
 * One way to check if two nodes are connected is to do a BFS of the graph
 * from the source node. BFS would be useful where the nodes have many out
 * edges (degrees) and paths between pairs are not exceedingly deep as it will
 * visit neighbours from the source node radiating outwards.
 *
 * N = |vertices|
 * M = |edges|
 * Time: O(M)
 * Additional space: O(N)
 */
export function isConnectedBFS(graph, source, target) {
  let discovered = new Set(),
    queue = [source];

  while (queue.length > 0) {
    let node = queue.shift();
    for (let neighbour of graph[node]) {
      if (!discovered.has(neighbour)) {
        if (neighbour === target) {
          return true;
        }
        discovered.add(neighbour);
        queue.push(neighbour);
      }
    }
  }

  return false;
}

/**
 * One way to check if two nodes are connected is to do a DFS of the graph
 * from the source node. DFS would be useful where the graph has really long
 * paths and we want to travel as far as we can through that graph as quickly as
 * possible. DFS can be recursive or use a stack and iteration.
 *
 * N = |vertices|
 * M = |edges|
 * Time: O(M)
 * Additional space: O(N)
 */
export function isConnectedDFS(graph, source, target) {
  return dfs(graph, new Set(), source, target);
}

function dfs(graph, discovered, source, target) {
  if (source === target) {
    return true;
  }
  discovered.add(source);
  for (let neighbour of graph[source]) {
    if (!discovered.has(neighbour)) {
      if (dfs(graph, discovered, neighbour, target)) {
        return true;
      }
    }
  }
  return false;
}


class TreeNode {
  constructor(value){
    this.value = value
    this.leftChild = null
    this.rightChild = null
  }
}

class BinarySearchTree {
  constructor(root = null){
    this.root = root
  }

  insertNodeHelper(node, currentNode){
    if (node.value < currentNode.value) {
      if (!currentNode.leftChild) {
        currentNode.leftChild = node
      } else {
        this.insertNodeHelper(node, currentNode.leftChild)
      }
    } else {
      if (!currentNode.rightChild) {
        currentNode.rightChild = node
      } else {
        this.insertNodeHelper(node, currentNode.rightChild)
      }
    }
  }

  insertNode(node) {
    if (!this.root) {
      this.root = node
    } else {
      this.insertNodeHelper(node, this.root)
    }
  }
}

// Given a sorted (increasing order) array with unique integer elements, write an
// algorithm to create a binary search tree with minimal height.

// My solution - WRONG! -- see correct solution below
// function createMinHeightBST(inputArray, bst = new BinarySearchTree()){
//   const midPointIndex = Math.floor(inputArray.length / 2)
//   let indexPos = 0
//
//   while (inputArray[midPointIndex + indexPos] || inputArray[midPointIndex - indexPos]) {
//     if (indexPos === 0){
//       const treeNode = new TreeNode(inputArray[midPointIndex])
//       bst.insertNode(treeNode)
//     } else {
//       if (inputArray[midPointIndex + indexPos]){
//         const treeNode = new TreeNode(inputArray[midPointIndex + indexPos])
//         bst.insertNode(treeNode)
//       }
//       if (inputArray[midPointIndex - indexPos]){
//         const treeNode = new TreeNode(inputArray[midPointIndex - indexPos])
//         bst.insertNode(treeNode)
//       }
//     }
//     indexPos++
//   }
//   return bst
// }

// console.log(createMinHeightBST([1,2,3,4,5,6,7]))

//           4
//       2       6
//     1   3   5    7
//
// 2 1 3
// 5 4 6
// 8


/**
 * As the list is already sorted the best way to create a balanced tree is by
 * adding the middle node (parent) then the children. The algorithm is basically
 * involves adding the middle element of which split of the array so that the
 * parent is added before the left and right children of each subtree.
 *
 * N = |values|
 * Time: O(N lg N)
 * Additional space: O(N)
 */
export function makeBalancedTree(values) {
  let tree = new BinarySearchTree();
  if (values && values.length) {
    add(tree, values, 0, values.length - 1);
  }
  return tree;
}

function add(tree, values, start, end) {
  if (start === end) {
    tree.insertNode(new TreeNode(values[start]));
  }
  else if (start < end) {
    let mid = start + Math.floor((end - start) / 2);
    tree.insertNode(new TreeNode(values[mid]));
    add(tree, values, start, mid - 1);
    add(tree, values, mid + 1, end);
  }
}

// console.log(makeBalancedTree([1,2,3,4,5,6,7]))


class LinkedListNode {
  constructor(value = null){
    this.value = value
    this.prev = null
    this.next = null
  }
}

class SinglyLinkedList {
  constructor(node = null) {
    this.head = node
    this.length = node ? 1 : 0
  }

  insertNodeHelper(node, currentNode) {
    if (currentNode.next) {
      this.insertNodeHelper(node, currentNode.next)
    } else {
      currentNode.next = node
    }
  }

  insertNode(node) {
    if (this.head) {
      this.insertNodeHelper(node, this.head)
    } else {
      this.head = node
    }
  }

  printList() {
    if (!this.head) {
      return 'No nodes in the list.'
    }
    let currentNode = this.head
    const values = []
    while (currentNode) {
      values.push(currentNode.value)
      currentNode = currentNode.next
    }
    return values
  }
}

const bst1 = new BinarySearchTree()
bst1.insertNode(new TreeNode(5))
const tn2 = new TreeNode(2)
bst1.insertNode(tn2)
bst1.insertNode(new TreeNode(3))
const tn6 = new TreeNode(6)
bst1.insertNode(tn6)
const tn4 = new TreeNode(4)
bst1.insertNode(tn4)
bst1.insertNode(new TreeNode(9))
const tn1 = new TreeNode(1)
bst1.insertNode(tn1)
// bst1.insertNode(new TreeNode(13))
// bst1.insertNode(new TreeNode(14))


//         5
//     2       6
//  1     3       9
//          4

// List of Depths: Given a binary tree, design an algorithm which creates a linked list of all the nodes
// at each depth (e.g., if you have a tree with depth D, you'll have D linked lists).


function listOfDepthsHelper(currentLevel, currentNode, linkedLists) {
  // put current node into a linkedlist
  if (linkedLists[currentLevel]) {
    linkedLists[currentLevel].insertNode(new LinkedListNode(currentNode.value))
  } else {
    linkedLists[currentLevel] = new SinglyLinkedList(new LinkedListNode(currentNode.value))
  }
  if (currentNode.leftChild) {
    listOfDepthsHelper(currentLevel + 1, currentNode.leftChild, linkedLists)
  }
  if (currentNode.rightChild) {
    listOfDepthsHelper(currentLevel + 1, currentNode.rightChild, linkedLists)
  }
}

function listOfDepths (tree) {
  if (!tree.root) {
    return "Empty tree"
  }
  const linkedLists = {}

  let currentLevel = 0
  let currentNode = tree.root

  listOfDepthsHelper(currentLevel, currentNode, linkedLists)

  return linkedLists
}

// console.log(listOfDepths(bst1))

// Check Balanced: Implement a function to check if a binary tree is balanced.
// For the purposes of this question, a balanced tree is defined to be a tree such
// that the heights of the two subtrees of any node never differ by more than one.

function checkBalancedHelper(currentNode, currentDepth, depthTracker) {
  if (!currentNode.leftChild && !currentNode.rightChild) {
    if (!depthTracker.smallestDepth || currentDepth < depthTracker.smallestDepth) {
      console.log('in here 1, currentDepth', currentDepth)
      depthTracker.smallestDepth = currentDepth
    }
    if (!depthTracker.largestDepth || currentDepth > depthTracker.largestDepth) {
      console.log('in here 2, currentDepth', currentDepth)
      depthTracker.largestDepth = currentDepth
    }
  } else {
    if (depthTracker.smallestDepth && depthTracker.largestDepth && (depthTracker.largestDepth - depthTracker.smallestDepth > 1)) {
      return false
    }
    if (currentNode.leftChild) {
      checkBalancedHelper(currentNode.leftChild, currentDepth + 1, depthTracker)
    }
    if (currentNode.rightChild) {
      checkBalancedHelper(currentNode.rightChild, currentDepth + 1, depthTracker)
    }
  }
}

function checkBalanced(tree) {
  if (!tree.root) {
    return "Empty tree"
  }

  const depthTracker = {
    smallestDepth: null,
    largestDepth: null,
  }

  if (tree.root.leftChild) {
    checkBalancedHelper(tree.root.leftChild, 1, depthTracker)
  }
  if (tree.root.rightChild) {
    checkBalancedHelper(tree.root.rightChild, 1, depthTracker)
  }

  return depthTracker.largestDepth - depthTracker.smallestDepth < 2
}

// console.log(checkBalanced(bst1))


/**
 * To check if a tree is a valid BST we need to check that all the values under
 * a node are within the ranges defined by the path we took to get there. For
 * example, initially the root can have any value, every time we go down a left
 * child that sets an upper bound on the valid values of their children by that
 * nodes value. Every time you travel down the right child you lower bound the
 * valid values of their children by that nodes value.
 *
 * N = |tree|
 * Time: O(N)
 * Additional space: O(lg N) - due to recursion. Assumes a balanced tree, worst
 * case is O(N)
 */
export function isValidBST(tree) {
  if (!tree) {
    throw new Error('invalid tree');
  }
  return isValidBSTRecursive(tree.root, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
}

function isValidBSTRecursive(node, min, max) {
  if (node) {
    if (node.val < min || node.val > max) {
      return false;
    }
    return isValidBSTRecursive(node.left, min, node.val) &&
      isValidBSTRecursive(node.right, node.val, max);
  }
  return true;
}

// Successor: Write an algorithm to find the "next" node (i.e., in-order successor)
// of a given node in a binary search tree. You may assume that each node has a link to its parent.

function findSuccessorHelper(currentNode, targetNode, arrayOfNodes, found) {
  if (arrayOfNodes.slice(-1)[0] === 'nextNodeIsSuccessor'){
    arrayOfNodes.push(currentNode)
    found.found = currentNode
  } else if (!found.found) {
    if (currentNode.leftChild){
      findSuccessorHelper(currentNode.leftChild, targetNode, arrayOfNodes, found)
    }
    arrayOfNodes.push(currentNode)
    if (currentNode === targetNode){
      arrayOfNodes.push('nextNodeIsSuccessor')
    }
    if (currentNode.rightChild){
      findSuccessorHelper(currentNode.rightChild, targetNode, arrayOfNodes, found)
    }
  }
}

function findSuccessor(tree, targetNode) {
  if (!tree || !targetNode){
    return 'No tree or node'
  }
  const arrayOfNodes = []
  const found = {found: null}
  findSuccessorHelper(tree.root, targetNode, arrayOfNodes, found)
  return found.found
}

// console.log(findSuccessor(bst1, tn6))
// console.log(findSuccessor(bst1, tn2))

'use strict';

/**
 * Finding the successor as a few different scenarios:
 *   1. Where a right child exists:
 *     a. If it has no left child then it is the successor.
 *     b. If it has a left child then keep following left child pointers until
 *     you've got the left most child, this is the successor.
 *   2. Where no right child exists:
 *     a. If this node is a left child then the successor is its parent.
 *     b. Otherwise follow parent pointers until we find a node that is a left
 *     child of its parent, then the parent is the successor.
 *
 * N = |tree|
 * Time: O(lg N) - assumes balanced tree, worst cast O(N)
 * Additional space: O(1)
 */
export function findSuccessor(node) {
  if (!node) {
    throw new Error('node cannot be null');
  }

  let snode;
  if (node.right) {
    snode = node.right;
    while (snode.left) {
      snode = snode.left;
    }
    return snode.val;
  }
  else {
    // go up until we find left path
    snode = node;
    while (snode.parent && snode !== snode.parent.left) {
      snode = snode.parent;
    }
    return snode.parent ? snode.parent.val : undefined;
  }
}


// Build Order: You are given a list of projects and a list of dependencies
// (which is a list of pairs of projects, where the second project is dependent on the first project).
// All of a project's dependencies must be built before the project is.
// Find a build order that will allow the projects to be built.
// If there is no valid build order, return an error.
// EXAMPLE
//
// Input:
const projects = ['a', 'b', 'c', 'd', 'e', 'f']
const dependencies = [['a', 'd'], ['f', 'b'], ['b', 'd'], ['f', 'a'], ['d', 'c']]
//
// Output: f, e, a, b, d, c

// Kon's graph
// e
//
// a --> d --> c
// ^     ^
// |     |
// f --> b

// idea: do ones that have no dep first
// then follow depend

function buildOrder(projects, dependencies, result = []) {
  if (dependencies.length === 0) {
    return result.concat(projects)
  }
  const projectsWithDep = new Set()
  dependencies.forEach((dep) => {
    projectsWithDep.add(dep[1])
  })
  const projectsWithOutDep = projects.filter((project) => {
    return !projectsWithDep.has(project)
  })
  projectsWithOutDep.forEach((proj) => {result.push(proj)})
  dependencies = dependencies.filter((dep) => {
    return !result.includes(dep[0])
  })
  projects = projects.filter((project) => {
      return !result.includes(project)
  })
  return buildOrder(projects, dependencies, result)
}

// console.log(buildOrder(projects, dependencies))


// First Common Ancestor: Design an algorithm and write code to find the first common ancestor
// of two nodes in a binary tree.
// Avoid storing additional nodes in a data structure. NOTE: This is not necessarily a binary search tree.

// Kon idea: go through tree and store parent in each node.
// Then take two nodes and while loop up the tree marking each node as seen until you hit one that is seen by both

function insertParentIntoTreeNodes(parentNode) {
  if (parentNode.leftChild){
    parentNode.leftChild.parentNode = parentNode
    insertParentIntoTreeNodes(parentNode.leftChild)
  }
  if (parentNode.rightChild){
    parentNode.rightChild.parentNode = parentNode
    insertParentIntoTreeNodes(parentNode.rightChild)
  }
}

function firstCommonAncestor(tree, node1, node2){
  if (!tree.root || !node1 || !node2) {
    return 'missing args to run firstCommonAncestor'
  }
  insertParentIntoTreeNodes(tree.root)
  let node1SearchNode = node1
  while (node1SearchNode) {
    node1SearchNode.marked = true
    node1SearchNode = node1SearchNode.parentNode
  }
  let node2SearchNode = node2
  while (node2SearchNode) {
    if (node2SearchNode.marked){
      return node2SearchNode
    }
    node2SearchNode = node2SearchNode.parentNode
  }
}

// console.log(firstCommonAncestor(bst1, tn1, tn4))


/**
 * The two given nodes could be anywhere within the tree and travelling upwards
 * we will eventually find the point at which the paths to the nodes diverge. As
 * we don't want to use extra space (so a map of nodes isn't an option) we first
 * need to figure out the difference in depth of the two nodes. We then travel up
 * from the lower node, if there is one, so that we start at the same depth down
 * the path of each node. After we're at equal depths we just follow parent
 * pointers until we find a node that is common to both paths, that is the first
 * common ancestor.
 *
 * N = |tree|
 * Time: O(lg N) - assumes balanced tree, worst case O(N)
 * Additional space: O(1)
 */
export function findFirstCommonAnscestor(node1, node2) {
  if (!node1 || !node2) {
    throw new Error('node1 and node2 must both be valid nodes');
  }

  let h1 = height(node1),
    h2 = height(node2);
  node1 = moveUp(node1, h1 - h2);
  node2 = moveUp(node2, h2 - h1);
  while (node1 !== node2) {
    node1 = node1.parent;
    node2 = node2.parent;
  }

  return node1.val;
}

function height(node) {
  let count = 0;
  while (node) {
    node = node.parent;
    ++count;
  }
  return count;
}

function moveUp(node, count) {
  for (let i = count; i > 0; --i) {
    node = node.parent;
  }
  return node;
}


// BST Sequences: A binary search tree was created by traversing through an array
// from left to right and inserting each element.
// Given a binary search tree with distinct elements,
// print all possible arrays that could have led to this tree.

// e.g.
//         7
//    4         10
// 2     5   9     11

const bstSequenceTree = new BinarySearchTree()
bstSequenceTree.insertNode(new TreeNode(7))
bstSequenceTree.insertNode(new TreeNode(4))
bstSequenceTree.insertNode(new TreeNode(10))
bstSequenceTree.insertNode(new TreeNode(2))
bstSequenceTree.insertNode(new TreeNode(5))
bstSequenceTree.insertNode(new TreeNode(9))
bstSequenceTree.insertNode(new TreeNode(11))

// outputs:
// [7] + [4, 10] + [2, 5, 9, 11]
// [7] + [4, 10] + [2, 5, 11, 9]
// [7] + [4, 10] + [2, 9, 5, 11]
// [7] + [4, 10] + [2, 9, 11, 5]
// [7] + [4, 10] + [2, 11, 5, 9]
// [7] + [4, 10] + [2, 11, 9, 5]
//
// [7] + [4, 10] + [5, 2, 9, 11]
// [7] + [4, 10] + [5, 2, 11, 9]
// [7] + [4, 10] + [5, 9, 2, 11]
// [7] + [4, 10] + [5, 9, 11, 2]
// [7] + [4, 10] + [5, 11, 2, 9]
// [7] + [4, 10] + [5, 11, 9, 2]
//
// // etc..
//
// [7] + [10, 4] + [2, 5, 9, 11]
// etc...

// My idea: I think we need to first do a BFS and mark the depth of each node to that into an array
// and take every combo of that depth level; see outputs I made above to understand

// function getDepthArrays(root) {
//   const queue = [root]
//   const result = {}
//
//   while(queue.length > 0){
//     const currentNode = queue.shift()
//     if (!result[currentNode.depth]){
//       result[currentNode.depth] = []
//     }
//     result[currentNode.depth].push(currentNode.value)
//     if(currentNode.leftChild){
//       queue.push(currentNode.leftChild)
//     }
//     if(currentNode.rightChild){
//       queue.push(currentNode.rightChild)
//     }
//   }
//   return result
// }
//
// function markDepths(node, depth = 0){
//   node.depth = depth
//   if (node.leftChild){
//     markDepths(node.leftChild, depth + 1)
//   }
//   if (node.rightChild){
//     markDepths(node.rightChild, depth + 1)
//   }
// }
//
// createDifferentInputArray(depthArrays) {
//   const resultArrays = []
// }
//
// function bstSequence(tree){
//   if (!tree.root){
//     return 'no root node'
//   }
//   markDepths(tree.root)
//   const depthArrays = getDepthArrays(tree.root)
//   // { '0': [ 7 ], '1': [ 4, 10 ], '2': [ 2, 5, 9, 11 ] }
//   return createDifferentInputArray(depthArrays)
// }

// console.log(bstSequence(bstSequenceTree))

// function getAllCombos(array) {
//   const combos = []
//   array.forEach((el, index) => {
//     const subArray = []
//
//   })
// }

// [1,2,3]
// [1,3,2]
// [2,1,3]
// [2,3,1]
// [3,1,2]
// [3,2,1]



// Check Subtree: Tl and T2 are two very large binary trees, with Tl much bigger than T2. Create an
// algorithm to determine if T2 is a subtree of Tl.
// A tree T2 is a subtree of Tl if there exists a node n in Tl such that the subtree of n is identical to T2.
// That is, if you cut off the tree at node n, the two trees would be identical.

// Kon idea: really if root node of subtree is in tree? can do BFS or DFS?
// OR is this problem more that they are identical but a copy? probably this... hmmm...
// well still need to find a root node with same value and then same
// create a function to check if all children nodes are the same for both trees from that point?
// so find node in tree with value of subtree, then start running side by side BFS or DFS and
// if a node value doesn't match false (keep going in original search), if all match then true

function areTreesEqual(currentTreeNode, subTreeRoot) {
  const treeQueue = [currentTreeNode]
  const subTreeQueue = [subTreeRoot]
  while (treeQueue.length > 0 && subTreeQueue.length > 0) {
    const currentTreeNode = treeQueue.shift()
    const currentSubTreeNode = subTreeQueue.shift()
    if (currentTreeNode.value !== currentSubTreeNode.value) {
      return null
    }
    if (currentTreeNode.leftChild && currentSubTreeNode.leftChild){
      treeQueue.push(currentTreeNode.leftChild)
      subTreeQueue.push(currentSubTreeNode.leftChild)
    } else if ((currentTreeNode.leftChild && !currentSubTreeNode.leftChild) || (!currentTreeNode.leftChild && currentSubTreeNode.leftChild)) {
      return null
    }
    if (currentTreeNode.rightChild && currentSubTreeNode.rightChild){
      treeQueue.push(currentTreeNode.rightChild)
      subTreeQueue.push(currentSubTreeNode.rightChild)
    } else if ((currentTreeNode.rightChild && !currentSubTreeNode.rightChild) || (!currentTreeNode.rightChild && currentSubTreeNode.rightChild)) {
      return null
    }
  }
  return subTreeRoot
}

function checkSubTreeKon(tree, subTree) {
  if (!tree.root || !subTree.root) {
    return 'check yo trees'
  }
  const queue = [tree.root]
  let matchingSubtree = null

  while (queue.length > 0 && !matchingSubtree) {
    const currentNode = queue.shift()
    if (currentNode.value === subTree.root.value){
      matchingSubtree = areTreesEqual(currentNode, subTree.root)
    }
    if (currentNode.leftChild){
      queue.push(currentNode.leftChild)
    }
    if (currentNode.rightChild){
      queue.push(currentNode.rightChild)
    }
  }
  return matchingSubtree
}

// e.g.
//         7
//    4         10
// 2     5   9     11


const bstTree1 = new BinarySearchTree()
bstTree1.insertNode(new TreeNode(7))
bstTree1.insertNode(new TreeNode(4))
bstTree1.insertNode(new TreeNode(10))
bstTree1.insertNode(new TreeNode(2))
bstTree1.insertNode(new TreeNode(5))
bstTree1.insertNode(new TreeNode(9))
bstTree1.insertNode(new TreeNode(11))

const bstTree2 = new BinarySearchTree()
bstTree2.insertNode(new TreeNode(10))
bstTree2.insertNode(new TreeNode(9))
bstTree2.insertNode(new TreeNode(11))
// bstTree2.insertNode(new TreeNode(13))

// working!!!
// console.log(checkSubTreeKon(bstTree1, bstTree2))




// Random Node: You are implementing a binary tree class from scratch which, in addition to insert, find, and delete,
// has a method getRandomNode() which returns a random node from the tree.
// All nodes should be equally likely to be chosen. Design and implement an algorithm for getRandomNode,
// and explain how you would implement the rest of the methods.

class NewTreeNode {
  constructor(value){
    this.value = value
    this.leftChild = null
    this.rightChild = null
  }
}

class NewBST {
  constructor(rootNode){
    this.rootNode = rootNode || null
  }
}
