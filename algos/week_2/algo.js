// QUEUES AND STACKS
class SLNode{
    constructor(value){
      this.value = value
      this.next = null
    }
}
// MON
// LAST IN FIRST OUT
// LIFO - STACKS
class Stack {
    constructor(items = []) {
      this.items = items;
    }
    // Time: O(1)
    // Space: O(1)
    push(item) {
      this.items.push(item);
    }
  
    // Time: O(1)
    // Space: O(1)
    // Returns undefined if empty
    pop() {
      return this.items.pop();
    }
  
    // aka top, returns undefined if empty
    // Time: O(1)
    // Space: O(1)
    peek() {
      return this.items[this.items.length - 1];
    }
  
    // Time: O(1)
    // Space: O(1)
    isEmpty() {
      return this.items.length === 0;
    }
  
    // Time: O(1)
    // Space: O(1)
    size() {
      return this.items.length;
    }
  
    // Time: O(n) linear
    // Space: O(n)
    print() {
      const str = this.items.join(" ");
      console.log(str);
      return str;
    }
}

class SLStack {
    constructor() {
        this.head = null;
    }
    push(newVal) {
      // push newVal to top of stack
      var newNode = new SLNode(newVal)
      if(this.head == null){
        this.head = newNode
      }
      newNode.next = this.head
      this.head = newNode
    }
    pop() {
        // remove and return data at top of stack
        if(this.head == null){
          return null
        }
        var removed = this.head
        this.head = this.head.next
        return removed.value
    }
    peek() {
        // return data at top of stack without removing
        if(this.head == null){
          return null
        }
        return this.head.value
    }
    contains(value) {
        // return true if SLStack contains value
        // return false if SLStack does not contain value
        if(this.head == null){
          return false
        }
        var runner = this.head
        while(runner){
          if(runner.value == value){
            return true
          }
          runner = runner.next
        }
        return false
    }
    isEmpty() {
        // return true if SLStack is empty
        // return false if SLStack is not empty
        if(this.head == null){
          return false
        }
        return true
    }
    size() {
        // return length of SLStack
        var len = 0
        if(this.head == null){
          return 0
        }
        var runner = thi.head
        while(runner){
          len += 1
          runner = runner.next
        }
        return len
    }
    print() {
        // print out the values of the SLStack
        if(this.head == null){
          return false
        }
        var runner = this.head
        var vals = ""
        while(runner){
          vals += `${runner.value} -> `
          runner = runner.next
        }
        console.log(vals)
        return vals
    }
}

// -----------------------------------------------------------------------------------------------//
// -----------------------------------------------------------------------------------------------//

// TUE
// FIFO - QUEUES
class SLQueue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  // Time: O(1) constant
  // Space: O(1)
  isEmpty() {
    return this.head === null;
  }

  // Time: O(1) constant
  // Space: O(1)
  enqueue(val) {
    // ADD NODE TO THE BACK
    var tailNode = new SLNode(val)
    if(this.isEmpty()){
      this.head = tailNode
      this.tail = tailNode
    }
    else{
      this.tail.next = tailNode
      this.tail = this.tail.next
    }
    // INCREMENT SIZE
    this.size++
  }

  // Time: O(1) constant
  // Space: O(1)
  dequeue() {
    if(this.isEmpty()){
      return null
    }
    // REMOVE NODE FROM THE FRONT
    // AND RETURN VALUE
    var dequeued = this.head
    this.head = this.head.next
    if(this.head == null){
      this.tail = null
    }
    // DECREMENT SIZE
    this.size --
    return dequeued.value
  }

  // Time: O(1) constant
  // Space: O(1)
  front() {
    // RETURN THE VALUE OF THE HEAD
    if(this.isEmpty()){
      return null
    }
    return this.head.value
  }

  // Time: O(n) linear
  // Space: O(1)
  contains(val) {
    let runner = this.head;

    while (runner) {
      if (runner.val === val) return true;
      runner = runner.next;
    }
    return false;
  }

  // Time: O(n) linear
  // Space: O(n)
  print() {
    let runner = this.head;
    let vals = "";

    while (runner) {
      vals += `${runner.data}${runner.next ? ", " : ""}`;
      runner = runner.next;
    }
    console.log(vals);
    return vals;
  }
  /* 
    Write a method that returns whether or not the sum of a queue's first half is equal to the sum of it's
    second half. Use no other objects, do not loop directly over the underlying array,
    or access by index
    When the function finishes, the queue should be in it's original state.
    
    Time: O(n) linear, n = queue length
    Space: O(1) constant
  */

  isSumOfHalvesEqual(){
    var len = this.size
    if(len % 2 != 0){
      return false
    }
    var halfLen = len / 2
    var leftSum = 0;
    var rightSum = 0;
    for(var i = 0; i < len; i++){
      var dequeued = this.dequeue()
      if(i < halfLen){
        leftSum += dequeued
      }
      else{
        rightSum += dequeued
      }
      this.enqueue(dequeued)
    }
    if(leftSum == rightSum){
      return true
    }
    else{
      return false
    }
  }
  // WED
  /* 
    Queue: Is Palindrome
    Output: Bool representing if the queue items are a palindrome (items same forwards as reversed)
    
    Restore Queue to original state before returning.
    For storage, use one additional Stack only.
    You CAN use vars to store a dequeued and/or popped item, 
    but NO string concatenating the entire queue, no 2nd stack, 2nd queue, or arrays.
    
  */
  /* 
    Approach:
    1. loop over fixed-length of queue
      - dequeue each item and push it into the stack
      - enqueue each item back into the queue to preserve it's order
    2. loop over fixed-length of queue and check equality of popped & dequeued vals
      - enqueue each dequeued item back into the queue to preserve it's order
    Time: O(2n) -> O(n) linear, n = queue length
    Space: O(n) from the stack being used
  */
  isPalindrome(){
    var stack = new SLStack();

    for(var i = 0; i < this.size; i++){
      var dequeued = this.dequeue()
      stack.push(dequeued)
      this.enqueue(dequeued)
    }
    var isPalindrome = true
    for(var i = 0; i < this.size;i++){
      var dequeued = this.dequeue()
      var popped = stack.pop()
      if(popped != dequeued){
        isPalindrome = false
      }
      this.enqueue(dequeued)
    }
    return isPalindrome
  }

  // Time: O(n) linear since enqueue is O(1), n = vals.length
  // Space: O(1)
}

var queue = new SLQueue()
// queue.enqueue('a')
// queue.enqueue('b')
// queue.enqueue('c')
// queue.enqueue('b')
// queue.enqueue('a')
queue.enqueue(1)
queue.enqueue(4)
queue.enqueue(5)
queue.enqueue(5)
queue.enqueue(4)
queue.enqueue(1)
console.log(queue.isPalindrome()) // true

// -----------------------------------------------------------------------------------------------//
// -----------------------------------------------------------------------------------------------//

// FRI
class CircleQueue{
  constructor(length){
      this.size = length
      this.head = -1
      this.tail = -1
      this.items = new Array(length)
  }
  displayValues(){
      console.log(this.items)
  }
  // HOW TO FIGURE OUT LIST IS FULL
  // HOW TO FIGURE OUT THE NEXT INDEX FOR ENQEUE
  // HOW TO FIGURE OUT THE NEXT INDEX FOR DEQUEUE
  // HINT: THE SIZE OF THE ARRAY AND MODULOUS OPERATOR
  enqueue(value){
    // LIST IS FULL
    if((this.tail + 1) % this.size == this.head ){
      console.log("QUEUE IS FULL")
      return
    }
    // LIST IS EMPTY
    else if(this.head == -1){
      this.head = 0
      this.tail = 0
      this.items[this.head] = value
    }
    // LIST IS PARTIALLY FULL
    else{
      this.tail = (this.tail + 1) % this.size
      this.items[this.tail] = value
    }
  }
  dequeue(){
    // LIST IS EMPTY
    if(this.head == -1){
      console.log("QUEUE IS EMPTY")
      return
    }
    // LIST ONLY HAS ONE ELEMENT LEFT
    else if(this.head == this.tail){
      var returnVal = this.items[this.head]
      this.items[this.head] = null
      this.tail = -1
      this.head = -1
      return returnVal
    }
    // LIST IS PARTIALLY FULL
    else{
      var returnVal = this.items[this.head]
      this.items[this.head] = null
      this.head = (this.head + 1) % this.size
      return returnVal
    }
  }
}
var cQ = new CircleQueue(9);
cQ.enqueue('a')
cQ.enqueue('b')
cQ.enqueue('c')
cQ.dequeue()
cQ.enqueue('d')
cQ.enqueue('e')
cQ.enqueue('f')
cQ.enqueue('g')
cQ.enqueue('h')
cQ.enqueue('i')
cQ.enqueue('j')
cQ.dequeue()
cQ.dequeue()
cQ.enqueue('k')

