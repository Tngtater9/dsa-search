/*3. Find a book
Imagine you are looking for a book in a library with a Dewey Decimal index. How would you go about it? Can you express this process as a search algorithm? Implement your algorithm to find a book whose Dewey and book title is provided. 

I would use a binary search because the data is already sorted
*/

function findBook(books, dewey, title, start, end) {
	start = start == null ? 0 : start;
	end = end == null ? array.length : end;

	if (start > end) {
		return -1;
	}

	const index = Math.floor((start + end) / 2);
	const book = books[index];

	console.log(start, end);
	if (book.key == dewey) {
		if (book.value === title) {
			return index;
		} else {
			return -1;
		}
	} else if (book.key < dewey) {
		return findBook(books, dewey, index + 1, end);
	} else if (book.key > dewey) {
		return findBook(books, dewey, start, index - 1);
	}
}

/* 4. Searching in a BST
** No coding is needed for these drills**. Once you have answered it, you can then code the tree and implement the traversal to see if your answer is correct.

1) Given a binary search tree whose in-order and pre-order traversals are respectively 14 15 19 25 27 35 79 89 90 91 and 35 25 15 14 19 27 89 79 91 90. What would be its postorder traversal?
14 19 15 27 25 90 79 91 89 35

2) The post order traversal of a binary search tree is 5 7 6 9 11 10 8. What is its pre-order traversal? 
8 6 5 7 10 9 11
*/

/* 5. Implement different tree traversals
Using your BinarySearchTree class from your previous lesson, create a binary search tree with the following dataset: 25 15 50 10 24 35 70 4 12 18 31 44 66 90 22. Then implement inOrder(), preOrder(), and postOrder() functions. Test your functions with the following datasets.

A pre-order traversal should give you the following order: 25, 15, 10, 4, 12, 24, 18, 22, 50, 35, 31, 44, 70, 66, 90

In-order: 4, 10, 12, 15, 18, 22, 24, 25, 31, 35, 44, 50, 66, 70, 90

Post-order: 4, 12, 10, 22, 18, 24, 15, 31, 44, 35, 66, 90, 70, 50, 25 */

class BST {
	constructor(key = null, value = null, parent = null) {
		this.key = key;
		this.value = value;
		this.parent = parent;
		this.left = null;
		this.right = null;
	}

	insert(key, value) {
		if (this.key === null) {
			this.key = key;
			this.value = value;
		} else if (key < this.key) {
			if (this.left == null) {
				this.left = new BST(key, value, this);
			} else {
				this.left.insert(key, value);
			}
		} else {
			if (this.right == null) {
				this.right = new BST(key, value, this);
			} else {
				this.right.insert(key, value);
			}
		}
	}

	find(key) {
		if (key == this.key) {
			return this.value;
		} else if (key < this.key && this.left) {
			return this.left.find(key);
		} else if (key > this.key && this.right) {
			return this.right.find(key);
		} else {
			throw new Error('Key Error');
		}
	}

	remove(key) {
		if (key === this.key) {
			if (this.left && this.right) {
				const successor = this.right._findMin();
				this.key = successor.key;
				this.value = successor.value;
				successor.remove(successor.key);
			} else if (this.left) {
				this._replaceWith(this.left);
			} else if (this.right) {
				this._replaceWith(this.right);
			} else {
				this._replaceWith(null);
			}
		} else if (key < this.key && this.left) {
			this.left.remove(key);
		} else if (key > this.key && this.right) {
			this.right.remove(key);
		} else {
			throw new Error('Key error');
		}
	}

	_findMin() {
		if (this.left) {
			return this.left._findMin();
		} else {
			return this;
		}
	}

	_replaceWith(node) {
		if (this.parent) {
			if (this == this.parent.left) {
				this.parent.left = node;
			} else if (this == this.parent.right) {
				this.parent.right = node;
			}

			if (node) {
				node.parent = this.parent;
			}
		} else {
			if (node) {
				this.key = node.key;
				this.value = node.value;
				this.left = node.left;
				this.right = node.right;
			} else {
				this.key = null;
				this.value = null;
				this.left = null;
				this.right = null;
			}
		}
	}

	preOrder() {
		console.log(this);

		if (this.left) {
			this.left.preOrder();
		}

		if (this.right) {
			this.right.preOrder();
		}
	}

	inOrder() {
		if (this.left) {
			this.left.inOrder();
		}

		console.log(this);

		if (this.right) {
			this.right.inOrder();
		}
	}

	postOrder() {
		if (this.left) {
			this.left.postOrder();
		}

		if (this.right) {
			this.right.postOrder();
		}

		console.log(this);
	}
}

class _Node {
	constructor(value) {
		this.value = value;
		this.next = null;
	}
}

class Queue {
	constructor() {
		this.first = null;
		this.last = null;
	}

	enqueue(data) {
		const node = new _Node(data);

		if (this.first === null) {
			this.first = node;
		}

		if (this.last) {
			this.last.next = node;
		}
		//make the new node the last item on the queue
		this.last = node;
	}

	dequeue() {
		//if the queue is empty, there is nothing to return
		if (this.first === null) {
			return;
		}
		const node = this.first;
		this.first = this.first.next;
		//if this is the last item in the queue
		if (node === this.last) {
			this.last = null;
		}
		return node.value;
	}
}

function dfs(values = []) {
	if (this.left) {
		values = this.left.dfs(values);
	}
	values.push(this.value);

	if (this.right) {
		values = this.right.dfs(values);
	}
}

function BFS(tree, values = []) {
	const queue = new Queue();
	const node = tree.root;
	queue.enqueue(node);
	while (queue.length) {
		const node = queue.dequeue(); //remove from the queue
		values.push(node.value); // add that value from the queue to an array

		if (node.left) {
			queue.enqueue(node.left); //add left child to the queue
		}

		if (node.right) {
			queue.enqueue(node.right); // add right child to the queue
		}
	}

	return values;
}

/* #6
               Captain Picard
             /                \
    Commander Riker       Commander Data
      /         \               \
 Lt. Cmdr.   Lt. Cmdr.          Lt. Cmdr.
 Worf        LaForge            Crusher
   /                           /
Lieutenant                  Lieutenant
security-officer            Selar

Make tree and then do BFS
*/

const NGcrew = new BST();
NGcrew.insert('Captain', 'Captain Picard');
NGcrew.insert('Commander', 'Commander Riker');
NGcrew.insert('Commander', 'Commander Data');
NGcrew.insert('Lt. Cmdr.', 'Lt. Cmdr. Worf');
NGcrew.insert('Lt. Cmdr.', 'Lt. Cmdr. LaForge');
NGcrew.insert('Lt. Cmdr.', 'Lt. Cmdr. Crusher');
NGcrew.insert('Lieutenant', 'Lieutenant security-officer');
NGcrew.insert('Lieutenant', 'Lieutenant Selar');

/* 7. Max profit
The share price for a company over a week's trading is as follows: [128, 97, 121, 123, 98, 97, 105]. If you had to buy shares in the company on a particular day, and sell the shares on a subsequent day, write an algorithm to work out what the maximum profit you could make would be. */

function maxProfit() {}
