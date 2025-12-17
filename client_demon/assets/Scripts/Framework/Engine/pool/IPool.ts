export interface IPool {
    get();
    size();
    put(obj, flag?);
    clear();
}

