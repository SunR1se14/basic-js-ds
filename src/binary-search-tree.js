const { NotImplementedError } = require('../extensions/index.js')

const { Node } = require('../extensions/list-tree.js')

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */

class BinarySearchTree {
	constructor() {
		this.rootNode = null
	}

	root() {
		return this.rootNode ? this.rootNode : null
	}

	add(data) {
		this.rootNode = addData(this.rootNode, data)

		function addData(node, value) {
			if (!node) {
				return new Node(value)
			}

			if (node.data === value) {
				return node
			}

			if (value < node.data) {
				node.left = addData(node.left, value)
			} else {
				node.right = addData(node.right, value)
			}

			return node
		}
	}

	has(data) {
		return searchData(this.rootNode, data)

		function searchData(node, value) {
			if (!node) {
				return false
			}

			if (node.data === value) {
				return true
			}

			return value < node.data
				? searchData(node.left, value)
				: searchData(node.right, value)
		}
	}

	find(data) {
		return searchData(this.rootNode, data)

		function searchData(node, value) {
			if (!node) {
				return null
			}

			if (node.data === value) {
				return node
			}

			return value < node.data
				? searchData(node.left, value)
				: searchData(node.right, value)
		}
	}

	remove(data) {
		this.rootNode = removeData(this.rootNode, data)

		function removeData(node, value) {
			if (!node) {
				return null
			}

			if (value < node.data) {
				node.left = removeData(node.left, value)
				return node
			} else if (node.data < value) {
				node.right = removeData(node.right, value)
				return node
			} else {
				if (!node.left && !node.right) {
					return null
				}

				if (!node.left) {
					node = node.right
					return node
				}

				if (!node.right) {
					node = node.left
					return node
				}

				let minRight = node.right
				while (minRight.left) {
					minRight = minRight.left
				}
				node.data = minRight.data

				node.right = removeData(node.right, minRight.data)

				return node
			}
		}
	}

	min() {
		if (!this.rootNode) {
			return
		}

		let node = this.rootNode
		while (node.left) {
			node = node.left
		}

		return node.data
	}

	max() {
		if (!this.rootNode) {
			return
		}

		let node = this.rootNode
		while (node.right) {
			node = node.right
		}

		return node.data
	}
}

module.exports = {
	BinarySearchTree,
}
