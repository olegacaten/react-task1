export const LocalStorageGet = (key:string):string => {
    return localStorage.getItem(key) || '';
    
}

export const LocalStorageWrite = (key:string, SaveItem:string): void =>{
    return localStorage.setItem(key, SaveItem);
}