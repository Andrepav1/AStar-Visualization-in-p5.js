
// ============================================================
// Priority Queue implementation
// ============================================================
class PriorityQueue {

  constructor() {
    this.size = 0;
    this.headNode = null;
  }

  insert(newElement) {

    var newNode = new PriorityNode(newElement);

    // Adds an element to an empty queue
    if (this.size == 0) {
      this.headNode = newNode;
      this.size++;
      return;
    }

    // Case when new Node has the lowest value
    if (this.headNode.value > newNode.value) {
      newNode.nextNode = this.headNode;
      this.headNode = newNode;
      this.size++;
      return;
    }

    var currNode = this.headNode;

    // Adding an element to the queue
    while (currNode != null && currNode.nextNode != null) {

      // If element already exists in priority queue, do not add it again
      if (currNode.element.equals(newNode.element))
        return;

      if (newNode.value < currNode.nextNode.value) {
        newNode.nextNode = currNode.nextNode;
        currNode.nextNode = newNode;
        this.size++;
        return;
      }
      
      currNode = currNode.nextNode;
    }

    // Case when new Node has the highest value 
    currNode.nextNode = newNode;
    this.size++;

  }

  pop() {

    if (this.size == 0) {
      return null;
    }

    if (this.size == 1) {
      var tmpNode = this.headNode;
      this.headNode = null;
      this.size--;
      return tmpNode.element;
    }

    var tmp = this.headNode;
    this.headNode = this.headNode.nextNode;
    this.size--;

    return tmp.element;
  }

  removeHead() {
    this.headNode = this.headNode.nextNode;
    this.size--;
  }

  removeAll() {
    this.headNode = null;
    this.size = 0;
  }
}

class PriorityNode {

  constructor(e) {
    this.nextNode = null;
    this.element = e;
    this.value = e.v;
  }
  
}
