function walk(curr: BinaryNode<number> | null, path: number[]): number[] {
  // Base Case: If the current node is null, return the current path (end recursion).
  if (!curr) {
    return path;
  }

  // Recursive Call: Traverse the left subtree first (In-Order: Left -> Node -> Right).
  walk(curr.left, path);

  // Process Current Node: Add the current node's value to the path.
  path.push(curr.value);

  // Recursive Call: Traverse the right subtree.
  walk(curr.right, path);

  // Return the path after visiting all nodes.
  return path;
}

// Function to initiate the in-order traversal from the given tree head.
export default function in_order_search(head: BinaryNode<number>): number[] {
  return walk(head, []);
}
