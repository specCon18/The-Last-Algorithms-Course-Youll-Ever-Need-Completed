type Node<T> = {
    value:T,
    prev?: Node<T>,
    next?: Node<T>
}
export default class DoublyLinkedList<T> {
    public length: number;
    private head?: Node<T>;
    private tail?: Node<T>;

    constructor() {
        this.length = 0;
        this.head = undefined;
        this.tail = undefined;
    }

    prepend(item: T): void {
        const node = {value:item} as Node<T>;
        this.length++;
        if(!this.head){
            this.head = this.tail = node;
            return;
        }
        node.next = this.head;
        this.head.prev = node;
        this.head = node;
        
    }
    insertAt(item: T, idx: number): void {
        if(idx > this.length){
            throw new Error("Oh No Cannot insert outside of list");
        }
        if(idx === this.length){
            this.append(item);
            return;
        }else if(idx === 0){
            this.prepend(item);
            return;
        }
        this.length++;
        const curr = this.getAt(idx) as Node<T>;
        const node = {value:item} as Node<T>;
        node.next = curr;
        node.prev = curr.prev;
        curr.next = node;
        if(node.prev){
            node.prev.next = node;
        }
    }
    append(item: T): void {
        this.length++;
        const node = {value:item} as Node<T>;
        if(!this.tail){
            this.head = this.tail = node;
            return;
        }
        node.prev = this.tail;
        this.tail.next = node;
        this.tail = node;
    }
    // Could be improved by hash map to node values so that lookup is instant;
    remove(item: T): T | undefined {
        let curr = this.head;
        for(let i = 0; curr && i < this.length; ++i){
            //weve found the item
            if(curr.value === item){
                break;
            }
            curr = curr.next;
        }
        //if no curr then theres no item to remove
        if(!curr){
            return undefined;
        }
        return this.removeNode(curr);
    }
    get(idx: number): T | undefined {
        return this.getAt(idx)?.value;
    }
    private getAt(idx:number): Node<T> | undefined {
        let curr = this.head;
        for(let i = 0; curr && i < idx; ++i){
            curr = curr.next;
        }
        return curr;
    };
    private removeNode(node:Node<T>):T | undefined{
        this.length--;
        if(this.length === 0){
            const out = this.head?.value;
            this.head = this.tail = undefined;
            return out;
        }
        if(node.prev){
            node.prev.next = node.next;
        }
        if(node.next){
            node.next.prev = node.prev;
        }
        if(node === this.head){
            this.head = node.next;
        }
        if(node === this.tail){
            this.tail = node.prev;
        }
        node.prev = node.next = undefined;
        return node.value;
    }
    removeAt(idx: number): T | undefined {
        const node = this.getAt(idx);
        if(!node){
            return undefined;
        }
        return this.removeNode(node);
    }
}
