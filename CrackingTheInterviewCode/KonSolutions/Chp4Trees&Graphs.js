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
bst1.insertNode(new TreeNode(2))
bst1.insertNode(new TreeNode(3))
bst1.insertNode(new TreeNode(6))
bst1.insertNode(new TreeNode(4))
bst1.insertNode(new TreeNode(9))
bst1.insertNode(new TreeNode(1))

//         5
//     2       6
//  1     3       9
//          4

// List of Depths: Given a binary tree, design an algorithm which creates a linked list of all the nodes
// at each depth (e.g., if you have a tree with depth D, you'll have D linked lists).

// Kon idea: seems like a job for Breadth First Search or perhaps pass down a marker with DFS?

function listOfDepths (tree) {
  if (!tree.root) {
    return "Empty tree"
  }
  const queue = [tree.root]

  const result = []
  while (queue.length > 0) {
    result.push(queue[0].value)
    // queue
  }
}
