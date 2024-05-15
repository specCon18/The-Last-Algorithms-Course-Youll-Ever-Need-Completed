function walk(curr:BinaryNode<number> | null, path:number[]): number[]{
  //Base Case
  if(!curr){
    return path;
  }
  //Recurse
  walk(curr.left, path);
  walk(curr.right, path);
  //Post
  path.push(curr.value);
  return path;
}

export default function post_order_search(head: BinaryNode<number>): number[] {
  return walk(head,[]);
}
